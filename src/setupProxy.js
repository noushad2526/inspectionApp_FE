const { createProxyMiddleware } = require('http-proxy-middleware');

const proxies = [
    {
        context: '/land-auth',
        target: 'http://localhost:8088'
    },
];

module.exports = function (app) {
    proxies.forEach(proxy => {
        app.use(proxy.context, createProxyMiddleware(proxy));
    });
};
