const { createProxyMiddleware } = require('http-proxy-middleware');

const proxies = [
    {
        context: '/land',
        target: 'http://localhost:8085'
    },
    {
        context: '/land-auth',
        target: 'http://localhost:8084'
    }
];

module.exports = function (app) {
    proxies.forEach(proxy => {
        app.use(proxy.context, createProxyMiddleware(proxy));
    });
};
