from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.common.services.cloudinary_services import upload_recruiter_logo
from apps.users.models.user import UserRole
from apps.users.models.profile import RecruiterProfile
from apps.users.selectors.recruiter_profile import get_recruiter_profile


@transaction.atomic
def create_recruiter_profile(*, user, **data):
    """
    creates a recruiter profile
    """
    if user.role != UserRole.RECRUITER:
        raise ValidationError({
            'detail': 'Only recruiters can create a recruiter profile'
        })

    if get_recruiter_profile(user=user):
        raise ValidationError({
            'detail': 'Recruiter profile already exists'
        })

    logo = data.pop('logo', None)
    logo_url = ''

    if logo:
        logo_url = upload_recruiter_logo(file=logo)

    return RecruiterProfile.objects.create(
        user=user,
        logo=logo_url,
        **data,
        )



@transaction.atomic
def update_recruiter_profile(*, recruiter_profile, **data):
    """
    updates a student profile
    """

    logo = data.pop('logo', None)
  
    if logo:
        recruiter_profile.logo = upload_recruiter_logo(
        file=logo
    )

    for field, value in data.items():
        setattr(recruiter_profile, field, value)

    recruiter_profile.save()

    return recruiter_profile



@transaction.atomic
def delete_recruiter_profile(*, recruiter_profile):
    """
    deletes a recruiter profile
    """
    recruiter_profile.delete()