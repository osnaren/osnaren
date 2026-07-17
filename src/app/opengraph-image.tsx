import { ImageResponse } from 'next/og';

export const alt = 'Obuli Sai Naren — I build useful frontend products from everyday problems.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 64,
        background: '#14151a',
        color: '#f0eee7',
        backgroundImage:
          'linear-gradient(rgba(240,238,231,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,238,231,0.05) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 52,
            height: 52,
            background: '#f0eee7',
            color: '#14151a',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          ON
        </div>
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 2, fontWeight: 600 }}>
          OSNAREN<span style={{ color: '#e8834a' }}>.LAB</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#5bbd8d', fontSize: 20, letterSpacing: 3 }}
        >
          <div style={{ width: 12, height: 12, borderRadius: 12, background: '#5bbd8d', display: 'flex' }} />
          BENCH POWERED ON — ALL MODULES LIVE
        </div>
        <div
          style={{ display: 'flex', fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 900, letterSpacing: -1 }}
        >
          I build useful frontend products from everyday problems.
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#9b9ea8' }}>
          Obuli Sai Naren · Frontend Engineer · React · TypeScript · UX · a11y
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        {['OSN-001 SHADYSIDE', 'OSN-002 THEFLAMES', 'OSN-011 LAB', 'OSN-013 RESUME'].map((chip) => (
          <div
            key={chip}
            style={{
              display: 'flex',
              border: '1px solid #2a2c34',
              background: '#1b1d24',
              borderRadius: 10,
              padding: '12px 20px',
              fontSize: 18,
              letterSpacing: 2,
              color: '#e8834a',
            }}
          >
            {chip}
          </div>
        ))}
      </div>
    </div>,
    size
  );
}
