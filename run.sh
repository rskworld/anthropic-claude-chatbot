#!/bin/bash
# Anthropic Claude Chatbot - Linux/Mac Start Script
# Project: Anthropic Claude Chatbot
# Year: 2026
# 
# Developer Details:
# - Website: https://rskworld.in
# - Email: help@rskworld.in, support@rskworld.in
# - Phone: +91 93305 39277
# - Organization: RSK World

echo "Starting Anthropic Claude Chatbot..."
echo ""

# Check if virtual environment exists
if [ -d "venv" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
else
    echo "Virtual environment not found. Creating one..."
    python3 -m venv venv
    source venv/bin/activate
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

echo ""
echo "Starting Flask server..."
python app.py

