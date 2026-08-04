from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.opportunities.models import Opportunity, OpportunityField, OpportunityStatus, OpportunityType, SavedOpportunity
from apps.users.models.user import User, UserRole


class SavedOpportunityCreateDeleteAPIViewTests(APITestCase):

    def setUp(self):
        self.student = User.objects.create_user(
            first_name="John",
            last_name="Doe",
            email="student@example.com",
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

        self.opportunity = Opportunity.objects.create(
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

        self.url = reverse(
            "save-unsave-opportunity",
            kwargs={
                "opportunity_id": self.opportunity.id,
            },
        )

        self.client.force_authenticate(
            user=self.student
        )

    def test_student_can_save_approved_opportunity(self):
        response = self.client.post(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            SavedOpportunity.objects.filter(
                student=self.student,
                opportunity=self.opportunity,
            ).exists()
        )

    def test_student_cannot_save_same_opportunity_twice(self):
        SavedOpportunity.objects.create(
            student=self.student,
            opportunity=self.opportunity,
        )

        response = self.client.post(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertEqual(
            SavedOpportunity.objects.filter(
                student=self.student,
                opportunity=self.opportunity,
            ).count(),
            1,
        )

    def test_non_student_cannot_save_opportunity(self):
        self.client.force_authenticate(
            user=self.recruiter
        )

        response = self.client.post(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertFalse(
            SavedOpportunity.objects.filter(
                student=self.recruiter,
                opportunity=self.opportunity,
            ).exists()
        )

    def test_student_cannot_save_pending_opportunity(self):
        self.opportunity.status = OpportunityStatus.PENDING
        self.opportunity.save()

        response = self.client.post(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertFalse(
            SavedOpportunity.objects.filter(
                student=self.student,
                opportunity=self.opportunity,
            ).exists()
        )

    def test_student_cannot_save_rejected_opportunity(self):
        self.opportunity.status = OpportunityStatus.REJECTED
        self.opportunity.save()

        response = self.client.post(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertFalse(
            SavedOpportunity.objects.filter(
                student=self.student,
                opportunity=self.opportunity,
            ).exists()
        )

    def test_student_can_unsave_opportunity(self):
        SavedOpportunity.objects.create(
            student=self.student,
            opportunity=self.opportunity,
        )

        response = self.client.delete(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_204_NO_CONTENT,
        )

        self.assertFalse(
            SavedOpportunity.objects.filter(
                student=self.student,
                opportunity=self.opportunity,
            ).exists()
        )

    def test_student_cannot_unsave_opportunity_that_was_not_saved(self):
        response = self.client.delete(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_non_student_cannot_unsave_opportunity(self):
        SavedOpportunity.objects.create(
            student=self.student,
            opportunity=self.opportunity,
        )

        self.client.force_authenticate(
            user=self.recruiter
        )

        response = self.client.delete(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )

        self.assertTrue(
            SavedOpportunity.objects.filter(
                student=self.student,
                opportunity=self.opportunity,
            ).exists()
        )

    def test_unauthenticated_user_cannot_save_opportunity(self):
        self.client.force_authenticate(
            user=None
        )

        response = self.client.post(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

    def test_unauthenticated_user_cannot_unsave_opportunity(self):
        self.client.force_authenticate(
            user=None
        )

        response = self.client.delete(
            self.url
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )
