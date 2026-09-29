import React from 'react'

export interface AppLogoProps {
  className?: string
  size?: number
}

/**
 * AppLogo: Fremgangskortet & Brandskjoldet (Logo #4)
 * Flashcard med synlige beståede tjekmærker, toppet af et gyldent & rødt brandmandsskjold.
 */
export const AppLogo: React.FC<AppLogoProps> = ({ className = 'w-10 h-10', size }) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
  >
    <defs>
      <linearGradient id="app-logo-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0f172a" />
        <stop offset="1" stopColor="#020617" />
      </linearGradient>
      <linearGradient id="app-logo-shield" x1="45" y1="20" x2="75" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ef4444" />
        <stop offset="1" stopColor="#991b1b" />
      </linearGradient>
    </defs>
    {/* Dark squircle container with subtle green badge border */}
    <rect width="120" height="120" rx="30" fill="url(#app-logo-bg)" stroke="rgba(34,197,94,0.3)" strokeWidth="2" />
    {/* Background angled card */}
    <rect x="32" y="32" width="56" height="68" rx="8" transform="rotate(-6 60 66)" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
    {/* Foreground Study Flashcard */}
    <rect x="32" y="30" width="56" height="70" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
    {/* Checklist Rows on Card (representing mastered quiz questions) */}
    <circle cx="42" cy="62" r="3.5" fill="#22c55e" />
    <path d="M40.5 62L41.5 63L43.5 61" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    <line x1="50" y1="62" x2="78" y2="62" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="42" cy="74" r="3.5" fill="#22c55e" />
    <path d="M40.5 74L41.5 75L43.5 73" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
    <line x1="50" y1="74" x2="74" y2="74" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    <circle cx="42" cy="86" r="3.5" fill="#f59e0b" />
    <line x1="50" y1="86" x2="68" y2="86" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
    {/* Firefighter Shield Badge at top of the card */}
    <path d="M46 22C46 22 60 17 60 17C60 17 74 22 74 22V40C74 49 60 56 60 56C60 56 46 49 46 40V22Z" fill="url(#app-logo-shield)" stroke="#fef08a" strokeWidth="2" />
    {/* Flame in Shield */}
    <path d="M60 27C60 27 65 32 65 37C65 40 63 42 60 42C57 42 55 40 55 37C55 33 60 27 60 27Z" fill="#fef08a" />
  </svg>
)

export default AppLogo
