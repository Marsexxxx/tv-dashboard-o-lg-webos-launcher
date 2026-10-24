import { useState, useEffect, memo } from 'react';

const HeaderWidgets = memo(({ userName, categories, activeCategory, focusedCol, isTopRowFocused, onSelectCategory }) => {
  const [now, setNow] = useState(new Date());
  const [temp, setTemp] = useState('16°');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current_weather=true')
      .then((res) => res.json())
      .then((data) => {
        if (data?.current_weather) {
          setTemp(`${Math.round(data.current_weather.temperature)}°`);
        }
      })
      .catch(() => {});
  }, []);

  const dateFormatted = now.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).replace('.', '');

  const timeFormatted = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const configIndex = categories.length - 1;
  const isConfigFocused = isTopRowFocused && focusedCol === configIndex;

  return (
    <header className="hero-header">
      {/* Píldora central superior idéntica a la imagen */}
      <div className="top-status-bar">
        <div className="status-pill">
          <span className="status-item">📅 {dateFormatted}</span>
          <span className="status-item">🕒 {timeFormatted}</span>
          <span className="status-item">🌧️ {temp}</span>
        </div>
      </div>

      {/* Fila principal de saludo + iconos de estado y Configuración */}
      <div className="header-main-row">
        <div className="greeting-block">
          <p className="greeting-sub">¡Hola, {userName}!</p>
          <h1 className="greeting-title">¿Qué quieres ver hoy?</h1>

          <div className="category-pills">
            {categories.slice(0, -1).map((cat, idx) => {
              const isFocused = isTopRowFocused && focusedCol === idx;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`cat-pill ${isSelected ? 'is-selected' : ''} ${isFocused ? 'is-focused' : ''}`}
                >
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="system-Quick-icons">
          <div className="sys-icon-circle" title="Entradas TV">📺</div>
          <div className="sys-icon-circle" title="Wi-Fi Conectado">📶</div>
          <div className="sys-icon-circle" title="Bluetooth">ᛒ</div>
          <div className="sys-icon-circle" title="Hogar Inteligente">💡</div>
          <button
            onClick={() => onSelectCategory(categories[configIndex])}
            className={`config-pill-btn ${isConfigFocused ? 'is-focused' : ''}`}
          >
            <span>⚙️</span> Configuración
          </button>
        </div>
      </div>
    </header>
  );
});

export default HeaderWidgets;
