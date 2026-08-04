from django.urls import path
from apps.users.views.private.profile.student import PrivateStudentProfileAPIView
from apps.users.views.private.profile.recruiter import PrivateRecruiterProfileAPIView


urlpatterns = [
    path('student/', PrivateStudentProfileAPIView.as_view(), name='student-profile'),
    path('recruiter/', PrivateRecruiterProfileAPIView.as_view(), name='recruiter-profile'),

]