from django.contrib import admin
from django.urls import path
from . import views

urlpatterns=[
    path('api/students/', views.get_students, name='get_students'),
    path('api/students/<int:student_id>/', views.update_student, name='update_student'),
    path('assign_dep/',views.assign_dep,name='assign_dep'),
    path('edit_stu/',views.edit_stu,name='edit_stu'),
    path('api/addStudent/',views.add_student, name='add_student'),
]