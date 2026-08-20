from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import StudentProfile


class StudentProfileDeleteAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="student@example.com",
            password="password123",
            role=UserRole.STUDENT,
        )

        self.profile = StudentProfile.objects.create(
            user=self.user,
            institution="University of Lagos",
            course_of_study="Computer Science",
            skills=["Python"],
            interests=["AI"],
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("student-profile")

    def test_student_can_delete_profile(self):
        response = self.client.delete(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            StudentProfile.objects.filter(
                id=self.profile.id
            ).exists()
        )

    def test_delete_returns_404_when_profile_does_not_exist(self):
        self.profile.delete()

        response = self.client.delete(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )