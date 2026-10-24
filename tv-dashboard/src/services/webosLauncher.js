// Servicio híbrido: Abre la App Nativa en LG webOS (mantiene sesión iniciada) o la URL en PC
export function launchAppOrContent(item) {
  const isWebOS = typeof window !== 'undefined' && (window.WebOSServiceBridge || window.PalmSystem);

  if (isWebOS && item.appId) {
    try {
      const bridge = new window.WebOSServiceBridge();
      const url = 'luna://com.webos.applicationManager/launch';
      const params = JSON.stringify({
        id: item.appId,
        params: item.launchParams || {}
      });
      bridge.call(url, params);
      return;
    } catch (err) {
      console.error('Error al lanzar app nativa webOS:', err);
    }
  }

  if (item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  }
}

// Consulta automáticamente todas las apps instaladas en el televisor LG
export function fetchInstalledTvApps(onAppsLoaded) {
  const isWebOS = typeof window !== 'undefined' && window.WebOSServiceBridge;
  if (!isWebOS) return;

  try {
    const bridge = new window.WebOSServiceBridge();
    bridge.onservicecallback = (msg) => {
      try {
        const res = JSON.parse(msg);
        if (res.launchPoints && Array.isArray(res.launchPoints)) {
          const tvApps = res.launchPoints.map((lp) => ({
            id: `tv-${lp.id}`,
            logoId: lp.title.slice(0, 10),
            title: lp.title,
            appId: lp.id,
            tileBg: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
          }));
          onAppsLoaded(tvApps);
        }
      } catch (e) {
        console.error('Error procesando lista de apps de webOS:', e);
      }
    };
    bridge.call(
      'luna://com.webos.applicationManager/listLaunchPoints',
      JSON.stringify({})
    );
  } catch (err) {
    console.error('No se pudo consultar listLaunchPoints:', err);
  }
}
