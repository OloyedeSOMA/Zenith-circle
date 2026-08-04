from django.db import transaction
from apps.opportunities.models import Opportunity


@transaction.atomic
def delete_opportunity(*, opportunity: Opportunity):
    """
    Deletes an opportunity.
    """

    opportunity.delete()