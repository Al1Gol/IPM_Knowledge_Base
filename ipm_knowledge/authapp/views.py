import logging

from authapp.models import Users
from authapp.serializers import RolesSerializer, UsersSerializer
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, mixins

# class RolesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin):
#    serializer_class = RolesSerializer
#    queryset = Roles.objects.all()


class UsersViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
