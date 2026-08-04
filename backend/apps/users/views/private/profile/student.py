from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.private.student_profile import PrivateStudentProfileSerializer, CreateStudentProfileSerializer, UpdateStudentProfileSerializer
from apps.users.selectors.student_profile import get_student_profile
from apps.users.services.profile.student import create_student_profile, update_student_profile, delete_student_profile



class PrivateStudentProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=['Student Profile'], request=None, responses=PrivateStudentProfileSerializer)
    def get(self, request):
        """
        returns the authenticated student's profile
        """
        student_profile = get_student_profile(user=request.user)

        if not student_profile:
            return Response({
                'detail': 'Student profile not found'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = PrivateStudentProfileSerializer(student_profile)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


    @extend_schema(tags=['Student Profile'], request=CreateStudentProfileSerializer, responses=PrivateStudentProfileSerializer)
    def post(self, request):
        """
        creates a student profile for an authenticated student
        """
        serializer = CreateStudentProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        student_profile = create_student_profile(user=request.user, **data)
        response_serializer = PrivateStudentProfileSerializer(student_profile)

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED
        )


    @extend_schema(tags=['Student Profile'], request=UpdateStudentProfileSerializer, responses=PrivateStudentProfileSerializer)
    def patch(self, request):
        """
        updates the student profile of an authenticated student user
        """
        student_profile = get_student_profile(user=request.user)
        if not student_profile:
            return Response({
                'detail': 'Student profile does not exist'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateStudentProfileSerializer(student_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        student_profile = update_student_profile(student_profile=student_profile, **data)

        response_serializer = PrivateStudentProfileSerializer(student_profile)

        return Response(
            response_serializer.data,
            status=status.HTTP_200_OK
        )

    
    @extend_schema(tags=['Student Profile'], request=None, responses=None)
    def delete(self, request):
        """
        deletes a student profile
        """
        student_profile = get_student_profile(user=request.user)
        if not student_profile:
            return Response({
                'detail': 'Student profile does not exist'
            }, status=status.HTTP_404_NOT_FOUND)
        
        delete_student_profile(student_profile=student_profile)

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
