// Portable QR configuration: encode the current state to a single-line,
// copy/paste-safe token and decode it back with strict validation so a
// pasted string can never put the app into a broken state.

import {
  defaultState,
  DOT_TYPES,
  CORNER_SQUARE_TYPES,
  CORNER_DOT_TYPES,
  EC_LEVELS,
} from './defaults.js';

const PREFIX = 'QRSTYLE1:';

// Unicode-safe base64 (chunked so large logo data URLs don't overflow).
function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function base64ToUtf8(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export function encodeConfig(state) {
  return PREFIX + utf8ToBase64(JSON.stringify(state));
}

const isHex = (v) => typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v);

const num = (v, fallback, min, max) => {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
};

const oneOf = (v, list, fallback) => (list.includes(v) ? v : fallback);

// Rebuild a clean state from defaults, overlaying only known & valid keys.
export function sanitizeConfig(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const d = defaultState();
  return {
    data: typeof raw.data === 'string' ? raw.data.slice(0, 4096) : d.data,
    size: Math.round(num(raw.size, d.size, 64, 2048)),
    margin: Math.round(num(raw.margin, d.margin, 0, 200)),
    errorCorrectionLevel: oneOf(raw.errorCorrectionLevel, EC_LEVELS, d.errorCorrectionLevel),
    dotsType: oneOf(raw.dotsType, DOT_TYPES, d.dotsType),
    dotsColorMode: oneOf(raw.dotsColorMode, ['solid', 'linear', 'radial'], d.dotsColorMode),
    dotsColor1: isHex(raw.dotsColor1) ? raw.dotsColor1 : d.dotsColor1,
    dotsColor2: isHex(raw.dotsColor2) ? raw.dotsColor2 : d.dotsColor2,
    dotsRotation: Math.round(num(raw.dotsRotation, d.dotsRotation, 0, 360)),
    cornerSquareType: oneOf(raw.cornerSquareType, CORNER_SQUARE_TYPES, d.cornerSquareType),
    cornerSquareColor: isHex(raw.cornerSquareColor) ? raw.cornerSquareColor : d.cornerSquareColor,
    cornerDotType: oneOf(raw.cornerDotType, CORNER_DOT_TYPES, d.cornerDotType),
    cornerDotColor: isHex(raw.cornerDotColor) ? raw.cornerDotColor : d.cornerDotColor,
    bgMode: oneOf(raw.bgMode, ['solid', 'transparent'], d.bgMode),
    bgColor: isHex(raw.bgColor) ? raw.bgColor : d.bgColor,
    bgRound: num(raw.bgRound, d.bgRound, 0, 1),
    mono: typeof raw.mono === 'boolean' ? raw.mono : d.mono,
    logo:
      typeof raw.logo === 'string' && /^data:image\//.test(raw.logo)
        ? raw.logo
        : null,
    logoSize: num(raw.logoSize, d.logoSize, 0.1, 0.5),
    logoMargin: Math.round(num(raw.logoMargin, d.logoMargin, 0, 40)),
    logoHideDots: typeof raw.logoHideDots === 'boolean' ? raw.logoHideDots : d.logoHideDots,
  };
}

// Accepts the token (with or without prefix) OR raw JSON. Returns a clean
// state object, or null if it can't be parsed at all.
export function decodeConfig(input) {
  if (typeof input !== 'string') return null;
  let text = input.trim();
  if (!text) return null;
  if (text.startsWith(PREFIX)) text = text.slice(PREFIX.length);

  let parsed = null;
  // Try base64-encoded JSON first, then fall back to raw JSON.
  try {
    parsed = JSON.parse(base64ToUtf8(text));
  } catch {
    try {
      parsed = JSON.parse(text);
    } catch {
      return null;
    }
  }
  return sanitizeConfig(parsed);
}
