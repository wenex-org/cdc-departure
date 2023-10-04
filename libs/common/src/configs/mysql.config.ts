export function MYSQL_CONFIG() {
  const host = process.env.MYSQL_HOST || 'localhost';
  const port = parseInt(process.env.MYSQL_PORT || '3306');
  const username = process.env.MYSQL_USERNAME || 'root';
  const password = process.env.MYSQL_PASSWORD || 'admin';
  const database = process.env.MYSQL_DATABASE || 'example';

  return { host, port, username, password, database };
}
