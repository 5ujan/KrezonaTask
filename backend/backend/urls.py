"""
Description: URL configuration for the Django project, including routes for different applications.
Author: Sujan Baskota
Date created: 2024-06-25
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section>
        2024-06-25 => Created initial URL configuration with paths for 'accounts' apps.
        2024-06-26 => Added URL configuration with paths for  'chat', 'images' and 'mystripe' apps.
    <End of modification section> 
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),  # Include accounts app URLs
    path("api/images/", include("images.urls")),  # Include images app URLs
    path("api/chat/", include("chat.urls")),  # Include chat app URLs
    path("api/", include("mystripe.urls")),  # Include mystripe app URLs
]
