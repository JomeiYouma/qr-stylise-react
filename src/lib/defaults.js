export const defaultState = () => ({
  data: 'https://github.com',
  size: 512,
  margin: 8,
  errorCorrectionLevel: 'Q',
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
  bgRound: 0,
  mono: false,
  logo: null,
  logoSize: 0.3,
  logoMargin: 6,
  logoHideDots: true,
});

export const DOT_TYPES = ['square', 'rounded', 'dots', 'classy', 'classy-rounded', 'extra-rounded'];
export const CORNER_SQUARE_TYPES = ['square', 'dot', 'extra-rounded'];
export const CORNER_DOT_TYPES = ['square', 'dot'];
export const EC_LEVELS = ['L', 'M', 'Q', 'H'];

export const toRadians = (deg) => (Number(deg) || 0) * Math.PI / 180;

// 0..1 fraction; clamps loosely-typed input.
const clamp01 = (v) => Math.max(0, Math.min(1, Number(v) || 0));

export const buildQrOptions = (state) => {
  const size = Math.max(64, Math.min(2048, Number(state.size) || 512));

  // Black & white mode: forces a maximally scannable monochrome QR
  // (pure black on white) regardless of the colour/gradient settings.
  const mono = !!state.mono;

  // qr-code-styling's update() deep-merges only the keys present in the new
  // options, so a stale `gradient` from a previous style survives when we
  // switch to a solid colour (and the library renders gradient over color).
  // Always emit BOTH `color` and `gradient` (one set to undefined) so every
  // update fully overwrites the previous colour state.
  const colorBlock = (useGradient, mode, c1, c2, rotationDeg) =>
    useGradient
      ? {
          color: undefined,
          gradient: {
            type: mode,
            rotation: toRadians(rotationDeg),
            colorStops: [
              { offset: 0, color: c1 },
              { offset: 1, color: c2 },
            ],
          },
        }
      : { color: c1, gradient: undefined };

  const dotsUsesGradient = !mono && state.dotsColorMode !== 'solid';
  const dotsOptions = {
    type: state.dotsType,
    ...colorBlock(
      dotsUsesGradient,
      state.dotsColorMode,
      mono ? '#000000' : state.dotsColor1,
      state.dotsColor2,
      state.dotsRotation
    ),
  };

  const cornerSquareColor = mono ? '#000000' : state.cornerSquareColor;
  const cornerDotColor = mono ? '#000000' : state.cornerDotColor;

  const round = clamp01(state.bgRound);
  const bgColor = !mono && state.bgMode === 'transparent'
    ? 'transparent'
    : (mono ? '#ffffff' : state.bgColor);
  const backgroundOptions = { color: bgColor, gradient: undefined, round };

  return {
    width: size,
    height: size,
    type: 'canvas',
    data: state.data || ' ',
    margin: Number(state.margin) || 0,
    qrOptions: { errorCorrectionLevel: state.errorCorrectionLevel },
    dotsOptions,
    cornersSquareOptions: {
      type: state.cornerSquareType,
      color: cornerSquareColor,
      gradient: undefined,
    },
    cornersDotOptions: {
      type: state.cornerDotType,
      color: cornerDotColor,
      gradient: undefined,
    },
    backgroundOptions,
    image: state.logo || undefined,
    imageOptions: {
      hideBackgroundDots: state.logoHideDots,
      imageSize: Number(state.logoSize) || 0.3,
      margin: Number(state.logoMargin) || 0,
      crossOrigin: 'anonymous',
    },
  };
};
