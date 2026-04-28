CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- Users Table
-- ==========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Levels Table
-- ==========================================
CREATE TABLE levels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(50) NOT NULL, -- e.g., 'Easy', 'Medium', 'Hard'
    topic VARCHAR(100) NOT NULL,     -- e.g., 'JOIN', 'GROUP BY', 'SELECT'
    schema_definition TEXT NOT NULL, -- SQL to setup the level's tables and insert data in the sandbox
    expected_output JSONB NOT NULL,  -- The expected result of the correct query, stored as JSON array of objects
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Submissions Table
-- ==========================================
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    level_id UUID NOT NULL REFERENCES levels(id) ON DELETE CASCADE,
    query TEXT NOT NULL,
    result JSONB,                    -- The actual output produced by the user's query (or error message)
    status VARCHAR(50) NOT NULL,     -- e.g., 'Success', 'Failed', 'Error'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- Indexes for Performance
-- ==========================================
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_level_id ON submissions(level_id);
