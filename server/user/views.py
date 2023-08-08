from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from category.models import Category
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.views.decorators.csrf import csrf_exempt
import json

JWTAuthenticator = JWTAuthentication()


def get_user(req):
    try:
        if req.method == "GET":
            token_obj = JWTAuthenticator.authenticate(req)
            username = str(token_obj[0])
            user = User.objects.get(username=username)
            return JsonResponse(
                {
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "id": user.id,
                }
            )
        else:
            return JsonResponse({"error": "Method not permitted."}, status=400)
    except:
        return JsonResponse({"error": "Authentication failed."}, status=401)


@csrf_exempt
def sign_up(req):
    if req.method == "POST":
        data = json.loads(req.body)
        username = data["username"]
        first_name = data["first_name"]
        last_name = data["last_name"]
        password = data["password"]
        confirm_password = data["confirm_password"]
        if username == None or username == "":
            return JsonResponse({"error": "Please provide a username."}, status=400)
        try:
            existingUser = User.objects.get(username=username)
            return JsonResponse({"error": "Username already in use."}, status=400)
        except:
            pass
        if password == None or password == "":
            return JsonResponse({"error": "Please provide a password."}, status=400)
        if confirm_password == None or confirm_password == "":
            return JsonResponse({"error": "Please confirm your password."}, status=400)
        if len(password) < 8:
            return JsonResponse(
                {"error": "Password must be at least 8 characters."},
                status=400,
            )
        if password != confirm_password:
            return JsonResponse(
                {"error": "Passwords must match."},
                status=400,
            )
        user = User.objects.create_user(
            username=username,
            email="",
            password=password,
            first_name=first_name,
            last_name=last_name,
        )
        user.save()
        categories = [
            "Bills",
            "Charity",
            "Eating out",
            "Entertainment",
            "Expenses",
            "Finances",
            "Gifts",
            "Groceries",
            "Holidays",
            "Personal care",
            "Shopping",
            "Transport",
        ]
        for cat in categories:
            cat = Category(name=cat, user_id=user.id)
            cat.save()
        return JsonResponse({"message": "User created successfully."})
    else:
        return JsonResponse({"error": "Method not allowed."}, status=403)


@csrf_exempt
def sign_in(req):
    if req.method == "POST":
        data = json.loads(req.body)
        username = data["username"]
        password = data["password"]
        if username == None or username == "":
            return JsonResponse({"error": "Please enter your username."}, status=400)
        if password == None or password == "":
            return JsonResponse({"error": "Please enter your password."}, status=400)
        try:
            existing_user = User.objects.get(username=username)
        except:
            return JsonResponse({"error": "Username does not exist."}, status=404)
        user = authenticate(req, username=username, password=password)
        if user is not None:
            login(req, user)
            token = RefreshToken.for_user(user)
            return JsonResponse(
                {
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "token": str(token.access_token),
                }
            )
        else:
            return JsonResponse(
                {"error": "Username and password do not match."}, status=404
            )
    else:
        return JsonResponse({"error": "Method not allowed."}, status=403)


@csrf_exempt
def sign_out(req):
    logout(req)
    return JsonResponse({"message": "User logged out successfully."})
