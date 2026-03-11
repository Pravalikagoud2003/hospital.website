-- Doctors Table
CREATE TABLE doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    available_days TEXT NOT NULL
);

-- Appointments Table
CREATE TABLE appointments (
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

-- Initial Data
INSERT INTO doctors (name, specialization, available_days) VALUES ('Dr. Sarah Johnson', 'Cardiologist', 'Mon, Wed, Fri');
INSERT INTO doctors (name, specialization, available_days) VALUES ('Dr. Michael Chen', 'Pediatrician', 'Tue, Thu, Sat');
INSERT INTO doctors (name, specialization, available_days) VALUES ('Dr. Emily Williams', 'Dermatologist', 'Mon, Tue, Thu');
