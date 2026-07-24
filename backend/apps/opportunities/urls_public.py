from django.urls import path
from apps.opportunities.views.public.opportunity_list_view import PublicOpportunityListAPIView
from apps.opportunities.views.public.opportunity_detail_view import PublicOpportunityDetailAPIView
from apps.opportunities.views.public.opportunity_field_list_view import PublicOpportunityFieldListAPIView


urlpatterns = [
    path('', PublicOpportunityListAPIView.as_view(), name="public-opportunity-list"),
    path('<slug:slug>/', PublicOpportunityDetailAPIView.as_view(), name="public-opportunity-detail"),
    path('fields/', PublicOpportunityFieldListAPIView.as_view(), name="public-opportunity-field-list"),
]