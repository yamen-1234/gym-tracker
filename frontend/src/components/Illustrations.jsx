// Minimal line-based SVG illustrations, drawn in the brand accent colors.
// Kept as components so they inherit currentColor / theme easily.

export function HeroIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Barbell */}
      <rect x="60" y="175" width="360" height="14" rx="7" fill="var(--accent-blue)" />
      <rect x="30" y="140" width="26" height="84" rx="8" fill="var(--accent-orange)" />
      <rect x="4" y="155" width="20" height="54" rx="6" fill="var(--accent-orange)" opacity="0.6" />
      <rect x="424" y="140" width="26" height="84" rx="8" fill="var(--accent-orange)" />
      <rect x="456" y="155" width="20" height="54" rx="6" fill="var(--accent-orange)" opacity="0.6" />

      {/* Ascending progress bars behind the bar */}
      <rect x="110" y="230" width="28" height="60" rx="6" fill="var(--accent-blue)" opacity="0.18" />
      <rect x="160" y="205" width="28" height="85" rx="6" fill="var(--accent-blue)" opacity="0.28" />
      <rect x="210" y="170" width="28" height="120" rx="6" fill="var(--accent-blue)" opacity="0.4" />
      <rect x="260" y="130" width="28" height="160" rx="6" fill="var(--accent-orange)" opacity="0.55" />
      <rect x="310" y="90" width="28" height="200" rx="6" fill="var(--accent-orange)" />

      {/* Trend line + dot */}
      <path
        d="M124 260 L174 230 L224 200 L274 150 L324 100"
        stroke="var(--fc-primary)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="324" cy="100" r="9" fill="var(--fc-primary)" />
    </svg>
  );
}

export function TrackerIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="180" height="140" rx="18" fill="var(--bg-panel)" stroke="var(--border-subtle)" strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 9 }).map((_, col) => {
          const intensity = (row + col) % 4;
          const colors = ['var(--border-subtle)', 'rgba(254,119,67,0.35)', 'rgba(254,119,67,0.65)', 'var(--accent-orange)'];
          return (
            <rect
              key={`${row}-${col}`}
              x={26 + col * 18}
              y={26 + row * 18}
              width="12"
              height="12"
              rx="4"
              fill={colors[intensity]}
            />
          );
        })
      )}
    </svg>
  );
}

export function GraphIllustration({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="180" height="140" rx="18" fill="var(--bg-panel)" stroke="var(--border-subtle)" strokeWidth="2" />
      <path
        d="M30 120 L60 95 L90 105 L120 65 L150 75 L170 40"
        stroke="var(--accent-orange)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M30 120 L60 95 L90 105 L120 65 L150 75 L170 40 L170 130 L30 130 Z"
        fill="var(--accent-orange)"
        opacity="0.12"
      />
      {[30, 60, 90, 120, 150, 170].map((x, i) => {
        const ys = [120, 95, 105, 65, 75, 40];
        return <circle key={x} cx={x} cy={ys[i]} r="4.5" fill="var(--accent-blue)" />;
      })}
    </svg>
  );
}

export function LogoMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="11" width="6" height="6" rx="2" fill="var(--accent-orange)" />
      <rect x="20" y="11" width="6" height="6" rx="2" fill="var(--accent-orange)" />
      <rect x="9" y="13" width="10" height="2.5" rx="1.25" fill="var(--fc-primary)" />
    </svg>
  );
}
