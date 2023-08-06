from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinLengthValidator


class User(models.Model):
    email = models.CharField(
        max_length=255,
        validators=[MinLengthValidator(8, "Password must be at least 8 characters.")],
        unique=True,
    )
    password = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.email
