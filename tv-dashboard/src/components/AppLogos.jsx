import { memo } from 'react';

export const AppLogo = memo(({ id }) => {
  switch (id) {
    case 'netflix':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <text x="50%" y="58" textAnchor="middle" fill="#E50914" fontFamily="Impact, Arial Black, sans-serif" fontSize="56" fontWeight="900" letterSpacing="4">
            NETFLIX
          </text>
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <rect x="28" y="18" width="62" height="44" rx="12" fill="#FF0000" />
          <polygon points="52,29 52,51 71,40" fill="#FFFFFF" />
          <text x="102" y="53" fill="#212121" fontFamily="system-ui, sans-serif" fontSize="38" fontWeight="800" letterSpacing="-1">
            YouTube
          </text>
        </svg>
      );
    case 'prime':
      return (
        <svg viewBox="0 0 300 90" className="brand-svg">
          <text x="50%" y="46" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="32" fontWeight="700">
            prime video
          </text>
          <path d="M 95 60 Q 150 80 205 60" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 196 55 L 207 60 L 199 69" fill="none" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'disney':
      return (
        <svg viewBox="0 0 300 100" className="brand-svg">
          <path d="M 65 55 Q 145 10 225 52" fill="none" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
          <text x="50%" y="72" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontSize="44" fontWeight="700" letterSpacing="1">
            Disney+
          </text>
        </svg>
      );
    case 'hbomax':
      return (
        <svg viewBox="0 0 300 100" className="brand-svg">
          <text x="50%" y="48" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial Black, sans-serif" fontSize="40" fontWeight="900" letterSpacing="2">
            HBO
          </text>
          <text x="50%" y="82" textAnchor="middle" fill="#E9D5FF" fontFamily="system-ui, sans-serif" fontSize="36" fontWeight="800" letterSpacing="1">
            max
          </text>
        </svg>
      );
    case 'paramount':
      return (
        <svg viewBox="0 0 300 100" className="brand-svg">
          <polygon points="150,14 115,56 185,56" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" />
          <polygon points="150,22 128,56 172,56" fill="#FFFFFF" opacity="0.3" />
          <text x="50%" y="82" textAnchor="middle" fill="#FFFFFF" fontFamily="Georgia, serif" fontStyle="italic" fontSize="30" fontWeight="700">
            Paramount+
          </text>
        </svg>
      );
    case 'lgstore':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <rect x="24" y="16" width="48" height="48" rx="12" fill="#A50034" />
          <text x="48" y="49" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="900">
            LG
          </text>
          <text x="86" y="48" fill="#1F2937" fontFamily="system-ui, sans-serif" fontSize="28" fontWeight="800">
            App Store
          </text>
        </svg>
      );
    case 'spotify':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <circle cx="58" cy="40" r="22" fill="#FFFFFF" />
          <path d="M 46 34 Q 58 29 70 35 M 48 41 Q 58 37 68 42 M 50 48 Q 58 45 66 49" stroke="#1DB954" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <text x="92" y="51" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="34" fontWeight="800">
            Spotify
          </text>
        </svg>
      );
    case 'twitch':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <text x="50%" y="53" textAnchor="middle" fill="#FFFFFF" fontFamily="Impact, system-ui, sans-serif" fontSize="42" fontWeight="900" letterSpacing="2">
            TWITCH
          </text>
        </svg>
      );
    case 'appletv':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <text x="50%" y="54" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="40" fontWeight="700">
             tv+
          </text>
        </svg>
      );
    case 'crunchyroll':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <circle cx="52" cy="40" r="18" fill="none" stroke="#FFFFFF" strokeWidth="5" />
          <circle cx="55" cy="40" r="8" fill="#FFFFFF" />
          <text x="82" y="50" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="30" fontWeight="800">
            Crunchyroll
          </text>
        </svg>
      );
    case 'vix':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <text x="50%" y="56" textAnchor="middle" fill="#FFFFFF" fontFamily="Arial Black, sans-serif" fontSize="50" fontWeight="900" letterSpacing="3">
            ViX
          </text>
        </svg>
      );
    case 'homebrew':
      return (
        <svg viewBox="0 0 300 85" className="brand-svg">
          <text x="50%" y="42" textAnchor="middle" fill="#38BDF8" fontFamily="system-ui, sans-serif" fontSize="25" fontWeight="900">
            HOMEBREW
          </text>
          <text x="50%" y="68" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="21" fontWeight="700">
            STORE (AdFree)
          </text>
        </svg>
      );
    case 'plex':
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <text x="50%" y="54" textAnchor="middle" fill="#E5A00D" fontFamily="Arial Black, sans-serif" fontSize="44" fontWeight="900" letterSpacing="2">
            PLEX
          </text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 300 80" className="brand-svg">
          <text x="50%" y="50" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, sans-serif" fontSize="27" fontWeight="800">
            {id.toUpperCase()}
          </text>
        </svg>
      );
  }
});
