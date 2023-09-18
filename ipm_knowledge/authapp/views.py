import logging

from authapp.models import Departments, Users
from authapp.serializers import DepartmentsSerializer, UsersSerializer
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, mixins


class DepartmentsViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = DepartmentsSerializer
    queryset = Departments.objects.all()


class UsersViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
