#!/bin/bash

# Task Management System - Setup Script
# This script helps with initial setup

echo "================================"
echo "Task Management System Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Navigate to backend
echo "🔧 Setting up Backend..."
cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found in backend directory"
    echo "   Please create .env file with MongoDB connection details"
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""

# Navigate to frontend
cd ../frontend

echo "🎨 Setting up Frontend..."
echo "📦 Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "Next Steps:"
echo "1. Start MongoDB: mongod"
echo "2. In one terminal (backend): cd backend && npm start"
echo "3. In another terminal (frontend): cd frontend && npm start"
echo ""
echo "Admin Login:"
echo "  Email: admin@example.com"
echo "  Password: admin123"
echo ""
