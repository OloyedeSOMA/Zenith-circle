from io import BytesIO

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile


def create_test_image(
    name="test-image.jpg",
    content_type="image/jpeg",
):
    image = Image.new("RGB", (100, 100), color="white")

    image_io = BytesIO()
    image.save(image_io, format="JPEG")
    image_io.seek(0)

    return SimpleUploadedFile(
        name=name,
        content=image_io.read(),
        content_type=content_type,
    )