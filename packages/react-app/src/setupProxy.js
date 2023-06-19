const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy ayarlarını yapılandırma
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3001', // Backend sunucusunun adresi
      changeOrigin: true,
    })
  );
};