from django.shortcuts import render
from django.http import HttpResponse

# Create your views here. Views are request handlers in Django.

def say_hello(req):
    return HttpResponse("Hello world!")