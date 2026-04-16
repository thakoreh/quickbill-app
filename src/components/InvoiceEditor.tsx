'use client';

import { useState } from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { CURRENCIES, TEMPLATE_COLORS, InvoiceData } from '@/types/invoice';
import InvoicePreview from './InvoicePreview';
import SavedInvoices from './SavedInvoices';
import { Plus, Trash2, Save, Download, FileText, Palette, Settings, ChevronDown, Search } from 'lucide-react';

type Tab = 'details' | 'style' | 'settings';

const cssVars = `
  :root {
    --heading: #061b31;
    --body: #64748b;
    --label: #273951;
    --primary: #533afd;
    --primary-hover: #4434d4;
    --primary-light: #b9b9f9;
    --primary-subtle: rgba(83,58,253,0.05);
    --border: #e5edf5;
    --card: #ffffff;
    --bg-dark: #f6f9fc;
    --success: #15be53;
  }
  .dark {
    --heading: #f0f2f8;
    --body: #8b95a8;
    --border: #1e2840;
    --card: #0f1629;
    --bg-dark: #060b18;
    --label: #c0c8d8;
    --primary-light: #7a6aff;
    --primary-subtle: rgba(83,58,253,0.12);
  }
`;

const inputStyles: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid var(--border)',
  fontSize: '14px',
  fontWeight: 400,
  fontFamily: "'Source Sans 3', sans-serif",
  fontFeatureSettings: "'ss01'",
  color: 'var(--heading)',
  background: 'var(--card)',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

const labelStyles: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: 'var(--body)',
  fontWeight: 500,
  display: 'block',
  marginBottom: '4px',
};

const sectionHeaderStyles: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--heading)',
  margin: '0 0 12px 0',
};

const cardStyles: React.CSSProperties = {
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '6px',
  padding: '32px',
  boxShadow: '0 2px 4px rgba(50,50,93,0.08), 0 1px 1.5px rgba(0,0,0,0.06)',
};

