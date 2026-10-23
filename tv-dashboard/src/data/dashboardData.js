export const INITIAL_ROWS = [
  {
    id: 'apps',
    title: 'Aplicaciones de Streaming y Entretenimiento',
    items: [
      {
        id: 'app-yt',
        title: 'YouTube',
        subtitle: 'App Nativa / AdFree',
        badge: 'VIDEO 4K',
        appId: 'youtube.leanback.v4',
        url: 'https://www.youtube.com/tv',
        brandColor: '#ff0033',
        icon: '▶'
      },
      {
        id: 'app-nf',
        title: 'Netflix',
        subtitle: 'Sesión activa • Ultra HD',
        badge: 'CINE & SERIES',
        appId: 'netflix',
        url: 'https://www.netflix.com/browse',
        brandColor: '#e50914',
        icon: 'N'
      },
      {
        id: 'app-dp',
        title: 'Disney+',
        subtitle: 'Pixar • Marvel • Star Wars',
        badge: 'STREAMING',
        appId: 'com.disney.disneyplus-prod',
        url: 'https://www.disneyplus.com',
        brandColor: '#0063e5',
        icon: '✦'
      },
      {
        id: 'app-pv',
        title: 'Prime Video',
        subtitle: 'Amazon Originals',
        badge: 'CINE 4K',
        appId: 'amazon',
        url: 'https://www.primevideo.com',
        brandColor: '#00a8e1',
        icon: '✓'
      },
      {
        id: 'app-max',
        title: 'Max',
        subtitle: 'HBO • Warner Bros',
        badge: 'PREMIUM',
        appId: 'com.hbo.hbomax',
        url: 'https://play.max.com',
        brandColor: '#7b2cbf',
        icon: 'M'
      },
      {
        id: 'app-tw',
        title: 'Twitch',
        subtitle: 'Canales en vivo',
        badge: 'LIVE',
        appId: 'tv.twitch.tv.starshot.lg',
        url: 'https://www.twitch.tv',
        brandColor: '#9146ff',
        icon: '⚡'
      },
      {
        id: 'app-sp',
        title: 'Spotify',
        subtitle: 'Música y Podcasts',
        badge: 'AUDIO',
        appId: 'spotify-beehive',
        url: 'https://open.spotify.com',
        brandColor: '#1db954',
        icon: '♫'
      }
    ]
  },
  {
    id: 'continue',
    title: 'Continuar Viendo',
    items: [
      {
        id: 'cont-1',
        title: 'Stranger Things • T4:E9',
        subtitle: 'Quedan 24 min',
        badge: 'NETFLIX',
        appId: 'netflix',
        url: 'https://www.netflix.com',
        brandColor: '#e50914',
        progress: 78,
        icon: '▶'
      },
      {
        id: 'cont-2',
        title: 'The Last of Us • T2:E3',
        subtitle: 'Quedan 35 min',
        badge: 'MAX',
        appId: 'com.hbo.hbomax',
        url: 'https://play.max.com',
        brandColor: '#7b2cbf',
        progress: 52,
        icon: '▶'
      },
      {
        id: 'cont-3',
        title: 'The Boys • T4:E8',
        subtitle: 'Quedan 15 min',
        badge: 'PRIME VIDEO',
        appId: 'amazon',
        url: 'https://www.primevideo.com',
        brandColor: '#00a8e1',
        progress: 84,
        icon: '▶'
      },
      {
        id: 'cont-4',
        title: 'The Mandalorian • T3:E5',
        subtitle: 'Quedan 12 min',
        badge: 'DISNEY+',
        appId: 'com.disney.disneyplus-prod',
        url: 'https://www.disneyplus.com',
        brandColor: '#0063e5',
        progress: 88,
        icon: '▶'
      },
      {
        id: 'cont-5',
        title: '+ Agregar Acceso Rápido',
        subtitle: 'Personalizar tarjeta o URL',
        badge: 'PERSONALIZAR',
        action: 'ADD_CUSTOM',
        brandColor: '#00e5ff',
        icon: '＋'
      }
    ]
  },
  {
    id: 'history',
    title: 'Historial de Uso Reciente',
    items: [
      {
        id: 'hist-1',
        title: 'Netflix',
        subtitle: 'Sesión guardada en TV',
        badge: 'RECIENTE',
        appId: 'netflix',
        url: 'https://www.netflix.com',
        brandColor: '#e50914',
        icon: 'N'
      },
      {
        id: 'hist-2',
        title: 'YouTube',
        subtitle: 'Sesión guardada en TV',
        badge: 'RECIENTE',
        appId: 'youtube.leanback.v4',
        url: 'https://www.youtube.com/tv',
        brandColor: '#ff0033',
        icon: '▶'
      },
      {
        id: 'hist-3',
        title: 'Navegador Web TV',
        subtitle: 'Pantalla completa',
        badge: 'SISTEMA',
        appId: 'com.webos.app.browser',
        url: 'https://www.google.com',
        brandColor: '#00e5ff',
        icon: '🌐'
      },
      {
        id: 'hist-4',
        title: 'Limpiar Historial',
        subtitle: 'Restaurar actividad reciente',
        badge: 'AJUSTES',
        action: 'CLEAR_HISTORY',
        brandColor: '#ff4d6d',
        icon: '↺'
      }
    ]
  }
];
