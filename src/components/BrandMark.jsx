// QR-style brand mark rebuilt from the reference: three finder patterns
// (top-left, top-right, bottom-left) + a data-module quadrant (bottom-right).
// Geometry is shared with public/favicon.svg — keep them in sync.

const Q = 20; // quadrant size
const TL = [9, 9];
const TR = [35, 9];
const BL = [9, 35];
const BR = [35, 35];

// 5×5 data grid for the bottom-right quadrant (1 = filled module).
const DATA = [
  [1, 1, 0, 1, 0],
  [1, 1, 0, 0, 1],
  [0, 0, 1, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1],
];

function Finder({ x, y, hole }) {
  return (
    <>
      <rect x={x} y={y} width={Q} height={Q} rx="3" fill="url(#bm-grad)" />
      {/* Negative ring: lets the tile colour show through. */}
      <rect x={x + 4} y={y + 4} width={Q - 8} height={Q - 8} rx="2" fill={hole} />
      <rect x={x + 7.5} y={y + 7.5} width="5" height="5" rx="1.5" fill="url(#bm-grad)" />
    </>
  );
}

export default function BrandMark({ size = 40, tile = true, className }) {
  const cell = Q / 5;
  const hole = tile ? '#19171e' : 'var(--bg-1, #19171e)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="QR Stylisé"
      className={className}
    >
      <defs>
        <linearGradient id="bm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6dff0" />
          <stop offset="0.55" stopColor="#b9adcb" />
          <stop offset="1" stopColor="#8f8799" />
        </linearGradient>
      </defs>
      {tile && <rect width="64" height="64" rx="15" fill={hole} />}
      <Finder x={TL[0]} y={TL[1]} hole={hole} />
      <Finder x={TR[0]} y={TR[1]} hole={hole} />
      <Finder x={BL[0]} y={BL[1]} hole={hole} />
      <g fill="url(#bm-grad)">
        {DATA.flatMap((rowArr, r) =>
          rowArr.map((v, c) =>
            v ? (
              <rect
                key={`${r}-${c}`}
                x={BR[0] + c * cell + 0.35}
                y={BR[1] + r * cell + 0.35}
                width={cell - 0.7}
                height={cell - 0.7}
                rx="0.8"
              />
            ) : null
          )
        )}
      </g>
    </svg>
  );
}
