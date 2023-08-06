from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from .models import User
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def sign_up(req):
    if req.method == "POST":
        email = req.POST.get("email")
        password = req.POST.get("password")
        confirm_password = req.POST.get("confirm_password")
        if email == None or email == "":
            return JsonResponse(
                {"error": "Please provide your email address."}, status=400
            )
        try:
            existingUser = User.objects.get(email=email)
            if existingUser:
                return JsonResponse({"error": "Email already in use."}, status=400)
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
        user = User(
            email=email,
            password=make_password(password),
        )
        user.save()
        return JsonResponse({"message": "User created successfully."})


@csrf_exempt
def log_in(req):
    return JsonResponse({"message": "User logged in successfully."})
