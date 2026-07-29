from unittest.mock import patch
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import RecruiterProfile


class RecruiterProfileUpdateAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            first_name='Company',
            last_name='Name',
            email="recruiter@example.com",
            password="password123",
            role=UserRole.RECRUITER,
        )

        self.profile = RecruiterProfile.objects.create(
            user=self.user,
            logo="https://cloudinary.com/old-logo.webp",
            organisation="Old Company",
            description="Old company description.",
            website="https://old-company.com",
            location="Lagos, Nigeria",
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("recruiter-profile")

    def test_recruiter_can_update_profile(self):
        response = self.client.patch(
            self.url,
            {
                "organisation": "Tech Nigeria Ltd",
                "description": "Updated company description.",
                "website": "https://tech-nigeria.com",
                "location": "Abuja, Nigeria",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.organisation,
            "Tech Nigeria Ltd",
        )

        self.assertEqual(
            self.profile.description,
            "Updated company description.",
        )

        self.assertEqual(
            self.profile.website,
            "https://tech-nigeria.com",
        )

        self.assertEqual(
            self.profile.location,
            "Abuja, Nigeria",
        )

        self.assertEqual(
            self.profile.logo,
            "https://cloudinary.com/old-logo.webp",
        )

    @patch(
        "apps.users.services.profile.recruiter.upload_recruiter_logo"
    )
    def test_recruiter_can_update_logo(self, mock_upload):
        mock_upload.return_value = (
            "https://res.cloudinary.com/test/new-logo.webp"
        )

        response = self.client.patch(
            self.url,
            {
                "logo": "new-fake-image",
            },
            format="multipart",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.profile.refresh_from_db()

        self.assertEqual(
            self.profile.logo,
            "https://res.cloudinary.com/test/new-logo.webp",
        )

        mock_upload.assert_called_once()

    def test_update_returns_404_when_profile_does_not_exist(self):
        self.profile.delete()

        response = self.client.patch(
            self.url,
            {
                "organisation": "Tech Nigeria Ltd",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )