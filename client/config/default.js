const config = {
  rtmp_server: {
    server: {
        // baseURL: process.env.BASEURL || 'http://127.0.0.1'
        // TODO: set ports and BASEURL on the client with webpack prod configs
        baseURL: 'https://node--stream.herokuapp.com/'
    },
    http: {
        // port: process.env.PORT_OUT || 8888,
        port: 80,
    },
  }
};

module.exports = config;