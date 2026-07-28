from apps.users.models.user import UserRole
from apps.users.models.profile import StudentProfile


def get_student_profile(*, user):
    """
    returns the student profile belonging to the authenticated user
    """
    return StudentProfile.objects.filter(
        user=user,
        user__role=UserRole.STUDENT,
    ).first()


def get_student_profile_by_id(*, user_id):
    """
    returns a student profile by the id
    """
    return StudentProfile.objects.filter(
        id=user_id
    ).first()