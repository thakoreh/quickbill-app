export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  
  // Sender
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  senderPhone: string;
  
  // Client
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  
  // Items
  items: InvoiceItem[];
  
  // Settings
  currency: string;
  taxRate: number;
  discountRate: number;
  notes: string;
  template: 'modern' | 'classic' | 'minimal' | 'bold';
  accentColor: string;
  
  // Logo
  logoUrl: string;
}

export type InvoiceTemplate = 'modern' | 'classic' | 'minimal' | 'bold';

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso' },
] as const;

export const TEMPLATE_COLORS = [
  '#2563eb', // blue
  '#7c3aed', // purple
  '#059669', // green
  '#dc2626', // red
  '#ea580c', // orange
  '#0891b2', // cyan
  '#4f46e5', // indigo
  '#be185d', // pink
  '#000000', // black
] as const;

export function createEmptyInvoice(): InvoiceData {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + 30);
  
  return {
    id: crypto.randomUUID(),
    invoiceNumber: `INV-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
    date: today.toISOString().split('T')[0],
    dueDate: due.toISOString().split('T')[0],
    senderName: '',
    senderEmail: '',
    senderAddress: '',
    senderPhone: '',
    clientName: '',
    clientEmail: '',
    clientAddress: '',
    items: [
      { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 },
    ],
    currency: 'USD',
    taxRate: 0,
    discountRate: 0,
    notes: 'Thank you for your business!',
    template: 'modern',
    accentColor: '#2563eb',
    logoUrl: '',
  };
}

export function calculateSubtotal(items: InvoiceItem[]): number {
  return items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return subtotal * (taxRate / 100);
}

export function calculateDiscount(subtotal: number, discountRate: number): number {
  return subtotal * (discountRate / 100);
}

export function calculateTotal(invoice: InvoiceData): number {
  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const discount = calculateDiscount(subtotal, invoice.discountRate);
  return subtotal + tax - discount;
}
