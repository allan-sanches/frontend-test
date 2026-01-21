import api from './api';
import { OrderDTO } from '../dtos/OrderDTO';
import { OrderStatus } from '../enums/OrderStatus'; // <--- Importando o Enum
import type { IOrderAPI, ICreateOrderPayload } from '../interfaces/IOrder';

class OrderService {
  
  async getAll(): Promise<OrderDTO[]> {
   
    const timestamp = new Date().getTime();
    

    const { data } = await api.get<IOrderAPI[]>(`/orders?_nocache=${timestamp}`);
    
    return data.map(item => new OrderDTO(item));
  }

  /**
   * Busca um pedido pelo ID
   */
  async getById(id: number): Promise<OrderDTO> {
    const { data } = await api.get<IOrderAPI>(`/orders/${id}`);
    
  
    return new OrderDTO(data);
  }

  
  async updateStatus(id: number, newStatus: OrderStatus): Promise<void> {
    await api.patch(`/orders/${id}`, { 
      status: newStatus 
    });
  }


  async create(payload: ICreateOrderPayload): Promise<OrderDTO> {
   
    const currentOrders = await api.get<IOrderAPI[]>('/orders');
    
    
    const maxId = currentOrders.data.reduce((max, item) => 
      (Number(item.id) > max ? Number(item.id) : max), 0
    );
    const nextId = maxId > 0 ? maxId + 1 : 1001; 

    
    const newOrder = {
      ...payload,
      id: nextId
    };

    
    const { data } = await api.post<IOrderAPI>('/orders', newOrder);
    
    
    return new OrderDTO(data);
  }
}

export default new OrderService();