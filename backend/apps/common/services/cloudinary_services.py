import cloudinary.uploader


def upload_recruiter_logo(*, file) -> str:
    """
    uploads storefront logo to cloudinary
    optimizes image
    """
    upload_result = cloudinary.uploader.upload(
        file,
        folder='opphubng/recruiter/logos',
        transformation=[
            {
                'width': 400,
                'height': 400,
                'crop': 'fill',
                'quality': 'auto',
                'fetch_format': 'webp'
            }
        ]
    )

    return upload_result['secure_url']
     



def upload_student_profile_photo(*, file) -> str:
    """
    upload storefront banner to cloudinary
    optimizes image
    """
    upload_result = cloudinary.uploader.upload(
        file,
        folder='opphubng/student/photos',
        transformation=[
            {
                'width': 1400,
                'height': 400,
                'crop': 'fill',
                'quality': 'auto',
                'fetch_format': 'webp'
            }
        ]
    )

    return upload_result['secure_url']
