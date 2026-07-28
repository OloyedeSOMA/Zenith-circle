from apps.users.models.user import UserRole
from apps.users.models.profile import RecruiterProfile


def get_recruiter_profile(*, user):
    """
    returns the recruiter profile belonging to the authenticated user
    """
    return RecruiterProfile.objects.filter(
        user=user,
        user__role=UserRole.RECRUITER,
    ).first()


def get_recruiter_profile_by_id(*, user_id):
    """
    returns a recruiter profile by the id
    """
    return RecruiterProfile.objects.filter(
        id=user_id
    ).first()