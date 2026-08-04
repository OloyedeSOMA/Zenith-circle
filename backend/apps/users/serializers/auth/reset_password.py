from rest_framework import serializers



class ResetPasswordSerializer(serializers.Serializer):
    """

    """
    id = serializers.UUIDField()
    token = serializers.CharField()
    password = serializers.CharField(min_length=8, max_length=64, write_only=True)