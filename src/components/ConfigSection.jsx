import { useState } from 'react';
import Section from './Section.jsx';
import { Field } from './Field.jsx';
import { Icon } from './icons.jsx';
import { encodeConfig, decodeConfig } from '../lib/config.js';

export default function ConfigSection({ state, onLoad, onToast }) {
  const [text, setText] = useState('');

  const copy = async () => {
    const token = encodeConfig(state);
    try {
      await navigator.clipboard.writeText(token);
      onToast?.('Configuration copiée');
    } catch {
      // Clipboard API unavailable (insecure context / permissions):
      // surface the token so it can be copied manually.
      setText(token);
      onToast?.('Copie auto indisponible — token affiché ci-dessous');
    }
  };

  const load = () => {
    const next = decodeConfig(text);
    if (!next) {
      onToast?.('Configuration invalide');
      return;
    }
    onLoad(next);
    setText('');
    onToast?.('Configuration chargée');
  };

  const pasteAndLoad = async () => {
    try {
      const clip = await navigator.clipboard.readText();
      const next = decodeConfig(clip);
      if (!next) {
        onToast?.('Le presse-papier ne contient pas de config valide');
        return;
      }
      onLoad(next);
      setText('');
      onToast?.('Configuration chargée depuis le presse-papier');
    } catch {
      onToast?.('Lecture du presse-papier indisponible — colle dans le champ');
    }
  };

  return (
    <Section title="Configuration" icon="copy" defaultOpen={false}>
      <p className="hint">
        Copie un jeton qui contient tout le style (couleurs, formes, logo…)
        pour le réutiliser ou le partager.
      </p>
      <button type="button" className="btn primary" onClick={copy}>
        <Icon name="copy" size={14} /> Copier la configuration
      </button>

      <Field label="Charger une configuration">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Colle ici un jeton QRSTYLE1:… (ou du JSON)"
          rows={3}
          spellCheck={false}
        />
      </Field>
      <div className="button-row">
        <button
          type="button"
          className="btn"
          style={{ flex: 1 }}
          onClick={load}
          disabled={!text.trim()}
        >
          <Icon name="check" size={14} /> Charger
        </button>
        <button
          type="button"
          className="btn ghost"
          style={{ flex: 1 }}
          onClick={pasteAndLoad}
        >
          <Icon name="download" size={14} /> Coller &amp; charger
        </button>
      </div>
    </Section>
  );
}
