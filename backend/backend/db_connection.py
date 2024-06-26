import pymongo
from django.conf import settings


url = "mongodb+srv://batman:imbatman@cluster0.zn4fxpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(url, ssl=True)


db = client['test_mongo']

print(db)
