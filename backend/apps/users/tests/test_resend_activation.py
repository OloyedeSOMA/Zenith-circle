from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class ResendAccountActivationAPIViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("user-resend-account-activation")

        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password="StrongPassword123",
            is_verified=False,
        )

    @patch("apps.users.views.auth.resend_account_activation_view.send_account_activation_email")
    def test_can_resend_activation_email(self, mock_send_email):
        """
        Activation email should be resent for an unverified user.
        """
        payload = {
            "email": self.user.email,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data['detail'],
            "Please check your email to activate your account",
        )

        mock_send_email.assert_called_once_with(user=self.user)

    @patch("apps.users.views.auth.resend_account_activation_view.send_account_activation_email")
    def test_verified_user_does_not_receive_activation_email(
        self,
        mock_send_email,
    ):
        """
        Verified users should not receive another activation email.
        """
        self.user.is_verified = True
        self.user.save(update_fields=["is_verified"])

        payload = {
            "email": self.user.email,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        mock_send_email.assert_not_called()

    @patch("apps.users.views.auth.resend_account_activation_view.send_account_activation_email")
    def test_unknown_email_returns_success(
        self,
        mock_send_email,
    ):
        """
        Unknown emails should still return success
        to prevent email enumeration.
        """
        payload = {
            "email": "unknown@example.com",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        mock_send_email.assert_not_called()

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
        Invalid email format should fail validation.
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