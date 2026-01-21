export const OrderStatus = {
  PENDENTE: 'PENDENTE',
  PROCESSADO: 'PROCESSADO',
  ENTREGUE: 'ENTREGUE',
  CANCELADO: 'CANCELADO'
} as const;


export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];