# chat/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Message


class MessageListView(APIView):
    # permission_classes = [IsAuthenticated]  # Ensure user is authenticated

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
