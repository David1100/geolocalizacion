import Database from 'better-sqlite3';
import path from 'path';

const prerender = false;
async function GET({ url }) {
  const dbPath = path.join(process.cwd(), "data.db");
  const db = new Database(dbPath);
  const empresa = url.searchParams.get("empresa");
  let stmt;
  let usuarios;
  if (empresa) {
    stmt = db.prepare("SELECT * FROM usuarios WHERE empresa = ?");
    usuarios = stmt.all(empresa);
  } else {
    stmt = db.prepare("SELECT * FROM usuarios");
    usuarios = stmt.all();
  }
  db.close();
  return new Response(JSON.stringify(usuarios), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
