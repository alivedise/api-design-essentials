if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  // eslint-disable-next-line import/no-unresolved
  import('virtual:pwa-register').then(({ registerSW }) => {
    const intervalMS = 60 * 60 * 1000;

    registerSW({
      immediate: true,
      onRegistered(r) {
        // eslint-disable-next-line no-unused-expressions
        r && setInterval(() => {
          r.update();
        }, intervalMS);
      }
    });
  });
}