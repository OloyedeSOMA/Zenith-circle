from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import RecruiterProfile
from apps.users.tests.utils import create_test_image


class RecruiterProfileCreateAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name='Company',
            last_name='Name',
            email="recruiter@example.com",
            password="password123",
            role=UserRole.RECRUITER,
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("recruiter-profile")

    @patch(
        "apps.users.services.profile.recruiter.upload_recruiter_logo"
    )
    def test_recruiter_can_create_profile(self, mock_upload):
        mock_upload.return_value = (
            "https://res.cloudinary.com/test/recruiter-logo.webp"
        )

        logo =create_test_image(name='logo.jpg')

        data = {
            "logo": logo,
            "organisation": "Tech Nigeria Ltd",
            "description": "A technology company in Nigeria.",
            "website": "https://example.com",
            "location": "Lagos, Nigeria",
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
            RecruiterProfile.objects.filter(
                user=self.user
            ).exists()
        )

        profile = RecruiterProfile.objects.get(
            user=self.user
        )

        self.assertEqual(
            profile.logo,
            "https://res.cloudinary.com/test/recruiter-logo.webp",
        )

        self.assertEqual(
            profile.organisation,
            "Tech Nigeria Ltd",
        )

        mock_upload.assert_called_once()

    def test_recruiter_cannot_create_duplicate_profile(self):
        RecruiterProfile.objects.create(
            user=self.user,
            organisation="Tech Nigeria Ltd",
            description="A technology company.",
            website="https://example.com",
            location="Lagos, Nigeria",
        )

        response = self.client.post(
            self.url,
            {
                "organisation": "Another Company",
                "description": "Another company.",
                "website": "https://another.com",
                "location": "Abuja, Nigeria",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_student_cannot_create_recruiter_profile(self):
        student = User.objects.create_user(
            email="student@example.com",
            password="password123",
            role=UserRole.STUDENT,
        )

        self.client.force_authenticate(user=student)

        response = self.client.post(
            self.url,
            {
                "organisation": "Tech Nigeria Ltd",
                "description": "A technology company.",
                "website": "https://example.com",
                "location": "Lagos, Nigeria",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )