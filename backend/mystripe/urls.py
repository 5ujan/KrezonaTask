# urls.py
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


