import bunyan from 'bunyan';

let logger = bunyan.createLogger({
  name: 'memsource',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'error',
      stream: process.stdout
    },
    {
      level: 'error',
      type: 'rotating-file',
      path: 'logs/error.log',
      period: '1d',
      count: 5,
    },
    {
      level: 'info',
      type: 'rotating-file',
      path: 'logs/info.log',
      period: '1d',
      count: 5,
    },
    {
      level: 'debug',
      type: 'rotating-file',
      path: 'logs/debug.log',
      period: '1d',
      count: 5,
    }
  ]
});

export {
  logger
}