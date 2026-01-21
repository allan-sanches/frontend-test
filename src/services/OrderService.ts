import api from './api';
import type { OrderDTO } from '../dtos/OrderDTO';

class OrderService {
  
  async getAll(): Promise<OrderDTO[]> {
    const { data } = await api.get('/orders');
    
    return data.map((order: any) => ({
      ...order,
      id: Number(order.id), 
      dateFormatted: new Date(order.date).toLocaleDateString('pt-BR'),
      totalFormatted: Number(order.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      statusColor: this.getStatusColor(order.status),
      itemsSummary: this.getItemsSummary(order.items)
    }));
  }

  /**
   * Busca um pedido pelo ID
   */
  async getById(id: number): Promise<OrderDTO> {
    const { data } = await api.get(`/orders/${id}`);
    
    return {
      ...data,
      id: Number(data.id),
      dateFormatted: new Date(data.date).toLocaleDateString('pt-BR'),
      totalFormatted: Number(data.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      statusColor: this.getStatusColor(data.status),
      itemsSummary: this.getItemsSummary(data.items) 
    };
  }

  async updateStatus(id: number, newStatus: 'PENDENTE' | 'PROCESSADO' | 'ENTREGUE' | 'CANCELADO'): Promise<void> {
    await api.patch(`/orders/${id}`, { 
      status: newStatus 
    });
  }


  async create(order: Partial<OrderDTO>): Promise<OrderDTO> {

    const currentOrders = await this.getAll();
    
    const maxId = currentOrders.reduce((max, item) => (item.id > max ? item.id : max), 1000);
    
    const nextId = maxId + 1;
    const payload = {
      ...order,
      id: nextId 
    };

    const { data } = await api.post('/orders', payload);
    return data;
  }

 

  private getStatusColor(status: string): string {
    switch (status) {
      case 'ENTREGUE': return 'var(--status-success)';
      case 'PENDENTE': return 'var(--status-warning)';
      case 'CANCELADO': return 'var(--status-danger)';
      default: return 'var(--status-info)';
    }
  }

  private getItemsSummary(items: any[]): string {
    if (!items || items.length === 0) return 'Sem itens';
    const firstItem = items[0].product;
    const remaining = items.length - 1;
    
    return remaining > 0 
      ? `${firstItem} e +${remaining}`
      : firstItem;
  }
}

export default new OrderService();