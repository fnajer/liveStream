const config = {
  server: {
    // baseURL: process.env.BASEURL || 'http://127.0.0.1'
    // TODO: set ports and BASEURL on the client with webpack prod configs
    baseURL: 'https://fnajer-livestream.zeet.app'
  },
  rtmp_server: {
    http: {
        // port: process.env.PORT_OUT || 8888,
        port: 80,
    },
  }
};

module.exports = config;