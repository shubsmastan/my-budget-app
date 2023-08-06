from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=255)
    user_id = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "categories"
