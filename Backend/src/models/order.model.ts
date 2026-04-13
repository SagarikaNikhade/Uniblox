export interface Order {
  id: string;
  items: any[];
  totalAmount: number;
  discountApplied: number;
  finalAmount: number;
}