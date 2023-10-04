export function NODE_ENV(env = 'development') {
  env = (process.env.NODE_ENV || env).toLowerCase();

  return {
    IS_TEST: env.startsWith('test'),
    IS_PRODUCTION: env.startsWith('prod'),
    IS_DEVELOPMENT: env.startsWith('dev'),
  };
}
