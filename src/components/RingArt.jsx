import { useId } from 'react'

const palettes = {
  gold: {
    a: '#4b2f10',
    b: '#d9ad61',
    c: '#fff1cb',
    d: '#8e5d23',
    gemA: '#fffaf0',
    gemB: '#e2bd7a',
    gemC: '#8d5b21',
    glow: '#d8b678',
  },
  silver: {
    a: '#343a40',
    b: '#cfd6dc',
    c: '#ffffff',
    d: '#747e87',
    gemA: '#ffffff',
    gemB: '#c4d0da',
    gemC: '#65727e',
    glow: '#b9c8d6',
  },
  noir: {
    a: '#08080a',
    b: '#3c3c45',
    c: '#c8c8d2',
    d: '#141418',
    gemA: '#ffffff',
    gemB: '#b8b8c4',
    gemC: '#4b4b57',
    glow: '#8f8fa0',
  },
}

export default function RingArt({ variant = 'gold' }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const palette = palettes[variant] ?? palettes.gold
  const band = `band-${uid}`
  const gem = `gem-${uid}`
  const shade = `shade-${uid}`
  const glow = `glow-${uid}`

  return (
    <svg
      className="ring-art"
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={band} x1="110" y1="120" x2="330" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.c} />
          <stop offset="0.2" stopColor={palette.b} />
          <stop offset="0.48" stopColor={palette.a} />
          <stop offset="0.72" stopColor={palette.b} />
          <stop offset="1" stopColor={palette.d} />
        </linearGradient>
        <linearGradient id={gem} x1="180" y1="55" x2="245" y2="135" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.gemA} />
          <stop offset="0.38" stopColor={palette.gemB} />
          <stop offset="1" stopColor={palette.gemC} />
        </linearGradient>
        <radialGradient id={shade} cx="0" cy="0" r="1" gradientTransform="translate(210 228) rotate(90) scale(155)">
          <stop stopColor={palette.glow} stopOpacity="0.24" />
          <stop offset="1" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
        <filter id={glow} x="-45%" y="-45%" width="190%" height="190%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="210" cy="220" r="150" fill={`url(#${shade})`} />

      <ellipse cx="210" cy="250" rx="100" ry="36" fill="#000" fillOpacity="0.38" />

      <g filter={`url(#${glow})`} className="ring-art__band">
        <ellipse
          cx="210"
          cy="232"
          rx="103"
          ry="121"
          stroke={`url(#${band})`}
          strokeWidth="29"
        />
        <ellipse
          cx="210"
          cy="232"
          rx="103"
          ry="121"
          stroke="#000"
          strokeOpacity="0.32"
          strokeWidth="10"
          strokeDasharray="150 190"
          strokeDashoffset="20"
        />
        <path
          d="M127 177c19-47 55-76 100-85"
          stroke={palette.c}
          strokeOpacity="0.72"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M302 294c-16 34-43 58-78 71"
          stroke={palette.b}
          strokeOpacity="0.34"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <g className="ring-art__gem">
        <path d="M210 47 258 95 210 149 162 95Z" fill={`url(#${gem})`} />
        <path d="M210 47 210 149 162 95Z" fill="#fff" fillOpacity="0.28" />
        <path d="M210 47 258 95 210 149Z" fill={palette.a} fillOpacity="0.28" />
        <path d="M210 74 239 95 210 124 181 95Z" fill="#fff" fillOpacity="0.2" />
        <path d="M162 95h96M210 47v102" stroke="#fff" strokeOpacity="0.26" strokeWidth="0.8" />
        <path d="m171 82-11-13M252 83l12-14M210 154v17" stroke={palette.c} strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
        <path d="M178 95c-4 10-2 19 6 26M242 95c4 10 2 19-6 26" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.2" />
      </g>

      <g className="ring-art__sparkles" stroke={palette.c} strokeLinecap="round">
        <path d="M87 110v18M78 119h18" strokeWidth="1" opacity="0.8" />
        <path d="M343 190v14M336 197h14" strokeWidth="0.9" opacity="0.65" />
        <path d="M112 322v10M107 327h10" strokeWidth="0.8" opacity="0.5" />
        <circle cx="326" cy="104" r="1.5" fill={palette.c} stroke="none" opacity="0.7" />
        <circle cx="99" cy="260" r="1.2" fill={palette.c} stroke="none" opacity="0.6" />
      </g>
    </svg>
  )
}
