'use client';

import { useState } from 'react';
import { InvoiceProvider } from '@/context/InvoiceContext';
import LandingPage from '@/components/LandingPage';
import InvoiceEditor from '@/components/InvoiceEditor';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <InvoiceProvider>
      <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <Navbar showEditor={showEditor} setShowEditor={setShowEditor} />
        {showEditor ? (
          <InvoiceEditor />
        ) : (
          <LandingPage onGetStarted={() => setShowEditor(true)} />
        )}
      </div>
    </InvoiceProvider>
  );
}
