from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.users.models import UserRole
from apps.opportunities.models import OpportunityStatus, SavedOpportunity
from apps.opportunities.selectors.saved_opportunity import check_if_saved_opportunity_exists


@transaction.atomic
def save_opportunity(*, student, opportunity):
    """
    saves or bookmark an opportunity
    """
    if student.role != UserRole.STUDENT:
        raise ValidationError({
            'detail': 'Only students can save opportunities'
        })

    if opportunity.status != OpportunityStatus.APPROVED:
        raise ValidationError({
            'detail': 'This opportunity has not been approved by ADMIN and cannot be saved yet'
        })

    if check_if_saved_opportunity_exists(
        student=student,
        opportunity=opportunity,
        ):
        raise ValidationError({
            'detail': 'Opportunity has already been saved'
        })

    saved_opportunity = SavedOpportunity.objects.create(
        student=student,
        opportunity=opportunity
    )

    return saved_opportunity


