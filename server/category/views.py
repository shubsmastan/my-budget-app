from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
from .models import Category
import json

JWTAuthenticator = JWTAuthentication()


@csrf_exempt
def get_categories(req):
    try:
        token_obj = JWTAuthenticator.authenticate(req)
        username = str(token_obj[0])
        user = User.objects.get(username=username)
        user_id = user.id
        if req.method == "GET":
            q = Category.objects.filter(user_id=user_id)
            return JsonResponse([cat.serialise() for cat in q], safe=False)
        elif req.method == "POST":
            data = json.loads(req.body)
            name = data["name"]
            if name == None or name == "":
                return JsonResponse(
                    {"error": "Please enter a category name."}, status=400
                )
            # category = Category(name=name, user_id=user_id)
            # category.save()
            # q = Category.objects.filter(user_id=user_id)
            # return JsonResponse([cat.serialise() for cat in q], safe=False)
            return JsonResponse({"message": "Success!"})
        else:
            return JsonResponse({"error": "Method not allowed."}, status=400)
    except:
        return JsonResponse({"error": "Authentication failed."}, status=401)
