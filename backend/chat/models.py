"""
Description: Defines a Django model for interacting with a MongoDB collection named 'MESSAGES'.
Author: Sujan Baskota
Date created: <Date when you initially created this code>
Date modified: <Latest date when you modified this code>
Modifications added:
    <Start of modifications section> 
        <Date of modification> => <Description of modifications made>
    <End of modification section>
"""

from django.db import models

from backend.db_connection import db

# Create your models here.

Message = db["MESSAGES"]
