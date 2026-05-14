import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER NOT NULL,
    empresa TEXT NOT NULL,
    departamento TEXT NOT NULL,
    municipio TEXT NOT NULL,
    total_usuarios INTEGER NOT NULL,
    cumplen_fiu INTEGER NOT NULL,
    cumplen_diu INTEGER NOT NULL,
    porcentaje_fiu REAL NOT NULL,
    porcentaje_diu REAL NOT NULL,
    PRIMARY KEY(id)
  );
`);

const insertStmt = db.prepare(`
  INSERT INTO usuarios (empresa, departamento, municipio, total_usuarios, cumplen_fiu, cumplen_diu, porcentaje_fiu, porcentaje_diu)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const datos = [
  // PEREIRA-CARTAGO
  ["PEREIRA-CARTAGO", "RISARALDA", "CARTAGO", 50557, 49794, 50102, 98.5, 99.1],
  ["PEREIRA-CARTAGO", "RISARALDA", "PEREIRA", 2052, 2046, 2026, 99.7, 98.7],
  ["PEREIRA-CARTAGO", "RISARALDA", "ANSERMANUEVO", 23, 23, 5, 100.0, 21.7],
  ["PEREIRA-CARTAGO", "RISARALDA", "OBANDO", 150, 143, 141, 95.3, 94.0],
  
  // PEREIRA-EEPD
  ["PEREIRA-EEPD", "RISARALDA", "PEREIRA", 205977, 203320, 199803, 98.7, 97.0],
  ["PEREIRA-EEPD", "RISARALDA", "SANTA ROSA DE CABAL", 585, 585, 585, 100.0, 100.0],
  ["PEREIRA-EEPD", "RISARALDA", "FILANDIA", 207, 206, 207, 99.5, 100.0],
  ["PEREIRA-EEPD", "RISARALDA", "DOSQUEBRADAS", 6468, 6376, 6375, 98.6, 98.6],
  ["PEREIRA-EEPD", "RISARALDA", "MARSELLA", 416, 218, 267, 52.4, 64.2],
  ["PEREIRA-EEPD", "RISARALDA", "ALCALÁ", 14, 4, 4, 28.6, 28.6],
  ["PEREIRA-EEPD", "RISARALDA", "LA VIRGINIA", 10, 2, 9, 20.0, 90.0],
  ["PEREIRA-EEPD", "RISARALDA", "BALBOA", 17, 0, 4, 0.0, 23.5],
  
  // EMCALI
  ["EMCALI", "VALLE DEL CAUCA", "CALI", 772953, 631627, 732276, 81.7, 94.7],
  ["EMCALI", "VALLE DEL CAUCA", "PUERTO TEJADA", 7688, 6977, 7584, 90.8, 98.6],
  ["EMCALI", "VALLE DEL CAUCA", "YUMBO", 37256, 28614, 33613, 76.8, 90.2],
  ["EMCALI", "VALLE DEL CAUCA", "JAMUNDÍ", 661, 654, 658, 98.9, 99.5],
  
  // CETSA
  ["CETSA", "VALLE DEL CAUCA", "TULUÁ", 66985, 64109, 55840, 95.7, 83.4],
  ["CETSA", "VALLE DEL CAUCA", "SAN PEDRO", 4964, 3934, 4215, 79.3, 84.9],
  ["CETSA", "VALLE DEL CAUCA", "RIOFRÍO", 18, 13, 18, 72.2, 100.0],
  ["CETSA", "VALLE DEL CAUCA", "YOTOCO", 1, 1, 1, 100.0, 100.0],
  ["CETSA", "VALLE DEL CAUCA", "ZARZAL", 2, 2, 2, 100.0, 100.0],
  ["CETSA", "VALLE DEL CAUCA", "ANDALUCÍA", 1, 1, 1, 100.0, 100.0]
];

const insertMany = db.transaction((rows) => {
  for (const row of rows) {
    insertStmt.run(...row);
  }
});

insertMany(datos);

// Obtener empresas únicas
const empresas = db.prepare('SELECT DISTINCT empresa FROM usuarios').all();
console.log('Empresas disponibles:', empresas.map(e => e.empresa));
console.log('Base de datos creada exitosamente con', datos.length, 'registros');
db.close();