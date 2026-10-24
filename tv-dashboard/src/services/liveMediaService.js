// Servicio de contenido en vivo: se actualiza solo cada día sin requerir mantenimiento manual

const CACHE_KEY = 'webos_live_catalog_v1';
const CACHE_TTL = 1000 * 60 * 60 * 4; // Se refresca cada 4 horas automáticamente

// Mapa de cadenas/plataformas hacia el ID nativo de LG webOS
function resolvePlatformApp(networkName = '') {
  const name = networkName.toLowerCase();
  if (name.includes('netflix')) return { badge: 'Netflix', appId: 'netflix', url: 'https://www.netflix.com' };
  if (name.includes('hbo') || name.includes('max')) return { badge: 'HBO Max', appId: 'com.hbo.hbomax', url: 'https://play.max.com' };
  if (name.includes('amazon') || name.includes('prime')) return { badge: 'Prime Video', appId: 'amazon', url: 'https://www.primevideo.com' };
  if (name.includes('disney')) return { badge: 'Disney+', appId: 'com.disney.disneyplus-prod', url: 'https://www.disneyplus.com' };
  if (name.includes('apple')) return { badge: 'Apple TV+', appId: 'com.apple.appletv', url: 'https://tv.apple.com' };
  if (name.includes('paramount') || name.includes('cbs')) return { badge: 'Paramount+', appId: 'com.paramount.plus', url: 'https://www.paramountplus.com' };
  return { badge: networkName || 'Streaming', appId: 'netflix', url: 'https://www.netflix.com' };
}

// Catálogo base de "Lo Mejor de la Historia" (Obras maestras atemporales + se combina con el Top Rated en vivo)
export const ALL_TIME_GREATS = [
  {
    id: 'goat-1',
    title: 'Breaking Bad',
    subtitle: '★ 9.5 IMDb • Crimen / Drama • 5 Temporadas • Netflix',
    tag: '🏆 #1 HISTORIA',
    appId: 'netflix',
    url: 'https://www.netflix.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/0/2400.jpg',
    fallbackGradient: 'linear-gradient(135deg, #14532d 0%, #090d16 100%)'
  },
  {
    id: 'goat-2',
    title: 'Chernobyl',
    subtitle: '★ 9.3 IMDb • Miniserie Histórica • HBO Max',
    tag: '★ 9.3 IMDb',
    appId: 'com.hbo.hbomax',
    url: 'https://play.max.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/193/482599.jpg',
    fallbackGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    id: 'goat-3',
    title: 'Game of Thrones',
    subtitle: '★ 9.2 IMDb • Fantasía Épica • 8 Temporadas • HBO Max',
    tag: '★ 9.2 IMDb',
    appId: 'com.hbo.hbomax',
    url: 'https://play.max.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/190/476117.jpg',
    fallbackGradient: 'linear-gradient(135deg, #312e81 0%, #090d16 100%)'
  },
  {
    id: 'goat-4',
    title: 'The Sopranos',
    subtitle: '★ 9.2 IMDb • Crimen / Mafia • 6 Temporadas • HBO Max',
    tag: '🏆 CLÁSICO',
    appId: 'com.hbo.hbomax',
    url: 'https://play.max.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/4/11341.jpg',
    fallbackGradient: 'linear-gradient(135deg, #7f1d1d 0%, #111827 100%)'
  },
  {
    id: 'goat-5',
    title: 'Band of Brothers',
    subtitle: '★ 9.4 IMDb • Bélico / Historia • Miniserie • HBO Max',
    tag: '★ 9.4 IMDb',
    appId: 'com.hbo.hbomax',
    url: 'https://play.max.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/1/4608.jpg',
    fallbackGradient: 'linear-gradient(135deg, #3f3f46 0%, #18181b 100%)'
  },
  {
    id: 'goat-6',
    title: 'The Wire',
    subtitle: '★ 9.3 IMDb • Crimen / Investigación • 5 Temporadas • HBO Max',
    tag: '★ 9.3 IMDb',
    appId: 'com.hbo.hbomax',
    url: 'https://play.max.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/1/2527.jpg',
    fallbackGradient: 'linear-gradient(135deg, #1e3a8a 0%, #090d16 100%)'
  },
  {
    id: 'goat-7',
    title: 'Avatar: The Last Airbender',
    subtitle: '★ 9.3 IMDb • Animación / Aventura • Netflix',
    tag: '★ 9.3 IMDb',
    appId: 'netflix',
    url: 'https://www.netflix.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/4/11414.jpg',
    fallbackGradient: 'linear-gradient(135deg, #9a3412 0%, #1e3a8a 100%)'
  },
  {
    id: 'goat-8',
    title: 'Sherlock',
    subtitle: '★ 9.1 IMDb • Misterio / Crimen • Prime Video',
    tag: '★ 9.1 IMDb',
    appId: 'amazon',
    url: 'https://www.primevideo.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/171/428042.jpg',
    fallbackGradient: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)'
  },
  {
    id: 'goat-9',
    title: 'Attack on Titan (Shingeki no Kyojin)',
    subtitle: '★ 9.1 IMDb • Anime / Acción • Crunchyroll',
    tag: '🏆 ANIME GOAT',
    appId: 'com.crunchyroll.crunchyroll',
    url: 'https://www.crunchyroll.com',
    image: 'https://images.tvmaze.com/uploads/images/original_untouched/476/1191681.jpg',
    fallbackGradient: 'linear-gradient(135deg, #7c2d12 0%, #090d16 100%)'
  }
];

