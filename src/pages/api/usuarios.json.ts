import Database from 'better-sqlite3';
import path from 'path';

export async function GET() {
  const dbPath = path.join(process.cwd(), 'data.db');
  const db = new Database(dbPath);
  
  const stmt = db.prepare('SELECT * FROM usuarios');
  const usuarios = stmt.all();
  
  db.close();
  
  return new Response(JSON.stringify(usuarios), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}