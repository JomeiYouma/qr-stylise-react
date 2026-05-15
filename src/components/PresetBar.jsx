import { PRESETS } from '../lib/presets.js';

export default function PresetBar({ activeId, onPick }) {
  return (
    <div className="panel preset-bar">
      <span className="label">Presets</span>
      <div className="scroller">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`preset-chip ${activeId === p.id ? 'active' : ''}`}
            onClick={() => onPick(p)}
            title={p.name}
          >
            <span className="swatch" style={{ background: p.swatch }} />
            {p.name}
          </button>
        ))}
      </div>
    </div>
  );
}
