"""
Description: URL routing for authentication endpoints including JWT token operations and user registration/login.
Author: Sujan Baskota
Date created: 2024-06-26
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section> 
        2024-06-26 => Added routes for JWT token operations (obtain, refresh, verify) and user registration/login.
    <End of modification section> 
"""

from django.urls import path
from .views import RegisterView, LoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path(
        "token/", TokenObtainPairView.as_view(), name="token_obtain_pair"
    ),  # Endpoint to obtain JWT token pair
    path(
        "token/refresh/", TokenRefreshView.as_view(), name="token_refresh"
    ),  # Endpoint to refresh JWT token
    path(
        "token/verify/", TokenVerifyView.as_view(), name="token_verify"
    ),  # Endpoint to verify JWT token
    path(
        "register/", RegisterView.as_view(), name="register"
    ),  # Endpoint for user registration
    path("login/", LoginView.as_view(), name="login"),  # Endpoint for user login
]
