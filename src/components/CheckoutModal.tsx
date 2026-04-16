'use client';

import { useState } from 'react';
import { X, CreditCard, Shield, Check } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would redirect to Stripe Checkout
    // For now, collect the email and show confirmation
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl p-8 animate-slide-up"
        style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg" style={{ color: 'var(--muted-foreground)' }}>
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                <CreditCard className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold">Upgrade to Pro</h2>
              <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                Unlock all templates, custom branding, and more
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {['All 4 premium templates', 'Custom brand colors & logo', 'Payment link integration', 'Remove QuickBill branding', 'Priority support'].map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  {f}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl mb-6" style={{ background: 'var(--muted)' }}>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Pro Plan</span>
                <div className="text-right">
                  <span className="text-2xl font-bold">$9</span>
                  <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>/month</span>
                </div>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>or $69/year (save 36%)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border text-sm"
                style={{ background: 'var(--muted)', borderColor: 'var(--border)' }}
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Continue to Checkout
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
              <Shield className="w-3.5 h-3.5" />
              Secure payment via Stripe. Cancel anytime.
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">You are on the waitlist!</h3>
            <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
              We will send your Pro activation link to <strong>{email}</strong> when we launch.
            </p>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              In the meantime, enjoy the free plan with unlimited invoices!
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 rounded-xl text-sm font-medium border"
              style={{ borderColor: 'var(--border)' }}
            >
              Start Creating Invoices
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
