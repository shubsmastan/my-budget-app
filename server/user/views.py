from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
import json


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
            token = Token.objects.get_or_create(user=user)
            return JsonResponse({"accessToken": str(token[0])})
            # return JsonResponse({"message": "User authentication successful."})
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
