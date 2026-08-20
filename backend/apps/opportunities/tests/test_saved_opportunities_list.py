from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from apps.opportunities.models import Opportunity, OpportunityField, OpportunityStatus, OpportunityType, SavedOpportunity
from apps.users.models.user import User, UserRole


class SavedOpportunityListAPIViewTests(APITestCase):

    def setUp(self):
        self.student = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="student@example.com",
            password="password123",
            role=UserRole.STUDENT,
        )

        self.other_student = User.objects.create_user(
            first_name="Jane",
            last_name="Doe",
            email="otherstudent@example.com",
            password="password123",
            role=UserRole.STUDENT,
        )

        self.recruiter = User.objects.create_user(
            first_name="Company",
            last_name="Name",
            email="recruiter@example.com",
            password="password123",
            role=UserRole.RECRUITER,
        )

        self.field = OpportunityField.objects.create(
            name="Software Engineering",
            slug="software-engineering",
        )

        self.opportunity_one = Opportunity.objects.create(
            title="Software Engineering Internship",
            slug="software-engineering-internship",
            description="A software engineering internship opportunity.",
            opportunity_type=OpportunityType.INTERNSHIP,
            organisation="Tech Nigeria Ltd",
            application_url="https://example.com/apply",
            location="Lagos, Nigeria",
            field=self.field,
            deadline="2027-12-31T23:59:59Z",
            is_remote=False,
            status=OpportunityStatus.APPROVED,
            posted_by=self.recruiter,
        )

        self.opportunity_two = Opportunity.objects.create(
            title="Backend Developer Internship",
            slug="backend-developer-internship",
            description="A backend development internship opportunity.",
            opportunity_type=OpportunityType.INTERNSHIP,
            organisation="Another Tech Ltd",
            application_url="https://example.com/backend",
            location="Abuja, Nigeria",
            field=self.field,
            deadline="2027-12-31T23:59:59Z",
            is_remote=True,
            status=OpportunityStatus.APPROVED,
            posted_by=self.recruiter,
        )

        self.url = reverse(
            "saved-opportunity-list"
        )

        self.client.force_authenticate(
            user=self.student
        )

    def test_student_can_list_saved_opportunities(self):
        SavedOpportunity.objects.create(
            student=self.student,
            opportunity=self.opportunity_one,
        )

        SavedOpportunity.objects.create(
            student=self.student,
            opportunity=self.opportunity_two,
        )

        response = self.client.get(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            len(response.data),
            2,
        )

    def test_student_only_sees_their_own_saved_opportunities(self):
        SavedOpportunity.objects.create(
            student=self.student,
            opportunity=self.opportunity_one,
        )

        SavedOpportunity.objects.create(
            student=self.other_student,
            opportunity=self.opportunity_two,
        )

        response = self.client.get(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            len(response.data),
            1,
        )

        self.assertEqual(
            response.data[0]["opportunity"]["id"],
            str(self.opportunity_one.id),
        )

    def test_student_with_no_saved_opportunities_gets_empty_list(self):
        response = self.client.get(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data,
            [],
        )

    def test_unauthenticated_user_cannot_list_saved_opportunities(self):
        self.client.force_authenticate(
            user=None
        )

        response = self.client.get(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_recruiter_cannot_list_saved_opportunities(self):
        self.client.force_authenticate(
            user=self.recruiter
        )

        response = self.client.get(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data,
            [],
        )