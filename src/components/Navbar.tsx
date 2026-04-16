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
    <nav className="sticky top-0 z-50 glass no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setShowEditor(false)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">
              Quick<span className="gradient-text">Bill</span>
            </span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {showEditor && (
              <button
                onClick={() => setShowEditor(false)}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--muted)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </button>
            )}
            <button
              onClick={toggle}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--muted)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {!showEditor && (
              <button
                onClick={() => setShowEditor(true)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}
              >
                Create Invoice
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
