from django.db import models


class Entry(models.Model):
    date = models.DateField(unique=True)
    budget = models.IntegerField()
    spend = models.IntegerField(blank=True)
    user_id = models.IntegerField()
    category_id = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "entries"

    def serialise(self):
        return {
            "id": self.id,
            "date": self.date,
            "budget": self.budget,
            "spend": self.spend,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "created": self.created,
            "modified": self.modified,
        }
