from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.utils import timezone
from apps.opportunities.models import OpportunityField, Opportunity, OpportunityStatus


def get_opportunity_fields():
    """"
    get all the opportunity fields
    """
    return OpportunityField.objects.all()



def get_public_opportunities(*, search=None, opportunity_type=None, field=None, location=None, is_remote=None):
    """
    Returns approved and non-expired opportunities filtered by
    type, field and location
    """
    queryset = Opportunity.objects.filter(
        status=OpportunityStatus.APPROVED,
        deadline__gte=timezone.now(),
    ).select_related(
        "field",
    )

    if search:
        queryset = queryset.filter(
            Q(title__icontains=search)
            | Q(description__icontains=search)
            | Q(organisation__icontains=search)
            | Q(location__icontains=search)
        )

    if opportunity_type:
        queryset = queryset.filter(
            opportunity_type=opportunity_type,
        )

    if field:
        queryset = queryset.filter(
            field__slug=field,
        )

    if location:
        queryset = queryset.filter(
            location__icontains=location
        )

    if is_remote is not None:
        is_remote = is_remote.lower() == "true"
        queryset = queryset.filter(
            is_remote=is_remote
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
    returns an opportunity posted by a user by id
    """
    return get_object_or_404(Opportunity, id=opportunity_id, posted_by=user)


def get_opportunity_by_id(*, opportunity_id):
    """
    returns an opportunity by its id
    """ 
    return get_object_or_404(Opportunity, id=opportunity_id)


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