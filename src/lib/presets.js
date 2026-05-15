export const PRESETS = [
  {
    id: 'aurora',
    name: 'Aurora',
    swatch: 'linear-gradient(135deg, #a855f7, #22d3ee)',
    apply: {
      dotsType: 'rounded',
      dotsColorMode: 'linear',
      dotsColor1: '#a855f7',
      dotsColor2: '#22d3ee',
      dotsRotation: 45,
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#a855f7',
      cornerDotType: 'dot',
      cornerDotColor: '#22d3ee',
      bgMode: 'solid',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    swatch: 'linear-gradient(135deg, #f97316, #f472b6)',
    apply: {
      dotsType: 'classy-rounded',
      dotsColorMode: 'linear',
      dotsColor1: '#f97316',
      dotsColor2: '#f472b6',
      dotsRotation: 90,
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#f97316',
      cornerDotType: 'dot',
      cornerDotColor: '#f472b6',
      bgMode: 'solid',
      bgColor: '#fff7ed',
    },
  },
  {
    id: 'mono',
    name: 'Mono',
    swatch: 'linear-gradient(135deg, #0a0a0a, #404040)',
    apply: {
      dotsType: 'square',
      dotsColorMode: 'solid',
      dotsColor1: '#0a0a0a',
      dotsColor2: '#0a0a0a',
      dotsRotation: 0,
      cornerSquareType: 'square',
      cornerSquareColor: '#0a0a0a',
      cornerDotType: 'square',
      cornerDotColor: '#0a0a0a',
      bgMode: 'solid',
      bgColor: '#ffffff',
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    swatch: 'linear-gradient(135deg, #10b981, #06b6d4)',
    apply: {
      dotsType: 'dots',
      dotsColorMode: 'linear',
      dotsColor1: '#059669',
      dotsColor2: '#0891b2',
      dotsRotation: 30,
      cornerSquareType: 'dot',
      cornerSquareColor: '#0f766e',
      cornerDotType: 'dot',
      cornerDotColor: '#0891b2',
      bgMode: 'solid',
      bgColor: '#ecfdf5',
    },
  },
  {
    id: 'cyber',
    name: 'Cyber',
    swatch: 'linear-gradient(135deg, #facc15, #a855f7)',
    apply: {
      dotsType: 'extra-rounded',
      dotsColorMode: 'radial',
      dotsColor1: '#facc15',
      dotsColor2: '#a855f7',
      dotsRotation: 0,
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#facc15',
      cornerDotType: 'dot',
      cornerDotColor: '#a855f7',
      bgMode: 'solid',
      bgColor: '#0b0b14',
    },
  },
  {
    id: 'rose',
    name: 'Rose',
    swatch: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    apply: {
      dotsType: 'rounded',
      dotsColorMode: 'solid',
      dotsColor1: '#e11d48',
      dotsColor2: '#e11d48',
      dotsRotation: 0,
      cornerSquareType: 'extra-rounded',
      cornerSquareColor: '#9f1239',
      cornerDotType: 'dot',
      cornerDotColor: '#fb7185',
      bgMode: 'solid',
      bgColor: '#fff1f2',
    },
  },
  {
    id: 'ink',
    name: 'Ink',
    swatch: 'linear-gradient(135deg, #1e3a8a, #06b6d4)',
    apply: {
      dotsType: 'classy',
      dotsColorMode: 'linear',
      dotsColor1: '#1e3a8a',
      dotsColor2: '#0891b2',
      dotsRotation: 135,
      cornerSquareType: 'square',
      cornerSquareColor: '#1e3a8a',
      cornerDotType: 'square',
      cornerDotColor: '#0891b2',
      bgMode: 'solid',
      bgColor: '#f8fafc',
    },
  },
  {
    id: 'paper',
    name: 'Paper',
    swatch: 'linear-gradient(135deg, #292524, #78716c)',
    apply: {
      dotsType: 'square',
      dotsColorMode: 'solid',
      dotsColor1: '#1c1917',
      dotsColor2: '#1c1917',
      dotsRotation: 0,
      cornerSquareType: 'square',
      cornerSquareColor: '#1c1917',
      cornerDotType: 'square',
      cornerDotColor: '#78716c',
      bgMode: 'solid',
      bgColor: '#fafaf9',
    },
  },
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomHex = () => {
  const h = Math.floor(Math.random() * 360);
  const s = 60 + Math.floor(Math.random() * 30);
  const l = 40 + Math.floor(Math.random() * 30);
  return hslToHex(h, s, l);
};

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x) => Math.round(255 * x).toString(16).padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export const shuffleStyle = () => {
  const dotTypes = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'];
  const cornerSqTypes = ['square', 'dot', 'extra-rounded'];
  const cornerDotTypes = ['square', 'dot'];
  const c1 = randomHex();
  const c2 = randomHex();
  return {
    dotsType: pick(dotTypes),
    dotsColorMode: pick(['solid', 'linear', 'radial']),
    dotsColor1: c1,
    dotsColor2: c2,
    dotsRotation: Math.floor(Math.random() * 360),
    cornerSquareType: pick(cornerSqTypes),
    cornerSquareColor: c1,
    cornerDotType: pick(cornerDotTypes),
    cornerDotColor: c2,
    bgMode: 'solid',
    bgColor: '#ffffff',
  };
};
