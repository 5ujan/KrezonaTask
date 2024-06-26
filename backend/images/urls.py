
from django.urls import path
from .views import ImageUploadView, AllGifsView, BuyImageView, DeleteSentImageView, GetMyImageView

urlpatterns = [
    path("upload/", ImageUploadView.as_view(), name="upload_image"),
    path("get/", AllGifsView.as_view(), name="upload_image"),
    path("my/", GetMyImageView.as_view(), name="upload_image"),
    path("premium/", BuyImageView.as_view(), name="upload_image"),
    path("premium/remove", DeleteSentImageView.as_view(), name="delete"),

]
