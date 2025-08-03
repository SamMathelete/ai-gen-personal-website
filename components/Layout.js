import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

/**
 * A simple layout component that provides a consistent header and footer
 * across the site. The navigation bar highlights the current page
 * based on the active route. Using Tailwind CSS ensures a clean and
 * minimalist aesthetic while remaining easy to customize.
 */
export default function Layout({ children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/research', label: 'Research' },
    { href: '/teaching', label: 'Teaching' },
    { href: '/blog', label: 'Blog' },
    { href: '/cv', label: 'CV' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="text-xl font-semibold text-gray-800 hover:text-blue-600">Sambit Mishra</a>
          </Link>
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <nav className="hidden md:flex space-x-6 text-sm">
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? router.pathname === '/' : router.pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} legacyBehavior>
                  <a
                    className={
                      isActive
                        ? 'text-blue-600 font-medium underline underline-offset-4'
                        : 'text-gray-600 hover:text-blue-600'
                    }
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        </div>
        {menuOpen && (
          <nav className="md:hidden px-4 pb-4 space-y-2 text-sm">
            {navItems.map((item) => {
              const isActive =
                item.href === '/' ? router.pathname === '/' : router.pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} legacyBehavior>
                  <a
                    className={
                      isActive
                        ? 'block text-blue-600 font-medium underline underline-offset-4'
                        : 'block text-gray-600 hover:text-blue-600'
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>
        )}
      </header>
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">{children}</main>
      <footer className="bg-white border-t">
        <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-gray-500 flex justify-between">
          <span>© {new Date().getFullYear()} Sambit Mishra</span>
          <span>
            Built with <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js</a>
          </span>
        </div>
      </footer>
    </div>
  );
}