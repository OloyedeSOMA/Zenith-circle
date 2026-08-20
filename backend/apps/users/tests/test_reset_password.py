from uuid import uuid4

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class ResetPasswordAPIViewTests(APITestCase):
    def setUp(self):
        self.url = reverse("user-reset-password")

        self.old_password = "StrongPassword123"
        self.new_password = "NewStrongPassword123"

        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password=self.old_password,
            is_verified=True,
        )

        self.token = str(uuid4())

        cache.set(
            f"opphub:passwordreset:{self.user.id}",
            self.token,
            timeout=600,
        )

    def tearDown(self):
        cache.clear()

    def test_user_can_reset_password_successfully(self):
        """
        User can reset password with a valid token.
        """
        payload = {
            "id": str(self.user.id),
            "token": self.token,
            "password": self.new_password,
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
            response.data["detail"],
            "Password reset successfully",
        )

        self.user.refresh_from_db()

        self.assertTrue(
            self.user.check_password(self.new_password)
        )

    def test_invalid_token_returns_400(self):
        """
        Reset password should fail with an invalid token.
        """
        payload = {
            "id": str(self.user.id),
            "token": "invalid-token",
            "password": self.new_password,
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

        self.assertEqual(
            response.data["detail"],
            "Invalid or expired token",
        )

        self.user.refresh_from_db()

        self.assertTrue(
            self.user.check_password(self.old_password)
        )

    def test_unknown_user_returns_400(self):
        """
        Reset password should fail for an unknown user.
        """
        payload = {
            "id": str(uuid4()),
            "token": self.token,
            "password": self.new_password,
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

        self.assertEqual(
            response.data["detail"],
            "Invalid reset password request",
        )

    def test_id_is_required(self):
        payload = {
            "token": self.token,
            "password": self.new_password,
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

        self.assertIn(
            "id",
            response.data,
        )

    def test_token_is_required(self):
        payload = {
            "id": str(self.user.id),
            "password": self.new_password,
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

        self.assertIn(
            "token",
            response.data,
        )

    def test_password_is_required(self):
        payload = {
            "id": str(self.user.id),
            "token": self.token,
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

        self.assertIn(
            "password",
            response.data,
        )

    def test_token_is_deleted_after_successful_reset(self):
        """
        Password reset token should be removed after a successful reset.
        """
        payload = {
            "id": str(self.user.id),
            "token": self.token,
            "password": self.new_password,
        }

        self.client.post(
            self.url,
            payload,
            format="json",
        )

        key = f"opphub:passwordreset:{self.user.id}"

        self.assertIsNone(
            cache.get(key)
        )