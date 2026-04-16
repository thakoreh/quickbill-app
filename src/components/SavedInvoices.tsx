'use client';

import { InvoiceData, CURRENCIES } from '@/types/invoice';
import { X, FileText, Trash2, Clock } from 'lucide-react';

interface SavedInvoicesProps {
  invoices: InvoiceData[];
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function SavedInvoices({ invoices, onLoad, onDelete, onClose }: SavedInvoicesProps) {
  const fmt = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getTotal = (inv: InvoiceData) => {
    const sub = inv.items.reduce((s, i) => s + i.quantity * i.rate, 0);
    const tax = sub * (inv.taxRate / 100);
    const disc = sub * (inv.discountRate / 100);
    return sub + tax - disc;
  };

  return (
    <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Saved Invoices ({invoices.length})
        </h3>
        <button onClick={onClose} className="p-1 rounded-lg transition-colors" style={{ color: 'var(--muted-foreground)' }}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {invoices.map(inv => (
          <div
            key={inv.id}
            className="flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors"
            style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}
            onClick={() => { onLoad(inv.id); onClose(); }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{inv.clientName || 'Untitled'}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--card)', color: 'var(--muted-foreground)' }}>
                  {inv.invoiceNumber}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{inv.date}</span>
                <span className="font-semibold" style={{ color: 'var(--primary)' }}>
                  {fmt(getTotal(inv), inv.currency)}
                </span>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onDelete(inv.id); }}
              className="p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20"
              style={{ color: '#dc2626' }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
