from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Category


@csrf_exempt
def get_categories(req):
    if req.user.is_authenticated == False:
        return JsonResponse({"error": "Need to be an authenticated user."})
    user_id = req.user.id
    if req.method == "GET":
        q = Category.objects.filter(user_id=user_id)
        print(q)
        return JsonResponse([cat.serialise() for cat in q], safe=False)
    if req.method == "POST":
        name = req.POST.get("name")
        if name == None or name == "":
            return JsonResponse({"error": "Please enter a category name."}, status=400)
        category = Category(name=name, user_id=user_id)
        category.save()
        return JsonResponse({"categories": []})
