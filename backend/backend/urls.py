# backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),  # Include accounts app URLs
    path("api/images/", include("images.urls")),  # Include accounts app URLs
    path("api/chat/", include("chat.urls")),  # Include chat app URLs
    path("api/", include("mystripe.urls")),  # Include chat app URLs
]
