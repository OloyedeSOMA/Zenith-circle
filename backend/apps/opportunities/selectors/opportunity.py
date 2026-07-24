from django.shortcuts import get_object_or_404
from apps.opportunities.models import OpportunityField, Opportunity, OpportunityStatus


def get_opportunity_fields():
    """"
    get all the opportunity fields
    """
    return OpportunityField.objects.all()



def get_public_opportunities(*, opportunity_type=None, field=None, deadline=None):
    """
    Returns approved opportunities filtered by
    type, field, and deadline.
    """
    queryset = Opportunity.objects.filter(
        status=OpportunityStatus.APPROVED,
    ).select_related(
        "field",
    )

    if opportunity_type:
        queryset = queryset.filter(
            opportunity_type=opportunity_type,
        )

    if field:
        queryset = queryset.filter(
            field__slug=field,
        )

    if deadline:
        queryset = queryset.filter(
            deadline__lte=deadline,
        )

    return queryset


def get_public_opportunity_by_slug(*, slug: str):
    """
    Returns a single approved opportunity by slug.
    """

    return get_object_or_404(
        Opportunity.objects.select_related(
            "field",
        ),
        slug=slug,
        status=OpportunityStatus.APPROVED,
    )



def get_published_opportunities():
    """
    get all published and approved opportunities
    """
    return (
        Opportunity.objects
        .filter(status=OpportunityStatus.APPROVED)
        .select_related("field", "posted_by")
    )


def get_published_opportunity_by_slug(*, slug: str):
    """
    get published and approved opportunities by slug
    """
    return get_object_or_404(Opportunity.objects.select_related("field", "posted_by"),
        slug=slug,
        status=OpportunityStatus.APPROVED
    )


def get_user_opportunities(*, user):
    """
    list all opportunites posted by a user
    """
    return Opportunity.objects.filter(posted_by=user).select_related("field")


def get_user_opportunity_by_id(*, user, opportunity_id):
    """
    get an opportunity posted by a user by id
    """
    return get_object_or_404(Opportunity, id=opportunity_id, posted_by=user)


def get_pending_opportunities():
    """
    get all pending opportunities
    """
    return (
        Opportunity.objects.
        filter(status=OpportunityStatus.PENDING)
        .select_related("field", "posted_by")
    )


def get_user_pending_opportunity_by_id(*, user, opportunity_id):
    """
    Returns a pending opportunity belonging to the authenticated user.
    Used for update and delete operations.
    """
    return get_object_or_404(
        Opportunity,
        id=opportunity_id,
        posted_by=user,
        status=OpportunityStatus.PENDING,
    )