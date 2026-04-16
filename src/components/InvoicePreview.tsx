'use client';

import { InvoiceData, CURRENCIES } from '@/types/invoice';

interface InvoicePreviewProps {
  invoice: InvoiceData;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentLink?: string;
}

export default function InvoicePreview({ invoice, subtotal, tax, discount, total, paymentLink }: InvoicePreviewProps) {
  const currencySymbol = CURRENCIES.find(c => c.code === invoice.currency)?.symbol || '$';
  
  const fmt = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const accent = invoice.accentColor;
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (invoice.template === 'modern') {
    return (
      <div className="invoice-preview rounded-2xl overflow-hidden border" style={{ background: '#fff', borderColor: 'var(--border)' }}>
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ color: accent }}>INVOICE</h1>
              <p className="text-sm text-gray-400 mt-1">#{invoice.invoiceNumber}</p>
            </div>
            {invoice.logoUrl ? (
              <img src={invoice.logoUrl} alt="Logo" className="h-14 object-contain" />
            ) : (
              <div className="w-14 h-14 rounded-xl" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)` }} />
            )}
          </div>

          {/* Parties */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">From</p>
              <p className="font-semibold text-gray-900">{invoice.senderName || 'Your Name'}</p>
              <p className="text-sm text-gray-500">{invoice.senderEmail}</p>
              <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.senderAddress}</p>
              {invoice.senderPhone && <p className="text-sm text-gray-500">{invoice.senderPhone}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Bill To</p>
              <p className="font-semibold text-gray-900">{invoice.clientName || 'Client Name'}</p>
              <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
              <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.clientAddress}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="px-4 py-3 rounded-xl" style={{ background: `${accent}08` }}>
              <p className="text-xs font-medium" style={{ color: accent }}>Date</p>
              <p className="font-semibold text-gray-900 text-sm">{formatDate(invoice.date)}</p>
            </div>
            <div className="px-4 py-3 rounded-xl" style={{ background: `${accent}08` }}>
              <p className="text-xs font-medium" style={{ color: accent }}>Due Date</p>
              <p className="font-semibold text-gray-900 text-sm">{formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="rounded-xl overflow-hidden border border-gray-100 mb-8">
            <table className="w-full">
              <thead>
                <tr style={{ background: `${accent}08` }}>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Description</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Qty</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Rate</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={item.id} className={i > 0 ? 'border-t border-gray-50' : ''}>
                    <td className="px-4 py-3 text-sm text-gray-700">{item.description || 'Item'}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-right">{item.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-700 text-right">{fmt(item.rate)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{fmt(item.quantity * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">{fmt(subtotal)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                  <span className="text-gray-900">{fmt(tax)}</span>
                </div>
              )}
              {invoice.discountRate > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Discount ({invoice.discountRate}%)</span>
                  <span className="text-gray-900">-{fmt(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-3 border-t" style={{ borderColor: `${accent}20` }}>
                <span style={{ color: accent }}>Total</span>
                <span style={{ color: accent }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Notes</p>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}

          {/* Payment Link */}
          {paymentLink && (
            <div className="mt-6 text-center">
              <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: accent }}>
                Pay {fmt(total)}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (invoice.template === 'classic') {
    return (
      <div className="invoice-preview rounded-2xl overflow-hidden border" style={{ background: '#fff', borderColor: 'var(--border)' }}>
        {/* Top bar */}
        <div className="h-2" style={{ background: accent }} />
        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              {invoice.logoUrl ? (
                <img src={invoice.logoUrl} alt="Logo" className="h-16 object-contain mb-2" />
              ) : (
                <div className="w-16 h-16 rounded-lg flex items-center justify-center text-white text-2xl font-bold" style={{ background: accent }}>
                  {invoice.senderName ? invoice.senderName.charAt(0) : 'Q'}
                </div>
              )}
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
              <p className="text-sm text-gray-500">#{invoice.invoiceNumber}</p>
              <p className="text-sm text-gray-500">{formatDate(invoice.date)}</p>
              <p className="text-sm text-gray-500">Due: {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-xs font-bold uppercase text-gray-400 mb-1">From</p>
              <p className="font-semibold text-gray-900 text-sm">{invoice.senderName}</p>
              <p className="text-xs text-gray-500">{invoice.senderEmail}</p>
              <p className="text-xs text-gray-500 whitespace-pre-line">{invoice.senderAddress}</p>
              {invoice.senderPhone && <p className="text-xs text-gray-500">{invoice.senderPhone}</p>}
            </div>
            <div className="p-4 rounded-lg bg-gray-50">
              <p className="text-xs font-bold uppercase text-gray-400 mb-1">Bill To</p>
              <p className="font-semibold text-gray-900 text-sm">{invoice.clientName}</p>
              <p className="text-xs text-gray-500">{invoice.clientEmail}</p>
              <p className="text-xs text-gray-500 whitespace-pre-line">{invoice.clientAddress}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b-2" style={{ borderColor: accent }}>
                <th className="text-left pb-2 text-xs font-bold uppercase text-gray-500">Item</th>
                <th className="text-right pb-2 text-xs font-bold uppercase text-gray-500">Qty</th>
                <th className="text-right pb-2 text-xs font-bold uppercase text-gray-500">Rate</th>
                <th className="text-right pb-2 text-xs font-bold uppercase text-gray-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-800">{item.description || 'Item'}</td>
                  <td className="py-3 text-sm text-gray-800 text-right">{item.quantity}</td>
                  <td className="py-3 text-sm text-gray-800 text-right">{fmt(item.rate)}</td>
                  <td className="py-3 text-sm font-medium text-gray-900 text-right">{fmt(item.quantity * item.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1 text-sm"><span className="text-gray-500">Subtotal</span><span>{fmt(subtotal)}</span></div>
              {invoice.taxRate > 0 && <div className="flex justify-between py-1 text-sm"><span className="text-gray-500">Tax ({invoice.taxRate}%)</span><span>{fmt(tax)}</span></div>}
              {invoice.discountRate > 0 && <div className="flex justify-between py-1 text-sm"><span className="text-gray-500">Discount</span><span>-{fmt(discount)}</span></div>}
              <div className="flex justify-between py-2 text-lg font-bold border-t-2 mt-2" style={{ borderColor: accent }}>
                <span>Total</span><span>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div className="mt-8 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold uppercase text-gray-400 mb-1">Notes</p>
              <p className="text-sm text-gray-600">{invoice.notes}</p>
            </div>
          )}

          {paymentLink && (
            <div className="mt-6 text-center">
              <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                className="inline-block px-8 py-3 rounded-lg text-white font-semibold text-sm"
                style={{ background: accent }}>
                Pay {fmt(total)}
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (invoice.template === 'minimal') {
    return (
      <div className="invoice-preview rounded-2xl overflow-hidden border" style={{ background: '#fff', borderColor: 'var(--border)' }}>
        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              {invoice.logoUrl ? (
                <img src={invoice.logoUrl} alt="Logo" className="h-8 object-contain" />
              ) : (
                <div className="w-8 h-8 rounded-full" style={{ background: accent }} />
              )}
              <span className="font-medium text-gray-900">{invoice.senderName || 'Your Name'}</span>
            </div>
            <span className="text-xs text-gray-400">Invoice #{invoice.invoiceNumber}</span>
          </div>

          <div className="mb-12">
            <p className="text-xs text-gray-400 mb-1">Billed to</p>
            <p className="font-medium text-gray-900">{invoice.clientName || 'Client Name'}</p>
            <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.clientAddress}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-xs text-gray-400">
            <div><span className="block">Issued</span><span className="text-sm text-gray-700 font-medium">{formatDate(invoice.date)}</span></div>
            <div><span className="block">Due</span><span className="text-sm text-gray-700 font-medium">{formatDate(invoice.dueDate)}</span></div>
          </div>

          <div className="space-y-4 mb-8">
            {invoice.items.map(item => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.description || 'Item'}</p>
                  <p className="text-xs text-gray-400">{item.quantity} x {fmt(item.rate)}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{fmt(item.quantity * item.rate)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mb-8">
            <div className="w-48 space-y-1">
              {invoice.taxRate > 0 && <div className="flex justify-between text-xs text-gray-400"><span>Tax</span><span>{fmt(tax)}</span></div>}
              {invoice.discountRate > 0 && <div className="flex justify-between text-xs text-gray-400"><span>Discount</span><span>-{fmt(discount)}</span></div>}
              <div className="flex justify-between text-lg font-bold pt-2 border-t" style={{ borderColor: accent }}>
                <span style={{ color: accent }}>Due</span>
                <span style={{ color: accent }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && <p className="text-xs text-gray-400">{invoice.notes}</p>}

          {paymentLink && (
            <div className="mt-6 text-center">
              <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                className="text-sm font-medium" style={{ color: accent }}>
                Pay {fmt(total)} →
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Bold template
  return (
    <div className="invoice-preview rounded-2xl overflow-hidden border" style={{ background: '#fff', borderColor: 'var(--border)' }}>
      <div className="p-6 text-white" style={{ background: accent }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black tracking-tight">INVOICE</h1>
            <p className="text-sm opacity-80 mt-1">#{invoice.invoiceNumber}</p>
          </div>
          {invoice.logoUrl ? (
            <img src={invoice.logoUrl} alt="Logo" className="h-12 object-contain brightness-0 invert" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/20" />
          )}
        </div>
      </div>

      <div className="p-8 sm:p-10">
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xs font-bold uppercase mb-2" style={{ color: accent }}>From</p>
            <p className="font-bold text-gray-900">{invoice.senderName}</p>
            <p className="text-sm text-gray-500">{invoice.senderEmail}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.senderAddress}</p>
            {invoice.senderPhone && <p className="text-sm text-gray-500">{invoice.senderPhone}</p>}
          </div>
          <div>
            <p className="text-xs font-bold uppercase mb-2" style={{ color: accent }}>Bill To</p>
            <p className="font-bold text-gray-900">{invoice.clientName}</p>
            <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
            <p className="text-sm text-gray-500 whitespace-pre-line">{invoice.clientAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-3 rounded-lg" style={{ background: `${accent}10` }}>
            <p className="text-xs font-bold" style={{ color: accent }}>ISSUED</p>
            <p className="font-bold text-gray-900">{formatDate(invoice.date)}</p>
          </div>
          <div className="p-3 rounded-lg" style={{ background: `${accent}10` }}>
            <p className="text-xs font-bold" style={{ color: accent }}>DUE</p>
            <p className="font-bold text-gray-900">{formatDate(invoice.dueDate)}</p>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: `${accent}20` }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: `${accent}10` }}>
                <th className="text-left px-4 py-3 text-xs font-black uppercase" style={{ color: accent }}>Item</th>
                <th className="text-right px-4 py-3 text-xs font-black uppercase" style={{ color: accent }}>Qty</th>
                <th className="text-right px-4 py-3 text-xs font-black uppercase" style={{ color: accent }}>Rate</th>
                <th className="text-right px-4 py-3 text-xs font-black uppercase" style={{ color: accent }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={item.id} className={i > 0 ? 'border-t' : ''} style={{ borderColor: `${accent}10` }}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.description || 'Item'}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 text-right">{fmt(item.rate)}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{fmt(item.quantity * item.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <div className="w-72">
            <div className="flex justify-between py-1 text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium">{fmt(subtotal)}</span></div>
            {invoice.taxRate > 0 && <div className="flex justify-between py-1 text-sm"><span className="text-gray-500">Tax ({invoice.taxRate}%)</span><span>{fmt(tax)}</span></div>}
            {invoice.discountRate > 0 && <div className="flex justify-between py-1 text-sm"><span className="text-gray-500">Discount ({invoice.discountRate}%)</span><span>-{fmt(discount)}</span></div>}
            <div className="flex justify-between py-3 text-2xl font-black border-t-2 mt-2" style={{ borderColor: accent }}>
              <span style={{ color: accent }}>TOTAL</span>
              <span style={{ color: accent }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-6 p-4 rounded-lg" style={{ background: `${accent}08` }}>
            <p className="text-sm text-gray-600">{invoice.notes}</p>
          </div>
        )}

        {paymentLink && (
          <div className="mt-6 text-center">
            <a href={paymentLink} target="_blank" rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: accent }}>
              Pay {fmt(total)} Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
