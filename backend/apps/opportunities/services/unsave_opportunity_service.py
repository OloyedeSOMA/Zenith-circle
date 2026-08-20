from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.users.models import UserRole
from apps.opportunities.selectors.saved_opportunity import get_saved_opportunity


@transaction.atomic
def unsave_opportunity(*, student, opportunity):
    """
    unsaves an opportunity for a student
    """
    if student.role != UserRole.STUDENT:
        raise ValidationError({
            'detail': 'Only students can unsave opportunities'
        })

    saved_opportunity = get_saved_opportunity(
        student=student,
        opportunity=opportunity
        )
    if not saved_opportunity:
        raise ValidationError({
            'detail': 'Opportunity has not been saved'
        })

    saved_opportunity.delete()