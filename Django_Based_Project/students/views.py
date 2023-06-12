from .models import Student
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import get_object_or_404, render

# Create your views here.
def edit_stu(request):
    return render(request, 'pages/edit-std.html')

def assign_dep(request):
    return render(request, 'pages/assign-dept.html')

def get_students(request):
    students = Student.objects.all().values()
    return JsonResponse(list(students), safe=False)

@csrf_exempt
def add_student(request):
    if request.method == 'POST':
        student = Student()
        student.image = request.FILES.get('image')
        for key, value in request.POST.items():
            setattr(student, key, value)
        try:
            std = Student.objects.get(Nid = student.Nid)
            return JsonResponse({'error': 'Student already exist!'},status = 400)
        except Student.DoesNotExist:
            student.save()
            return JsonResponse({'message': 'Student added successfully!'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

@csrf_exempt
def update_student(request, student_id):
    try:
        student = Student.objects.get(id=student_id)
        if request.method == 'PUT':
            
                updated_data = json.loads(request.body)
                for key, value in updated_data.items():
                    setattr(student, key, value)
                    
                student.save()
                return JsonResponse({'status': 'success', 'message': 'Student data updated.'})   
        elif request.method == 'DELETE':
                student.delete()
                return JsonResponse({'status': 'success', 'message': 'Student deleted.'})
        else:
                return JsonResponse({'status': 'error', 'message': 'Invalid request method.'})
    except Student.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Student not found.'})


