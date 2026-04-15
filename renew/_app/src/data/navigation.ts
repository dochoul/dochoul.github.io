export interface NavItem {
  id: string;
  label: string;
  index: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'writing', label: 'Writing', index: '05' },
  { id: 'contact', label: 'Contact', index: '06' },
];
