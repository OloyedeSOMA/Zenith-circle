from django.db import models
from django.conf import settings
from apps.common.models.base import BaseModel


class StudentProfile(BaseModel):
    """

    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    institution = models.CharField(max_length=255, blank=True)
    course_of_study = models.CharField(max_length=255, blank=True)
    current_level = models.CharField(max_length=50, blank=True)
    expected_graduation = models.DateField(null=True, blank=True)
    skills = models.JSONField(default=list, blank=True)
    interests = models.JSONField(default=list, blank=True)
    profile_photo = models.URLField(blank=True, null=True)


    def __str__(self):
        return f'Student: {self.user.first_name} {self.user.last_name} - {self.user.email}'



class RecruiterProfile(BaseModel):
    """

    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='recruiter_profile')
    organisation = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    logo = models.URLField(blank=True, null=True)

    def __str__(self):
        return f'Recruiter: {self.user.first_name} {self.user.last_name} - {self.user.email} - {self.website}'