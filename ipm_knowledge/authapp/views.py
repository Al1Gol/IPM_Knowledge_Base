from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins 
from authapp.serializers import UsersSerializer, RolesSerializer
from rest_framework import mixins

from authapp.models import Roles, Users

class RolesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin):
    serializer_class = RolesSerializer
    queryset = Roles.objects.all()
    
class UsersViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()