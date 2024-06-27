"""
Description: Defines a WebSocket consumer for handling chat messages using Django Channels.
Author: Sujan Baskota
Date created: Jun 26, 2024
Date modified: 2024-06-26
Modifications added:
    <Start of modifications section>
        2024-06-26 => Initial creation of ChatConsumer with methods to handle WebSocket connections, disconnections, and message receptions.
        2024-06-26 => Implemented methods to add and discard channels from the 'chat' group using channel layer.
    <End of modification section>
"""

from channels.generic.websocket import AsyncWebsocketConsumer
import json


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connected")
        await self.accept()
        await self.channel_layer.group_add("chat", self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("chat", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            "chat", {"type": "chat.message", "message": data["message"]}
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({"message": event["message"]}))
