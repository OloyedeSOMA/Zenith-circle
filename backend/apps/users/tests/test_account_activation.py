from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APITestCase
from uuid import uuid4


User = get_user_model()


class AccountActivationAPIViewTests(APITestCase):
    def setUp(self):
        self.url = "/api/v1/auth/activate-account/"

        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password="StrongPassword123",
            is_verified=False,
        )

        self.token = str(uuid4())

        cache.set(
            f"opphub:registertoken:{self.user.id}",
            self.token,
            timeout=600,
        )

    def tearDown(self):
        cache.clear()

    def test_user_can_activate_account_successfully(self):
        """
        User can activate account with a valid token.
        """
        payload = {
            "id": str(self.user.id),
            "token": self.token,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.user.refresh_from_db()

        self.assertTrue(self.user.is_verified)

        self.assertEqual(
            response.data["detail"],
            "Account activated",
        )

    def test_invalid_token_returns_400(self):
        """
        Activation should fail with an invalid token.
        """
        payload = {
            "id": str(self.user.id),
            "token": "invalid-token",
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertEqual(
            response.data["detail"],
            "Invalid or expired activation token",
        )

    def test_unknown_user_returns_404(self):
        """
        Activation should fail for an unknown user.
        """
        payload = {
            "id": str(uuid4()),
            "token": self.token,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

        self.assertEqual(
            response.data["detail"],
            "User not found",
        )

    def test_already_verified_user_cannot_activate_again(self):
        """
        Verified users cannot activate twice.
        """
        self.user.is_verified = True
        self.user.save(update_fields=["is_verified"])

        payload = {
            "id": str(self.user.id),
            "token": self.token,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertEqual(
            response.data["detail"],
            "User already verified",
        )

    def test_id_is_required(self):
        payload = {
            "token": self.token,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("id", response.data)

    def test_token_is_required(self):
        payload = {
            "id": str(self.user.id),
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("token", response.data)