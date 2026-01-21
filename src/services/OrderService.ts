import api from './api';
import { OrderDTO } from '../dtos/OrderDTO';
import type { IOrderAPI, ICreateOrderPayload } from '../interfaces/IOrder';

class OrderService {
  async getAll(): Promise<OrderDTO[]> {
    const { data } = await api.get<IOrderAPI[]>('/orders');
    return data.map(order => new OrderDTO(order));
  }

  async create(payload: ICreateOrderPayload): Promise<OrderDTO> {
    const { data } = await api.post<IOrderAPI>('/orders', payload);
    return new OrderDTO(data);
  }
  async getById(id: number): Promise<OrderDTO> {
    const { data } = await api.get<IOrderAPI>(`/orders/${id}`);
    return new OrderDTO(data);
  }
}

export default new OrderService();