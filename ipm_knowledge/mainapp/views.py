from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins 
from mainapp.serializers import MenuSerializer, SectionsSerializer, ArticlesSerializer#SrvReleaseSerializer, PlcReleaseSerializer, ReleaseChangesSerializer
from rest_framework import mixins

from mainapp.models import Menu, Sections, Articles #SrvReleases, PlcReleases, ReleaseChanges
#from mainapp.filters import ReleaseChangesFilter

'''
class SrvReleasesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = SrvReleaseSerializer
    queryset = SrvReleases.objects.all()
    
class PlcReleasesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = PlcReleaseSerializer
    queryset = PlcReleases.objects.all()

class ReleaseChangesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ReleaseChangesSerializer
    filterset_class = ReleaseChangesFilter
    queryset = ReleaseChanges.objects.all()
'''

class MenuViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all()

class SectionsViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = SectionsSerializer
    queryset = Sections.objects.all()

class ArticleViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ArticlesSerializer
    queryset = Articles.objects.all()
