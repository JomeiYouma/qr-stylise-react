export function Field({ label, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

export function ColorField({ value, onChange }) {
  const safe = /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000';
  return (
    <div className="color-field">
      <div className="swatch" style={{ background: safe }}>
        <input type="color" value={safe} onChange={(e) => onChange(e.target.value)} />
      </div>
      <input
        type="text"
        className="hex"
        value={safe}
        maxLength={7}
        onChange={(e) => {
          const v = e.target.value.startsWith('#') ? e.target.value : `#${e.target.value}`;
          onChange(v);
        }}
      />
    </div>
  );
}

export function RangeField({ value, min, max, step = 1, suffix = '', onChange }) {
  return (
    <div className="range-field">
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span className="value">{value}{suffix}</span>
    </div>
  );
}

export function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((opt) => {
        const key = typeof opt === 'string' ? opt : opt.value;
        const label = typeof opt === 'string' ? opt : opt.label;
        return (
          <button
            key={key}
            type="button"
            className={value === key ? 'active' : ''}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function Toggle({ checked, onChange, children }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="track" />
      <span className="text">{children}</span>
    </label>
  );
}