export default function InvoiceEditor() {
  const {
    invoice, updateField, updateItem, addItem, removeItem,
    subtotal, tax, discount, total,
    saveInvoice, savedInvoices, loadInvoice, deleteInvoice, newInvoice,
  } = useInvoice();

  const [activeTab, setActiveTab] = useState<Tab>('details');
  const [showSaved, setShowSaved] = useState(false);
  const [paymentLink, setPaymentLink] = useState('');
  const [showPaymentInput, setShowPaymentInput] = useState(false);

  const currencySymbol = CURRENCIES.find(c => c.code === invoice.currency)?.symbol || '$';

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: invoice.currency,
    }).format(amount);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: 'details', label: 'Details', icon: FileText },
    { key: 'style', label: 'Style', icon: Palette },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '24px 16px',
          fontFamily: "'Source Sans 3', sans-serif",
          fontFeatureSettings: "'ss01'",
          fontWeight: 300,
          color: 'var(--body)',
        }}
      >
        {/* Action Bar */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* New Button - Ghost */}
            <button
              onClick={newInvoice}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 400,
                fontFamily: "'Source Sans 3', sans-serif",
                fontFeatureSettings: "'ss01'",
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--heading)',
                cursor: 'pointer',
                transition: 'background 0.15s, border-color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-subtle)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-light)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              }}
            >
              + New
            </button>

            {/* Save Button - Primary */}
            <button
              onClick={saveInvoice}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 400,
                fontFamily: "'Source Sans 3', sans-serif",
                fontFeatureSettings: "'ss01'",
                background: '#533afd',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#4434d4';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = '#533afd';
              }}
            >
              <Save style={{ width: '16px', height: '16px' }} />
              Save
            </button>

            {/* Saved Button - Ghost */}
            {savedInvoices.length > 0 && (
              <button
                onClick={() => setShowSaved(!showSaved)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: 400,
                  fontFamily: "'Source Sans 3', sans-serif",
                  fontFeatureSettings: "'ss01'",
                  background: 'transparent',
                  border: '1px solid #b9b9f9',
                  color: '#533afd',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(83,58,253,0.05)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                <Search style={{ width: '16px', height: '16px' }} />
                Saved ({savedInvoices.length})
              </button>
            )}
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 20px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 400,
              fontFamily: "'Source Sans 3', sans-serif",
              fontFeatureSettings: "'ss01'",
              background: '#15be53',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.15s, box-shadow 0.15s',
              boxShadow: '0 2px 4px rgba(50,50,93,0.15), 0 1px 1.5px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#12a848';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 6px rgba(50,50,93,0.25), 0 1px 3px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#15be53';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 2px 4px rgba(50,50,93,0.15), 0 1px 1.5px rgba(0,0,0,0.08)';
            }}
          >
            <Download style={{ width: '16px', height: '16px' }} />
            Download PDF
          </button>
        </div>

        {/* Saved Invoices Panel */}
        {showSaved && (
          <div className="no-print" style={{ marginBottom: '24px' }}>
            <SavedInvoices
              invoices={savedInvoices}
              onLoad={loadInvoice}
              onDelete={deleteInvoice}
              onClose={() => setShowSaved(false)}
            />
          </div>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: '24px',
          }}
          className="lg-grid-5cols"
        >
          {/* Left: Editor Panel */}
          <div className="no-print">
            {/* Tab Bar */}
            <div
              style={{
                display: 'flex',
                gap: '4px',
                padding: '4px',
                borderRadius: '6px',
                marginBottom: '24px',
                background: 'var(--bg-dark)',
              }}
            >
              {tabs.map(tab => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 400,
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontFeatureSettings: "'ss01'",
                      background: isActive ? 'var(--card)' : 'transparent',
                      color: isActive ? 'var(--heading)' : 'var(--body)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background 0.15s, box-shadow 0.15s',
                      boxShadow: isActive
                        ? '0 1px 3px rgba(50,50,93,0.15), 0 1px 1px rgba(0,0,0,0.08)'
                        : 'none',
                    }}
                  >
                    <tab.icon style={{ width: '16px', height: '16px' }} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeTab === 'details' && (
                <>
                  {/* Invoice Meta */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Invoice Details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={labelStyles}>Invoice #</label>
                        <input
                          type="text"
                          value={invoice.invoiceNumber}
                          onChange={e => updateField('invoiceNumber', e.target.value)}
                          style={inputStyles}
                          onFocus={e => {
                            e.target.style.borderColor = '#533afd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyles}>Currency</label>
                        <select
                          value={invoice.currency}
                          onChange={e => updateField('currency', e.target.value)}
                          style={inputStyles}
                          onFocus={e => {
                            e.target.style.borderColor = '#533afd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          {CURRENCIES.map(c => (
                            <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyles}>Date</label>
                        <input
                          type="date"
                          value={invoice.date}
                          onChange={e => updateField('date', e.target.value)}
                          style={inputStyles}
                          onFocus={e => {
                            e.target.style.borderColor = '#533afd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyles}>Due Date</label>
                        <input
                          type="date"
                          value={invoice.dueDate}
                          onChange={e => updateField('dueDate', e.target.value)}
                          style={inputStyles}
                          onFocus={e => {
                            e.target.style.borderColor = '#533afd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* From */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>From</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Your name or company"
                        value={invoice.senderName}
                        onChange={e => updateField('senderName', e.target.value)}
                        style={inputStyles}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <input
                        type="email"
                        placeholder="email@company.com"
                        value={invoice.senderEmail}
                        onChange={e => updateField('senderEmail', e.target.value)}
                        style={inputStyles}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <textarea
                        placeholder="Address"
                        value={invoice.senderAddress}
                        onChange={e => updateField('senderAddress', e.target.value)}
                        rows={2}
                        style={{
                          ...inputStyles,
                          resize: 'none',
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={invoice.senderPhone}
                        onChange={e => updateField('senderPhone', e.target.value)}
                        style={inputStyles}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Bill To */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Bill To</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Client name or company"
                        value={invoice.clientName}
                        onChange={e => updateField('clientName', e.target.value)}
                        style={inputStyles}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <input
                        type="email"
                        placeholder="client@company.com"
                        value={invoice.clientEmail}
                        onChange={e => updateField('clientEmail', e.target.value)}
                        style={inputStyles}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <textarea
                        placeholder="Address"
                        value={invoice.clientAddress}
                        onChange={e => updateField('clientAddress', e.target.value)}
                        rows={2}
                        style={{
                          ...inputStyles,
                          resize: 'none',
                        }}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>

                  {/* Line Items */}
                  <div style={cardStyles}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ ...sectionHeaderStyles, margin: 0 }}>Line Items</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {invoice.items.map((item, idx) => (
                        <div
                          key={item.id}
                          style={{
                            padding: '12px',
                            borderRadius: '6px',
                            background: 'var(--bg-dark)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                            <span
                              style={{
                                fontSize: '12px',
                                fontWeight: 500,
                                color: 'var(--body)',
                                marginTop: '10px',
                                width: '24px',
                                fontFamily: "'Source Code Pro', monospace",
                                fontFeatureSettings: "'tnum'",
                              }}
                            >
                              {idx + 1}.
                            </span>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <input
                                type="text"
                                placeholder="Description"
                                value={item.description}
                                onChange={e => updateItem(item.id, 'description', e.target.value)}
                                style={{
                                  ...inputStyles,
                                  padding: '6px 12px',
                                }}
                                onFocus={e => {
                                  e.target.style.borderColor = '#533afd';
                                  e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                                }}
                                onBlur={e => {
                                  e.target.style.borderColor = 'var(--border)';
                                  e.target.style.boxShadow = 'none';
                                }}
                              />
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                <div>
                                  <label style={{ ...labelStyles, marginBottom: '2px' }}>Quantity</label>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    value={item.quantity}
                                    onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                    style={{
                                      ...inputStyles,
                                      padding: '6px 12px',
                                      fontFamily: "'Source Code Pro', monospace",
                                      fontFeatureSettings: "'tnum'",
                                    }}
                                    onFocus={e => {
                                      e.target.style.borderColor = '#533afd';
                                      e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                                    }}
                                    onBlur={e => {
                                      e.target.style.borderColor = 'var(--border)';
                                      e.target.style.boxShadow = 'none';
                                    }}
                                  />
                                </div>
                                <div>
                                  <label style={{ ...labelStyles, marginBottom: '2px' }}>Rate ({currencySymbol})</label>
                                  <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.rate}
                                    onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                    style={{
                                      ...inputStyles,
                                      padding: '6px 12px',
                                      fontFamily: "'Source Code Pro', monospace",
                                      fontFeatureSettings: "'tnum'",
                                    }}
                                    onFocus={e => {
                                      e.target.style.borderColor = '#533afd';
                                      e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                                    }}
                                    onBlur={e => {
                                      e.target.style.borderColor = 'var(--border)';
                                      e.target.style.boxShadow = 'none';
                                    }}
                                  />
                                </div>
                              </div>
                              <div
                                style={{
                                  textAlign: 'right',
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  color: 'var(--heading)',
                                  fontFamily: "'Source Code Pro', monospace",
                                  fontFeatureSettings: "'tnum'",
                                }}
                              >
                                {formatMoney(item.quantity * item.rate)}
                              </div>
                            </div>
                            {invoice.items.length > 1 && (
                              <button
                                onClick={() => removeItem(item.id)}
                                style={{
                                  padding: '6px',
                                  borderRadius: '6px',
                                  border: 'none',
                                  background: 'transparent',
                                  color: '#dc2626',
                                  cursor: 'pointer',
                                  marginTop: '2px',
                                  transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => {
                                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.08)';
                                }}
                                onMouseLeave={e => {
                                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                }}
                              >
                                <Trash2 style={{ width: '16px', height: '16px' }} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={addItem}
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        padding: '10px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 400,
                        fontFamily: "'Source Sans 3', sans-serif",
                        fontFeatureSettings: "'ss01'",
                        border: '1px dashed var(--border)',
                        background: 'transparent',
                        color: 'var(--body)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background 0.15s, border-color 0.15s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'var(--primary-subtle)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary-light)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                      }}
                    >
                      <Plus style={{ width: '16px', height: '16px' }} />
                      Add Item
                    </button>
                  </div>

                  {/* Notes */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Notes</h3>
                    <textarea
                      value={invoice.notes}
                      onChange={e => updateField('notes', e.target.value)}
                      rows={3}
                      placeholder="Payment terms, thank you message..."
                      style={{
                        ...inputStyles,
                        resize: 'none',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#533afd';
                        e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'var(--border)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </>
              )}

              {activeTab === 'style' && (
                <>
                  {/* Template Selection */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Template</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      {(['modern', 'classic', 'minimal', 'bold'] as const).map(tpl => {
                        const isActive = invoice.template === tpl;
                        return (
                          <button
                            key={tpl}
                            onClick={() => updateField('template', tpl)}
                            style={{
                              padding: '12px',
                              borderRadius: '6px',
                              fontSize: '14px',
                              fontWeight: 500,
                              fontFamily: "'Source Sans 3', sans-serif",
                              fontFeatureSettings: "'ss01'",
                              textTransform: 'capitalize',
                              border: isActive ? `2px solid ${invoice.accentColor}` : '2px solid var(--border)',
                              background: isActive ? 'var(--primary-subtle)' : 'var(--bg-dark)',
                              color: isActive ? 'var(--heading)' : 'var(--body)',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                            }}
                          >
                            {tpl}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Accent Color</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {TEMPLATE_COLORS.map(color => {
                        const isActive = invoice.accentColor === color;
                        return (
                          <button
                            key={color}
                            onClick={() => updateField('accentColor', color)}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '6px',
                              background: color,
                              border: isActive ? '3px solid var(--heading)' : '3px solid transparent',
                              cursor: 'pointer',
                              transition: 'transform 0.15s, border-color 0.15s',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Logo</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {invoice.logoUrl && (
                        <img
                          src={invoice.logoUrl}
                          alt="Logo"
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'contain',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            padding: '4px',
                          }}
                        />
                      )}
                      <div>
                        <label
                          style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: 400,
                            fontFamily: "'Source Sans 3', sans-serif",
                            fontFeatureSettings: "'ss01'",
                            border: '1px solid var(--border)',
                            background: 'transparent',
                            color: 'var(--heading)',
                            cursor: 'pointer',
                            transition: 'background 0.15s',
                          }}
                        >
                          Upload Logo
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                  updateField('logoUrl', ev.target?.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                        {invoice.logoUrl && (
                          <button
                            onClick={() => updateField('logoUrl', '')}
                            style={{
                              marginLeft: '8px',
                              fontSize: '14px',
                              color: '#dc2626',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              textDecoration: 'underline',
                              fontFamily: "'Source Sans 3', sans-serif",
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  {/* Tax & Discount */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Tax & Discount</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <label style={labelStyles}>Tax Rate (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={invoice.taxRate}
                          onChange={e => updateField('taxRate', parseFloat(e.target.value) || 0)}
                          style={{
                            ...inputStyles,
                            fontFamily: "'Source Code Pro', monospace",
                            fontFeatureSettings: "'tnum'",
                          }}
                          onFocus={e => {
                            e.target.style.borderColor = '#533afd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <label style={labelStyles}>Discount (%)</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={invoice.discountRate}
                          onChange={e => updateField('discountRate', parseFloat(e.target.value) || 0)}
                          style={{
                            ...inputStyles,
                            fontFamily: "'Source Code Pro', monospace",
                            fontFeatureSettings: "'tnum'",
                          }}
                          onFocus={e => {
                            e.target.style.borderColor = '#533afd';
                            e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                          }}
                          onBlur={e => {
                            e.target.style.borderColor = 'var(--border)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Link */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Payment Link (Pro)</h3>
                    <p style={{ fontSize: '13px', color: 'var(--body)', marginBottom: '12px', marginTop: 0 }}>
                      Add a Stripe payment link so clients can pay directly from the invoice.
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="url"
                        placeholder="https://buy.stripe.com/..."
                        value={paymentLink}
                        onChange={e => setPaymentLink(e.target.value)}
                        style={{ ...inputStyles, flex: 1 }}
                        onFocus={e => {
                          e.target.style.borderColor = '#533afd';
                          e.target.style.boxShadow = '0 0 0 3px rgba(83,58,253,0.1)';
                        }}
                        onBlur={e => {
                          e.target.style.borderColor = 'var(--border)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    {paymentLink && (
                      <a
                        href={paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          marginTop: '8px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#533afd',
                          textDecoration: 'none',
                        }}
                      >
                        Pay Now
                      </a>
                    )}
                  </div>

                  {/* Summary */}
                  <div style={cardStyles}>
                    <h3 style={sectionHeaderStyles}>Summary</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--body)' }}>Subtotal</span>
                        <span style={{ fontFamily: "'Source Code Pro', monospace", fontFeatureSettings: "'tnum'", color: 'var(--heading)' }}>
                          {formatMoney(subtotal)}
                        </span>
                      </div>
                      {invoice.taxRate > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--body)' }}>Tax ({invoice.taxRate}%)</span>
                          <span style={{ fontFamily: "'Source Code Pro', monospace", fontFeatureSettings: "'tnum'", color: 'var(--heading)' }}>
                            {formatMoney(tax)}
                          </span>
                        </div>
                      )}
                      {invoice.discountRate > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: 'var(--body)' }}>Discount ({invoice.discountRate}%)</span>
                          <span style={{ fontFamily: "'Source Code Pro', monospace", fontFeatureSettings: "'tnum'", color: 'var(--heading)' }}>
                            -{formatMoney(discount)}
                          </span>
                        </div>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          paddingTop: '8px',
                          borderTop: '1px solid var(--border)',
                          fontSize: '18px',
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ color: 'var(--heading)' }}>Total</span>
                        <span
                          style={{
                            fontFamily: "'Source Code Pro', monospace",
                            fontFeatureSettings: "'tnum'",
                            color: '#533afd',
                            fontWeight: 600,
                          }}
                        >
                          {formatMoney(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right: Preview */}
          <div>
            <div className="sticky-top-20" style={{ position: 'sticky', top: '80px' }}>
              <div
                className="no-print"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--body)',
                  marginBottom: '12px',
                }}
              >
                Preview
              </div>
              <InvoicePreview
                invoice={invoice}
                subtotal={subtotal}
                tax={tax}
                discount={discount}
                total={total}
                paymentLink={paymentLink}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive grid override via media query */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .lg-grid-5cols {
            grid-template-columns: 1fr !important;
          }
          @media (min-width: 1024px) {
            .lg-grid-5cols {
              grid-template-columns: 2fr 3fr !important;
            }
          }
          .sticky-top-20 {
            position: static !important;
          }
          @media (min-width: 1024px) {
            .sticky-top-20 {
              position: sticky !important;
              top: 80px !important;
            }
          }
        `
      }} />
    </>
  );
}
