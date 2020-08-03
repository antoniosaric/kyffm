const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://kyffm-285220.wl.r.appspot.com/',
      secure: false,
      changeOrigin: true,
      headers: {
        "Connection": "keep-alive"
      }
    })
  );
};