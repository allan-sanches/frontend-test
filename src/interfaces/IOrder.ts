export interface IOrderItem {
  product: string;
  qty: number;
}

export interface IOrderAPI {
  id: number;
  clientName: string;
  status: 'PENDENTE' | 'PROCESSADO' | 'ENTREGUE'; 
  total: number;
  date: string; 
  items: IOrderItem[];
}


export interface ICreateOrderPayload {
  clientName: string;
  total: number;
  status: 'PENDENTE'; 
  date: string;
  items: {
    product: string;
    qty: number;
  }[];
}