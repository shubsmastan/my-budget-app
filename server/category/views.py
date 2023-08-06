from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def get_categories(req):
    return HttpResponse("Respond with a user's categories")
