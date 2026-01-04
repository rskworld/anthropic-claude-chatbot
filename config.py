"""
Anthropic Claude Chatbot - Configuration File
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
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Config:
    """Application configuration class"""
    
    # Anthropic API Configuration
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY', '')
    
    # Flask Configuration
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = FLASK_ENV == 'development'
    PORT = int(os.getenv('PORT', 5000))
    HOST = os.getenv('HOST', '0.0.0.0')
    
    # CORS Configuration
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', '*').split(',')
    
    # API Configuration
    API_BASE_URL = os.getenv('API_BASE_URL', 'http://localhost:5000')
    
    # Default Model Settings
    DEFAULT_MODEL = 'claude-3-5-sonnet-20241022'
    DEFAULT_MAX_TOKENS = 1024
    DEFAULT_TEMPERATURE = 0.7
    
    # Available Models
    AVAILABLE_MODELS = [
        {
            'id': 'claude-3-5-sonnet-20241022',
            'name': 'Claude 3.5 Sonnet',
            'description': 'Latest and most capable model with advanced reasoning'
        },
        {
            'id': 'claude-3-opus-20240229',
            'name': 'Claude 3 Opus',
            'description': 'Most powerful model for complex tasks'
        },
        {
            'id': 'claude-3-sonnet-20240229',
            'name': 'Claude 3 Sonnet',
            'description': 'Balanced performance and speed'
        },
        {
            'id': 'claude-3-haiku-20240307',
            'name': 'Claude 3 Haiku',
            'description': 'Fastest and most cost-effective model'
        }
    ]
    
    # System Prompt
    SYSTEM_PROMPT = (
        "You are a helpful, harmless, and honest AI assistant. "
        "Provide clear and accurate responses. Be conversational and friendly."
    )


# Validate configuration
def validate_config():
    """Validate that required configuration is present"""
    if not Config.ANTHROPIC_API_KEY:
        raise ValueError(
            "ANTHROPIC_API_KEY is required. Please set it in your .env file. "
            "Get your API key from https://console.anthropic.com/"
        )
    return True

