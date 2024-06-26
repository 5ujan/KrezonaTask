# # views.py
from django.conf import settings
# from rest_framework.response import Response
# from django.views.decorators.csrf import csrf_exempt
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
 # Assuming you have a User model defined


class ConfigView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"publishableKey": settings.STRIPE_PUBLISHABLE_KEY})

class CreatePaymentIntent(APIView):
    def post(self, request, *args, **kwargs):
        if request.method == "POST":
            try:
            # Create a PaymentIntent on Stripe
                intent = stripe.PaymentIntent.create(
                amount=1999,  # Amount in cents
                currency="eur",
                payment_method_types=["card"],
                description="Example Payment Intent",
                )

            # Send client secret to the frontend
                return Response({"clientSecret": intent.client_secret})
            except Exception as e:
                return Response({"error": str(e)}, status=400)

