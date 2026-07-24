from django.db import transaction
from django.utils.text import slugify
from apps.opportunities.models import Opportunity


@transaction.atomic
def update_opportunity(*, opportunity: Opportunity, **validated_data):
    """
    Updates an opportunity.
    """

    for field, value in validated_data.items():
        setattr(opportunity, field, value)

    if "title" in validated_data:
        opportunity.slug = slugify(opportunity.title)

    opportunity.save()

    return opportunity