
const config = {
  SERVER: {
      SECRET: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
      PORT: process.env.PORT || 1234,
  },
  DB: 'db_url',
  MEDIA_SERVER: {
      URL: 'media_server_url',
      API_PORT: 8081,
  }
};

module.exports = config;