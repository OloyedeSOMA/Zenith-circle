from django.urls import path, include


urlpatterns = [
    path('auth/', include('apps.users.urls')),
    path('opportunities/', include('apps.opportunities.urls_public')),
    path('me/opportunities/', include('apps.opportunities.urls')),
]
