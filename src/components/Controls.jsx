import { useRef, useState } from 'react';
import Section from './Section.jsx';
import { Field, ColorField, RangeField, Segmented, Toggle } from './Field.jsx';
import { Icon } from './icons.jsx';
import ConfigSection from './ConfigSection.jsx';
import { DOT_TYPES, CORNER_SQUARE_TYPES, CORNER_DOT_TYPES, EC_LEVELS } from '../lib/defaults.js';

export default function Controls({ state, set, onToast }) {
  const fileRef = useRef(null);
  const [over, setOver] = useState(false);

  const loadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => set({ logo: String(reader.result || '') });
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) loadFile(f);
  };

  return (
    <div className="panel controls">
      <Section title="Contenu" icon="link" defaultOpen>
        <Field label="Lien ou texte">
          <textarea
            value={state.data}
            onChange={(e) => set({ data: e.target.value })}
            placeholder="https://exemple.com"
            rows={2}
          />
        </Field>
        <div className="row row-3">
          <Field label="Taille (px)">
            <input
              type="number"
              value={state.size}
              min={128}
              max={2048}
              step={16}
              onChange={(e) => set({ size: Number(e.target.value) })}
            />
          </Field>
          <Field label="Marge">
            <input
              type="number"
              value={state.margin}
              min={0}
              max={80}
              step={1}
              onChange={(e) => set({ margin: Number(e.target.value) })}
            />
          </Field>
          <Field label="Correction">
            <select
              value={state.errorCorrectionLevel}
              onChange={(e) => set({ errorCorrectionLevel: e.target.value })}
            >
              {EC_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      <Section title="Modules" icon="grid" defaultOpen>
        <Toggle
          checked={state.mono}
          onChange={(v) => set({ mono: v })}
        >
          Noir &amp; blanc (compatibilité de scan maximale)
        </Toggle>
        <Field label="Forme des points">
          <select value={state.dotsType} onChange={(e) => set({ dotsType: e.target.value })}>
            {DOT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>
        {state.mono ? (
          <p className="hint">
            Le mode noir &amp; blanc force des points noirs sur fond blanc.
            Désactive-le pour personnaliser les couleurs.
          </p>
        ) : (
          <>
            <Field label="Type de couleur">
              <Segmented
                options={[
                  { value: 'solid', label: 'Uni' },
                  { value: 'linear', label: 'Linéaire' },
                  { value: 'radial', label: 'Radial' },
                ]}
                value={state.dotsColorMode}
                onChange={(v) => set({ dotsColorMode: v })}
              />
            </Field>
            <div className="row">
              <Field label={state.dotsColorMode === 'solid' ? 'Couleur' : 'Couleur 1'}>
                <ColorField value={state.dotsColor1} onChange={(v) => set({ dotsColor1: v })} />
              </Field>
              {state.dotsColorMode !== 'solid' && (
                <Field label="Couleur 2">
                  <ColorField value={state.dotsColor2} onChange={(v) => set({ dotsColor2: v })} />
                </Field>
              )}
            </div>
            {state.dotsColorMode === 'linear' && (
              <Field label={`Angle du dégradé · ${state.dotsRotation}°`}>
                <RangeField
                  value={state.dotsRotation}
                  min={0}
                  max={360}
                  step={5}
                  suffix="°"
                  onChange={(v) => set({ dotsRotation: v })}
                />
              </Field>
            )}
          </>
        )}
      </Section>

      <Section title="Coins" icon="corners" defaultOpen={false}>
        <div className="row">
          <Field label="Contour">
            <select value={state.cornerSquareType} onChange={(e) => set({ cornerSquareType: e.target.value })}>
              {CORNER_SQUARE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Couleur contour">
            <ColorField value={state.cornerSquareColor} onChange={(v) => set({ cornerSquareColor: v })} />
          </Field>
        </div>
        <div className="row">
          <Field label="Intérieur">
            <select value={state.cornerDotType} onChange={(e) => set({ cornerDotType: e.target.value })}>
              {CORNER_DOT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Couleur intérieur">
            <ColorField value={state.cornerDotColor} onChange={(v) => set({ cornerDotColor: v })} />
          </Field>
        </div>
      </Section>

      <Section title="Fond" icon="palette" defaultOpen={false}>
        <Field label="Mode">
          <Segmented
            options={[
              { value: 'solid', label: 'Uni' },
              { value: 'transparent', label: 'Transparent' },
            ]}
            value={state.bgMode}
            onChange={(v) => set({ bgMode: v })}
          />
        </Field>
        {state.bgMode === 'solid' && !state.mono && (
          <Field label="Couleur de fond">
            <ColorField value={state.bgColor} onChange={(v) => set({ bgColor: v })} />
          </Field>
        )}
        <Field label={`Rondeur des bords · ${Math.round(state.bgRound * 100)}%`}>
          <RangeField
            value={state.bgRound}
            min={0}
            max={1}
            step={0.05}
            onChange={(v) => set({ bgRound: v })}
          />
        </Field>
      </Section>

      <Section title="Logo" icon="image" defaultOpen={false}>
        <div
          className={`dropzone ${over ? 'over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          <div className="thumb">
            {state.logo
              ? <img src={state.logo} alt="logo" />
              : <Icon name="image" size={20} />}
          </div>
          <div className="text">
            <strong>{state.logo ? 'Logo chargé' : 'Glisse une image ou clique'}</strong>
            <span>PNG, SVG, JPG — placé au centre du QR</span>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => loadFile(e.target.files && e.target.files[0])}
          />
        </div>
        {state.logo && (
          <>
            <div className="row">
              <Field label={`Taille · ${Math.round(state.logoSize * 100)}%`}>
                <RangeField
                  value={state.logoSize}
                  min={0.1}
                  max={0.5}
                  step={0.01}
                  onChange={(v) => set({ logoSize: v })}
                />
              </Field>
              <Field label={`Marge · ${state.logoMargin}px`}>
                <RangeField
                  value={state.logoMargin}
                  min={0}
                  max={40}
                  step={1}
                  suffix="px"
                  onChange={(v) => set({ logoMargin: v })}
                />
              </Field>
            </div>
            <div className="row">
              <Toggle
                checked={state.logoHideDots}
                onChange={(v) => set({ logoHideDots: v })}
              >
                Masquer les points sous le logo
              </Toggle>
              <button
                type="button"
                className="btn ghost btn-sm"
                onClick={() => set({ logo: null })}
              >
                <Icon name="trash" size={14} /> Retirer le logo
              </button>
            </div>
          </>
        )}
      </Section>

      <ConfigSection state={state} onLoad={set} onToast={onToast} />
    </div>
  );
}
