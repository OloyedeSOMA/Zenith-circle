from django.urls import path, include


urlpatterns = [
    path('auth/', include('apps.users.urls.auth_urls')),
    path('opportunities/', include('apps.opportunities.urls.public_urls')),
    path('me/opportunities/', include('apps.opportunities.urls.private_urls')),
    path('me/profile/', include('apps.users.urls.profile_urls')),
]
