'use client';

import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon, FileText, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  showEditor: boolean;
  setShowEditor: (v: boolean) => void;
}

export default function Navbar({ showEditor, setShowEditor }: NavbarProps) {
  const { dark, toggle } = useTheme();

  return (
    <nav className="glass-nav no-print" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <button
          onClick={() => setShowEditor(false)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div style={{ width: 28, height: 28, borderRadius: 5, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText style={{ width: 15, height: 15, color: '#fff' }} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--heading)', fontFeatureSettings: '"ss01"' }}>
            Quick<span style={{ color: 'var(--primary)' }}>Bill</span>
          </span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {showEditor && (
            <button
              onClick={() => setShowEditor(false)}
              className="btn-ghost"
              style={{ padding: '6px 12px', fontSize: 13 }}
            >
              <ArrowLeft style={{ width: 14, height: 14 }} /> Home
            </button>
          )}
          <button
            onClick={toggle}
            style={{ padding: 8, borderRadius: 6, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--body)' }}
            aria-label="Toggle theme"
          >
            {dark ? <Sun style={{ width: 18, height: 18 }} /> : <Moon style={{ width: 18, height: 18 }} />}
          </button>
          {!showEditor && (
            <button onClick={() => setShowEditor(true)} className="btn-primary" style={{ padding: '6px 16px', fontSize: 13 }}>
              Create Invoice
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
