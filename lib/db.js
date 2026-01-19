import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  // MANTIK ŞU: Sunucudaysan (process.env doluysa) orayı kullan,
  // yoksa (bilgisayarındaysan) 'localhost' ve boş şifreyi kullan.
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'node_deneme',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;