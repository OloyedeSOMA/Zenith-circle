from rest_framework import serializers



class AccountActivationSerializer(serializers.Serializer):
    """

    """
    id = serializers.UUIDField()
    token = serializers.CharField()