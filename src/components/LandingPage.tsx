'use client';

import { useState } from 'react';
import { FileText, Zap, Palette, Globe, Download, Shield, Check, Star, ArrowRight, Users, Clock, CreditCard } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at top, rgba(37, 99, 235, 0.08), transparent 70%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in"
              style={{ background: 'var(--accent)', color: 'var(--primary)' }}>
              <Zap className="w-4 h-4" />
              Free forever for basic use
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-slide-up">
              Beautiful invoices
              <br />
              <span className="gradient-text">in seconds</span>
            </h1>
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto mb-10 animate-slide-up" style={{ color: 'var(--muted-foreground)' }}>
              Create stunning, professional invoices with zero hassle. No signup, no credit card, no catch. Just beautiful invoices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Create Your Invoice
                <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                No signup required
              </span>
            </div>
          </div>

          {/* Preview mockup */}
          <div className="mt-20 max-w-4xl mx-auto animate-slide-up">
            <div className="rounded-2xl overflow-hidden shadow-2xl border" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md text-xs" style={{ background: 'var(--background)', color: 'var(--muted-foreground)' }}>
                    quickbill.app
                  </div>
                </div>
              </div>
              {/* Invoice mockup */}
              <div className="p-8 sm:p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-2xl font-bold gradient-text">INVOICE</div>
                    <div className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>#INV-0042</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }} />
                </div>
                <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                  <div>
                    <div className="font-semibold mb-1">From</div>
                    <div style={{ color: 'var(--muted-foreground)' }}>Acme Corp<br />hello@acme.com</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold mb-1">Bill To</div>
                    <div style={{ color: 'var(--muted-foreground)' }}>BigClient Inc<br />pay@bigclient.com</div>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                  <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs font-semibold uppercase tracking-wider" style={{ background: 'var(--muted)' }}>
                    <div>Description</div><div className="text-right">Qty</div><div className="text-right">Rate</div><div className="text-right">Amount</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 px-4 py-3 text-sm border-t" style={{ borderColor: 'var(--border)' }}>
                    <div>Web Design</div><div className="text-right">40</div><div className="text-right">$125.00</div><div className="text-right font-medium">$5,000.00</div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 px-4 py-3 text-sm border-t" style={{ borderColor: 'var(--border)' }}>
                    <div>Brand Identity</div><div className="text-right">1</div><div className="text-right">$2,500.00</div><div className="text-right font-medium">$2,500.00</div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <div className="w-64 text-sm">
                    <div className="flex justify-between py-1"><span style={{ color: 'var(--muted-foreground)' }}>Subtotal</span><span>$7,500.00</span></div>
                    <div className="flex justify-between py-1"><span style={{ color: 'var(--muted-foreground)' }}>Tax (0%)</span><span>$0.00</span></div>
                    <div className="flex justify-between py-2 text-lg font-bold border-t" style={{ borderColor: 'var(--border)' }}>
                      <span>Total</span><span className="gradient-text">$7,500.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-12 border-y" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text">12K+</div>
              <div className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Invoices Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">4,200+</div>
              <div className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">$2.8M</div>
              <div className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>Invoiced</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">4.9/5</div>
              <div className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              Professional invoicing tools that make you look great and get you paid faster.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Palette, title: 'Beautiful Templates', desc: '4 professionally designed templates. Choose modern, classic, minimal, or bold. Each customizable with your brand colors.' },
              { icon: Download, title: 'Instant PDF Export', desc: 'Download pixel-perfect PDFs instantly. No watermarks, no formatting issues. Ready to send to clients.' },
              { icon: Globe, title: 'Multi-Currency', desc: 'Support for 10+ currencies. Invoice international clients in their local currency with proper formatting.' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Create an invoice in under 60 seconds. No signup walls, no onboarding flows. Just open and go.' },
              { icon: Shield, title: 'Privacy First', desc: 'Your data stays in your browser. We never store your invoices on our servers. 100% client-side.' },
              { icon: CreditCard, title: 'Payment Links', desc: 'Add Stripe payment links so clients can pay directly from the invoice. Get paid 3x faster.' },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border transition-all hover:shadow-lg"
                style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ background: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by freelancers</h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Join thousands of freelancers and small businesses who trust QuickBill.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'Freelance Designer', text: 'Finally an invoice tool that makes my invoices look as good as my design work. Clients always compliment them!', avatar: 'SC' },
              { name: 'Marcus Johnson', role: 'Web Developer', text: 'I used to spend 20 minutes formatting invoices in Word. Now it takes me 2 minutes with QuickBill. Game changer.', avatar: 'MJ' },
              { name: 'Priya Patel', role: 'Marketing Consultant', text: 'The multi-currency support is perfect for my international clients. Clean, professional, and free. What more could I want?', avatar: 'PP' },
            ].map((testimonial, i) => (
              <div key={i} className="p-8 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6" style={{ color: 'var(--muted-foreground)' }}>&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, honest pricing</h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Start free. Upgrade when you need more.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="p-8 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-4xl font-extrabold mb-1">$0</div>
              <div className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>Free forever</div>
              <ul className="space-y-3 mb-8">
                {['Unlimited invoices', 'Modern template', 'PDF export', 'Multi-currency', 'Save invoices locally'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-xl font-semibold border transition-colors"
                style={{ borderColor: 'var(--border)' }}
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-2xl border-2 relative" style={{ background: 'var(--card)', borderColor: '#2563eb' }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-extrabold mb-1">$9<span className="text-lg font-normal" style={{ color: 'var(--muted-foreground)' }}>/mo</span></div>
              <div className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>or $69/year (save 36%)</div>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Free',
                  'All 4 premium templates',
                  'Custom brand colors & logo',
                  'Payment link integration',
                  'Invoice history & search',
                  'Priority support',
                  'Remove QuickBill branding',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowCheckout(true)}
                className="block w-full py-3 rounded-xl font-semibold text-white text-center transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" style={{ background: 'var(--muted)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Is QuickBill really free?', a: 'Yes! The free plan gives you unlimited invoices with our modern template, PDF export, and multi-currency support. No credit card needed, no time limits.' },
              { q: 'Do I need to create an account?', a: 'No signup required for the free tier. Your invoices are saved in your browser. Pro users can access their invoices from any device.' },
              { q: 'Are my invoices stored on your servers?', a: 'No. Free tier invoices are stored locally in your browser. Your financial data never leaves your device.' },
              { q: 'Can I customize the invoice design?', a: 'Pro users get access to 4 premium templates and can customize colors, add logos, and remove QuickBill branding.' },
              { q: 'How does payment link integration work?', a: 'Add your Stripe payment link to invoices. Clients click and pay instantly. Funds go directly to your Stripe account.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to create your first invoice?</h2>
          <p className="text-lg mb-8" style={{ color: 'var(--muted-foreground)' }}>
            It takes less than 60 seconds. No signup required.
          </p>
          <button
            onClick={onGetStarted}
            className="px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
          >
            Create Invoice Now
            <ArrowRight className="inline w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <span className="font-semibold">QuickBill</span>
            </div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              &copy; {new Date().getFullYear()} QuickBill. Free invoice generator for freelancers.
            </div>
          </div>
        </div>
      </footer>

      <CheckoutModal isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </div>
  );
}
