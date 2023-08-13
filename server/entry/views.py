from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from .models import Entry
from category.models import Category
import json
import re

JWTAuthenticator = JWTAuthentication()


@csrf_exempt
def get_entries(req):
    try:
        token_obj = JWTAuthenticator.authenticate(req)
        username = str(token_obj[0])
        user = User.objects.get(username=username)
        user_id = user.id
        pass
    except:
        return JsonResponse({"error": "Authentication failed."}, status=401)

    if req.method == "GET":
        q = Entry.objects.filter(user_id=user_id)
        return JsonResponse([entry.serialise() for entry in q], safe=False)

    elif req.method == "POST":
        data = json.loads(req.body)
        category_id = data["category_id"]
        if category_id == None or category_id == "":
            return JsonResponse({"error": "A category ID is required."}, status=400)
        q = Category.objects.get(id=category_id)
        if q.user_id != user_id:
            return JsonResponse(
                {"error": "Not authorised to add to that category."}, status=403
            )

        date = data["date"]
        if date == None or date == "":
            return JsonResponse(
                {"error": "Please enter a date for this entry."}, status=400
            )
        match = re.search("\d\d\d\d-\d\d")
        if match == None:
            return JsonResponse(
                {"error": "Please enter date in format YYYY-MM."}, status=400
            )

        budget = data["budget"]
        if budget == None or date == "":
            return JsonResponse(
                {"error": "Please enter your budget for this entry."}, status=400
            )

        spend = data["spend"]
        if spend == None:
            spend = ""

        entry = Entry(date=date, budget=budget, spend=spend, category_id=category_id)
        entry.save()
        q = Entry.objects.filter(user_id=user_id)
        return JsonResponse([entry.serialise() for entry in q], safe=False)

    else:
        return JsonResponse({"error": "Method not allowed."}, status=400)


@csrf_exempt
def get_entry(req, id):
    try:
        token_obj = JWTAuthenticator.authenticate(req)
        username = str(token_obj[0])
        user = User.objects.get(username=username)
        user_id = user.id
        pass
    except:
        return JsonResponse({"error": "Authentication failed."}, status=401)

    try:
        entry = Entry.objects.get(id=id)
        if entry.user_id != user_id:
            return JsonResponse(
                {"error": "Not authorised to access that resource."}, status=403
            )
        pass
    except:
        return JsonResponse({"error": "Entry not found."}, status=404)

    if req.method == "GET":
        return JsonResponse(Entry.serialise(entry))

    elif req.method == "PUT":
        data = json.loads(req.body)
        name = data["name"]
        if name == None or name == "":
            return JsonResponse(
                {"error": "Please provide a category name."}, status=400
            )
        entry.name = name
        entry.save()
        return JsonResponse(Entry.serialise(category))

    elif req.method == "DELETE":
        entry.delete()
        return JsonResponse({"message": "Category successfully deleted."})

    else:
        return JsonResponse({"error": "Method not allowed."}, status=400)
