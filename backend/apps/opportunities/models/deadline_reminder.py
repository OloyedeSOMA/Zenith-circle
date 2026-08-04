from django.db import models
from django.conf import settings
from apps.common.models.base import BaseModel
from apps.opportunities.models import Opportunity


class DeadlineReminder(BaseModel):
    """

    """
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='deadline_reminders')
    opportunity =models.ForeignKey(Opportunity, on_delete=models.CASCADE, related_name='deadline_reminders')
    sent_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields = ['student', 'opportunity'],
                name='unique_deadline_reminder'
            )
        ]
        