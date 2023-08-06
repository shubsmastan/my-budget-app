from django.http import JsonResponse
from .models import Category


def get_categories(req):
    if req.method == "GET":
        categories = []
        return JsonResponse({"categories": []})
    if req.method == "POST":
        return JsonResponse({"error": "Need to be an authenticated user."})
