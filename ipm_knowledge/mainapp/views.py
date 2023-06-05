from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins 
from mainapp.serializers import SrvReleaseSerializer, PlcReleaseSerializer, ReleaseChangesSerializer
from rest_framework import mixins
from rest_framework.permissions import IsAuthenticated

from mainapp.models import SrvReleases, PlcReleases, ReleaseChanges
from mainapp.filters import ReleaseChangesFilter

class SrvReleasesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = SrvReleaseSerializer
    permission_classes = [IsAuthenticated]
    queryset = SrvReleases.objects.all()
    
class PlcReleasesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = PlcReleaseSerializer
    queryset = PlcReleases.objects.all()

class ReleaseChangesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ReleaseChangesSerializer
    filterset_class = ReleaseChangesFilter
    queryset = ReleaseChanges.objects.all()