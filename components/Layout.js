import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      /* ignore storage errors (private mode, etc.) */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-ink/15 text-ash hover:text-ember hover:border-ember/40 transition-colors ${className}`}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && theme === 'dark' ? (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export default function Layout({ children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    { href: '/teaching', label: 'Teaching' },
    { href: '/blog', label: 'Writing' },
    { href: '/cv', label: 'CV' },
  ];

  const isActive = (href) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <header
        className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
          scrolled ? 'bg-paper/85 border-b border-rule' : 'bg-paper/0'
        }`}
      >
        <div className="container-wide flex items-center justify-between h-16">
          <Link href="/" legacyBehavior>
            <a className="group flex items-center gap-2 no-underline">
              <span className="inline-block w-2 h-2 rounded-full bg-ember group-hover:scale-125 transition-transform" />
              <span className="font-display text-lg font-semibold tracking-tightest text-ink">
                Sambit Mishra
              </span>
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} legacyBehavior>
                <a
                  className={`relative px-3 py-2 text-sm no-underline transition-colors ${
                    isActive(item.href) ? 'text-ink' : 'text-ash hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute left-3 right-3 -bottom-0.5 h-px bg-ember" />
                  )}
                </a>
              </Link>
            ))}
            <ThemeToggle className="ml-2" />
            <a
              href="mailto:sambitmi@usc.edu"
              className="ml-3 btn-primary text-xs"
            >
              Get in touch
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
            className="text-ink p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-rule bg-paper">
            <div className="container-wide py-3 flex flex-col">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} legacyBehavior>
                  <a
                    onClick={() => setMenuOpen(false)}
                    className={`py-2.5 text-sm no-underline border-b border-rule/60 last:border-0 ${
                      isActive(item.href) ? 'text-ember font-medium' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
              <a
                href="mailto:sambitmi@usc.edu"
                className="mt-3 btn-primary text-xs self-start"
              >
                Get in touch
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 w-full">{children}</main>

      <footer className="mt-24 border-t border-rule">
        <div className="container-wide py-10">
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <p className="font-display text-lg tracking-tightest text-ink">Sambit Mishra</p>
              <p className="text-sm text-ash mt-1">
                PhD Student, Electrical &amp; Computer Engineering<br />
                University of Southern California
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <ul className="space-y-1.5 text-sm">
                <li><a className="link-underline" href="mailto:sambitmi@usc.edu">sambitmi@usc.edu</a></li>
                <li><a className="link-underline" href="https://scholar.google.com/citations?user=kyCSMKUAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
                <li><a className="link-underline" href="https://orcid.org/0000-0002-7736-7164" target="_blank" rel="noopener noreferrer">ORCID</a></li>
                <li><a className="link-underline" href="https://linkedin.com/in/thesambitmishra" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Site</p>
              <ul className="space-y-1.5 text-sm">
                <li><Link href="/research" legacyBehavior><a className="link-underline">Research &amp; publications</a></Link></li>
                <li><Link href="/cv" legacyBehavior><a className="link-underline">Curriculum Vitae</a></Link></li>
                <li><Link href="/blog" legacyBehavior><a className="link-underline">Writing</a></Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-rule flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-ash font-mono">
            <span>© {new Date().getFullYear()} Sambit Mishra. Los Angeles, CA.</span>
            <span>Last updated {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
