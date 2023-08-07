from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    user_id = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "categories"

    def serialise(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "created": self.created,
            "modified": self.modified,
        }
