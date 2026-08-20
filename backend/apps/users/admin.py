from django.contrib import admin
from .models import User, StudentProfile, RecruiterProfile


admin.site.register(User)
admin.site.register(StudentProfile)
admin.site.register(RecruiterProfile)
