"""
Description: Connects to a MongoDB database using pymongo and Django settings.
Author: Sujan Baskota
Date created: 2024-06-25
Date modified: 2024-06-27
Modifications added:
    <Start of modifications section> 
        2024-06-25 => Initial creation of MongoDB connection using pymongo and Django settings.
    <End of modification section>
"""

import pymongo
from django.conf import settings

# Retrieve the MongoDB URL from Django settings
url = settings.DATABASE_URL
# Initialize MongoDB client with SSL enabled
client = pymongo.MongoClient(url, ssl=True)

# Connect to the 'test_mongo' database
db = client["test_mongo"]

print(db)
