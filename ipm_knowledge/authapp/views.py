import logging

from authapp.models import Departament, Users
from authapp.serializers import DepartamentSerializer, UsersSerializer
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, mixins


class DepartamentViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
):
    serializer_class = DepartamentSerializer
    queryset = Departament.objects.all()


class UsersViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
