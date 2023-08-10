from django.urls import path
from . import views

urlpatterns = [path("", views.get_categories), path("<int:id>/", views.get_category)]
