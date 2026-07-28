from django.db import transaction
from rest_framework.exceptions import ValidationError
from apps.common.services.cloudinary_services import upload_student_profile_photo
from apps.users.models.user import UserRole
from apps.users.models.profile import StudentProfile
from apps.users.selectors.student_profile import get_student_profile


@transaction.atomic
def create_student_profile(*, user, **data):
    """
    creates a student profile
    """
    if user.role != UserRole.STUDENT:
        raise ValidationError({
            'detail': 'Only students can create a student profile'
        })

    if get_student_profile(user=user):
        raise ValidationError({
            'detail': 'Student profile already exists'
        })

    profile_photo = data.pop('profile_photo', None)
    profile_photo_url = None

    if profile_photo:
        profile_photo_url = upload_student_profile_photo(file=profile_photo)


    return StudentProfile.objects.create(
        user=user,
        profile_photo=profile_photo_url,
        **data,
        )




@transaction.atomic
def update_student_profile(*, student_profile, **data):
    """
    updates a student profile
    """

    profile_photo = data.pop('profile_photo', None)
    profile_photo_url = None

    if profile_photo:
        profile_photo_url = upload_student_profile_photo(file=profile_photo)

    student_profile.profile_photo = profile_photo_url

    for field, value in data.items():
        setattr(student_profile, field, value)

    student_profile.save()

    return student_profile



@transaction.atomic
def delete_student_profile(*, student_profile):
    """
    deletes a student profile
    """
    student_profile.delete()