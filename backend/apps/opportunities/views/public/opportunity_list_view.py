from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.common.pagination import OpportunityPagination
from apps.opportunities.selectors.opportunity import get_public_opportunities
from apps.opportunities.serializers.public.opportunity import PublicOpportunitySerializer



@extend_schema(tags=["Opportunities"], responses=PublicOpportunitySerializer(many=True))
class PublicOpportunityListAPIView(APIView):
    """
    Returns all approved opportunities.

    Supports search by:
    - title , description, organisation and location


    Supports filtering by:
    - opportunity type, field, organisation, location
    """

    authentication_classes = []
    permission_classes = []
    pagination_class = OpportunityPagination

    def get(self, request):

        search = request.query_params.get('search')
        opportunity_type = request.query_params.get('type')
        field = request.query_params.get('field')
        location = request.query_params.get('location')
        is_remote = request.query_params.get('is_remote')


        opportunities = get_public_opportunities(
            search=search,
            opportunity_type=opportunity_type,
            field=field,
            location=location,
            is_remote=is_remote
        )

        paginator = self.pagination_class()
        paginated_opportunities = paginator.paginate_queryset(
            opportunities,
            request,
            view=self,
        )
        serializer = PublicOpportunitySerializer(paginated_opportunities, many=True)

        return paginator.get_paginated_response(
            serializer.data,
        )