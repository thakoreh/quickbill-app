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

/* ── Stripe design tokens ── */
const FONT_BODY = "'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif";
const FONT_MONO  = "'Source Code Pro', 'SFMono-Regular', Consolas, monospace";
const FONT_FEAT  = "'ss01' on";
const MONO_FEAT  = "'tnum' on";

const CLR_HEADING = '#061b31';
const CLR_BODY    = '#64748b';
const CLR_LABEL   = '#273951';
const CLR_BORDER  = '#e5edf5';

const TH_STYLE: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontFeatureSettings: FONT_FEAT,
  fontSize: 10,
  fontWeight: 500,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const TD_STYLE: React.CSSProperties = {
  fontFamily: FONT_BODY,
  fontFeatureSettings: FONT_FEAT,
  fontSize: 13,
  fontWeight: 300,
  color: CLR_LABEL,
};

const AMOUNT_STYLE: React.CSSProperties = {
  fontFamily: FONT_MONO,
  fontFeatureSettings: MONO_FEAT,
  fontSize: 12,
};

const AMOUNT_BOLD: React.CSSProperties = {
  ...AMOUNT_STYLE,
  fontWeight: 600,
  color: CLR_HEADING,
};

/* ── reusable helpers ── */
function accentBg(opacity = '0A') {
  return (accent: string) => `${accent}${opacity}`;
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

  const outerStyle: React.CSSProperties = {
    fontFamily: FONT_BODY,
    fontFeatureSettings: FONT_FEAT,
    background: '#fff',
    border: `1px solid ${CLR_BORDER}`,
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: 'rgba(23,23,23,0.08) 0px 15px 35px 0px',
  };

  const cardStyle: React.CSSProperties = {
    background: '#fff',
    border: `1px solid ${CLR_BORDER}`,
    borderRadius: 6,
  };

  /* ────────────────────────────────────────────
     MODERN
  ──────────────────────────────────────────── */
  if (invoice.template === 'modern') {
    return (
      <div className="invoice-preview" style={outerStyle}>
        <div style={{ padding: '32px 32px 40px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
            <div>
              <h1 style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 28, fontWeight: 300, letterSpacing: '-0.02em', color: accent, margin: 0 }}>INVOICE</h1>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, marginTop: 4 }}>#{invoice.invoiceNumber}</p>
            </div>
            {invoice.logoUrl ? (
              <img src={invoice.logoUrl} alt="Logo" style={{ height: 56, objectFit: 'contain' }} />
            ) : (
              <div style={{ width: 56, height: 56, borderRadius: 6, background: `linear-gradient(135deg, ${accent}, ${accent}88)` }} />
            )}
          </div>

          {/* Parties */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
            <div>
              <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 8 }}>From</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.senderName || 'Your Name'}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.senderEmail}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.senderAddress}</p>
              {invoice.senderPhone && <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.senderPhone}</p>}
            </div>
            <div>
              <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 8 }}>Bill To</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.clientName || 'Client Name'}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.clientEmail}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.clientAddress}</p>
            </div>
          </div>

          {/* Dates */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            <div style={{ padding: '12px 16px', borderRadius: 6, background: `${accent}0F` }}>
              <p style={{ ...TH_STYLE, color: accent }}>Date</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING }}>{formatDate(invoice.date)}</p>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: 6, background: `${accent}0F` }}>
              <p style={{ ...TH_STYLE, color: accent }}>Due Date</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING }}>{formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ ...cardStyle, marginBottom: 32, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: `${accent}0F` }}>
                  <th style={{ ...TH_STYLE, textAlign: 'left', padding: '10px 16px', color: accent }}>Description</th>
                  <th style={{ ...TH_STYLE, textAlign: 'right', padding: '10px 16px', color: accent }}>Qty</th>
                  <th style={{ ...TH_STYLE, textAlign: 'right', padding: '10px 16px', color: accent }}>Rate</th>
                  <th style={{ ...TH_STYLE, textAlign: 'right', padding: '10px 16px', color: accent }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, i) => (
                  <tr key={item.id} style={i > 0 ? { borderTop: `1px solid ${CLR_BORDER}` } : undefined}>
                    <td style={{ ...TD_STYLE, padding: '10px 16px' }}>{item.description || 'Item'}</td>
                    <td style={{ ...TD_STYLE, padding: '10px 16px', textAlign: 'right' }}>{item.quantity}</td>
                    <td style={{ ...AMOUNT_STYLE, padding: '10px 16px', textAlign: 'right', color: CLR_BODY }}>{fmt(item.rate)}</td>
                    <td style={{ ...AMOUNT_BOLD, padding: '10px 16px', textAlign: 'right' }}>{fmt(item.quantity * item.rate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: 288 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Subtotal</span>
                <span style={{ ...AMOUNT_STYLE, color: CLR_HEADING }}>{fmt(subtotal)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Tax ({invoice.taxRate}%)</span>
                  <span style={{ ...AMOUNT_STYLE, color: CLR_HEADING }}>{fmt(tax)}</span>
                </div>
              )}
              {invoice.discountRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Discount ({invoice.discountRate}%)</span>
                  <span style={{ ...AMOUNT_STYLE, color: CLR_HEADING }}>-{fmt(discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 4, borderTop: `1px solid ${accent}33` }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 18, fontWeight: 300, color: accent }}>Total</span>
                <span style={{ fontFamily: FONT_MONO, fontFeatureSettings: MONO_FEAT, fontSize: 18, fontWeight: 600, color: accent }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${CLR_BORDER}` }}>
              <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 8 }}>Notes</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>{invoice.notes}</p>
            </div>
          )}

          {/* Payment Link */}
          {paymentLink && (
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  borderRadius: 6,
                  background: accent,
                  color: '#fff',
                  fontFamily: FONT_BODY,
                  fontFeatureSettings: FONT_FEAT,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}>
                Pay {fmt(total)}
              </a>
            </div>
          )}

          {/* Watermark */}
          <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 16, borderTop: `1px solid ${CLR_BORDER}` }}>
            <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 10, fontWeight: 300, color: '#94a3b8', opacity: 0.5 }}>Created with QuickBill — quickbill.app</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────
     CLASSIC
  ──────────────────────────────────────────── */
  if (invoice.template === 'classic') {
    return (
      <div className="invoice-preview" style={outerStyle}>
        {/* Top bar */}
        <div style={{ height: 6, background: accent }} />
        <div style={{ padding: '32px 32px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
            <div>
              {invoice.logoUrl ? (
                <img src={invoice.logoUrl} alt="Logo" style={{ height: 64, objectFit: 'contain', marginBottom: 8 }} />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: FONT_BODY, fontSize: 22, fontWeight: 400, background: accent }}>
                  {invoice.senderName ? invoice.senderName.charAt(0) : 'Q'}
                </div>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 28, fontWeight: 300, color: CLR_HEADING, margin: 0 }}>INVOICE</h1>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>#{invoice.invoiceNumber}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{formatDate(invoice.date)}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>Due: {formatDate(invoice.dueDate)}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
            <div style={{ padding: 16, borderRadius: 6, background: '#f8fafc' }}>
              <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 4 }}>From</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.senderName}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.senderEmail}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.senderAddress}</p>
              {invoice.senderPhone && <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.senderPhone}</p>}
            </div>
            <div style={{ padding: 16, borderRadius: 6, background: '#f8fafc' }}>
              <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 4 }}>Bill To</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.clientName}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.clientEmail}</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.clientAddress}</p>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${accent}` }}>
                <th style={{ ...TH_STYLE, textAlign: 'left', paddingBottom: 8, color: CLR_LABEL }}>Item</th>
                <th style={{ ...TH_STYLE, textAlign: 'right', paddingBottom: 8, color: CLR_LABEL }}>Qty</th>
                <th style={{ ...TH_STYLE, textAlign: 'right', paddingBottom: 8, color: CLR_LABEL }}>Rate</th>
                <th style={{ ...TH_STYLE, textAlign: 'right', paddingBottom: 8, color: CLR_LABEL }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: `1px solid ${CLR_BORDER}` }}>
                  <td style={{ ...TD_STYLE, padding: '10px 0' }}>{item.description || 'Item'}</td>
                  <td style={{ ...TD_STYLE, padding: '10px 0', textAlign: 'right' }}>{item.quantity}</td>
                  <td style={{ ...AMOUNT_STYLE, padding: '10px 0', textAlign: 'right', color: CLR_BODY }}>{fmt(item.rate)}</td>
                  <td style={{ ...AMOUNT_BOLD, padding: '10px 0', textAlign: 'right' }}>{fmt(item.quantity * item.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: 256 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Subtotal</span>
                <span style={{ ...AMOUNT_STYLE, color: CLR_HEADING }}>{fmt(subtotal)}</span>
              </div>
              {invoice.taxRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Tax ({invoice.taxRate}%)</span>
                  <span style={{ ...AMOUNT_STYLE, color: CLR_HEADING }}>{fmt(tax)}</span>
                </div>
              )}
              {invoice.discountRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                  <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Discount</span>
                  <span style={{ ...AMOUNT_STYLE, color: CLR_HEADING }}>-{fmt(discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', marginTop: 8, borderTop: `2px solid ${accent}` }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 18, fontWeight: 300, color: CLR_HEADING }}>Total</span>
                <span style={{ fontFamily: FONT_MONO, fontFeatureSettings: MONO_FEAT, fontSize: 18, fontWeight: 600, color: CLR_HEADING }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div style={{ marginTop: 32, paddingTop: 16, borderTop: `1px solid ${CLR_BORDER}` }}>
              <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 4 }}>Notes</p>
              <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>{invoice.notes}</p>
            </div>
          )}

          {paymentLink && (
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '12px 32px',
                  borderRadius: 6,
                  background: accent,
                  color: '#fff',
                  fontFamily: FONT_BODY,
                  fontFeatureSettings: FONT_FEAT,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}>
                Pay {fmt(total)}
              </a>
            </div>
          )}

          {/* Watermark */}
          <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 16, borderTop: `1px solid ${CLR_BORDER}` }}>
            <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 10, fontWeight: 300, color: '#94a3b8', opacity: 0.5 }}>Created with QuickBill — quickbill.app</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────
     MINIMAL
  ──────────────────────────────────────────── */
  if (invoice.template === 'minimal') {
    return (
      <div className="invoice-preview" style={outerStyle}>
        <div style={{ padding: '32px 32px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {invoice.logoUrl ? (
                <img src={invoice.logoUrl} alt="Logo" style={{ height: 32, objectFit: 'contain' }} />
              ) : (
                <div style={{ width: 32, height: 32, borderRadius: 6, background: accent }} />
              )}
              <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING }}>{invoice.senderName || 'Your Name'}</span>
            </div>
            <span style={{ ...TH_STYLE, color: CLR_BODY }}>Invoice #{invoice.invoiceNumber}</span>
          </div>

          <div style={{ marginBottom: 48 }}>
            <p style={{ ...TH_STYLE, color: CLR_BODY, marginBottom: 4 }}>Billed to</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.clientName || 'Client Name'}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.clientEmail}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.clientAddress}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
            <div>
              <span style={{ ...TH_STYLE, color: CLR_BODY, display: 'block' }}>Issued</span>
              <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, display: 'block', marginTop: 2 }}>{formatDate(invoice.date)}</span>
            </div>
            <div>
              <span style={{ ...TH_STYLE, color: CLR_BODY, display: 'block' }}>Due</span>
              <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, display: 'block', marginTop: 2 }}>{formatDate(invoice.dueDate)}</span>
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            {invoice.items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${CLR_BORDER}` }}>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{item.description || 'Item'}</p>
                  <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{item.quantity} x {fmt(item.rate)}</p>
                </div>
                <p style={{ ...AMOUNT_BOLD, margin: 0 }}>{fmt(item.quantity * item.rate)}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
            <div style={{ width: 192 }}>
              {invoice.taxRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                  <span style={{ ...TH_STYLE, color: CLR_BODY }}>Tax</span>
                  <span style={{ ...AMOUNT_STYLE, color: CLR_BODY }}>{fmt(tax)}</span>
                </div>
              )}
              {invoice.discountRate > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0' }}>
                  <span style={{ ...TH_STYLE, color: CLR_BODY }}>Discount</span>
                  <span style={{ ...AMOUNT_STYLE, color: CLR_BODY }}>-{fmt(discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, marginTop: 4, borderTop: `1px solid ${accent}33` }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 18, fontWeight: 300, color: accent }}>Due</span>
                <span style={{ fontFamily: FONT_MONO, fontFeatureSettings: MONO_FEAT, fontSize: 18, fontWeight: 600, color: accent }}>{fmt(total)}</span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 12, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.notes}</p>
          )}

          {paymentLink && (
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: FONT_BODY,
                  fontFeatureSettings: FONT_FEAT,
                  fontSize: 13,
                  fontWeight: 400,
                  color: accent,
                  textDecoration: 'none',
                }}>
                Pay {fmt(total)} →
              </a>
            </div>
          )}

          {/* Watermark */}
          <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 16, borderTop: `1px solid ${CLR_BORDER}` }}>
            <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 10, fontWeight: 300, color: '#94a3b8', opacity: 0.5 }}>Created with QuickBill — quickbill.app</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────
     BOLD (default / fallback)
  ──────────────────────────────────────────── */
  return (
    <div className="invoice-preview" style={outerStyle}>
      <div style={{ padding: '24px 24px 28px', background: accent }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 28, fontWeight: 300, letterSpacing: '-0.02em', color: '#fff', margin: 0 }}>INVOICE</h1>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.8)', marginTop: 4, margin: 0 }}>#{invoice.invoiceNumber}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{formatDate(invoice.date)}</p>
          </div>
          {invoice.logoUrl ? (
            <img src={invoice.logoUrl} alt="Logo" style={{ height: 48, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          ) : (
            <div style={{ width: 48, height: 48, borderRadius: 6, background: 'rgba(255,255,255,0.2)' }} />
          )}
        </div>
      </div>

      <div style={{ padding: '32px 32px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
          <div>
            <p style={{ ...TH_STYLE, color: accent, marginBottom: 8 }}>From</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.senderName}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.senderEmail}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.senderAddress}</p>
            {invoice.senderPhone && <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.senderPhone}</p>}
          </div>
          <div>
            <p style={{ ...TH_STYLE, color: accent, marginBottom: 8 }}>Bill To</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{invoice.clientName}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.clientEmail}</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0, whiteSpace: 'pre-line' }}>{invoice.clientAddress}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          <div style={{ padding: 12, borderRadius: 6, background: `${accent}0F` }}>
            <p style={{ ...TH_STYLE, color: accent }}>ISSUED</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{formatDate(invoice.date)}</p>
          </div>
          <div style={{ padding: 12, borderRadius: 6, background: `${accent}0F` }}>
            <p style={{ ...TH_STYLE, color: accent }}>DUE</p>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 400, color: CLR_HEADING, margin: 0 }}>{formatDate(invoice.dueDate)}</p>
          </div>
        </div>

        <div style={{ borderRadius: 6, overflow: 'hidden', border: `2px solid ${accent}20` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: `${accent}0F` }}>
                <th style={{ ...TH_STYLE, textAlign: 'left', padding: '10px 16px', color: accent }}>Item</th>
                <th style={{ ...TH_STYLE, textAlign: 'right', padding: '10px 16px', color: accent }}>Qty</th>
                <th style={{ ...TH_STYLE, textAlign: 'right', padding: '10px 16px', color: accent }}>Rate</th>
                <th style={{ ...TH_STYLE, textAlign: 'right', padding: '10px 16px', color: accent }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={item.id} style={i > 0 ? { borderTop: `1px solid ${accent}15` } : undefined}>
                  <td style={{ ...TD_STYLE, padding: '10px 16px', fontWeight: 400, color: CLR_HEADING }}>{item.description || 'Item'}</td>
                  <td style={{ ...TD_STYLE, padding: '10px 16px', textAlign: 'right' }}>{item.quantity}</td>
                  <td style={{ ...AMOUNT_STYLE, padding: '10px 16px', textAlign: 'right', color: CLR_BODY }}>{fmt(item.rate)}</td>
                  <td style={{ ...AMOUNT_BOLD, padding: '10px 16px', textAlign: 'right' }}>{fmt(item.quantity * item.rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <div style={{ width: 288 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Subtotal</span>
              <span style={{ ...AMOUNT_BOLD }}>{fmt(subtotal)}</span>
            </div>
            {invoice.taxRate > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Tax ({invoice.taxRate}%)</span>
                <span style={{ ...AMOUNT_STYLE, color: CLR_BODY }}>{fmt(tax)}</span>
              </div>
            )}
            {invoice.discountRate > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY }}>Discount ({invoice.discountRate}%)</span>
                <span style={{ ...AMOUNT_STYLE, color: CLR_BODY }}>-{fmt(discount)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: 8, borderTop: `2px solid ${accent}` }}>
              <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 22, fontWeight: 300, color: accent }}>TOTAL</span>
              <span style={{ fontFamily: FONT_MONO, fontFeatureSettings: MONO_FEAT, fontSize: 22, fontWeight: 600, color: accent }}>{fmt(total)}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div style={{ marginTop: 24, padding: 16, borderRadius: 6, background: `${accent}0A` }}>
            <p style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 13, fontWeight: 300, color: CLR_BODY, margin: 0 }}>{invoice.notes}</p>
          </div>
        )}

        {paymentLink && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <a href={paymentLink} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '12px 32px',
                borderRadius: 6,
                background: accent,
                color: '#fff',
                fontFamily: FONT_BODY,
                fontFeatureSettings: FONT_FEAT,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: 'none',
              }}>
              Pay {fmt(total)} Now
            </a>
          </div>
        )}

        {/* Watermark */}
        <div style={{ textAlign: 'center', marginTop: 32, paddingTop: 16, borderTop: `1px solid ${CLR_BORDER}` }}>
          <span style={{ fontFamily: FONT_BODY, fontFeatureSettings: FONT_FEAT, fontSize: 10, fontWeight: 300, color: '#94a3b8', opacity: 0.5 }}>Created with QuickBill — quickbill.app</span>
        </div>
      </div>
    </div>
  );
}
