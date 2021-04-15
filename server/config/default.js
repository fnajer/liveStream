const pathToFfmpeg = require('ffmpeg-static');

const config = {
  server: {
      secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
      port: process.env.PORT || 3333,
      baseURL: process.env.BASEURL || 'http://127.0.0.1'
  },
  db: process.env.DATABASE_URL || 'mongodb://127.0.0.1/nodeStream',
  rtmp_server: {
      rtmp: {
          port: process.env.PORT_IN || 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 60,
          ping_timeout: 30
      },
      http: {
          port: process.env.PORT_OUT || 8888,
          mediaroot: './server/media',
          allow_origin: '*'
      },
      trans: {
          ffmpeg: process.env.FFMPEG_PATH || pathToFfmpeg || 'D:/Program/ffmpeg/bin/ffmpeg.exe',
          tasks: [
              {
                  app: 'live',
                  hls: true,
                  hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                  dash: true,
                  dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
              }
          ]
      }
  }
};

module.exports = config;