"""
Description: ASGI configuration for Django project to handle HTTP and WebSocket protocols using Channels.
Author: Sujan Baskota
Date created: 2024-06-26
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section>
        2024-06-26 => Initial setup for ASGI configuration with support for HTTP and WebSocket protocols using Channels.
    <End of modification section> 
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import chat.routing

# Set the default Django settings module for the 'asgi' application
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Define the ASGI application
application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),  # Handles HTTP protocol
        "websocket": AuthMiddlewareStack(
            URLRouter(chat.routing.websocket_urlpatterns)
        ),  # Handles WebSocket protocol with authentication
    }
)
