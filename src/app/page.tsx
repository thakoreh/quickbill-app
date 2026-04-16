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
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--heading)', fontFamily: "'Source Sans 3', system-ui, sans-serif", fontFeatureSettings: '"ss01"' }}>
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
