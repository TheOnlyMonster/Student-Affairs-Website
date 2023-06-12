from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'pages/home.html')
def add(request):
    return render(request,'pages/add.html')
def view(request):
    return render(request,'pages/view.html')
def viewActive(request):
    return render(request,'pages/view-active.html')