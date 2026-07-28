from django.urls import path, include


urlpatterns = [
    path('auth/', include('apps.users.urls.auth_urls')),
    path('opportunities/', include('apps.opportunities.urls_public')),
    path('me/opportunities/', include('apps.opportunities.urls')),
    path('me/profile/', include('apps.users.urls.profile_urls')),
]
