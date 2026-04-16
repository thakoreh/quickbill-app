'use client';

import { useState, useEffect, useRef } from 'react';
import { FileText, Zap, Palette, Globe, Download, Shield, Check, Star, ArrowRight, CreditCard, Clock, Sparkles, ChevronDown, X, MousePointer } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

interface LandingPageProps {
  onGetStarted: () => void;
}

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <div ref={ref}>{prefix}{count.toLocaleString()}{suffix}</div>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{ background: 'var(--card)', borderColor: open ? 'var(--primary)' : 'var(--border)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-6">
        <h3 className="font-semibold text-base pr-4">{q}</h3>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{ color: 'var(--muted-foreground)', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}
        />
      </div>
      <div style={{ maxHeight: open ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <p className="px-6 pb-6 text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{a}</p>
      </div>
    </div>
  );
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden mesh-gradient" style={{ minHeight: '100vh' }}>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full animate-float opacity-20"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full animate-float-slow opacity-15"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full animate-float opacity-10"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', filter: 'blur(40px)', animationDelay: '2s' }} />

        {/* Cursor glow */}
        <div className="absolute pointer-events-none opacity-[0.07] transition-all duration-1000 ease-out"
          style={{
            width: '600px', height: '600px', borderRadius: '50%',
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            left: mousePos.x - 300, top: mousePos.y - 300,
            filter: 'blur(60px)',
          }} />

        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="badge mb-8 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              Free forever — no signup, no credit card
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tight leading-[1.05] mb-8 animate-fade-in-up animate-fade-in-up-delay-1">
              Create invoices that<br />
              <span className="gradient-text">get you paid faster</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up animate-fade-in-up-delay-2"
              style={{ color: 'var(--muted-foreground)' }}>
              Professional invoices in under 60 seconds. Beautiful templates, instant PDFs, zero hassle.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animate-fade-in-up-delay-3">
              <button onClick={onGetStarted} className="btn-primary text-lg px-10 py-4">
                <span className="flex items-center gap-2">
                  Create Your Invoice
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <div className="flex -space-x-2">
                  {['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500'].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 flex items-center justify-center text-[10px] font-bold text-white`}
                      style={{ borderColor: 'var(--background)' }}>
                      {['S','M','P','A'][i]}
                    </div>
                  ))}
                </div>
                <span>4,200+ freelancers already invoicing</span>
              </div>
            </div>

            {/* Invoice Mockup */}
            <div className="mt-20 max-w-4xl mx-auto animate-fade-in-up animate-fade-in-up-delay-4">
              <div className="invoice-mockup" style={{ background: 'var(--card)' }}>
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="px-5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2"
                      style={{ background: 'var(--background)', color: 'var(--muted-foreground)' }}>
                      <div className="w-3 h-3 rounded-full" style={{ background: 'var(--success)' }} />
                      quickbill.app
                    </div>
                  </div>
                </div>
                {/* Invoice content */}
                <div className="p-8 sm:p-12">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <div className="text-3xl font-extrabold gradient-text-static mb-1">INVOICE</div>
                      <div className="text-sm font-mono" style={{ color: 'var(--muted-foreground)' }}>#INV-0042</div>
                      <div className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>Due: Jan 15, 2026</div>
                    </div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-12 mb-10 text-sm">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--primary)' }}>From</div>
                      <div className="font-semibold">Acme Corp</div>
                      <div style={{ color: 'var(--muted-foreground)' }}>hello@acme.com<br />123 Business Ave</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--primary)' }}>Bill To</div>
                      <div className="font-semibold">BigClient Inc</div>
                      <div style={{ color: 'var(--muted-foreground)' }}>pay@bigclient.com<br />456 Money Street</div>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
                    <div className="grid grid-cols-4 gap-4 px-5 py-3 text-xs font-bold uppercase tracking-wider"
                      style={{ background: 'var(--primary)', color: 'white' }}>
                      <div>Description</div><div className="text-right">Qty</div><div className="text-right">Rate</div><div className="text-right">Amount</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 px-5 py-4 text-sm border-b" style={{ borderColor: 'var(--border)' }}>
                      <div className="font-medium">Web Design</div><div className="text-right">40</div><div className="text-right">$125.00</div><div className="text-right font-semibold">$5,000.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 px-5 py-4 text-sm border-b" style={{ borderColor: 'var(--border)' }}>
                      <div className="font-medium">Brand Identity</div><div className="text-right">1</div><div className="text-right">$2,500.00</div><div className="text-right font-semibold">$2,500.00</div>
                    </div>
                    <div className="grid grid-cols-4 gap-4 px-5 py-4 text-sm" style={{ background: 'var(--muted)' }}>
                      <div className="font-medium">SEO Audit</div><div className="text-right">1</div><div className="text-right">$800.00</div><div className="text-right font-semibold">$800.00</div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-8">
                    <div className="w-72 text-sm">
                      <div className="flex justify-between py-2" style={{ color: 'var(--muted-foreground)' }}>
                        <span>Subtotal</span><span className="font-medium">$8,300.00</span>
                      </div>
                      <div className="flex justify-between py-2" style={{ color: 'var(--muted-foreground)' }}>
                        <span>Tax (13%)</span><span className="font-medium">$1,079.00</span>
                      </div>
                      <div className="flex justify-between py-3 text-xl font-bold border-t-2 mt-2 pt-3" style={{ borderColor: 'var(--primary)' }}>
                        <span>Total</span><span className="gradient-text-static">$9,379.00</span>
                      </div>
                      <button className="w-full mt-4 py-2.5 rounded-lg text-sm font-semibold text-white flex items-center justify-center gap-2"
                        style={{ background: 'var(--success)' }}>
                        <CreditCard className="w-4 h-4" /> Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--background), transparent)' }} />
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 12000, suffix: '+', label: 'Invoices Created', icon: FileText },
              { value: 4200, suffix: '+', label: 'Happy Users', icon: MousePointer },
              { value: 2800000, prefix: '$', label: 'Invoiced', format: true, display: '$2.8M' },
              { value: 49, suffix: '/5', label: 'User Rating', icon: Star, display: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl sm:text-5xl font-extrabold mb-2 transition-colors duration-300 gradient-text-static">
                  {stat.display ? stat.display : <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />}
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="badge mb-4">
              <Clock className="w-4 h-4" />
              Under 60 seconds
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">How it works</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              Three steps. Zero friction. Professional results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px]"
              style={{ background: 'linear-gradient(90deg, var(--primary), #7c3aed, #10b981)' }} />

            {[
              { step: '1', title: 'Fill in Details', desc: 'Enter your business info, client details, and line items. Auto-saved as you type.', color: '#2563eb' },
              { step: '2', title: 'Pick a Template', desc: 'Choose from 4 stunning templates. Customize colors, add your logo, set currency.', color: '#7c3aed' },
              { step: '3', title: 'Download & Send', desc: 'Export as a pixel-perfect PDF or share a payment link. Get paid 3x faster.', color: '#10b981' },
            ].map((item, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-2xl font-extrabold text-white relative z-10"
                  style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`, boxShadow: `0 8px 24px ${item.color}33` }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: 'var(--muted-foreground)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="py-24" style={{ background: 'var(--muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="badge mb-4">
              <Zap className="w-4 h-4" />
              Everything included
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Built for freelancers who value their time</h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
              Every feature designed to make you look professional and get paid faster. No bloat, no learning curve.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: 'Beautiful Templates', desc: '4 professionally designed templates — modern, classic, minimal, or bold. Each fully customizable with your brand.', color: '#2563eb' },
              { icon: Download, title: 'Instant PDF Export', desc: 'Pixel-perfect PDFs in one click. No watermarks, no formatting issues. Ready to send to any client.', color: '#7c3aed' },
              { icon: Globe, title: 'Multi-Currency', desc: '10+ currencies with proper formatting. Invoice international clients without switching tools.', color: '#10b981' },
              { icon: Zap, title: 'Lightning Fast', desc: 'Create a complete invoice in under 60 seconds. No signup walls, no onboarding. Just open and go.', color: '#f59e0b' },
              { icon: Shield, title: 'Privacy First', desc: 'Your data stays in your browser. Nothing stored on servers. 100% client-side processing.', color: '#ef4444' },
              { icon: CreditCard, title: 'Payment Links', desc: 'Add Stripe payment links so clients pay directly from the invoice. Get paid 3x faster.', color: '#06b6d4' },
            ].map((feature, i) => (
              <div key={i} className="feature-card group">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${feature.color}, ${feature.color}cc)`, boxShadow: `0 4px 12px ${feature.color}33` }}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="badge mb-4">
              <Star className="w-4 h-4" />
              4.9/5 average rating
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Loved by freelancers worldwide</h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Join thousands who switched from messy spreadsheets and clunky tools.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Chen', role: 'Freelance Designer', text: 'Finally an invoice tool that makes my invoices look as good as my design work. Clients always compliment them!', avatar: 'SC', color: '#2563eb' },
              { name: 'Marcus Johnson', role: 'Web Developer', text: 'I used to spend 20 minutes formatting invoices in Word. Now it takes me 2 minutes with QuickBill. Absolute game changer.', avatar: 'MJ', color: '#7c3aed' },
              { name: 'Priya Patel', role: 'Marketing Consultant', text: 'The multi-currency support is perfect for my international clients. Clean, professional, and free. What more could I want?', avatar: 'PP', color: '#10b981' },
            ].map((testimonial, i) => (
              <div key={i} className="testimonial-card">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 leading-relaxed text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${testimonial.color}, ${testimonial.color}cc)` }}>
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

      <div className="section-divider max-w-7xl mx-auto" />

      {/* ===== PRICING ===== */}
      <section className="py-24" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="badge mb-4">
              <Sparkles className="w-4 h-4" />
              No hidden fees
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Simple, honest pricing</h2>
            <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
              Start free forever. Upgrade only when you need the extra power.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free */}
            <div className="pricing-card">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>Everything you need to start invoicing</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold">$0</span>
                <span className="text-lg" style={{ color: 'var(--muted-foreground)' }}>/mo</span>
              </div>
              <ul className="space-y-4 mb-10">
                {['Unlimited invoices', 'Modern template', 'PDF export', 'Multi-currency support', 'Save invoices locally'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent)' }}>
                      <Check className="w-3 h-3" style={{ color: 'var(--primary)' }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={onGetStarted} className="btn-secondary w-full text-center">
                Get Started Free
              </button>
            </div>

            {/* Pro */}
            <div className="pricing-card featured">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>For serious freelancers and small businesses</p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-extrabold">$9</span>
                <span className="text-lg" style={{ color: 'var(--muted-foreground)' }}>/mo</span>
              </div>
              <p className="text-sm mb-8" style={{ color: 'var(--muted-foreground)' }}>or $69/year — save 36%</p>
              <ul className="space-y-4 mb-10">
                {[
                  'Everything in Free',
                  'All 4 premium templates',
                  'Custom brand colors & logo',
                  'Payment link integration',
                  'Invoice history & search',
                  'Priority support',
                  'Remove QuickBill branding',
                ].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowCheckout(true)} className="btn-primary w-full">
                <span>Upgrade to Pro</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24" style={{ background: 'var(--muted)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">Questions? Answered.</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'Is QuickBill really free?', a: 'Yes! The free plan gives you unlimited invoices with our modern template, PDF export, and multi-currency support. No credit card needed, no time limits, no tricks.' },
              { q: 'Do I need to create an account?', a: 'No signup required for the free tier. Your invoices are saved in your browser automatically. Pro users can access their invoices from any device.' },
              { q: 'Are my invoices stored on your servers?', a: 'No. Free tier invoices are stored locally in your browser. Your financial data never leaves your device. Zero server-side storage.' },
              { q: 'Can I customize the invoice design?', a: 'Pro users get access to 4 premium templates and can customize colors, add logos, and remove QuickBill branding for a fully white-label experience.' },
              { q: 'How does payment link integration work?', a: 'Add your Stripe payment link to any invoice. Clients click and pay instantly. Funds go directly to your Stripe account — we never touch your money.' },
            ].map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-32 relative mesh-gradient">
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            Ready to create your<br /><span className="gradient-text">first invoice?</span>
          </h2>
          <p className="text-xl mb-10" style={{ color: 'var(--muted-foreground)' }}>
            It takes less than 60 seconds. No signup required.
          </p>
          <button onClick={onGetStarted} className="btn-primary text-lg px-12 py-5">
            <span className="flex items-center gap-2">
              Create Invoice Now
              <ArrowRight className="w-5 h-5" />
            </span>
          </button>
          <p className="text-sm mt-6" style={{ color: 'var(--muted-foreground)' }}>
            Free forever. No credit card. No catch.
          </p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-16 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">QuickBill</span>
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
