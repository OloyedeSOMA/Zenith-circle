from django.db import models
from django.conf import settings
from apps.common.models.base import BaseModel


class OpportunityField(BaseModel):
    """

    """
    name = models.CharField(max_length=100, unique=True,)
    slug = models.SlugField(max_length=120, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class OpportunityType(models.TextChoices):
    INTERNSHIP = "internship", "Internship"
    SCHOLARSHIP = "scholarship", "Scholarship"
    JOB = "job", "Job"


class OpportunityStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    APPROVED = "approved", "Approved"
    REJECTED = "rejected", "Rejected"



class Opportunity(BaseModel):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True)
    description = models.TextField()
    opportunity_type = models.CharField(max_length=20, choices=OpportunityType.choices)
    organisation = models.CharField(max_length=255)
    application_url = models.URLField()
    location = models.CharField(max_length=255, blank=True)
    field = models.ForeignKey(OpportunityField, on_delete=models.PROTECT, related_name="opportunities")
    deadline = models.DateTimeField()
    is_remote = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=OpportunityStatus.choices, default=OpportunityStatus.PENDING)
    posted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="posted_opportunities")
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, related_name="approved_opportunities", null=True, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["opportunity_type"]),
            models.Index(fields=["field"]),
            models.Index(fields=["deadline"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return self.title
