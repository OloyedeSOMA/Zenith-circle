from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import StudentProfile
from apps.users.tests.utils import create_test_image


class StudentProfileUpdateAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            email="student@example.com",
            password="password123",
            role=UserRole.STUDENT,
        )


        self.profile = StudentProfile.objects.create(
            user=self.user,
            profile_photo="https://cloudinary.com/old-photo.webp",
            institution="Old University",
            course_of_study="Physics",
            skills='["Python"]',
            interests='["AI"]',
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("student-profile")

    def test_student_can_update_profile(self):
        response = self.client.patch(
            self.url,
            {
                "institution": "University of Lagos",
                "course_of_study": "Computer Science",
                "skills": ["Python", "Django"],
                "interests": ["AI", "Software Engineering"],
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.institution,
            "University of Lagos",
        )

        self.assertEqual(
            self.profile.course_of_study,
            "Computer Science",
        )

        self.assertEqual(
            self.profile.skills,
            ["Python", "Django"],
        )

        self.assertEqual(
            self.profile.profile_photo,
            "https://cloudinary.com/old-photo.webp",
        )

    @patch(
        "apps.users.services.profile.student.upload_student_profile_photo"
    )
    def test_student_can_update_profile_photo(self, mock_upload):
        mock_upload.return_value = (
            "https://res.cloudinary.com/test/new-photo.webp"
        )

        profile_photo = create_test_image(name='profile_photo.jpg')

        response = self.client.patch(
            self.url,
            {
                "profile_photo": profile_photo,
            },
            format="multipart",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.profile_photo,
            "https://res.cloudinary.com/test/new-photo.webp",
        )

        mock_upload.assert_called_once()

    def test_update_returns_404_when_profile_does_not_exist(self):
        self.profile.delete()

        response = self.client.patch(
            self.url,
            {
                "institution": "University of Lagos",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )