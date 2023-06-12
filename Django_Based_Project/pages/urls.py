from django.urls import path
from . import views

urlpatterns=[
    path('',views.home, name='home'),
    path('view',views.view, name='view'),
    path('viewActive',views.viewActive, name='viewActive'),
    path('add',views.add, name='add'),

]