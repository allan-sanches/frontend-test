import { OrderStatus } from '../enums/OrderStatus'; // <--- 1. Importe o Enum/Objeto

export interface IOrderItem {
  product: string;
  qty: number;
  price: number; 
}

export interface IOrderAPI {
  id: number;
  clientName: string;
  status: OrderStatus; 
  total: number;
  date: string; 
  items: IOrderItem[];
}

export interface ICreateOrderPayload {
  clientName: string;
  total: number;
  status: OrderStatus; 
  date: string;
  items: IOrderItem[]; 
}