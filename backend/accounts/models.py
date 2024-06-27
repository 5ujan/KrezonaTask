"""
Description: Defines a Django model for interfacing with a MongoDB collection using an external database connection.
Author: Sujan Baskota
Date created: 2024-06-25
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section> 
        2024-06-25 => Initial creation of a model to interface with MongoDB collection 'USER'.
    <End of modification section> 
"""

from django.db import models
from backend.db_connection import db

# Create your models here.

# Reference to the 'USER' collection in MongoDB
User = db["USER"]
