from django.urls import path, include, re_path
from . import views
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'user-profiles', UserProfileViewSet, basename='userprofile')
router.register(r'club', views.ClubViewSet, basename='club')
router.register(r'post', views.PostViewSet, basename='post')
router.register(r'conveners', ConvenerViewSet)
router.register(r'presidents', PresidentViewSet)
router.register(r'vice-presidents', VisePresidentViewSet)
router.register(r'general-secretaries', GeneralSecretaryViewSet)
router.register(r'treasurers', TreasurerViewSet)
router.register(r'executives', ExecutivesViewSet)
router.register(r'events', EventsViewSet)

app_name = "api"
urlpatterns =  [
    re_path(r'^auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    re_path(r'^auth/', include('djoser.urls.jwt')),  
]

urlpatterns += router.urls