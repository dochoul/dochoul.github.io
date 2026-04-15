import { useEffect, useState } from 'react';
import { navItems } from '@/data/navigation';
import { useScrollY } from '@/hooks/useScrollY';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/hooks/useTheme';
import './Navbar.css';

const SECTION_IDS = navItems.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrollY(40);
  const activeId = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner container">
          <a href="#hero" className="nav__brand" onClick={handleNavClick}>
            <span className="nav__brand-mark" aria-hidden="true">
              ●
            </span>
            <span className="nav__brand-text">DeokYeon Kim</span>
          </a>

          <div className="nav__actions">
            <nav
              id="nav-menu"
              className={`nav__menu ${menuOpen ? 'nav__menu--open' : ''}`}
              aria-label="섹션 내비게이션"
            >
              <ul className="nav__list">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`nav__link ${activeId === item.id ? 'nav__link--active' : ''}`}
                      onClick={handleNavClick}
                    >
                      <span className="nav__link-index">{item.index}</span>
                      <span className="nav__link-label">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className={`nav__toggle ${menuOpen ? 'nav__toggle--open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <button
        type="button"
        className="nav__theme-fab"
        aria-pressed={isDark}
        aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        onClick={toggleTheme}
      >
        <span className="nav__theme-icon" aria-hidden="true">
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </span>
        <span className="nav__theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 1.8v3M12 19.2v3M4.1 4.1l2.1 2.1M17.8 17.8l2.1 2.1M1.8 12h3M19.2 12h3M4.1 19.9l2.1-2.1M17.8 6.2l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.2 14.7A8.2 8.2 0 0 1 9.3 3.8 8.8 8.8 0 1 0 20.2 14.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
