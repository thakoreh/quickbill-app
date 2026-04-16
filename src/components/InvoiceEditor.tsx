'use client';

import { useState } from 'react';
import { useInvoice } from '@/context/InvoiceContext';
import { CURRENCIES, TEMPLATE_COLORS, InvoiceData } from '@/types/invoice';
import InvoicePreview from './InvoicePreview';
import SavedInvoices from './SavedInvoices';
import { Plus, Trash2, Save, Download, FileText, Palette, Settings, ChevronDown, Search } from 'lucide-react';

type Tab = 'details' | 'style' | 'settings';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6 no-print">
        <div className="flex items-center gap-2">
          <button
            onClick={newInvoice}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
            style={{ borderColor: 'var(--border)' }}
          >
            + New
          </button>
          <button
            onClick={saveInvoice}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          {savedInvoices.length > 0 && (
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <Search className="w-4 h-4" />
              Saved ({savedInvoices.length})
            </button>
          )}
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Saved Invoices Panel */}
      {showSaved && (
        <div className="mb-6 no-print">
          <SavedInvoices
            invoices={savedInvoices}
            onLoad={loadInvoice}
            onDelete={deleteInvoice}
            onClose={() => setShowSaved(false)}
          />
        </div>
      )}

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Editor Panel */}
        <div className="lg:col-span-2 no-print">
          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: 'var(--muted)' }}>
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.key ? 'var(--card)' : 'transparent',
                  boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeTab === 'details' && (
              <>
                {/* Invoice Meta */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Invoice Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--muted-foreground)' }}>Invoice #</label>
                      <input
                        type="text"
                        value={invoice.invoiceNumber}
                        onChange={e => updateField('invoiceNumber', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm border"
                        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--muted-foreground)' }}>Currency</label>
                      <select
                        value={invoice.currency}
                        onChange={e => updateField('currency', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm border"
                        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                      >
                        {CURRENCIES.map(c => (
                          <option key={c.code} value={c.code}>{c.symbol} {c.code}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--muted-foreground)' }}>Date</label>
                      <input
                        type="date"
                        value={invoice.date}
                        onChange={e => updateField('date', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm border"
                        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--muted-foreground)' }}>Due Date</label>
                      <input
                        type="date"
                        value={invoice.dueDate}
                        onChange={e => updateField('dueDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg text-sm border"
                        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* From */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>From</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your name or company"
                      value={invoice.senderName}
                      onChange={e => updateField('senderName', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                    <input
                      type="email"
                      placeholder="email@company.com"
                      value={invoice.senderEmail}
                      onChange={e => updateField('senderEmail', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                    <textarea
                      placeholder="Address"
                      value={invoice.senderAddress}
                      onChange={e => updateField('senderAddress', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg text-sm border resize-none"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={invoice.senderPhone}
                      onChange={e => updateField('senderPhone', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>

                {/* Bill To */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Bill To</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Client name or company"
                      value={invoice.clientName}
                      onChange={e => updateField('clientName', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                    <input
                      type="email"
                      placeholder="client@company.com"
                      value={invoice.clientEmail}
                      onChange={e => updateField('clientEmail', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm border"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                    <textarea
                      placeholder="Address"
                      value={invoice.clientAddress}
                      onChange={e => updateField('clientAddress', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg text-sm border resize-none"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                  </div>
                </div>

                {/* Line Items */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>Line Items</h3>
                  </div>
                  <div className="space-y-3">
                    {invoice.items.map((item, idx) => (
                      <div key={item.id} className="p-3 rounded-lg" style={{ background: 'var(--muted)' }}>
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium mt-2.5 w-6" style={{ color: 'var(--muted-foreground)' }}>{idx + 1}.</span>
                          <div className="flex-1 space-y-2">
                            <input
                              type="text"
                              placeholder="Description"
                              value={item.description}
                              onChange={e => updateItem(item.id, 'description', e.target.value)}
                              className="w-full px-3 py-1.5 rounded-lg text-sm border"
                              style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-xs mb-0.5 block" style={{ color: 'var(--muted-foreground)' }}>Quantity</label>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.5"
                                  value={item.quantity}
                                  onChange={e => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                  className="w-full px-3 py-1.5 rounded-lg text-sm border"
                                  style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                                />
                              </div>
                              <div>
                                <label className="text-xs mb-0.5 block" style={{ color: 'var(--muted-foreground)' }}>Rate ({currencySymbol})</label>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={item.rate}
                                  onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)}
                                  className="w-full px-3 py-1.5 rounded-lg text-sm border"
                                  style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                                />
                              </div>
                            </div>
                            <div className="text-right text-sm font-medium">
                              {formatMoney(item.quantity * item.rate)}
                            </div>
                          </div>
                          {invoice.items.length > 1 && (
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-100 dark:hover:bg-red-900/20"
                              style={{ color: '#dc2626' }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={addItem}
                    className="w-full mt-3 py-2 rounded-lg text-sm font-medium border border-dashed transition-colors flex items-center justify-center gap-1.5"
                    style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                {/* Notes */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Notes</h3>
                  <textarea
                    value={invoice.notes}
                    onChange={e => updateField('notes', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg text-sm border resize-none"
                    style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    placeholder="Payment terms, thank you message..."
                  />
                </div>
              </>
            )}

            {activeTab === 'style' && (
              <>
                {/* Template Selection */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Template</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(['modern', 'classic', 'minimal', 'bold'] as const).map(tpl => (
                      <button
                        key={tpl}
                        onClick={() => updateField('template', tpl)}
                        className="p-3 rounded-lg border-2 transition-all text-sm font-medium capitalize"
                        style={{
                          borderColor: invoice.template === tpl ? invoice.accentColor : 'var(--border)',
                          background: invoice.template === tpl ? 'var(--accent)' : 'var(--muted)',
                        }}
                      >
                        {tpl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Color */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Accent Color</h3>
                  <div className="flex gap-2 flex-wrap">
                    {TEMPLATE_COLORS.map(color => (
                      <button
                        key={color}
                        onClick={() => updateField('accentColor', color)}
                        className="w-10 h-10 rounded-xl border-2 transition-all hover:scale-110"
                        style={{
                          background: color,
                          borderColor: invoice.accentColor === color ? 'var(--foreground)' : 'transparent',
                          borderWidth: '3px',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Logo Upload */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Logo</h3>
                  <div className="flex items-center gap-3">
                    {invoice.logoUrl && (
                      <img src={invoice.logoUrl} alt="Logo" className="w-16 h-16 object-contain rounded-lg border p-1" style={{ borderColor: 'var(--border)' }} />
                    )}
                    <div>
                      <label className="px-4 py-2 rounded-lg text-sm font-medium border cursor-pointer transition-colors inline-block"
                        style={{ borderColor: 'var(--border)' }}>
                        Upload Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
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
                          className="ml-2 text-sm text-red-500 hover:underline"
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
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Tax & Discount</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--muted-foreground)' }}>Tax Rate (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={invoice.taxRate}
                        onChange={e => updateField('taxRate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg text-sm border"
                        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--muted-foreground)' }}>Discount (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        value={invoice.discountRate}
                        onChange={e => updateField('discountRate', parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-lg text-sm border"
                        style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Link */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Payment Link (Pro)</h3>
                  <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>
                    Add a Stripe payment link so clients can pay directly from the invoice.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://buy.stripe.com/..."
                      value={paymentLink}
                      onChange={e => setPaymentLink(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg text-sm border"
                      style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
                    />
                  </div>
                  {paymentLink && (
                    <a href={paymentLink} target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium"
                      style={{ color: 'var(--primary)' }}>
                      Pay Now
                    </a>
                  )}
                </div>

                {/* Summary */}
                <div className="p-5 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--muted-foreground)' }}>Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--muted-foreground)' }}>Subtotal</span>
                      <span>{formatMoney(subtotal)}</span>
                    </div>
                    {invoice.taxRate > 0 && (
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--muted-foreground)' }}>Tax ({invoice.taxRate}%)</span>
                        <span>{formatMoney(tax)}</span>
                      </div>
                    )}
                    {invoice.discountRate > 0 && (
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--muted-foreground)' }}>Discount ({invoice.discountRate}%)</span>
                        <span>-{formatMoney(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 text-lg font-bold border-t" style={{ borderColor: 'var(--border)' }}>
                      <span>Total</span>
                      <span className="gradient-text">{formatMoney(total)}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-3">
          <div className="sticky top-20">
            <div className="text-sm font-medium mb-3 no-print" style={{ color: 'var(--muted-foreground)' }}>Preview</div>
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
  );
}
