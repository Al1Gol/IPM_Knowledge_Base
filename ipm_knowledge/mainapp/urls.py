from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from mainapp.views import SrvReleasesViewSet, PlcReleasesViewSet, ReleaseChangesViewSet

router = routers.DefaultRouter()
router.register('srv_releases', SrvReleasesViewSet, basename='srv_releases')
router.register('plc_releases', PlcReleasesViewSet, basename='plc_releases')
router.register('release_changes', ReleaseChangesViewSet, basename='release_changes')


urlpatterns = [
    path('api/v1/', include(router.urls)),
]