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
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      padding: 24,
      fontFamily: "'Source Sans 3', system-ui, sans-serif",
      fontFeatureSettings: '"ss01"',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontSize: 14, fontWeight: 500, color: 'var(--heading)', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
          <FileText style={{ width: 15, height: 15, color: 'var(--body)' }} />
          Saved Invoices ({invoices.length})
        </h3>
        <button onClick={onClose} style={{ padding: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--body)', borderRadius: 4 }}>
          <X style={{ width: 16, height: 16 }} />
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 256, overflowY: 'auto' }}>
        {invoices.map(inv => (
          <div
            key={inv.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              borderRadius: 4,
              border: '1px solid var(--border)',
              background: 'var(--bg-dark)',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
            }}
            onClick={() => { onLoad(inv.id); onClose(); }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary-light)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 400, color: 'var(--heading)' }}>{inv.clientName || 'Untitled'}</span>
                <span style={{
                  fontSize: 11,
                  padding: '1px 6px',
                  borderRadius: 4,
                  background: 'var(--card)',
                  color: 'var(--body)',
                  border: '1px solid var(--border)',
                  fontFamily: "'Source Code Pro', monospace",
                  fontFeatureSettings: '"tnum"',
                }}>
                  {inv.invoiceNumber}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: 12, color: 'var(--body)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock style={{ width: 11, height: 11 }} />{inv.date}
                </span>
                <span style={{
                  fontWeight: 500,
                  color: 'var(--primary)',
                  fontFamily: "'Source Code Pro', monospace",
                  fontFeatureSettings: '"tnum"',
                }}>
                  {fmt(getTotal(inv), inv.currency)}
                </span>
              </div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onDelete(inv.id); }}
              style={{
                padding: 6,
                borderRadius: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#dc2626',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <Trash2 style={{ width: 14, height: 14 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
