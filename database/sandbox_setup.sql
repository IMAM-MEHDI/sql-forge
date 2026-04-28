-- ==========================================
-- SQL Sandbox Setup Script
-- ==========================================
-- This script sets up a highly restricted PostgreSQL role and schema
-- for safely executing user-submitted SQL queries.

-- 1. Create a dedicated sandbox role
-- This role has login privileges but is stripped of all other capabilities.
-- It cannot act as a superuser, create databases, or create other roles.
CREATE ROLE sandbox_user WITH LOGIN PASSWORD 'sandbox_secure_password' NOSUPERUSER NOCREATEDB NOCREATEROLE;

-- 2. Revoke default privileges
-- Ensure the sandbox user cannot interact with the public schema
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM sandbox_user;

-- 3. Create a dedicated execution schema
CREATE SCHEMA sandbox;

-- 4. Grant schema usage
-- Allow the sandbox user to see and use the sandbox schema
GRANT USAGE ON SCHEMA sandbox TO sandbox_user;

-- 5. Grant limited creation rights
-- Allow the sandbox user to create tables *only* in the sandbox schema.
-- This is necessary because our API will need to dynamically create tables 
-- and insert dataset records for a specific level before running the user's query.
GRANT CREATE ON SCHEMA sandbox TO sandbox_user;


-- ==========================================
-- Execution Engine Lifecycle (For the Backend)
-- ==========================================
/*
When executing a user's query via the Python API, follow these steps to guarantee isolation:

1. Connect: Establish a DB connection using the `sandbox_user` credentials.
2. Search Path: Execute `SET search_path TO sandbox;`
3. Timeout: Execute `SET statement_timeout = '2s';` to prevent infinite loops or heavy queries.
4. Transaction Start: Execute `BEGIN;`
5. Setup Data: Execute the level's `schema_definition` (e.g., CREATE TABLE users... INSERT INTO users...).
6. User Query: Execute the user's `query`.
7. Fetch Results: Retrieve the rows and column names.
8. Teardown: Execute `ROLLBACK;` 

Because we use `ROLLBACK`, all tables and data created in step 5 are immediately destroyed,
leaving a clean slate for the next query and ensuring zero data leakage between requests.
*/
