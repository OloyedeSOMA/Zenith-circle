from django.urls import path
from apps.opportunities.views.private.opportunity_list_create_view import PrivateOpportunityListCreateAPIView
from apps.opportunities.views.private.opportunity_detail_view import PrivateOpportunityDetailAPIView
from apps.opportunities.views.private.save_unsave_opportunity_view import PrivateSavedOpportunityCreateDeleteAPIView
from apps.opportunities.views.private.saved_opportunities_list_view import PrivateSavedOpportunityListAPIView


urlpatterns = [
    path('', PrivateOpportunityListCreateAPIView.as_view(), name="opportunity-list-create"),
    path('saved-opportunities/', PrivateSavedOpportunityListAPIView.as_view(), name="saved-opportunity-list"),
    path('<uuid:opportunity_id>/', PrivateOpportunityDetailAPIView.as_view(), name="opportunity-detail"),
    path('<uuid:opportunity_id>/save/', PrivateSavedOpportunityCreateDeleteAPIView.as_view(), name='save-unsave-opportunity'),
]