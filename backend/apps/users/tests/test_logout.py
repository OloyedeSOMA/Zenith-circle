from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


User = get_user_model()


class LogoutAPIViewTests(APITestCase):
    def setUp(self):
        self.url = "/api/v1/auth/logout/"

        self.password = "StrongPassword123"

        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password=self.password,
            is_verified=True,
        )

        refresh = RefreshToken.for_user(self.user)

        self.access_token = str(refresh.access_token)
        self.refresh_token = str(refresh)

        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

    def test_authenticated_user_can_logout(self):
        """
        Authenticated users should be able to logout.
        """
        payload = {
            "refresh_token": self.refresh_token
        }

        response = self.client.post(
            self.url,
            payload,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

    def test_invalid_refresh_token_returns_400(self):
        """
        Logout should fail with an invalid refresh token.
        """
        payload = {
            "refresh_token": "invalid-token"
        }

        response = self.client.post(
            self.url,
            payload,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertEqual(
            str(response.data["detail"]),
            "Invalid refresh token",
        )

    def test_refresh_token_is_required(self):
        """
        Refresh token is required.
        """
        response = self.client.post(
            self.url,
            {},
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("refresh_token", response.data)

    def test_unauthenticated_user_cannot_logout(self):
        """
        Authentication is required.
        """
        self.client.credentials()

        payload = {
            "refresh_token": self.refresh_token
        }

        response = self.client.post(
            self.url,
            payload,
            format="json"
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )