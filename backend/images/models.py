"""
Description: Defines Django models using a database connection from backend.db_connection.
Author: Sujan Baskota
Date created: Jun 26
Date modified: <Date when you initially created this code>
Modifications added:
    <Start of modifications section>
        Jun 26 => Defined Image model using the db connection from backend.db_connection.
    <End of modification section>
"""

from django.db import models
from backend.db_connection import db

# Create your models here.
Image = db["Image"]


