import type { IOrderAPI, IOrderItem } from '../interfaces/IOrder';

export class OrderDTO {
  id: number;
  client: string;
  status: string;
  totalFormatted: string;
  dateFormatted: string;
  itemsSummary: string;
  statusColor: string;
  items: IOrderItem[]; 

  constructor(data: IOrderAPI) {
    this.id = data.id;
    this.client = data.clientName;
    this.status = data.status;
    
   
    this.items = data.items || []; 

    
    this.totalFormatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(data.total);

   
    this.dateFormatted = new Intl.DateTimeFormat('pt-BR').format(new Date(data.date));

    
    if (data.items.length > 1) {
      this.itemsSummary = `${data.items[0]?.product} e +${data.items.length - 1}`;
    } else {
      this.itemsSummary = data.items[0]?.product || 'Sem itens';
    }

   
    const colors: Record<string, string> = {
      'PENDENTE': 'var(--status-warning)',
      'PROCESSADO': 'var(--primary-color)',
      'ENTREGUE': 'var(--status-success)'
    };
    
    this.statusColor = colors[data.status] || '#95a5a6';
  }
}