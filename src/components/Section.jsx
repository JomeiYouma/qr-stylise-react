import { useState } from 'react';
import { Icon } from './icons.jsx';

export default function Section({ title, icon = 'palette', defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`section ${open ? 'open' : ''}`}>
      <button type="button" className="section-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="title">
          <span className="icon"><Icon name={icon} size={14} /></span>
          {title}
        </span>
        <Icon name="chevron" className="chevron" />
      </button>
      <div className="section-body">{children}</div>
    </div>
  );
}
