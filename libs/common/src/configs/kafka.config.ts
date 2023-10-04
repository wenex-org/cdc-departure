export const KAFKA_CONFIG = () => {
  const host = process.env.KAFKA_HOST || 'localhost';
  const port = parseInt(process.env.KAFKA_PORT || '9092');

  return `${host}:${port}`;
};
