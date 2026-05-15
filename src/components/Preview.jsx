import { useEffect, useMemo, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { buildQrOptions } from '../lib/defaults.js';
import { Icon } from './icons.jsx';

const PREVIEW_SIZE = 280;

export default function Preview({ state, onToast }) {
  const mountRef = useRef(null);
  const qrRef = useRef(null);
  const options = useMemo(() => buildQrOptions(state), [state]);

  // Create the instance and attach its canvas once. The cleanup nulls the
  // ref and empties the container so StrictMode's mount/unmount/mount cycle
  // can't leave a stale or duplicated canvas behind.
  useEffect(() => {
    const node = mountRef.current;
    if (!node) return undefined;
    const qr = new QRCodeStyling({
      ...buildQrOptions(state),
      width: PREVIEW_SIZE,
      height: PREVIEW_SIZE,
    });
    qrRef.current = qr;
    node.replaceChildren();
    qr.append(node);
    return () => {
      qrRef.current = null;
      node.replaceChildren();
    };
    // Built once; subsequent state changes flow through the update effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect every state change onto the live instance.
  useEffect(() => {
    qrRef.current?.update({
      ...options,
      width: PREVIEW_SIZE,
      height: PREVIEW_SIZE,
    });
  }, [options]);

  const safeName = () => {
    const raw = (state.data || 'qrcode').trim();
    return raw.replace(/[^a-z0-9-_]+/gi, '_').slice(0, 40) || 'qrcode';
  };

  const exportAt = (extension) => {
    const exporter = new QRCodeStyling({ ...options });
    exporter.download({ name: safeName(), extension });
  };

  const copy = async () => {
    try {
      const exporter = new QRCodeStyling({ ...options });
      const blob = await exporter.getRawData('png');
      if (!blob) throw new Error('no blob');
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      onToast?.('PNG copié dans le presse-papier');
    } catch (e) {
      onToast?.('Copie indisponible dans ce navigateur');
    }
  };

  return (
    <div className="panel preview-card">
      <div className="qr-frame">
        <div ref={mountRef} className="qr-mount" />
      </div>
      <div className="preview-data" title={state.data}>
        {state.data?.trim() || <em>Aucune donnée — le QR est vide</em>}
      </div>
      <div className="preview-meta">
        <strong>{state.size}×{state.size}px</strong> · correction <strong>{state.errorCorrectionLevel}</strong>
        {state.mono && <> · noir &amp; blanc</>}
        {state.logo && <> · logo {Math.round(state.logoSize * 100)}%</>}
      </div>
      <div className="dl-block">
        <span className="dl-label">Télécharger</span>
        <div className="dl-row">
          <button type="button" className="btn primary" onClick={() => exportAt('png')}>
            <Icon name="download" size={14} /> PNG
          </button>
          <button type="button" className="btn" onClick={() => exportAt('svg')}>
            <Icon name="download" size={14} /> SVG
          </button>
          <button type="button" className="btn" onClick={() => exportAt('jpeg')}>
            <Icon name="download" size={14} /> JPG
          </button>
        </div>
        <button type="button" className="btn ghost btn-sm dl-copy" onClick={copy}>
          <Icon name="copy" size={14} /> Copier le PNG
        </button>
      </div>
    </div>
  );
}
