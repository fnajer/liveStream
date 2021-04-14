const config = {
  rtmp_server: {
    server: {
        baseURL: process.env.BASEURL || 'http://127.0.0.1'
    },
    http: {
        port: process.env.PORT_OUT || 8888,
    },
  }
};

module.exports = config;