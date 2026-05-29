import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #1B3A4B 0%, #0e1d25 100%)',
          borderRadius: '50%',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11" stroke="#C9A227" strokeWidth="1.2" opacity="0.5" />
          <path
            d="M16 7v18M11 11l5-4 5 4M11 21l5 4 5-4"
            stroke="#E8C547"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  )
}
