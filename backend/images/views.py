from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import cloudinary.uploader
from bson.objectid import ObjectId
from .serializers import ImageUploadSerializer
from .models import Image
from accounts.models import User  
from django.conf import settings


CLOUD_NAME = settings.CLOUD_NAME
API_KEY = settings.API_KEY
API_SECRET = settings.API_SECRET


cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET,
    secure=True,
)


class ImageUploadView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ImageUploadSerializer(data=request.data)
        if serializer.is_valid():
            image = serializer.validated_data["image"]
            upload_result = cloudinary.uploader.upload(image)

            img = Image.insert_one({"url": upload_result["secure_url"]})

            return Response(
                {"img": {"url": upload_result["secure_url"]}},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllGifsView(APIView):
    def get(self, request, *args, **kwargs):
        images = list(Image.find({}))

        for image in images:
            image["_id"] = str(image["_id"])

        return Response(
            {"gif_urls": images},
            status=status.HTTP_200_OK,
        )


class BuyImageView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        image_id = request.data.get("image_id")

        if not user_id or not image_id:
            return Response(
                {"error": "user_id and image_id are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.find_one({"_id": ObjectId(user_id)})
        image = Image.find_one({"_id": ObjectId(image_id)})

        if not user or not image:
            return Response(
                {"error": "Invalid user_id or image_id"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Convert ObjectId to string for image_id before pushing to bought_images
        User.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$push": {
                    "bought_images": {"image": image["url"], "image_id": str(image_id)}
                }
            },
        )
        user = User.find_one({"_id": ObjectId(user_id)})

        # Convert ObjectId to string for response serialization
        bought_images = [
            {"image": img["image"], "image_id": str(img["image_id"])}
            for img in user["bought_images"]
        ]

        return Response(
            {"message": "Image added to user's collection", "images": bought_images},
            status=status.HTTP_200_OK,
        )


class GetMyImageView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        image_id = request.data.get("image_id")

        if not user_id :
            return Response(
                {"error": "user_id are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.find_one({"_id": ObjectId(user_id)})
        
        
        # Convert ObjectId to string for image_id before pushing to bought_images
      
        user = User.find_one({"_id": ObjectId(user_id)})

        # Convert ObjectId to string for response serialization
        bought_images = [
            {"image": img["image"], "image_id": str(img["image_id"])}
            for img in user["bought_images"]
        ]

        return Response(
            {"message": "Images of user's collection", "images": bought_images},
            status=status.HTTP_200_OK,
        )


class DeleteSentImageView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        image_id = request.data.get("image_id")

        print(user_id, image_id)

        if not user_id or not image_id:
            return Response(
                {"error": "user_id and image_id are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.find_one({"_id": ObjectId(user_id)})

        if not user:
            return Response(
                {"error": "Invalid user_id"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Convert ObjectId to string for image_id before using it in $pull
        User.update_one(
            {"_id": ObjectId(user_id)},
            {"$pull": {"bought_images": {"image_id": str(image_id)}}},
        )

        user = User.find_one({"_id": ObjectId(user_id)})

        # Convert ObjectId to string for response serialization
        bought_images = [
            {"image": img["image"], "image_id": str(img["image_id"])}
            for img in user["bought_images"]
        ]

        return Response(
            {
                "message": "Image removed from user's collection",
                "images": bought_images,
            },
            status=status.HTTP_200_OK,
        )
