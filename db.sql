-- 📊 Database Schema (PostgreSQL)
-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Moods Table
CREATE TABLE moods (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  mood VARCHAR(50) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Playlists Table
CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  mood_id INTEGER REFERENCES moods(id) ON DELETE SET NULL,  -- Reference moods.id instead of moods.mood
  playlist_id VARCHAR(255) NOT NULL UNIQUE,  -- Ensure playlist_id is unique
  source VARCHAR(50) DEFAULT 'Spotify' CHECK (source IN ('Spotify', 'Deezer', 'Apple Music', 'YouTube')), -- Case-insensitive sources
  added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Preferences Table
CREATE TABLE user_preferences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  favorite_genres TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Favorite Playlists Table (Normalized)
CREATE TABLE favorite_playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  playlist_id VARCHAR(255) NOT NULL,
  source VARCHAR(50) DEFAULT 'Spotify',
  added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);