// Manda — brand tokens + shared atoms
// Green-and-white financial messenger. Wordmark uses display weight,
// numerals use tabular figures so amounts align.

const MANDA = {
  // Greens
  green: '#1A8754',       // primary brand
  greenDeep: '#0B4D2F',   // headers, deep bg
  greenInk: '#062618',    // near-black text on green
  greenSoft: '#E8F5EE',   // soft tint bg
  greenMint: '#C6F0D6',   // chip / highlight
  greenBright: '#00C281', // CTA accent

  // Neutrals
  white: '#FFFFFF',
  paper: '#F6F8F6',       // app bg
  cardBorder: '#E6ECE7',
  divider: '#EEF1EE',
  ink: '#0E1F18',         // primary text
  inkMuted: '#5C6B62',
  inkSubtle: '#8A9690',

  // Status
  warn: '#C97A1F',
  warnSoft: '#FFF1DD',
  danger: '#C5483B',
  dangerSoft: '#FCE9E6',

  // Bubbles
  bubbleMe: '#1A8754',
  bubbleMeInk: '#FFFFFF',
  bubbleThem: '#FFFFFF',
  bubbleThemInk: '#0E1F18',

  font: '"Plus Jakarta Sans", -apple-system, system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
};

// ──────────────────────────────────────────────────────────────
// Logo + glyph
// ──────────────────────────────────────────────────────────────
function MandaGlyph({ size = 32, color = MANDA.white, bg = MANDA.green }) {
  // A paper-plane / chat-bubble hybrid. Stylized "M" inside a soft square.
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28,
      background: bg, display: 'inline-flex',
      alignItems: 'center', justifyContent: 'center',
      boxShadow: `0 ${size * 0.06}px ${size * 0.18}px ${bg}40`,
    }}>
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" fill="none">
        {/* speech-bubble + arrow combo */}
        <path d="M3 5.2C3 4.1 3.9 3.2 5 3.2H19C20.1 3.2 21 4.1 21 5.2V15.6C21 16.7 20.1 17.6 19 17.6H13.4L9.8 21.2C9.2 21.8 8.2 21.4 8.2 20.6V17.6H5C3.9 17.6 3 16.7 3 15.6V5.2Z" fill={color} opacity="0.18"/>
        <path d="M7 10.5L11 13.5L17 7.5" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function MandaWordmark({ size = 28, color = MANDA.ink }) {
  return (
    <span style={{
      fontFamily: MANDA.font, fontWeight: 800, fontSize: size,
      letterSpacing: -size * 0.035, color, lineHeight: 1,
    }}>manda<span style={{ color: MANDA.green }}>.</span></span>
  );
}

