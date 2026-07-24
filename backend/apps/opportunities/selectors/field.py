from apps.opportunities.models import OpportunityField


def get_opportunity_fields():
    """
    Returns all available opportunity fields.
    """
    return OpportunityField.objects.all()