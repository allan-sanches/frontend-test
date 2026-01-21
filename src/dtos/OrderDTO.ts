import type { IOrderAPI, IOrderItem } from '../interfaces/IOrder';
import { OrderStatus } from '../enums/OrderStatus.ts';

export class OrderDTO {
  id: number;
  clientName: string;
  status: string;
  total: number
  totalFormatted: string;
  date: string;
  dateFormatted: string;
  itemsSummary: string;
  statusColor: string;
  items: IOrderItem[];

  constructor(data: IOrderAPI) {
    this.id = data.id;
    this.clientName = data.clientName; 
    this.status = data.status;
    this.date = data.date;
    this.total = data.total;
    this.items = data.items || [];


    this.totalFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(data.total);
    
   
    this.dateFormatted = new Date(data.date).toLocaleDateString('pt-BR');

    
    this.statusColor = this.getStatusColor(data.status);

    
    this.itemsSummary = this.getItemsSummary(data.items);
  }

 

  private getStatusColor(status: string): string {
    switch (status) {
      case OrderStatus.ENTREGUE: return 'var(--status-success)';
      case OrderStatus.PENDENTE: return 'var(--status-warning)';
      case OrderStatus.CANCELADO: return 'var(--status-danger)';
      case OrderStatus.PROCESSADO: return 'var(--status-info)';
      default: return 'var(--status-info)';
    }
  }
  private getItemsSummary(items: IOrderItem[]): string {
    if (!items || items.length === 0) return 'Sem itens';
    const firstItem = items[0]?.product || 'Produto';
    const remaining = items.length - 1;
    return remaining > 0 ? `${firstItem} e +${remaining}` : firstItem;
  }
}