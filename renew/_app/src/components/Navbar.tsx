import { useEffect, useState } from 'react';
import { navItems } from '@/data/navigation';
import { useScrollY } from '@/hooks/useScrollY';
import { useActiveSection } from '@/hooks/useActiveSection';
import './Navbar.css';

const SECTION_IDS = navItems.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrollY(40);
  const activeId = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <a href="#hero" className="nav__brand" onClick={handleNavClick}>
          <span className="nav__brand-mark" aria-hidden="true">
            ●
          </span>
          <span className="nav__brand-text">DeokYeon Kim</span>
        </a>

        <nav
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
    </header>
  );
}
