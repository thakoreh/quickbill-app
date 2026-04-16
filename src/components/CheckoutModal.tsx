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

  const fontFamily = {
    fontFamily: '"Source Sans 3", "Source Sans Pro", system-ui, sans-serif',
    fontFeatureSettings: '"ss01"',
  };

  return (
    <>
      <style>{`
        .stripe-modal-overlay { animation: fadeOverlayIn 150ms ease-out; }
        .stripe-modal-card  { animation: fadeCardIn 200ms ease-out; }
        @keyframes fadeOverlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeCardIn    { from { opacity: 0; transform: translateY(8px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .stripe-btn-primary:hover { background-color: #4434d4 !important; }
        .stripe-btn-primary:focus-visible { outline: 2px solid #533afd; outline-offset: 2px; }
        .stripe-input:focus { outline: none; border-color: #533afd !important; box-shadow: 0 0 0 3px rgba(83,58,253,0.15); }
        .stripe-close-btn:hover { background: var(--muted); }
      `}</style>
      <div
        className="stripe-modal-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ ...fontFamily }}
        onClick={onClose}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        />

        {/* Modal card */}
        <div
          className="stripe-modal-card relative w-full"
          style={{
            ...fontFamily,
            maxWidth: '440px',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            padding: '36px',
            boxShadow: 'rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="stripe-close-btn absolute flex items-center justify-center"
            style={{
              top: '16px',
              right: '16px',
              padding: '4px',
              borderRadius: '4px',
              color: 'var(--muted-foreground)',
              cursor: 'pointer',
              border: 'none',
              background: 'transparent',
            }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div
                  className="mx-auto flex items-center justify-center text-white"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    background: 'var(--primary)',
                    marginBottom: '16px',
                  }}
                >
                  <CreditCard className="w-6 h-6" />
                </div>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: 300,
                    color: 'var(--heading)',
                    letterSpacing: '-0.26px',
                    lineHeight: 1.3,
                    margin: 0,
                  }}
                >
                  Upgrade to Pro
                </h2>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'var(--body)',
                    marginTop: '4px',
                    lineHeight: 1.5,
                  }}
                >
                  Unlock all templates, custom branding, and more
                </p>
              </div>

              {/* Feature list */}
              <div style={{ marginBottom: '20px' }}>
                {['All 4 premium templates', 'Custom brand colors & logo', 'Payment link integration', 'Remove QuickBill branding', 'Priority support'].map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                    style={{ gap: '8px', padding: '4px 0', fontSize: '14px', fontWeight: 300, color: 'var(--body)' }}
                  >
                    <Check
                      className="flex-shrink-0"
                      style={{ width: '16px', height: '16px', color: 'var(--success, #15be53)' }}
                    />
                    {f}
                  </div>
                ))}
              </div>

              {/* Price box */}
              <div
                style={{
                  borderRadius: '6px',
                  background: 'var(--bg-dark)',
                  padding: '16px',
                  marginBottom: '20px',
                }}
              >
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--heading)' }}>
                    Pro Plan
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '24px', fontWeight: 300, color: 'var(--heading)', letterSpacing: '-0.26px' }}>
                      $9
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 300, color: 'var(--body)' }}>/month</span>
                  </div>
                </div>
                <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--body)', marginTop: '4px', marginBottom: 0 }}>
                  or $69/year (save 36%)
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="stripe-input"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: 'var(--heading)',
                    background: 'var(--card)',
                    outline: 'none',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                    boxSizing: 'border-box',
                  }}
                />
                <button
                  type="submit"
                  className="stripe-btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#533afd',
                    color: '#ffffff',
                    fontSize: '14px',
                    fontWeight: 400,
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                >
                  Continue to Checkout
                </button>
              </form>

              {/* Trust line */}
              <div
                className="flex items-center justify-center"
                style={{
                  marginTop: '16px',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 300,
                  color: 'var(--body)',
                }}
              >
                <Shield style={{ width: '14px', height: '14px', flexShrink: 0 }} />
                Secure payment via Stripe. Cancel anytime.
              </div>
            </>
          ) : (
            /* Waitlist confirmation state */
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <div
                className="mx-auto flex items-center justify-center"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: 'var(--primary)',
                  marginBottom: '16px',
                }}
              >
                <Check className="w-6 h-6 text-white" />
              </div>
              <h3
                style={{
                  fontSize: '24px',
                  fontWeight: 300,
                  color: 'var(--heading)',
                  letterSpacing: '-0.26px',
                  margin: '0 0 8px',
                }}
              >
                You are on the waitlist!
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'var(--body)',
                  marginTop: 0,
                  marginBottom: '24px',
                  lineHeight: 1.5,
                }}
              >
                We will send your Pro activation link to <strong style={{ fontWeight: 400, color: 'var(--heading)' }}>{email}</strong> when we launch.
              </p>
              <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--body)', marginTop: 0, marginBottom: '24px' }}>
                In the meantime, enjoy the free plan with unlimited invoices!
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: '8px 24px',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--heading)',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background-color 0.15s',
                }}
              >
                Start Creating Invoices
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
