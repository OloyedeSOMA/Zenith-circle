from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import RecruiterProfile


class RecruiterProfileDetailAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="recruiter@example.com",
            password="password123",
            role=UserRole.RECRUITER,
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("recruiter-profile")

    def test_recruiter_can_get_own_profile(self):
        profile = RecruiterProfile.objects.create(
            user=self.user,
            company_name="Tech Nigeria Ltd",
            description="A technology company.",
            website="https://example.com",
            location="Lagos, Nigeria",
        )

        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            str(response.data["id"]),
            str(profile.id),
        )

        self.assertEqual(
            response.data["company_name"],
            "Tech Nigeria Ltd",
        )

    def test_get_profile_returns_404_when_profile_does_not_exist(self):
        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_unauthenticated_user_cannot_get_profile(self):
        self.client.force_authenticate(user=None)

        response = self.client.get(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )