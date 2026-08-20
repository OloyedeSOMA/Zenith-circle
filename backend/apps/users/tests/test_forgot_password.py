from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class ForgotPasswordAPIViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("user-forgot-password")

        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password="StrongPassword123",
            is_verified=True,
        )

    @patch("apps.users.views.auth.forgot_password_view.send_reset_password_email")
    def test_can_request_password_reset(self, mock_send_email):
        """
        A user can request a password reset email.
        """
        payload = {
            "email": self.user.email,
        }

        response = self.client.post(
            self.url,
            payload,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data,
            {
                "detail": "Reset instructions has been sent to your email"
            },
        )

        mock_send_email.assert_called_once_with(email=self.user.email)

    @patch("apps.users.views.auth.forgot_password_view.send_reset_password_email")
    def test_unknown_email_still_returns_success(self, mock_send_email):
        """
        Unknown emails should still return success to prevent
        email enumeration.
        """
        payload = {
            "email": "unknown@example.com",
        }

        response = self.client.post(
            self.url,
            payload,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        mock_send_email.assert_called_once_with(
            email="unknown@example.com"
        )

    def test_email_is_required(self):
        """
        Email is required.
        """
        response = self.client.post(
            self.url,
            {},
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("email", response.data)

    def test_invalid_email_returns_400(self):
        """
        Email must be valid.
        """
        payload = {
            "email": "invalid-email",
        }

        response = self.client.post(
            self.url,
            payload,
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("email", response.data)