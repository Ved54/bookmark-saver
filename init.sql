-- Database initialization script
-- This script will be executed when the MySQL container starts for the first time

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bookmark_saver;

-- Use the database
USE bookmark_saver;

-- Grant privileges to the admin user
GRANT ALL PRIVILEGES ON bookmark_saver.* TO 'admin'@'%';
FLUSH PRIVILEGES;

-- The tables will be created automatically by Sequelize when the backend starts
