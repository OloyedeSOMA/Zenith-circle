from unittest.mock import patch
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import StudentProfile


class StudentProfileCreateAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            email="student@example.com",
            password="password123",
            role=UserRole.STUDENT,
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("student-profile")

    @patch(
        "apps.users.services.profile.student.upload_student_profile_photo"
    )
    def test_student_can_create_profile(self, mock_upload):
        mock_upload.return_value = (
            "https://res.cloudinary.com/test/student-photo.webp"
        )

        profile_photo = SimpleUploadedFile(
            name="profile_photo.jpg",
            content=(
                b"\xff\xd8\xff\xe0"
                b"\x00\x10JFIF\x00\x01\x01\x00\x00\x01\x00\x01\x00\x00"
            ),
            content_type="image/jpeg",
        )


        data = {
            "profile_photo": profile_photo,
            "institution": "University of Lagos",
            "course_of_study": "Computer Science",
            "skills": ["Python", "Django"],
            "interests": ["AI", "Software Engineering"],
        }

        response = self.client.post(
            self.url,
            data,
            format="multipart",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            StudentProfile.objects.filter(
                user=self.user
            ).exists()
        )

        profile = StudentProfile.objects.get(
            user=self.user
        )

        self.assertEqual(
            profile.profile_photo,
            "https://res.cloudinary.com/test/student-photo.webp",
        )

        mock_upload.assert_called_once()

    def test_student_cannot_create_duplicate_profile(self):
        StudentProfile.objects.create(
            user=self.user,
            institution="University of Lagos",
            course_of_study="Computer Science",
            skills=["Python"],
            interests=["AI"],
        )

        response = self.client.post(
            self.url,
            {
                "institution": "University of Ibadan",
                "course_of_study": "Physics",
                "skills": ["Python"],
                "interests": ["AI"],
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_recruiter_cannot_create_student_profile(self):
        recruiter = User.objects.create_user(
            email="recruiter@example.com",
            password="password123",
            role=UserRole.RECRUITER,
        )

        self.client.force_authenticate(user=recruiter)

        response = self.client.post(
            self.url,
            {
                "institution": "University of Lagos",
                "course_of_study": "Computer Science",
                "skills": ["Python"],
                "interests": ["AI"],
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )