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
      bridge. call(url, params);
      return;
    } catch (err) {
      console.error('Error al lanzar app nativa webOS:', err);
    }
  }

  // Fallback para navegador en PC / Codespaces o enlaces web directos
  if (item.url) {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  }
}
