from django.utils import timezone
from django.db import models
from django import forms
from django.contrib import admin

# Create your models here.
class Student(models.Model):
    dep = [
        ('CS', 'CS'),
        ('DS', 'DS'),
        ('IS', 'IS'),
        ('AI', 'AI'),
        ('General','General')
    ]
    lev = [
        ('First Level', 'First Level'),
        ('Second Level', 'Second Level'),
        ('Third Level', 'Third Level'),
        ('Fourth Level', 'Fourth Level')
    ]
    gen = [
        ('Male', 'Male'),
        ('Female', 'Female')
    ]
    
    Fname = models.CharField(max_length=100, null=False)
    Lname = models.CharField(max_length=100, null=False)
    Nid = models.CharField(max_length=20, null=False)
    Email = models.EmailField(null=False)
    Phone = models.CharField(max_length=20, null=False)
    Address = models.CharField(max_length=255, null=False)
    Birthday = models.DateField(null=False)
    Gender = models.CharField(max_length=10, choices=gen,null=False)
    Status = models.BooleanField(default=True)
    Level = models.CharField(max_length=100, choices=lev, default='First Level')
    GPA = models.FloatField(null=False)
    department = models.CharField(max_length=100,choices=dep,default='General')
    image=models.ImageField(upload_to='photo/%y/%m/%d',null=False)
    id = models.AutoField(primary_key=True)
    def save(self, *args, **kwargs):
        if not self.id:
            current_year = timezone.now().year
            latest_student = Student.objects.filter(id__startswith=current_year).order_by('-id').first()
            if latest_student:
                last_id = int(str(latest_student.id)[-4:])
                new_id = current_year * 10000 + last_id + 1
            else:
                new_id = current_year * 10000
            
            self.id = new_id
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.Fname
    

    #class Meta:
     #   verbose_name='names'
     #   ordering=['-FirstName']
class StudentAdminForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance.Level != 'Third Level' or self.instance.Level != 'Fourth Level' :
            self.fields['department'].widget.choices = [choice for choice in self.fields['department'].widget.choices if choice[0] == 'General']

class StudentAdmin(admin.ModelAdmin):
    form = StudentAdminForm
