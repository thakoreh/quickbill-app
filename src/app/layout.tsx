import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QuickBill — Beautiful Invoices in Seconds',
  description: 'Create stunning, professional invoices for free. No signup required. Export as PDF, customize templates, and get paid faster.',
  keywords: ['invoice generator', 'free invoice', 'invoice template', 'PDF invoice', 'billing tool', 'freelancer invoice'],
  authors: [{ name: 'QuickBill' }],
  openGraph: {
    title: 'QuickBill — Beautiful Invoices in Seconds',
    description: 'Create stunning, professional invoices for free. No signup required.',
    type: 'website',
    siteName: 'QuickBill',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuickBill — Beautiful Invoices in Seconds',
    description: 'Create stunning, professional invoices for free. No signup required.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;500;600&family=Source+Code+Pro:wght@400;500;700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('quickbill-theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
