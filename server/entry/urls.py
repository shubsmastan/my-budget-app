from django.urls import path
from . import views

urlpatterns = [path("", views.get_entries), path("<int:id>/", views.get_entry)]
