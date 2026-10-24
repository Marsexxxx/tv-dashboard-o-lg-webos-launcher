import { useState, useCallback, useMemo, useEffect } from 'react';
import HeaderWidgets from './components/HeaderWidgets';
import { AppLogo } from './components/AppLogos';
import { CATEGORIES, MEDIA_BY_CATEGORY, DOCK_ROW_1, DOCK_ROW_2, DOCK_ROW_3 } from './data/dashboardData';
import { useSpatialNav } from './hooks/useSpatialNav';
import { launchAppOrContent, fetchInstalledTvApps } from './services/webosLauncher';
import { fetchLiveCatalog } from './services/liveMediaService';

const DEFAULT_BG = '/fondo.jpg';

export default function App() {
  const [userName, setUserName] = useState(() => localStorage.getItem('webos_user_name') || 'JESUS');
  const [bgImage, setBgImage] = useState(() => localStorage.getItem('webos_bg_v4') || DEFAULT_BG);
  const [activeCategory, setActiveCategory] = useState('explorar');
  const [liveCatalog, setLiveCatalog] = useState(MEDIA_BY_CATEGORY);
  const [carouselPage, setCarouselPage] = useState(0);

  const [historyItems, setHistoryItems] = useState(() => {
    const saved = localStorage.getItem('webos_media_history_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MEDIA_BY_CATEGORY.explorar.slice(0, 3);
      }
    }
    return MEDIA_BY_CATEGORY.explorar.slice(0, 3);
  });

  const [customRow3, setCustomRow3] = useState(() => {
    const saved = localStorage.getItem('webos_dock_row3_v4');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DOCK_ROW_3;
      }
    }
    return DOCK_ROW_3;
  });

  // Descarga las tendencias del día y el Top de la historia automáticamente
  useEffect(() => {
    fetchLiveCatalog().then((data) => {
      if (data) setLiveCatalog(data);
    });
  }, []);

  useEffect(() => {
    fetchInstalledTvApps((detectedApps) => {
      if (detectedApps.length > 0) {
        setCustomRow3((prev) => [...detectedApps.slice(0, 5), ...prev.slice(-2)]);
      }
    });
  }, []);

  // Lista completa de la categoría seleccionada (hasta 18 elementos)
  const fullCategoryPool = useMemo(() => {
    if (activeCategory === 'historial') return historyItems;
    return liveCatalog[activeCategory] || liveCatalog.explorar || [];
  }, [activeCategory, liveCatalog, historyItems]);

  const totalPages = Math.max(1, Math.ceil(fullCategoryPool.length / 3));

  // Al cambiar de categoría, regresamos a la primera página del carrusel
  useEffect(() => {
    setCarouselPage(0);
  }, [activeCategory]);

  // Extrae las 3 tarjetas visibles actuales (la primera siempre se muestra panorámica 16:9)
  const visibleThreeCards = useMemo(() => {
    const start = (carouselPage % totalPages) * 3;
    const slice = fullCategoryPool.slice(start, start + 3);
    return slice.map((item, index) => ({
      ...item,
      isWide: index === 0
    }));
  }, [fullCategoryPool, carouselPage, totalPages]);

  const navRows = useMemo(
    () => [
      { id: 'nav-top', items: CATEGORIES },
      { id: 'nav-featured', items: visibleThreeCards },
      { id: 'nav-dock-1', items: DOCK_ROW_1 },
      { id: 'nav-dock-2', items: DOCK_ROW_2 },
      { id: 'nav-dock-3', items: customRow3 }
    ],
    [visibleThreeCards, customRow3]
  );

  // Permite cambiar de página del carrusel con las flechas Izquierda/Derecha del control remoto
  const handleEdgeHorizontal = useCallback(
    (direction, rowIndex) => {
      if (rowIndex === 1 && totalPages > 1) {
        if (direction === 'right') {
          setCarouselPage((p) => (p + 1) % totalPages);
          return true;
        } else if (direction === 'left') {
          setCarouselPage((p) => (p - 1 + totalPages) % totalPages);
          return true;
        }
      }
      return false;
    },
    [totalPages]
  );

  const handleSelectItem = useCallback(
    (item) => {
      if (item.type === 'pill') {
        setActiveCategory(item.id);
        return;
      }

      if (item.action === 'OPEN_SETTINGS') {
        const option = window.prompt(
          'CONFIGURACIÓN:\n1 = Usar /fondo.jpg o cambiar fondo\n2 = Cambiar tu nombre en pantalla\n3 = Forzar actualización de Tendencias en Vivo',
          '1'
        );
        if (option === '1') {
          const newBg = window.prompt(
            'Escribe /fondo.jpg o pega una URL de imagen:',
            bgImage
          );
          if (newBg && newBg.trim()) {
            setBgImage(newBg.trim());
            localStorage.setItem('webos_bg_v4', newBg.trim());
          }
        } else if (option === '2') {
          const newName = window.prompt('Personaliza tu nombre en el saludo:', userName);
          if (newName && newName.trim()) {
            setUserName(newName.trim());
            localStorage.setItem('webos_user_name', newName.trim());
          }
        } else if (option === '3') {
          localStorage.removeItem('webos_live_catalog_v1');
          fetchLiveCatalog().then((data) => {
            if (data) setLiveCatalog(data);
          });
        }
        return;
      }

      if (item.action === 'CLEAR_HISTORY') {
        setHistoryItems(liveCatalog.explorar.slice(0, 3));
        localStorage.removeItem('webos_media_history_v3');
        return;
      }

      if (item.action === 'ADD_CUSTOM') {
        const title = window.prompt('Nombre de la App o Canal (ej. Pluto TV, Kodi, IPTV):');
        if (!title) return;
        const appIdOrUrl = window.prompt('URL de la App o ID nativo de webOS:', 'https://');
        if (!appIdOrUrl) return;
        const isUrl = appIdOrUrl.startsWith('http');

        const newTile = {
          id: `custom-${Date.now()}`,
          logoId: title.slice(0, 10),
          title,
          appId: isUrl ? null : appIdOrUrl,
          url: isUrl ? appIdOrUrl : null,
          tileBg: '#0284C7'
        };

        setCustomRow3((prev) => {
          const updated = [newTile, ...prev.slice(0, 6)];
          localStorage.setItem('webos_dock_row3_v4', JSON.stringify(updated));
          return updated;
        });
        return;
      }

      const nowStr = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      const newHistCard = {
        id: `hist-${Date.now()}`,
        title: item.title,
        subtitle: `Abierto a las ${nowStr} • Sesión activa en TV`,
        tag: '🕒 RECIENTE',
        isWide: false,
        appId: item.appId,
        url: item.url,
        image: item.image || '/fondo.jpg',
        fallbackGradient: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%)'
      };

      setHistoryItems((prev) => {
        const filtered = prev.filter((i) => i.title !== item.title);
        const next = [newHistCard, ...filtered.slice(0, 8)];
        localStorage.setItem('webos_media_history_v3', JSON.stringify(next));
        return next;
      });

      launchAppOrContent(item);
    },
    [userName, bgImage, liveCatalog]
  );

  const { focusCoords } = useSpatialNav(navRows, handleSelectItem, handleEdgeHorizontal);

  // Rotación automática cada 7 segundos (se pausa si el usuario tiene el foco en las recomendaciones)
  useEffect(() => {
    if (focusCoords.row === 1 || totalPages <= 1) return;
    const interval = setInterval(() => {
      setCarouselPage((prev) => (prev + 1) % totalPages);
    }, 7000);
    return () => clearInterval(interval);
  }, [focusCoords.row, totalPages]);

  const dockShiftY =
    focusCoords.row === 3
      ? '-10.7vh'
      : focusCoords.row === 4
      ? '-21.4vh'
      : '0vh';

  return (
    <div
      className="tv-screen-canvas"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(8, 12, 32, 0.25) 0%, rgba(8, 12, 36, 0.52) 100%), url('${bgImage}')`
      }}
    >
      <HeaderWidgets
        userName={userName}
        categories={CATEGORIES}
        activeCategory={activeCategory}
        focusedCol={focusCoords.col}
        isTopRowFocused={focusCoords.row === 0}
        onSelectCategory={handleSelectItem}
      />

      <section className="featured-stage-wrapper">
        <div className="featured-stage">
          {visibleThreeCards.map((media, idx) => {
            const isFocused = focusCoords.row === 1 && focusCoords.col === idx;
            return (
              <article
                key={media.id}
                onClick={() => handleSelectItem(media)}
                className={`media-showcase-card ${media.isWide ? 'wide-hero' : 'poster-vertical'} ${
                  isFocused ? 'is-focused' : ''
                }`}
              >
                <div
                  className="media-artwork"
                  style={{
                    backgroundImage: `url(${media.image}), ${media.fallbackGradient}`
                  }}
                >
                  {media.tag && <span className="live-tag-badge">{media.tag}</span>}
                </div>
                <div className="media-meta">
                  <h2 className="media-title">{media.title}</h2>
                  <p className="media-subtitle">{media.subtitle}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Indicadores de página del carrusel automático */}
        {totalPages > 1 && (
          <div className="carousel-dots-bar">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselPage(i)}
                className={`carousel-dot ${i === carouselPage % totalPages ? 'active' : ''}`}
              />
            ))}
            <span className="carousel-live-label">
              {focusCoords.row === 1 ? '⏸ Pausado (Usa ◀ ▶ para girar)' : '⟳ Auto-rotación en vivo'}
            </span>
          </div>
        )}
      </section>

      <footer className="apps-glass-dock">
        <div className="dock-handle" />

        <div
          className="dock-rows-viewport"
          style={{ transform: `translate3d(0, ${dockShiftY}, 0)` }}
        >
          <div className="dock-app-row">
            {DOCK_ROW_1.map((app, idx) => {
              const isFocused = focusCoords.row === 2 && focusCoords.col === idx;
              return (
                <div
                  key={app.id}
                  onClick={() => handleSelectItem(app)}
                  className={`app-brand-tile ${isFocused ? 'is-focused' : ''}`}
                  style={{ background: app.tileBg }}
                >
                  <AppLogo id={app.logoId} />
                </div>
              );
            })}
          </div>

          <div className="dock-app-row">
            {DOCK_ROW_2.map((app, idx) => {
              const isFocused = focusCoords.row === 3 && focusCoords.col === idx;
              return (
                <div
                  key={app.id}
                  onClick={() => handleSelectItem(app)}
                  className={`app-brand-tile ${isFocused ? 'is-focused' : ''}`}
                  style={{ background: app.tileBg }}
                >
                  <AppLogo id={app.logoId} />
                </div>
              );
            })}
          </div>

          <div className="dock-app-row">
            {customRow3.map((app, idx) => {
              const isFocused = focusCoords.row === 4 && focusCoords.col === idx;
              return (
                <div
                  key={app.id}
                  onClick={() => handleSelectItem(app)}
                  className={`app-brand-tile ${isFocused ? 'is-focused' : ''}`}
                  style={{ background: app.tileBg }}
                >
                  <AppLogo id={app.logoId} />
                </div>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
