import pymongo
from django.conf import settings


url = settings.DATABASE_URL
client = pymongo.MongoClient(url, ssl=True)


db = client['test_mongo']

print(db)
