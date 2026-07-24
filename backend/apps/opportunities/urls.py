from django.urls import path
from apps.opportunities.views.private.opportunity_list_create_view import PrivateOpportunityListCreateAPIView
from apps.opportunities.views.private.opportunity_detail_view import PrivateOpportunityDetailAPIView


urlpatterns = [
    path('', PrivateOpportunityListCreateAPIView.as_view(), name="opportunity-list-create"),
    path('<uuid:opportunity_id>/', PrivateOpportunityDetailAPIView.as_view(), name="opportunity-detail"),
]