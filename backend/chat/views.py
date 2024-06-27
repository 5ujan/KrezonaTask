"""
Description: Views for handling chat messages, including retrieving all messages and sending a new message.
Author: Sujan Baskota
Date created: 2024-06-26
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section> 
        2024-06-26 => Initial creation of MessageListView for retrieving and sending chat messages.
        2024-06-26 => Added check for empty message content and response handling.
        2024-06-26 => Included username in message data during message insertion.
    <End of modification section> 
"""

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Message


class MessageListView(APIView):

    def get(self, request):
        messages = Message.get_all_messages()
        return Response(messages, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user  # Get authenticated user
        content = request.data.get("content")
        username = request.data.get("username")

        if not content:
            return Response(
                {"error": "Content cannot be empty"}, status=status.HTTP_400_BAD_REQUEST
            )

        message = Message.insert_one({"username":username, "content": content})

        return Response(
            {"message": "Message sent successfully"}, status=status.HTTP_201_CREATED
        )
