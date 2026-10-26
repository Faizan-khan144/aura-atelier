import { useId } from 'react'

const points = [
  [255, 612],
  [192, 552],
  [154, 506],
  [120, 468],
  [92, 438],
  [205, 420],
  [190, 330],
  [182, 262],
  [178, 205],
  [270, 410],
  [268, 300],
  [267, 225],
  [266, 160],
  [325, 420],
  [338, 330],
  [347, 260],
  [352, 200],
  [375, 445],
  [400, 380],
  [420, 325],
  [438, 282],
]

const bones = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17], [0, 9],
]

const nodes = [
  { x: 350, y: 231, rx: 34, ry: 13 },
]

export default function HandScan({ compact = false }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gem = `gem-${uid}`
  const glow = `glow-${uid}`
  const aura = `aura-${uid}`

  return (
    <svg
      className={`hand-scan ${compact ? 'hand-scan--compact' : ''}`}
      viewBox="0 0 520 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gem} x1="320" y1="175" x2="382" y2="239" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.38" stopColor="currentColor" stopOpacity="0.72" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.28" />
        </linearGradient>
        <radialGradient id={aura} cx="0" cy="0" r="1" gradientTransform="translate(280 405) rotate(90) scale(245 205)">
          <stop stopColor="currentColor" stopOpacity="0.14" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <filter id={glow} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="270" cy="410" rx="220" ry="270" fill={`url(#${aura})`} />
      <circle cx="350" cy="231" r="92" stroke="currentColor" strokeOpacity="0.14" />
      <circle cx="350" cy="231" r="128" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="2 9" />

      <g className="hand-bones">
        {bones.map(([a, b], index) => {
          const [x1, y1] = points[a]
          const [x2, y2] = points[b]
          return (
            <line
              key={`${a}-${b}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={index < 4 ? 1.1 : 1.7}
              strokeOpacity={index < 4 ? 0.5 : 0.82}
              strokeLinecap="round"
              pathLength="1"
              style={{ animationDelay: `${index * 55}ms` }}
            />
          )
        })}
      </g>

      <path
        d="M255 612 192 552 120 468 92 438 178 205 266 160 352 200 438 282 375 445Z"
        fill="currentColor"
        fillOpacity="0.045"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="1"
      />

      <g className="hand-joints">
        {points.map(([cx, cy], index) => (
          <g key={`${cx}-${cy}`} style={{ animationDelay: `${800 + index * 45}ms` }}>
            <circle cx={cx} cy={cy} r={index === 0 ? 5 : 3.2} fill="currentColor" fillOpacity="0.95" />
            <circle cx={cx} cy={cy} r={index === 0 ? 12 : 8} stroke="currentColor" strokeOpacity="0.18" />
          </g>
        ))}
      </g>

      {nodes.map(({ x, y, rx, ry }) => (
        <g key={`${x}-${y}`} filter={`url(#${glow})`} className="hand-ring">
          <ellipse
            cx={x}
            cy={y}
            rx={rx}
            ry={ry}
            transform={`rotate(-8 ${x} ${y})`}
            stroke="currentColor"
            strokeWidth="7"
          />
          <ellipse
            cx={x}
            cy={y - 1}
            rx={rx - 4}
            ry={ry - 3}
            transform={`rotate(-8 ${x} ${y})`}
            stroke="#ffffff"
            strokeOpacity="0.48"
            strokeWidth="1.2"
          />
          <path
            d={`M${x} ${y - 35} l20 19 -20 27 -20 -27Z`}
            fill={`url(#${gem})`}
            stroke="currentColor"
            strokeOpacity="0.7"
            strokeWidth="0.8"
          />
          <path
            d={`M${x} ${y - 35} l-9 19 9 27 9 -27Z`}
            fill="#ffffff"
            fillOpacity="0.32"
          />
          <path
            d={`M${x} ${y + 8} l-13 8 13 10 13-10Z`}
            fill="currentColor"
            fillOpacity="0.28"
          />
        </g>
      ))}

      <g stroke="currentColor" strokeLinecap="round" opacity="0.6">
        <path d="M73 300v24M61 312h24" strokeWidth="1" />
        <path d="M450 454v18M441 463h18" strokeWidth="0.8" />
      </g>
    </svg>
  )
}
