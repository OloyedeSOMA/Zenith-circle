from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APITestCase
from unittest.mock import patch


User = get_user_model()


class RegisterAPIViewTests(APITestCase):
    def setUp(self):
        self.url = "/api/v1/auth/register/"

        self.payload = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "password": "StrongPassword123"
        }

        cache.clear()

    @patch("apps.users.services.auth.register_service.send_account_activation_email")
    def test_user_can_register_successfully(self, mock_send_email):
        """
        Ensure a user can register successfully.
        """
        response = self.client.post(self.url, self.payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertTrue(
            User.objects.filter(email=self.payload["email"]).exists()
        )

        user = User.objects.get(email=self.payload["email"])

        self.assertEqual(user.first_name, self.payload["first_name"])
        self.assertEqual(user.last_name, self.payload["last_name"])
        self.assertFalse(user.is_verified)

        mock_send_email.assert_called_once_with(user)

    def test_cannot_register_with_existing_email(self):
        """
        Email addresses must be unique.
        """
        User.objects.create_user(
            email=self.payload["email"],
            password="Password123",
            first_name="Jane",
            last_name="Doe",
        )

        response = self.client.post(self.url, self.payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        self.assertEqual(
            User.objects.filter(email=self.payload["email"]).count(),
            1,
        )

    def test_email_is_required(self):
        payload = self.payload.copy()
        payload.pop("email")

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_first_name_is_required(self):
        payload = self.payload.copy()
        payload.pop("first_name")

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("first_name", response.data)

    def test_last_name_is_required(self):
        payload = self.payload.copy()
        payload.pop("last_name")

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("last_name", response.data)

    def test_password_is_required(self):
        payload = self.payload.copy()
        payload.pop("password")

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_password_must_be_at_least_8_characters(self):
        payload = self.payload.copy()
        payload["password"] = "short"

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_email_is_normalized_to_lowercase(self):
        payload = self.payload.copy()
        payload["email"] = "JOHN@EXAMPLE.COM"

        with patch(
            "apps.users.services.auth.register_service.send_account_activation_email"
        ):
            self.client.post(self.url, payload, format="json")

        self.assertTrue(
            User.objects.filter(email="john@example.com").exists()
        )