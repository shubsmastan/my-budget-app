from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.sign_up),
    path("signin/", views.sign_in),
    path("signout/", views.sign_out),
]
