const db = require('./db');

// Every table is scoped to a user_id so no user's data ever mixes with another's,
// per the "each user has his own data and no one can see it" requirement.

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  weight_current REAL,
  weight_goal REAL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- An exercise can have multiple muscle labels (chest, back, legs, etc.)
CREATE TABLE IF NOT EXISTS exercise_labels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  label TEXT NOT NULL CHECK (label IN ('chest','back','legs','shoulders','arms','core'))
);

-- Weekly workout plan: which exercises are assigned to which day of the week
CREATE TABLE IF NOT EXISTS workout_plan_days (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0=Sunday
  label TEXT -- optional muscle group label for the day
);

CREATE TABLE IF NOT EXISTS workout_plan_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_day_id INTEGER NOT NULL REFERENCES workout_plan_days(id) ON DELETE CASCADE,
  exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE
);

-- One row per exercise per calendar date the user logged that exercise
CREATE TABLE IF NOT EXISTS exercise_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exercise_id INTEGER NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  log_date TEXT NOT NULL, -- 'YYYY-MM-DD'
  sort_order INTEGER DEFAULT 0, -- for manual drag-reorder within a workout day
  UNIQUE(user_id, exercise_id, log_date)
);

-- Individual sets within a logged exercise/day (starts at 3, expandable)
CREATE TABLE IF NOT EXISTS exercise_sets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  log_id INTEGER NOT NULL REFERENCES exercise_logs(id) ON DELETE CASCADE,
  set_number INTEGER NOT NULL,
  reps INTEGER,
  weight REAL
);

CREATE INDEX IF NOT EXISTS idx_exercises_user ON exercises(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_user_date ON exercise_logs(user_id, log_date);
CREATE INDEX IF NOT EXISTS idx_logs_exercise ON exercise_logs(exercise_id);
`);

console.log('✅ Database migrated successfully.');
