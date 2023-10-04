export function MONGO_CONFIG(): string {
  const host = process.env.MONGO_HOST;

  const username = process.env.MONGO_USER || null;
  const password = process.env.MONGO_PASS || null;
  const database = process.env.MONGO_DB || 'develop';

  const query = process.env.MONGO_QUERY || 'authSource=admin';

  let uri = null;
  if (username && password) {
    uri = `mongodb://${username}:${password}@${host}/${database}?${query}`;
  } else {
    uri = `mongodb://${host}/${database}?${query}`;
  }

  return uri;
}
