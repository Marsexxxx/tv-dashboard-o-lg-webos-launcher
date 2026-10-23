import { useState, useCallback } from 'react';
import HeaderWidgets from './components/HeaderWidgets';
import FocusableCard from './components/FocusableCard';
import { INITIAL_ROWS } from './data/dashboardData';
import { useSpatialNav } from './hooks/useSpatialNav';
import { launchAppOrContent } from './services/webosLauncher';

export default function App() {
  const [rows, setRows] = useState(() => {
    const savedRows = localStorage.getItem('webos_custom_rows_v2');
    if (savedRows) {
      try {
        return JSON.parse(savedRows);
      } catch (e) {
        return INITIAL_ROWS;
      }
    }
    return INITIAL_ROWS;
  });

  const saveAndSetRows = useCallback((updater) => {
    setRows((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('webos_custom_rows_v2', JSON.stringify(next));
      return next;
    });
  }, []);

  const handleSelectItem = useCallback(
    (item) => {
      // Acción especial: Limpiar historial
      if (item.action === 'CLEAR_HISTORY') {
        saveAndSetRows((prev) =>
          prev.map((r) => (r.id === 'history' ? INITIAL_ROWS[2] : r))
        );
        return;
      }

      // Acción especial: Agregar acceso directo personalizado
      if (item.action === 'ADD_CUSTOM') {
        const name = window.prompt('Nombre de la App o Canal (ej. Plex, Crunchyroll, IPTV):');
        if (!name) return;
        const url = window.prompt('URL de acceso (ej. https://www.crunchyroll.com):', 'https://');
        if (!url) return;

        const newApp = {
          id: `custom-${Date.now()}`,
          title: name,
          subtitle: 'Acceso Personalizado',
          badge: 'CUSTOM',
          url,
          brandColor: '#00e5ff',
          icon: '★',
        };

        saveAndSetRows((prev) =>
          prev.map((r) =>
            r.id === 'apps' ? { ...r, items: [...r.items, newApp] } : r
          )
        );
        return;
      }

      // Registrar en Historial de Uso Reciente
      const timeNow = new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });

      const newHistoryEntry = {
        id: `hist-${Date.now()}`,
        title: item.title,
        subtitle: `Abierto a las ${timeNow}`,
        badge: 'RECIENTE',
        appId: item.appId || null,
        url: item.url || null,
        brandColor: item.brandColor || '#00e5ff',
        icon: item.icon || '▶',
      };

      saveAndSetRows((prevRows) =>
        prevRows.map((row) => {
          if (row.id !== 'history') return row;
          const cleanBtn = row.items.find((i) => i.action === 'CLEAR_HISTORY');
          const filtered = row.items.filter(
            (i) => i.title !== item.title && i.action !== 'CLEAR_HISTORY'
          );
          const updatedItems = [
            newHistoryEntry,
            ...filtered.slice(0, 3),
            ...(cleanBtn ? [cleanBtn] : []),
          ];
          return { ...row, items: updatedItems };
        })
      );

      // Lanzar aplicación nativa en webOS o URL en navegador
      launchAppOrContent(item);
    },
    [saveAndSetRows]
  );

  const { focusCoords } = useSpatialNav(rows, handleSelectItem);
  const activeItem = rows[focusCoords.row]?.items[focusCoords.col];
  const activeColor = activeItem?.brandColor || '#00e5ff';

  return (
    <div className="tv-dashboard">
      {/* Iluminación ambiental dinámica acelerada por GPU */}
      <div
        className="ambient-glow"
        style={{ backgroundColor: activeColor }}
      />

      <HeaderWidgets activeColor={activeColor} />

      <main className="tv-main-grid">
        {rows.map((section, rowIndex) => {
          const isRowActive = focusCoords.row === rowIndex;

          return (
            <section key={section.id} className="content-row">
              <h2 className={`row-title ${isRowActive ? 'active-row' : ''}`}>
                {section.title}
              </h2>

              <div className="row-cards">
                {section.items.map((item, colIndex) => {
                  const isFocused =
                    isRowActive && focusCoords.col === colIndex;

                  return (
                    <FocusableCard
                      key={item.id}
                      item={item}
                      isFocused={isFocused}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
