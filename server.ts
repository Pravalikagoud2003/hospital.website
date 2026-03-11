import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database('hospital.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    available_days TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    doctor_id INTEGER,
    appointment_date TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id)
  );
`);

// Seed initial doctors if empty
const doctorCount = db.prepare('SELECT COUNT(*) as count FROM doctors').get() as { count: number };
if (doctorCount.count === 0) {
  const insert = db.prepare('INSERT INTO doctors (name, specialization, available_days) VALUES (?, ?, ?)');
  insert.run('Dr. Sarah Johnson', 'Cardiologist', 'Mon, Wed, Fri');
  insert.run('Dr. Michael Chen', 'Pediatrician', 'Tue, Thu, Sat');
  insert.run('Dr. Emily Williams', 'Dermatologist', 'Mon, Tue, Thu');
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/doctors', (req, res) => {
    const doctors = db.prepare('SELECT * FROM doctors').all();
    res.json(doctors);
  });

  app.post('/api/doctors', (req, res) => {
    const { name, specialization, available_days } = req.body;
    const info = db.prepare('INSERT INTO doctors (name, specialization, available_days) VALUES (?, ?, ?)').run(name, specialization, available_days);
    res.json({ id: info.lastInsertRowid });
  });

  app.put('/api/doctors/:id', (req, res) => {
    const { name, specialization, available_days } = req.body;
    db.prepare('UPDATE doctors SET name = ?, specialization = ?, available_days = ? WHERE id = ?').run(name, specialization, available_days, req.params.id);
    res.json({ success: true });
  });

  app.delete('/api/doctors/:id', (req, res) => {
    db.prepare('DELETE FROM doctors WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  app.get('/api/appointments', (req, res) => {
    const appointments = db.prepare(`
      SELECT a.*, d.name as doctor_name 
      FROM appointments a 
      LEFT JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.created_at DESC
    `).all();
    res.json(appointments);
  });

  app.post('/api/appointments', (req, res) => {
    const { patient_name, phone, email, doctor_id, appointment_date, message } = req.body;
    if (!patient_name || !phone || !email || !doctor_id || !appointment_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const info = db.prepare('INSERT INTO appointments (patient_name, phone, email, doctor_id, appointment_date, message) VALUES (?, ?, ?, ?, ?, ?)').run(
      patient_name, phone, email, doctor_id, appointment_date, message
    );
    res.json({ id: info.lastInsertRowid });
  });

  app.delete('/api/appointments/:id', (req, res) => {
    db.prepare('DELETE FROM appointments WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  });

  // Admin Login (Simple)
  app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
      res.json({ success: true, token: 'fake-jwt-token' });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
