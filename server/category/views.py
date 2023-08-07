from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Category

JWTAuthenticator = JWTAuthentication()


def get_categories(req):
    # if not req.headers["Authorization"]:
    #     return JsonResponse({"error": "Need to be an authenticated user."})
    token = req.headers["Authorization"].split()[1]
    user = JWTAuthenticator.authenticate(req)
    print(user)
    user_id = req.user.id
    if req.method == "GET":
        q = Category.objects.filter(user_id=user_id)
        return JsonResponse([cat.serialise() for cat in q], safe=False)
    if req.method == "POST":
        name = req.POST.get("name")
        if name == None or name == "":
            return JsonResponse({"error": "Please enter a category name."}, status=400)
        category = Category(name=name, user_id=user_id)
        category.save()
        return JsonResponse({"categories": []})
    else:
        return JsonResponse({"error": "Method not allowed."})
