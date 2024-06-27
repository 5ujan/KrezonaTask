"""
Description: Serializer class for handling image uploads.
Author: Sujan Baskota
Date created: Jun 26
Date modified: <Date when you initially created this code>
Modifications added:
    <Start of modifications section>
        Jun 26 => Created ImageUploadSerializer for handling image uploads.
    <End of modification section>
"""

from rest_framework import serializers


class ImageUploadSerializer(serializers.Serializer):
    image = serializers.ImageField()
