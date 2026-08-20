from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase


User = get_user_model()


class LoginAPIViewTests(APITestCase):
    def setUp(self):
        self.url = "/api/v1/auth/login/"

        self.password = "StrongPassword123"

        self.user = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="john@example.com",
            password=self.password,
            is_verified=True,
        )

    def test_verified_user_can_login_successfully(self):
        """
        Verified users should be able to log in.
        """
        payload = {
            "email": self.user.email,
            "password": self.password,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertIn("user", response.data)
        self.assertIn("tokens", response.data)

        self.assertIn("access_token", response.data["tokens"])
        self.assertIn("refresh_token", response.data["tokens"])

        self.assertEqual(
            response.data["user"]["email"],
            self.user.email,
        )

    def test_unverified_user_cannot_login(self):
        """
        Users must verify their email before logging in.
        """
        self.user.is_verified = False
        self.user.save()

        payload = {
            "email": self.user.email,
            "password": self.password,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertEqual(
            str(response.data["detail"]),
            "Please verify your email address.",
        )

    def test_invalid_password_returns_403(self):
        """
        Login should fail with an invalid password.
        """
        payload = {
            "email": self.user.email,
            "password": "WrongPassword123",
        }

        response = self.client.post(self.url, payload, format="json")
        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertEqual(
            str(response.data["detail"]),
            "Invalid email or password",
        )

    def test_nonexistent_email_returns_403(self):
        """
        Login should fail if the email does not exist.
        """
        payload = {
            "email": "unknown@example.com",
            "password": self.password,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_403_FORBIDDEN,
        )

        self.assertEqual(
            str(response.data["detail"]),
            "Invalid email or password",
        )

    def test_email_is_required(self):
        payload = {
            "password": self.password,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("email", response.data)

    def test_password_is_required(self):
        payload = {
            "email": self.user.email,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertIn("password", response.data)

    def test_email_is_case_insensitive(self):
        """
        Email should be normalized before authentication.
        """
        payload = {
            "email": "JOHN@EXAMPLE.COM",
            "password": self.password,
        }

        response = self.client.post(self.url, payload, format="json")

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )