from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from bson.objectid import ObjectId
import hashlib


class MongoDBUser:
    def __init__(self, user_data):
        self.id = str(user_data["_id"])
        self.username = user_data["username"]
        self.email = user_data["email"]
        self.password = user_data["password"]

    def __str__(self):
        return self.email


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        username = data.get("username")
        email = data.get("email")
        password = hashlib.sha256(data.get("password").encode()).hexdigest()

        if User.find_one({"email": email}):
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        user = User.insert_one(
            {"username": username, "email": email, "password": password}
        )

        user_id = user.inserted_id
        user = User.find_one({"_id": ObjectId(user_id)})

        # Wrap the MongoDB user data in MongoDBUser class
        mongo_user = MongoDBUser(user)
        refresh = RefreshToken.for_user(mongo_user)

        return Response(
            {
                "user": {
                    "id": str(user["_id"]),
                    "username": user["username"],
                    "email": user["email"],
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get("email")
        password = hashlib.sha256(data.get("password").encode()).hexdigest()

        user = User.find_one({"email": email, "password": password})
        if not user:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Wrap the MongoDB user data in MongoDBUser class
        mongo_user = MongoDBUser(user)
        refresh = RefreshToken.for_user(mongo_user)

        return Response(
            {
                "user": {
                    "id": str(user["_id"]),
                    "username": user["username"],
                    "email": user["email"],
                },
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        )
