"""
Description: Contains URL patterns for configuring Stripe and handling payment intents.
Author: Sujan Baskota
Date created: June 26, 2024
Date modified: June 26, 2024
Modifications added:
    <Start of modifications section>
        2024-06-26 => Added URL patterns for ConfigView and CreatePaymentIntent.
    <End of modification section>
"""

from django.urls import path
from .views import ConfigView, CreatePaymentIntent

urlpatterns = [
    path("config/", ConfigView.as_view(), name="config"),
    path(
        "create-payment-intent/",
        CreatePaymentIntent.as_view(),
        name="create_payment_intent",
    ),
    # Other paths as needed
]


