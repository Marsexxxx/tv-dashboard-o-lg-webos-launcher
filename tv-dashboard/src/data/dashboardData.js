import { ALL_TIME_GREATS } from '../services/liveMediaService';

export const CATEGORIES = [
  { id: 'explorar', title: '🔥 Tendencias Hoy', type: 'pill' },
  { id: 'peliculas', title: '🎬 Películas', type: 'pill' },
  { id: 'series', title: '📺 Series', type: 'pill' },
  { id: 'historia', title: '🏆 Top Historia', type: 'pill' },
  { id: 'historial', title: '🕒 Recientes', type: 'pill' },
  { id: 'config', title: 'Configuración', type: 'settings', action: 'OPEN_SETTINGS' }
];

export const MEDIA_BY_CATEGORY = {
  explorar: ALL_TIME_GREATS.slice(0, 6),
  peliculas: ALL_TIME_GREATS.slice(0, 6),
  series: ALL_TIME_GREATS.slice(0, 6),
  historia: ALL_TIME_GREATS
};

export const DOCK_ROW_1 = [
  { id: 'app-nf', logoId: 'netflix', title: 'Netflix', appId: 'netflix', url: 'https://www.netflix.com', tileBg: '#F8FAFC' },
  { id: 'app-yt', logoId: 'youtube', title: 'YouTube', appId: 'youtube.leanback.v4', url: 'https://www.youtube.com/tv', tileBg: '#F8FAFC' },
  { id: 'app-pv', logoId: 'prime', title: 'Prime Video', appId: 'amazon', url: 'https://www.primevideo.com', tileBg: '#00A8E1' },
  { id: 'app-dp', logoId: 'disney', title: 'Disney+', appId: 'com.disney.disneyplus-prod', url: 'https://www.disneyplus.com', tileBg: 'linear-gradient(180deg, #061539 0%, #0c2b6b 100%)' },
  { id: 'app-hm', logoId: 'hbomax', title: 'HBO Max', appId: 'com.hbo.hbomax', url: 'https://play.max.com', tileBg: 'linear-gradient(135deg, #5B21B6 0%, #7E22CE 100%)' },
  { id: 'app-pm', logoId: 'paramount', title: 'Paramount+', appId: 'com.paramount.plus', url: 'https://www.paramountplus.com', tileBg: '#0064FF' },
  { id: 'app-lg', logoId: 'lgstore', title: 'LG Content Store (Instalar Apps)', appId: 'com.webos.app.discovery', url: 'https://us.lgappstv.com', tileBg: '#F8FAFC' }
];

export const DOCK_ROW_2 = [
  { id: 'app-sp', logoId: 'spotify', title: 'Spotify', appId: 'spotify-beehive', url: 'https://open.spotify.com', tileBg: '#1DB954' },
  { id: 'app-tw', logoId: 'twitch', title: 'Twitch', appId: 'tv.twitch.tv.starshot.lg', url: 'https://www.twitch.tv', tileBg: '#9146FF' },
  { id: 'app-at', logoId: 'appletv', title: 'Apple TV+', appId: 'com.apple.appletv', url: 'https://tv.apple.com', tileBg: '#1E293B' },
  { id: 'app-cr', logoId: 'crunchyroll', title: 'Crunchyroll', appId: 'com.crunchyroll.crunchyroll', url: 'https://www.crunchyroll.com', tileBg: '#F47521' },
  { id: 'app-vx', logoId: 'vix', title: 'ViX', appId: 'com.univision.prendetv', url: 'https://vix.com', tileBg: 'linear-gradient(135deg, #FF5100 0%, #D90429 100%)' },
  { id: 'app-px', logoId: 'plex', title: 'Plex', appId: 'cdp-30', url: 'https://app.plex.tv', tileBg: '#1F2937' },
  { id: 'app-hb', logoId: 'homebrew', title: 'Homebrew Store', appId: 'org.webosbrew.hbchannel', url: 'https://repo.webosbrew.org', tileBg: '#0F172A' }
];

export const DOCK_ROW_3 = [
  { id: 'sys-tv', logoId: '📺 TV EN VIVO', title: 'Canales de TV', appId: 'com.webos.app.livetv', tileBg: '#0369A1' },
  { id: 'sys-h1', logoId: '🔌 HDMI 1', title: 'Entrada HDMI 1', appId: 'com.webos.app.externalinput.hdmi1', tileBg: '#1E293B' },
  { id: 'sys-h2', logoId: '🔌 HDMI 2', title: 'Entrada HDMI 2', appId: 'com.webos.app.externalinput.hdmi2', tileBg: '#1E293B' },
  { id: 'sys-h3', logoId: '🎮 HDMI 3', title: 'Consola / HDMI 3', appId: 'com.webos.app.externalinput.hdmi3', tileBg: '#1E293B' },
  { id: 'sys-br', logoId: '🌐 WEB TV', title: 'Navegador Web LG', appId: 'com.webos.app.browser', url: 'https://www.google.com', tileBg: '#0D9488' },
  { id: 'app-add', logoId: '＋ AGREGAR', title: 'Agregar Nueva App', action: 'ADD_CUSTOM', tileBg: '#2563EB' },
  { id: 'app-clr', logoId: '↺ LIMPIAR', title: 'Limpiar Recientes', action: 'CLEAR_HISTORY', tileBg: '#475569' }
];
