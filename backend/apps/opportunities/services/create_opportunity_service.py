from django.db import transaction
from django.utils.text import slugify
from rest_framework.exceptions import ValidationError
from apps.opportunities.models import Opportunity


@transaction.atomic
def create_opportunity(
    *,
    user,
    title,
    description,
    opportunity_type,
    organisation,
    application_url,
    location,
    field,
    deadline,
    is_remote,
):
    """
    Creates a new opportunity.
    """

    slug = slugify(title)

    if Opportunity.objects.filter(slug=slug).exists():
        raise ValidationError({
            "title": "An opportunity with this title already exists."
        })

    opportunity = Opportunity.objects.create(
        title=title,
        slug=slug,
        description=description,
        opportunity_type=opportunity_type,
        organisation=organisation,
        application_url=application_url,
        location=location,
        field=field,
        deadline=deadline,
        is_remote=is_remote,
        posted_by=user,
    )

    return opportunity