import logging

from authapp.models import Departments, Users
from authapp.serializers import (
    DepartmentsSerializer,
    ProfileSerializer,
    UsersSerializer,
)
from django.contrib.auth.hashers import make_password
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, mixins

from ipm_knowledge.permissions import AdminUserOrAuthReadOnly


class DepartmentsViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = DepartmentsSerializer
    queryset = Departments.objects.all().filter(is_active=True)
    permission_classes = [AdminUserOrAuthReadOnly]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class UsersViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = UsersSerializer
    queryset = Users.objects.all().filter(is_active=True)
    permission_classes = [AdminUserOrAuthReadOnly]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def perform_create(self, serializer):
        # Hash password but passwords are not required
        if "password" in self.request.data:
            password = make_password(self.request.data["password"])
            serializer.save(password=password)
        else:
            serializer.save()

    def perform_update(self, serializer):
        # Hash password but passwords are not required
        if "password" in self.request.data:
            password = make_password(self.request.data["password"])
            serializer.save(password=password)
        else:
            serializer.save()


class ProfileViewSet(
    GenericViewSet,
    mixins.ListModelMixin,
):
    serializer_class = ProfileSerializer

    def list(self, request, *args, **kwargs):
        queryset = Users.objects.get(id=request.user.id)
        serializer = self.get_serializer(queryset)
        return Response(serializer.data)
