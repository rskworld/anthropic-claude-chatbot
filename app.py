"""
Anthropic Claude Chatbot - Flask Backend
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

from flask import Flask, request, jsonify, Response, stream_with_context
from flask_cors import CORS
from anthropic import Anthropic
import os
from dotenv import load_dotenv
import logging
import base64
import json

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Anthropic client
anthropic_client = None
try:
    api_key = os.getenv('ANTHROPIC_API_KEY')
    if api_key:
        anthropic_client = Anthropic(api_key=api_key)
        logger.info("Anthropic client initialized successfully")
    else:
        logger.warning("ANTHROPIC_API_KEY not found in environment variables")
except Exception as e:
    logger.error(f"Error initializing Anthropic client: {e}")


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint to verify API status
    """
    return jsonify({
        'status': 'healthy',
        'anthropic_configured': anthropic_client is not None
    }), 200


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint that handles conversations with Claude
    """
    try:
        if not anthropic_client:
            return jsonify({
                'error': 'Anthropic API key not configured. Please set ANTHROPIC_API_KEY in your .env file.'
            }), 500

        # Get request data
        data = request.get_json()
        message = data.get('message', '')
        model = data.get('model', 'claude-3-5-sonnet-20241022')
        max_tokens = data.get('max_tokens', 1024)
        temperature = data.get('temperature', 0.7)
        conversation_history = data.get('conversation_history', [])
        stream = data.get('stream', False)

        # Validate input
        if not message and not data.get('file_data'):
            return jsonify({'error': 'Message or file is required'}), 400

        # Prepare messages for Claude API
        messages = []
        
        # Add conversation history
        for msg in conversation_history:
            msg_content = msg.get('content', '')
            # Handle both string and list content formats
            if isinstance(msg_content, list):
                messages.append({
                    'role': msg.get('role', 'user'),
                    'content': msg_content
                })
            else:
                messages.append({
                    'role': msg.get('role', 'user'),
                    'content': msg_content
                })
        
        # Prepare current message content
        current_content = []
        if message:
            current_content.append({
                'type': 'text',
                'text': message
            })
        
        # Handle file uploads (images)
        file_data = data.get('file_data')
        if file_data:
            try:
                # file_data should be base64 encoded
                file_type = data.get('file_type', 'image/png')
                current_content.append({
                    'type': 'image',
                    'source': {
                        'type': 'base64',
                        'media_type': file_type,
                        'data': file_data
                    }
                })
            except Exception as e:
                logger.error(f"Error processing file: {e}")
                return jsonify({'error': f'Error processing file: {str(e)}'}), 400
        
        # Add current message
        if len(current_content) > 1 or file_data:
            messages.append({
                'role': 'user',
                'content': current_content
            })
        elif current_content and len(current_content) > 0:
            messages.append({
                'role': 'user',
                'content': current_content[0]['text']
            })
        else:
            messages.append({
                'role': 'user',
                'content': message
            })

        # Create message with Claude API
        try:
            # Handle streaming
            if stream:
                def generate():
                    try:
                        with anthropic_client.messages.stream(
                            model=model,
                            max_tokens=max_tokens,
                            temperature=temperature,
                            messages=messages,
                            system="You are a helpful, harmless, and honest AI assistant. Provide clear and accurate responses."
                        ) as stream_obj:
                            for text_block in stream_obj.text_stream:
                                yield f"data: {json.dumps({'response': text_block})}\n\n"
                            # Get final usage stats
                            try:
                                final_message = stream_obj.get_final_message()
                                usage = {
                                    'input_tokens': final_message.usage.input_tokens,
                                    'output_tokens': final_message.usage.output_tokens
                                }
                                yield f"data: {json.dumps({'usage': usage, 'done': True})}\n\n"
                            except:
                                pass
                        yield "data: [DONE]\n\n"
                    except Exception as e:
                        yield f"data: {json.dumps({'error': str(e)})}\n\n"
                
                return Response(
                    stream_with_context(generate()),
                    mimetype='text/event-stream',
                    headers={
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                        'X-Accel-Buffering': 'no',
                        'Access-Control-Allow-Origin': '*'
                    }
                )
            
            # Non-streaming response
            response = anthropic_client.messages.create(
                model=model,
                max_tokens=max_tokens,
                temperature=temperature,
                messages=messages,
                system="You are a helpful, harmless, and honest AI assistant. Provide clear and accurate responses."
            )

            # Extract response text
            response_text = ""
            if response.content:
                for block in response.content:
                    if hasattr(block, 'text'):
                        response_text += block.text

            logger.info(f"Successfully processed chat request with model {model}")

            return jsonify({
                'response': response_text,
                'model': model,
                'usage': {
                    'input_tokens': response.usage.input_tokens,
                    'output_tokens': response.usage.output_tokens
                }
            }), 200

        except Exception as api_error:
            logger.error(f"Anthropic API error: {api_error}")
            return jsonify({
                'error': f'Anthropic API error: {str(api_error)}'
            }), 500

    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}")
        return jsonify({
            'error': f'Internal server error: {str(e)}'
        }), 500


@app.route('/api/models', methods=['GET'])
def get_models():
    """
    Get available Claude models
    """
    models = [
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
    return jsonify({'models': models}), 200


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    logger.info("=" * 50)
    logger.info("Anthropic Claude Chatbot Server")
    logger.info("=" * 50)
    logger.info(f"Starting server on http://0.0.0.0:{port}")
    logger.info(f"API Health Check: http://localhost:{port}/api/health")
    logger.info(f"Debug mode: {debug}")
    logger.info("=" * 50)
    
    if not anthropic_client:
        logger.warning("⚠️  WARNING: ANTHROPIC_API_KEY not configured!")
        logger.warning("   Please set ANTHROPIC_API_KEY in .env file")
    else:
        logger.info("✅ Anthropic API client initialized successfully")
    
    try:
        app.run(host='0.0.0.0', port=port, debug=debug)
    except OSError as e:
        if "Address already in use" in str(e):
            logger.error(f"❌ Port {port} is already in use!")
            logger.error(f"   Please use a different port or stop the other application")
        else:
            logger.error(f"❌ Error starting server: {e}")

