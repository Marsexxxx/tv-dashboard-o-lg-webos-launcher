import { useState, useEffect, memo } from 'react';

const HeaderWidgets = memo(({ activeColor }) => {
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '22°C', desc: 'Clima Local', extra: 'Sincronizado' });

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Obtiene clima real sin necesidad de API Key
    fetch('https://api.open-meteo.com/v1/forecast?latitude=19.43&longitude=-99.13&current_weather=true')
      .then((res) => res.json())
      .then((data) => {
        if (data?.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          setWeather({
            temp: `${temp}°C`,
            desc: 'Tiempo Real',
            extra: `Viento ${Math.round(data.current_weather.windspeed)} km/h`
          });
        }
      })
      .catch(() => {});
  }, []);

  const timeString = now.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const dateString = now.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <header className="tv-header">
      <div className="brand-group">
        <div
          className="brand-dot"
          style={{ backgroundColor: activeColor || '#00e5ff' }}
        />
        <div>
          <div className="brand-title">WEBOS STUDIO</div>
          <div className="brand-subtitle">Launcher Personalizado • Sesiones Nativas Activas</div>
        </div>
      </div>

      <div className="widgets-container">
        <div className="weather-widget">
          <div className="weather-temp">{weather.temp}</div>
          <div className="weather-desc">
            <div>{weather.desc}</div>
            <div>{weather.extra}</div>
          </div>
        </div>

        <div className="clock-widget">
          <div className="clock-time">{timeString}</div>
          <div className="clock-date">{dateString}</div>
        </div>
      </div>
    </header>
  );
});

export default HeaderWidgets;
