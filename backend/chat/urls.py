"""
Description: URL routing for the chat application, defining the endpoint for message operations.
Author: Sujan Baskota
Date created: 2024-06-26
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section>
        2024-06-26 => Initial creation of URL routing for chat application with MessageListView.
    <End of modification section> 
"""

from django.urls import path
from .views import MessageListView

urlpatterns = [
    path("messages/", MessageListView.as_view(), name="message-list"),
]
