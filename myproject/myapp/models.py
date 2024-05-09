from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.deconstruct import deconstructible

@deconstructible
class FileTypeValidator:
    def __init__(self, extensions):
        self.extensions = extensions

    def __call__(self, value):
        import os
        ext = os.path.splitext(value.name)[1]  # Extract the file extension
        if ext.lower() not in self.extensions:
            raise ValidationError('Unsupported file extension.')

class Image(models.Model):
    owner = models.ForeignKey(User, related_name='images', on_delete=models.CASCADE)
    image_file = models.ImageField(
        upload_to='images/',
        validators=[FileTypeValidator(['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'])]
    )
    label = models.CharField(max_length=100, blank=True, null=True)  # Allows for unlabeled images initially
    status = models.CharField(max_length=10, default='pending')  # Tracks labeling status

    def __str__(self):
        return f"Image {self.id} - {self.label or 'No Label'}"
