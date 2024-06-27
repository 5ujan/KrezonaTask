"""
Description: URL patterns for image-related views.
Author: Sujan Baskota
Date created: Jun 26
Date modified: <Date when you initially created this code>
Modifications added:
    <Start of modifications section>
        Jun 26 => Created URL patterns for ImageUploadView, AllGifsView, BuyImageView, DeleteSentImageView, GetMyImageView.
    <End of modification section>
"""

from django.urls import path
from .views import ImageUploadView, AllGifsView, BuyImageView, DeleteSentImageView, GetMyImageView

urlpatterns = [
    path("upload/", ImageUploadView.as_view(), name="upload_image"),
    path("get/", AllGifsView.as_view(), name="upload_image"),
    path("my/", GetMyImageView.as_view(), name="upload_image"),
    path("premium/", BuyImageView.as_view(), name="upload_image"),
    path("premium/remove", DeleteSentImageView.as_view(), name="delete"),

]
