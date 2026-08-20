from rest_framework import serializers


class ResendAccountActivationSerializer(serializers.Serializer):
    """

    """

    email = serializers.EmailField()