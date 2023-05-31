from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from authapp.views import RolesViewSet, UsersViewSet

router = routers.DefaultRouter()
router.register('roles', RolesViewSet, basename='roles')
router.register('users', RolesViewSet, basename='users')

urlpatterns = [
    path('auth/', include(router.urls)),
]