// ──────────────────────────────────────────────────────────────
// Avatar — initials on a tinted background; supports verified badge
// ──────────────────────────────────────────────────────────────
const AV_PALETTE = [
  ['#0B4D2F', '#C6F0D6'], ['#7A3D0E', '#FFE0B8'], ['#3D2A6E', '#E1D9FF'],
  ['#6E1A2C', '#FFD6DD'], ['#1A4F6E', '#CDE6F2'], ['#3D5E1A', '#DCEFB8'],
  ['#5E1A6E', '#F2D6FA'], ['#1A6E5E', '#C6F0E6'],
];
function avColors(seed = '') {
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AV_PALETTE[h % AV_PALETTE.length];
}
function Avatar({ name = '?', size = 44, src, verified, ring }) {
  const [ink, bg] = avColors(name);
  const initials = name.split(' ').slice(0, 2).map(n => n[0] || '').join('').toUpperCase();
  return (
    <div style={{ position: 'relative', flexShrink: 0, width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        background: src ? `url(${src}) center/cover` : bg,
        color: ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: MANDA.font, fontWeight: 700, fontSize: size * 0.38,
        letterSpacing: -0.3,
        boxShadow: ring ? `0 0 0 2px ${MANDA.white}, 0 0 0 4px ${MANDA.green}` : 'none',
      }}>{!src && initials}</div>
      {verified && (
        <div style={{
          position: 'absolute', right: -2, bottom: -2,
          width: size * 0.36, height: size * 0.36, borderRadius: '50%',
          background: MANDA.green, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 2px ${MANDA.white}`,
        }}>
          <svg width={size * 0.22} height={size * 0.22} viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L20 7" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}

// Stacked-avatar group glyph (for group chats)
function GroupAvatar({ names = [], size = 44 }) {
  const s1 = size * 0.66, s2 = size * 0.66;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <Avatar name={names[0] || 'A'} size={s1} />
      </div>
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        boxShadow: `0 0 0 2px ${MANDA.white}`, borderRadius: '50%',
      }}>
        <Avatar name={names[1] || 'B'} size={s2} />
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Buttons + Inputs
// ──────────────────────────────────────────────────────────────
function PrimaryButton({ children, full, disabled, onClick, size = 'md', tone = 'green', icon, style }) {
  const heights = { sm: 40, md: 52, lg: 56 };
  const bg = disabled ? '#C4D2CB' : tone === 'dark' ? MANDA.greenDeep : MANDA.green;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height: heights[size], width: full ? '100%' : 'auto',
      padding: '0 22px', borderRadius: heights[size] / 2,
      background: bg, color: MANDA.white, border: 'none',
      fontFamily: MANDA.font, fontWeight: 700, fontSize: 16,
      letterSpacing: -0.2, cursor: disabled ? 'default' : 'pointer',
      boxShadow: disabled ? 'none' : `0 6px 20px ${MANDA.green}30`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      gap: 8, ...style,
    }}>
      {icon}{children}
    </button>
  );
}

function GhostButton({ children, full, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      height: 52, width: full ? '100%' : 'auto',
      padding: '0 22px', borderRadius: 26,
      background: 'transparent', color: MANDA.green, border: `1.5px solid ${MANDA.green}`,
      fontFamily: MANDA.font, fontWeight: 700, fontSize: 16,
      cursor: 'pointer', ...style,
    }}>{children}</button>
  );
}

function TextField({ label, value, placeholder, prefix, suffix, type = 'text', hint, error }) {
  return (
    <label style={{ display: 'block', fontFamily: MANDA.font }}>
      {label && (
        <div style={{
          fontSize: 13, fontWeight: 600, color: MANDA.inkMuted,
          marginBottom: 6, letterSpacing: 0.1, textTransform: 'uppercase',
        }}>{label}</div>
      )}
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 52, padding: '0 14px',
        background: MANDA.white, borderRadius: 14,
        border: `1.5px solid ${error ? MANDA.danger : MANDA.cardBorder}`,
        gap: 10,
      }}>
        {prefix && <div style={{ color: MANDA.inkSubtle, fontWeight: 600 }}>{prefix}</div>}
        <div style={{
          flex: 1, fontSize: 16, color: value ? MANDA.ink : MANDA.inkSubtle,
          fontWeight: value ? 600 : 500,
        }}>{value || placeholder}</div>
        {suffix}
      </div>
      {hint && (
        <div style={{ fontSize: 12, color: error ? MANDA.danger : MANDA.inkSubtle, marginTop: 6 }}>{hint}</div>
      )}
    </label>
  );
}

// ──────────────────────────────────────────────────────────────
// Icon set — outline 24×24, strokeWidth 1.8
// ──────────────────────────────────────────────────────────────
const Icon = {
  search: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke={c} strokeWidth="1.8"/>
      <path d="M20 20l-3.5-3.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  plus: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={c} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  pencilSquare: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M14 6l3 3" stroke={c} strokeWidth="1.6"/>
    </svg>
  ),
  send: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3.5 12L20.5 4l-3.5 17-5-7-8.5-2z" fill={c}/>
    </svg>
  ),
  mic: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="9" y="3" width="6" height="12" rx="3" stroke={c} strokeWidth="1.8"/>
      <path d="M5 11a7 7 0 0014 0M12 18v3" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  paperclip: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M20 12l-8 8a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 11-3-3L15 7" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  camera: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 8h3l2-2h6l2 2h3a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2v-8a2 2 0 012-2z" stroke={c} strokeWidth="1.7"/>
      <circle cx="12" cy="13" r="3.5" stroke={c} strokeWidth="1.7"/>
    </svg>
  ),
  chevronRight: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M9 6l6 6-6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronLeft: (s = 24, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  exchange: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 8h14l-3-3M20 16H6l3 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  shield: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l8 3v6c0 4.5-3 8-8 10-5-2-8-5.5-8-10V6l8-3z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M8.5 12l2.5 2.5L16 10" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 12l5 5L20 7" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  doubleCheck: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="none">
      <path d="M1 10l4 4 9-9M8 14l1 1 9-9" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  bank: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M3 9l9-5 9 5v1H3V9z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  user: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.8"/>
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke={c} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  wallet: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="14" rx="3" stroke={c} strokeWidth="1.7"/>
      <path d="M3 10h18" stroke={c} strokeWidth="1.7"/>
      <circle cx="16.5" cy="15" r="1.4" fill={c}/>
    </svg>
  ),
  chat: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2h-7l-4 4v-4H6a2 2 0 01-2-2V6z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  star: (s = 22, c = 'currentColor', filled) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'}>
      <path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.6L12 18l-5.9 3.1 1.2-6.6L2.5 9.9 9.1 9 12 3z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  arrowUpRight: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M7 17L17 7M9 7h8v8" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowDownLeft: (s = 16, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M17 7L7 17M15 17H7V9" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lock: (s = 22, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="4" y="11" width="16" height="10" rx="2.5" stroke={c} strokeWidth="1.7"/>
      <path d="M8 11V8a4 4 0 018 0v3" stroke={c} strokeWidth="1.7"/>
    </svg>
  ),
  copy: (s = 18, c = 'currentColor') => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke={c} strokeWidth="1.7"/>
      <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke={c} strokeWidth="1.7"/>
    </svg>
  ),
  flag: (s = 14) => (
    <svg width={s * 1.4} height={s} viewBox="0 0 20 14" style={{ borderRadius: 2, display: 'block' }}>
      <rect width="20" height="14" fill="#CE1126"/>
      <rect width="20" height="7" fill="#000"/>
      <path d="M10 4l.6 1.7H12L11 6.8l.4 1.7L10 7.5l-1.4 1L9 6.8 8 5.7h1.4z" fill="#FFCB1F"/>
    </svg>
  ),
};

// Tiny utility — render currency with tabular figures
function Amount({ value, currency = 'Kz', big, weight = 700, color }) {
  const fmt = new Intl.NumberFormat('pt-AO', { maximumFractionDigits: 2 }).format(value);
  const size = big === 'xl' ? 34 : big === 'lg' ? 24 : big === 'sm' ? 13 : 16;
  return (
    <span style={{
      fontFamily: MANDA.font, fontWeight: weight, fontSize: size,
      fontVariantNumeric: 'tabular-nums', color: color || MANDA.ink,
      letterSpacing: size > 24 ? -0.8 : -0.3,
    }}>
      {currency === 'Kz' ? '' : currency === '$' ? '$' : currency === '€' ? '€' : ''}
      {fmt}
      {currency === 'Kz' && <span style={{ marginLeft: 4, opacity: 0.55, fontWeight: 600 }}>Kz</span>}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// Skeleton / shimmer loading atoms
// ──────────────────────────────────────────────────────────────
// Inject keyframes once so any Skeleton anywhere uses the same animation.
if (typeof document !== 'undefined' && !document.getElementById('manda-skeleton-css')) {
  const st = document.createElement('style');
  st.id = 'manda-skeleton-css';
  st.textContent = `
    @keyframes mandaShimmer {
      0%   { background-position: -240px 0; }
      100% { background-position: 240px 0; }
    }
    .manda-skel {
      background: linear-gradient(90deg,
        #EDF1EE 0%,
        #F6F8F6 40%,
        #FFFFFF 50%,
        #F6F8F6 60%,
        #EDF1EE 100%);
      background-size: 480px 100%;
      animation: mandaShimmer 1.4s linear infinite;
    }
    .manda-skel-dark {
      background: linear-gradient(90deg,
        #DDE6E0 0%,
        #E8EEEA 40%,
        #F2F6F3 50%,
        #E8EEEA 60%,
        #DDE6E0 100%);
      background-size: 480px 100%;
      animation: mandaShimmer 1.4s linear infinite;
    }
  `;
  document.head.appendChild(st);
}

function Skeleton({ w = '100%', h = 14, r = 8, tone = 'light', style }) {
  return (
    <div className={tone === 'dark' ? 'manda-skel-dark' : 'manda-skel'} style={{
      width: w, height: h, borderRadius: r, ...style,
    }} />
  );
}

function SkelCircle({ size = 44, tone = 'light', style }) {
  return <Skeleton w={size} h={size} r={size} tone={tone} style={style} />;
}

Object.assign(window, {
  MANDA, MandaGlyph, MandaWordmark,
  Avatar, GroupAvatar,
  PrimaryButton, GhostButton, TextField,
  Icon, Amount,
  Skeleton, SkelCircle,
});
