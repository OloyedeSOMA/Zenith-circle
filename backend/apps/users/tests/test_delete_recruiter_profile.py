from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.users.models.user import User, UserRole
from apps.users.models.profile import RecruiterProfile


class RecruiterProfileDeleteAPIViewTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="recruiter@example.com",
            password="password123",
            role=UserRole.RECRUITER,
        )

        self.profile = RecruiterProfile.objects.create(
            user=self.user,
            organisation="Tech Nigeria Ltd",
            description="A technology company.",
            website="https://example.com",
            location="Lagos, Nigeria",
        )

        self.client.force_authenticate(user=self.user)

        self.url = reverse("recruiter-profile")

    def test_recruiter_can_delete_profile(self):
        response = self.client.delete(self.url)

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            RecruiterProfile.objects.filter(
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