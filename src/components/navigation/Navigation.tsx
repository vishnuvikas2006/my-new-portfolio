import { useEffect, useState } from 'react';

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
];

type NavigationProps = {
  onViewHackathons: () => void;
};

export function Navigation({ onViewHackathons }: NavigationProps) {
  const [isPastHeroStart, setIsPastHeroStart] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsPastHeroStart(window.scrollY > 56);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`site-nav ${isPastHeroStart ? 'site-nav--visible' : ''}`}>
      <a className="nav-mark" href="#home" aria-label="Back to the top">
        VV<span aria-hidden="true">.</span>
      </a>
      <nav aria-label="Primary navigation">
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            <button type="button" onClick={onViewHackathons}>Hackathons</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
