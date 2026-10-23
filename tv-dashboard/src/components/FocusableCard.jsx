import { memo } from 'react';

const FocusableCard = memo(({ item, isFocused }) => {
  const accent = item.brandColor || '#00e5ff';

  return (
    <div
      className={`tv-card ${isFocused ? 'is-focused' : ''}`}
      style={{
        '--card-accent': accent,
      }}
    >
      <div className="card-top">
        <span className="card-badge" style={{ color: accent }}>
          {item.badge}
        </span>
        <div
          className="card-icon"
          style={{
            backgroundColor: isFocused ? accent : 'rgba(255,255,255,0.07)',
            color: isFocused ? '#ffffff' : accent,
          }}
        >
          {item.icon || '▶'}
        </div>
      </div>

      <div className="card-bottom">
        <h3 className="card-title">{item.title}</h3>
        <p className="card-subtitle">{item.subtitle}</p>
        {typeof item.progress === 'number' && (
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${item.progress}%`, backgroundColor: accent }}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export default FocusableCard;