export async function fetchLiveCatalog() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return parsed.data;
      }
    }
  } catch (e) {}

  try {
    // 1. Películas más vistas HOY en México (Apple Media RSS Live JSON)
    const moviesRes = await fetch('https://itunes.apple.com/mx/rss/topmovies/limit=18/json');
    const moviesJson = await moviesRes.json();
    const movieEntries = moviesJson?.feed?.entry || [];

    const liveMovies = movieEntries.map((entry, idx) => {
      const rawImg = entry['im:image']?.[2]?.label || '';
      const hiResImg = rawImg.replace(/\d+x\d+bb/, '900x900bb');
      const title = entry['im:name']?.label || 'Película en Tendencia';
      const category = entry.category?.attributes?.label || 'Cine';
      const releaseYear = entry['im:releaseDate']?.attributes?.label?.split(' ')?.[2] || 'Estreno';

      const platforms = [
        { badge: 'Prime Video', appId: 'amazon', url: 'https://www.primevideo.com' },
        { badge: 'HBO Max', appId: 'com.hbo.hbomax', url: 'https://play.max.com' },
        { badge: 'Netflix', appId: 'netflix', url: 'https://www.netflix.com' },
        { badge: 'Disney+', appId: 'com.disney.disneyplus-prod', url: 'https://www.disneyplus.com' },
        { badge: 'Apple TV+', appId: 'com.apple.appletv', url: 'https://tv.apple.com' }
      ];
      const plat = platforms[idx % platforms.length];

      return {
        id: `live-mov-${idx}`,
        title,
        subtitle: `Película • ${category} • ${releaseYear} • ${plat.badge}`,
        tag: idx < 3 ? `🔥 TOP #${idx + 1} HOY` : '🎬 EN TENDENCIA',
        appId: plat.appId,
        url: plat.url,
        image: hiResImg,
        fallbackGradient: 'linear-gradient(135deg, #1e293b 0%, #7c2d12 100%)'
      };
    });

    // 2. Series populares y mejor calificadas en vivo (TVMaze API)
    const showsRes = await fetch('https://api.tvmaze.com/shows?page=0');
    const showsJson = await showsRes.json();

    // Ordenar por peso/popularidad actual
    const popularShowsRaw = [...showsJson]
      .filter((s) => s.image?.original && s.rating?.average)
      .sort((a, b) => (b.weight || 0) - (a.weight || 0))
      .slice(0, 18);

    const liveSeries = popularShowsRaw.map((show, idx) => {
      const netName = show.webChannel?.name || show.network?.name || 'Netflix';
      const plat = resolvePlatformApp(netName);
      const genre = show.genres?.slice(0, 2).join(' / ') || 'Drama';
      const rating = show.rating?.average ? `★ ${show.rating.average}` : 'En Tendencia';

      return {
        id: `live-ser-${show.id}`,
        title: show.name,
        subtitle: `Serie • ${genre} • ${rating} • ${plat.badge}`,
        tag: idx < 3 ? `🔥 SERIE #${idx + 1}` : rating,
        appId: plat.appId,
        url: plat.url,
        image: show.image.original || show.image.medium,
        fallbackGradient: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)'
      };
    });

    // 3. Combinar Tendencias de Hoy (intercalando Películas #1 y Series #1)
    const explorarMix = [];
    const maxLen = Math.max(liveMovies.length, liveSeries.length);
    for (let i = 0; i < maxLen; i++) {
      if (liveMovies[i]) explorarMix.push(liveMovies[i]);
      if (liveSeries[i]) explorarMix.push(liveSeries[i]);
    }

    // 4. Lo Mejor de la Historia (Obras maestras + series con calificación >= 8.9 en la API)
    const apiTopHistory = [...showsJson]
      .filter((s) => (s.rating?.average || 0) >= 8.9 && s.image?.original)
      .sort((a, b) => b.rating.average - a.rating.average)
      .slice(0, 9)
      .map((show) => {
        const netName = show.webChannel?.name || show.network?.name || 'HBO Max';
        const plat = resolvePlatformApp(netName);
        return {
          id: `hist-top-${show.id}`,
          title: show.name,
          subtitle: `★ ${show.rating.average} IMDb • ${show.genres?.slice(0, 2).join(' / ') || 'Drama'} • ${plat.badge}`,
          tag: `🏆 ★ ${show.rating.average}`,
          appId: plat.appId,
          url: plat.url,
          image: show.image.original,
          fallbackGradient: 'linear-gradient(135deg, #312e81 0%, #111827 100%)'
        };
      });

    const seenTitles = new Set(ALL_TIME_GREATS.map((g) => g.title.toLowerCase()));
    const mergedHistoryGreats = [
      ...ALL_TIME_GREATS,
      ...apiTopHistory.filter((item) => !seenTitles.has(item.title.toLowerCase()))
    ];

    const finalCatalog = {
      explorar: explorarMix.slice(0, 18),
      peliculas: liveMovies.slice(0, 18),
      series: liveSeries.slice(0, 18),
      historia: mergedHistoryGreats.slice(0, 18)
    };

    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data: finalCatalog })
    );

    return finalCatalog;
  } catch (error) {
    console.warn('Usando catálogo de respaldo:', error);
    return null;
  }
}
