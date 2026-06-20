export interface Order {
  id?: number;
  dateOrder: string;
  status: string;
  orderLines?: OrderLine[];
  attachments?: Attachment[];
}

export interface OrderLine {
  id?: number;
  designation: string;
  quantity: number;
  price: number;
}

export interface Attachment {
  id?: number;
  typeFile: string;
  urlFile: string;
}
