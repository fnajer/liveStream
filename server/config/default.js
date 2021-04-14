const devMode = process.env.NODE_ENV != 'production';

const config = {
  server: {
      secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
      port: 3333
  },
  db: !devMode ? process.env.DATABASE_URL : 'mongodb://127.0.0.1/nodeStream',
  rtmp_server: {
      rtmp: {
          port: 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 60,
          ping_timeout: 30
      },
      http: {
          port: 8888,
          mediaroot: './server/media',
          allow_origin: '*'
      },
      trans: {
          ffmpeg: !devMode ? '/app/vendor/ffmpeg/ffmpeg' : 'D:/Program/ffmpeg/bin/ffmpeg.exe',
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