"""
Anthropic Claude Chatbot - Setup Script
Project: Anthropic Claude Chatbot
Category: OpenAI Integration
Year: 2026

Developer Details:
- Website: https://rskworld.in
- Email: help@rskworld.in, support@rskworld.in
- Phone: +91 93305 39277
- Organization: RSK World
- Founder: Molla Samser
- Designer & Tester: Rima Khatun

This script helps set up the project environment.
"""

import os
import shutil
import sys


def create_env_file():
    """Create .env file from env.example if it doesn't exist"""
    if not os.path.exists('.env'):
        if os.path.exists('env.example'):
            shutil.copy('env.example', '.env')
            print("✓ Created .env file from env.example")
            print("⚠ Please edit .env and add your ANTHROPIC_API_KEY")
        else:
            # Create a basic .env file
            with open('.env', 'w') as f:
                f.write("# Anthropic Claude Chatbot - Environment Variables\n")
                f.write("ANTHROPIC_API_KEY=your_anthropic_api_key_here\n")
                f.write("FLASK_ENV=development\n")
                f.write("PORT=5000\n")
            print("✓ Created .env file")
            print("⚠ Please edit .env and add your ANTHROPIC_API_KEY")
    else:
        print("✓ .env file already exists")


def check_dependencies():
    """Check if required packages are installed"""
    try:
        import flask
        import flask_cors
        import anthropic
        import dotenv
        print("✓ All dependencies are installed")
        return True
    except ImportError as e:
        print(f"✗ Missing dependency: {e.name}")
        print("  Run: pip install -r requirements.txt")
        return False


def main():
    """Main setup function"""
    print("=" * 50)
    print("Anthropic Claude Chatbot - Setup")
    print("=" * 50)
    print()
    
    print("1. Checking dependencies...")
    deps_ok = check_dependencies()
    print()
    
    print("2. Setting up environment file...")
    create_env_file()
    print()
    
    if deps_ok:
        print("=" * 50)
        print("Setup complete!")
        print("=" * 50)
        print()
        print("Next steps:")
        print("1. Edit .env and add your ANTHROPIC_API_KEY")
        print("2. Run: python app.py")
        print("3. Open index.html in your browser")
    else:
        print("=" * 50)
        print("Setup incomplete - please install dependencies")
        print("=" * 50)


if __name__ == '__main__':
    main()

