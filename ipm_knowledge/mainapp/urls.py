from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from mainapp.views import SrvReleasesViewSet, PlcReleasesViewSet, ReleaseChangesViewSet
from authapp.views import RolesViewSet, UsersViewSet
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register('roles', RolesViewSet, basename='roles')
router.register('users', UsersViewSet, basename='users')
router.register('srv_releases', SrvReleasesViewSet, basename='srv_releases')
router.register('plc_releases', PlcReleasesViewSet, basename='plc_releases')
router.register('release_changes', ReleaseChangesViewSet, basename='release_changes')




urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token)
]