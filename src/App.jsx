import { useEffect, useState } from 'react';
import './App.css';
import Controls from './components/Controls.jsx';
import Preview from './components/Preview.jsx';
import PresetBar from './components/PresetBar.jsx';
import BrandMark from './components/BrandMark.jsx';
import Silk from './components/Silk.jsx';
import { Icon } from './components/icons.jsx';
import { defaultState } from './lib/defaults.js';
import { shuffleStyle } from './lib/presets.js';

export default function App() {
  const [state, setState] = useState(defaultState);
  const [activePreset, setActivePreset] = useState('aurora');
  const [toast, setToast] = useState('');

  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  const applyPreset = (preset) => {
    // Presets define a colour scheme, so leave black & white mode
    // (which would otherwise override every colour and hide the change).
    set({ ...preset.apply, mono: false });
    setActivePreset(preset.id);
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2200);
  };

  const onShuffle = () => {
    set({ ...shuffleStyle(), mono: false });
    setActivePreset(null);
    showToast('Style aléatoire généré');
  };

  const onReset = () => {
    setState(defaultState());
    setActivePreset('aurora');
    showToast('Réinitialisé');
  };

  // Mark preset inactive when user edits manually
  useEffect(() => {
    if (!activePreset) return;
  }, [activePreset]);

  return (
    <>
      <div className="silk-bg" aria-hidden>
        <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
      </div>
      <div className="silk-veil" aria-hidden />

      <div className="shell">
        <header className="header">
          <div className="brand">
            <BrandMark size={46} className="logo-mark" />
            <div>
              <h1>QR Stylisé</h1>
              <div className="tag">Générateur de QR code · 100&nbsp;% côté navigateur</div>
            </div>
          </div>
          <div className="links">
            <button
              className="btn ghost btn-sm"
              onClick={onShuffle}
              title="Générer un style aléatoire"
              aria-label="Générer un style aléatoire"
            >
              <Icon name="sparkles" size={14} /> Aléatoire
            </button>
            <button
              className="btn ghost btn-sm"
              onClick={onReset}
              title="Réinitialiser tous les réglages"
              aria-label="Réinitialiser tous les réglages"
            >
              <Icon name="refresh" size={14} /> Reset
            </button>
            <a
              className="btn ghost btn-sm"
              href="https://github.com/kozakdenys/qr-code-styling"
              target="_blank"
              rel="noreferrer"
              title="Librairie qr-code-styling (GitHub)"
            >
              <Icon name="github" size={14} /> Lib
            </a>
          </div>
        </header>

        <PresetBar activeId={activePreset} onPick={applyPreset} />

        <div className="layout">
          <Controls
            state={state}
            set={(patch) => { set(patch); setActivePreset(null); }}
            onToast={showToast}
          />
          <div className="preview-col">
            <Preview state={state} onToast={showToast} />
          </div>
        </div>

        <footer className="footer">
          Gratuit et illimité · 100 % côté client · Coded by Youma
        </footer>
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>{toast || ' '}</div>
    </>
  );
}
