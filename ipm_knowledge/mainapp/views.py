from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins, ModelViewSet
from mainapp.serializers import ServerReleaseSerializer, PlcReleaseSerializer, ReleaseChangesSerializer
from mainapp.models import ServerReleases, PlcReleases, ReleaseChanges
from rest_framework import mixins


class ServerReleasesViewSet(ModelViewSet):
    serializer_class = ServerReleaseSerializer

    def get_queryset(self):
        return ServerReleases.objects.all()
    
class PlcReleasesViewSet(ModelViewSet):
    serializer_class = PlcReleaseSerializer

    def get_queryset(self):
        return PlcReleases.objects.all()
    
class ReleaseChangesViewSet(ModelViewSet):
    serializer_class = ReleaseChangesSerializer

    def get_queryset(self):
        return ReleaseChanges.objects.all()
