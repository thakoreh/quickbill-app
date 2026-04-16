'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { InvoiceData, createEmptyInvoice, calculateSubtotal, calculateTax, calculateDiscount, calculateTotal } from '@/types/invoice';

interface InvoiceContextType {
  invoice: InvoiceData;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceData>>;
  updateField: (field: keyof InvoiceData, value: any) => void;
  updateItem: (id: string, field: string, value: any) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  savedInvoices: InvoiceData[];
  saveInvoice: () => void;
  loadInvoice: (id: string) => void;
  deleteInvoice: (id: string) => void;
  newInvoice: () => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

const STORAGE_KEY = 'quickbill_invoices';

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoice, setInvoice] = useState<InvoiceData>(createEmptyInvoice);
  const [savedInvoices, setSavedInvoices] = useState<InvoiceData[]>([]);

  // Load saved invoices on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedInvoices(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const subtotal = calculateSubtotal(invoice.items);
  const tax = calculateTax(subtotal, invoice.taxRate);
  const discount = calculateDiscount(subtotal, invoice.discountRate);
  const total = subtotal + tax - discount;

  const updateField = useCallback((field: keyof InvoiceData, value: any) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  }, []);

  const updateItem = useCallback((id: string, field: string, value: any) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  }, []);

  const addItem = useCallback(() => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }],
    }));
  }, []);

  const removeItem = useCallback((id: string) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  }, []);

  const saveInvoice = useCallback(() => {
    setSavedInvoices(prev => {
      const existing = prev.findIndex(i => i.id === invoice.id);
      let updated;
      if (existing >= 0) {
        updated = [...prev];
        updated[existing] = { ...invoice };
      } else {
        updated = [...prev, { ...invoice }];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, [invoice]);

  const loadInvoice = useCallback((id: string) => {
    const found = savedInvoices.find(i => i.id === id);
    if (found) setInvoice({ ...found });
  }, [savedInvoices]);

  const deleteInvoice = useCallback((id: string) => {
    setSavedInvoices(prev => {
      const updated = prev.filter(i => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const newInvoice = useCallback(() => {
    setInvoice(createEmptyInvoice());
  }, []);

  return (
    <InvoiceContext.Provider value={{
      invoice, setInvoice, updateField, updateItem, addItem, removeItem,
      subtotal, tax, discount, total,
      savedInvoices, saveInvoice, loadInvoice, deleteInvoice, newInvoice,
    }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoice() {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error('useInvoice must be used within InvoiceProvider');
  return context;
}
