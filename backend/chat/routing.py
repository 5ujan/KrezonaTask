"""
Description: Routing configuration for WebSocket connections in the chat application, using Django Channels.
Author: Sujan Baskota
Date created: 2024-06-26
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section>
        2024-06-26 => Initial creation of WebSocket routing configuration for chat application.
    <End of modification section> 
"""

from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/$", consumers.ChatConsumer.as_asgi()),
]
