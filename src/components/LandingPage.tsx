'use client';

import { useState } from 'react';
import { FileText, Zap, Palette, Globe, Download, Shield, Check, Star, ArrowRight, CreditCard, ChevronDown } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

interface LandingPageProps {
  onGetStarted: () => void;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`faq-item ${open ? 'open' : ''}`}
      style={{ background: 'var(--card)', border: `1px solid ${open ? 'var(--primary)' : 'var(--border)'}`, borderRadius: '6px', transition: 'border-color 0.2s' }}
      onClick={() => setOpen(!open)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 400, color: 'var(--heading)', fontFeatureSettings: '"ss01"', margin: 0 }}>{q}</h3>
        <ChevronDown className="faq-chevron" style={{ width: 18, height: 18, color: 'var(--body)', flexShrink: 0 }} />
      </div>
      <div className="faq-answer">
        <p style={{ fontSize: '14px', fontWeight: 300, color: 'var(--body)', lineHeight: 1.6, padding: '0 24px 20px', margin: 0 }}>{a}</p>
      </div>
    </div>
  );
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '100px 0 80px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          {/* Badge */}
          <div className="badge-stripe fade-up" style={{ marginBottom: 28 }}>
            <Zap style={{ width: 13, height: 13 }} />
            Free forever for basic use
          </div>

          {/* Headline */}
          <h1 className="heading fade-up fade-up-1"
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              lineHeight: 1.03,
              letterSpacing: '-1.4px',
              marginBottom: 24,
              maxWidth: 700,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            Beautiful invoices,<br />
            <span className="text-gradient">sent in seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="fade-up fade-up-2"
            style={{
              fontSize: 18,
              fontWeight: 300,
              lineHeight: 1.5,
              color: 'var(--body)',
              maxWidth: 520,
              margin: '0 auto 36px',
              fontFeatureSettings: '"ss01"',
            }}>
            Create professional invoices with zero hassle. No signup, no credit card, no catch. Just invoices that get you paid.
          </p>

          {/* CTAs */}
          <div className="fade-up fade-up-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={onGetStarted} className="btn-primary" style={{ padding: '12px 24px' }}>
              Create Your Invoice <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
            <span style={{ fontSize: 13, color: 'var(--body)' }}>No signup required</span>
          </div>

          {/* Invoice Mockup */}
          <div className="fade-up fade-up-4" style={{ marginTop: 64, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="invoice-shadow" style={{ background: 'var(--card)' }}>
              {/* Browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg-dark)' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--body)', background: 'var(--bg)', padding: '3px 12px', borderRadius: 4 }}>
                    quickbill.app
                  </span>
                </div>
              </div>
              {/* Invoice */}
              <div style={{ padding: '32px 40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--heading)', letterSpacing: '-0.5px', fontFeatureSettings: '"ss01"' }}>INVOICE</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--body)', marginTop: 4 }}>#INV-0042</div>
                  </div>
                  <div style={{ width: 40, height: 40, borderRadius: 6, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText style={{ width: 20, height: 20, color: '#fff' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 28, fontSize: 12 }}>
                  <div>
                    <div style={{ fontWeight: 500, color: 'var(--heading)', marginBottom: 4, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>From</div>
                    <div style={{ color: 'var(--body)', lineHeight: 1.6 }}>Acme Corp<br />hello@acme.com</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 500, color: 'var(--heading)', marginBottom: 4, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Bill To</div>
                    <div style={{ color: 'var(--body)', lineHeight: 1.6 }}>BigClient Inc<br />pay@bigclient.com</div>
                  </div>
                </div>
                {/* Table */}
                <div style={{ border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px', gap: 8, padding: '8px 12px', fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--body)', background: 'var(--bg-dark)' }}>
                    <span>Description</span><span style={{ textAlign: 'right' }}>Qty</span><span style={{ textAlign: 'right' }}>Rate</span><span style={{ textAlign: 'right' }}>Amount</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px', gap: 8, padding: '10px 12px', fontSize: 13, borderTop: '1px solid var(--border)', color: 'var(--heading)' }}>
                    <span>Web Design</span><span className="mono" style={{ textAlign: 'right', fontSize: 12 }}>40</span><span className="mono" style={{ textAlign: 'right', fontSize: 12 }}>$125.00</span><span className="mono" style={{ textAlign: 'right', fontSize: 12, fontWeight: 500 }}>$5,000.00</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 80px 80px', gap: 8, padding: '10px 12px', fontSize: 13, borderTop: '1px solid var(--border)', color: 'var(--heading)' }}>
                    <span>Brand Identity</span><span className="mono" style={{ textAlign: 'right', fontSize: 12 }}>1</span><span className="mono" style={{ textAlign: 'right', fontSize: 12 }}>$2,500.00</span><span className="mono" style={{ textAlign: 'right', fontSize: 12, fontWeight: 500 }}>$2,500.00</span>
                  </div>
                </div>
                {/* Total */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                  <div style={{ width: 220 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--body)', padding: '4px 0' }}>
                      <span>Subtotal</span><span className="mono">$7,500.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--body)', padding: '4px 0' }}>
                      <span>Tax (0%)</span><span className="mono">$0.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 400, color: 'var(--heading)', padding: '10px 0 0', borderTop: '1px solid var(--border)', marginTop: 8 }}>
                      <span>Total</span><span className="mono" style={{ color: 'var(--primary)' }}>$7,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section style={{ padding: '48px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[
            { value: '12K+', label: 'Invoices Created' },
            { value: '4,200+', label: 'Happy Users' },
            { value: '$2.8M', label: 'Invoiced' },
            { value: '4.9/5', label: 'User Rating' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="mono" style={{ fontSize: 28, fontWeight: 500, color: 'var(--heading)', fontFeatureSettings: '"tnum"', letterSpacing: '-0.5px' }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: 'var(--body)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="heading" style={{ fontSize: 36, letterSpacing: '-0.64px', marginBottom: 16 }}>
              Everything you need
            </h2>
            <p style={{ fontSize: 17, color: 'var(--body)', fontWeight: 300, maxWidth: 480, margin: '0 auto', lineHeight: 1.5 }}>
              Professional invoicing tools that make you look great and get you paid faster.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: Palette, title: 'Beautiful Templates', desc: '4 professionally designed templates. Choose modern, classic, minimal, or bold. Each customizable with your brand colors.' },
              { icon: Download, title: 'Instant PDF Export', desc: 'Download pixel-perfect PDFs instantly. No watermarks, no formatting issues. Ready to send to clients.' },
              { icon: Globe, title: 'Multi-Currency', desc: 'Support for 10+ currencies. Invoice international clients in their local currency with proper formatting.' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Create an invoice in under 60 seconds. No signup walls, no onboarding flows. Just open and go.' },
              { icon: Shield, title: 'Privacy First', desc: 'Your data stays in your browser. We never store your invoices on our servers. 100% client-side.' },
              { icon: CreditCard, title: 'Payment Links', desc: 'Add Stripe payment links so clients can pay directly from the invoice. Get paid 3x faster.' },
            ].map((feature, i) => (
              <div key={i} className="card">
                <div style={{ width: 36, height: 36, borderRadius: 6, background: 'var(--primary-subtle)', border: '1px solid rgba(83,58,253,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <feature.icon style={{ width: 18, height: 18, color: 'var(--primary)' }} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 400, color: 'var(--heading)', marginBottom: 8, fontFeatureSettings: '"ss01"' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--body)', lineHeight: 1.55, margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-subtle" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="heading" style={{ fontSize: 36, letterSpacing: '-0.64px', marginBottom: 16 }}>
              Loved by freelancers
            </h2>
            <p style={{ fontSize: 17, color: 'var(--body)', fontWeight: 300 }}>
              Join thousands who switched from messy spreadsheets.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { name: 'Sarah Chen', role: 'Freelance Designer', text: 'Finally an invoice tool that makes my invoices look as good as my design work. Clients always compliment them!', initials: 'SC' },
              { name: 'Marcus Johnson', role: 'Web Developer', text: 'I used to spend 20 minutes formatting invoices in Word. Now it takes me 2 minutes. Game changer.', initials: 'MJ' },
              { name: 'Priya Patel', role: 'Marketing Consultant', text: 'The multi-currency support is perfect for my international clients. Clean, professional, and free.', initials: 'PP' },
            ].map((t, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} style={{ width: 14, height: 14, fill: '#facc15', color: '#facc15' }} />
                  ))}
                </div>
                <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--body)', lineHeight: 1.6, marginBottom: 20, margin: '0 0 20px' }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 4, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: '#fff' }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 400, color: 'var(--heading)' }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--body)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="heading" style={{ fontSize: 36, letterSpacing: '-0.64px', marginBottom: 16 }}>
              Simple, honest pricing
            </h2>
            <p style={{ fontSize: 17, color: 'var(--body)', fontWeight: 300 }}>
              Start free. Upgrade when you need more.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {/* Free */}
            <div className="card" style={{ padding: 36, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 17, fontWeight: 400, color: 'var(--heading)', marginBottom: 4, fontFeatureSettings: '"ss01"' }}>Free</h3>
              <p style={{ fontSize: 13, color: 'var(--body)', marginBottom: 20 }}>Everything you need to start invoicing</p>
              <div style={{ marginBottom: 28 }}>
                <span style={{ fontSize: 40, fontWeight: 300, color: 'var(--heading)', fontFeatureSettings: '"tnum"' }}>$0</span>
                <span style={{ fontSize: 15, color: 'var(--body)' }}> /mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, flex: 1 }}>
                {['Unlimited invoices', 'Modern template', 'PDF export', 'Multi-currency support', 'Save invoices locally'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 300, color: 'var(--label)', padding: '6px 0' }}>
                    <Check style={{ width: 16, height: 16, color: 'var(--success)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started Free
              </button>
            </div>

            {/* Pro */}
            <div className="card pricing-featured" style={{ padding: 36, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', padding: '3px 12px', borderRadius: 4, fontSize: 11, fontWeight: 400, color: '#fff', background: 'var(--primary)' }}>
                Most Popular
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 400, color: 'var(--heading)', marginBottom: 4, fontFeatureSettings: '"ss01"' }}>Pro</h3>
              <p style={{ fontSize: 13, color: 'var(--body)', marginBottom: 20 }}>For serious freelancers and small businesses</p>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 300, color: 'var(--heading)', fontFeatureSettings: '"tnum"' }}>$9</span>
                <span style={{ fontSize: 15, color: 'var(--body)' }}> /mo</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--body)', marginBottom: 28 }}>or $69/year (save 36%)</p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32, flex: 1 }}>
                {['Everything in Free', 'All 4 premium templates', 'Custom brand colors & logo', 'Payment link integration', 'Invoice history & search', 'Priority support', 'Remove QuickBill branding'].map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 300, color: 'var(--label)', padding: '6px 0' }}>
                    <Check style={{ width: 16, height: 16, color: 'var(--primary)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowCheckout(true)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-subtle" style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="heading" style={{ fontSize: 36, letterSpacing: '-0.64px', marginBottom: 16 }}>
              Questions? Answered.
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { q: 'Is QuickBill really free?', a: 'Yes! The free plan gives you unlimited invoices with our modern template, PDF export, and multi-currency support. No credit card needed, no time limits.' },
              { q: 'Do I need to create an account?', a: 'No signup required for the free tier. Your invoices are saved in your browser. Pro users can access their invoices from any device.' },
              { q: 'Are my invoices stored on your servers?', a: 'No. Free tier invoices are stored locally in your browser. Your financial data never leaves your device.' },
              { q: 'Can I customize the invoice design?', a: 'Pro users get access to 4 premium templates and can customize colors, add logos, and remove QuickBill branding.' },
              { q: 'How does payment link integration work?', a: 'Add your Stripe payment link to invoices. Clients click and pay instantly. Funds go directly to your Stripe account.' },
            ].map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding: '80px 0' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 className="heading" style={{ fontSize: 36, letterSpacing: '-0.64px', marginBottom: 16 }}>
            Ready to create your first invoice?
          </h2>
          <p style={{ fontSize: 17, color: 'var(--body)', fontWeight: 300, marginBottom: 32 }}>
            It takes less than 60 seconds. No signup required.
          </p>
          <button onClick={onGetStarted} className="btn-primary" style={{ padding: '12px 28px' }}>
            Create Invoice Now <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: '40px 0', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 4, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText style={{ width: 14, height: 14, color: '#fff' }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--heading)', fontFeatureSettings: '"ss01"' }}>QuickBill</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--body)' }}>
            &copy; {new Date().getFullYear()} QuickBill. Free invoice generator for freelancers.
          </div>
        </div>
      </footer>

      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  );
}
