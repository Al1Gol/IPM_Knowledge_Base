from django.shortcuts import render
from rest_framework.viewsets import GenericViewSet, mixins 
from mainapp.serializers import MenuSerializer, SectionsSerializer, ArticlesSerializer, FilesSerializer, ImagesSerializer
from rest_framework import mixins
import logging

from mainapp.models import Menu, Sections, Articles, Files, Images
from mainapp.filters import SectionsFilter, ArticlesFilter, FilesFilter


#LOG = logging.getLogger('django.request')

class MenuViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all().filter(is_active=True)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

class SectionsViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = SectionsSerializer
    queryset = Sections.objects.all().filter(is_active=True)
    filterset_class = SectionsFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()



class ArticleViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ArticlesSerializer
    queryset = Articles.objects.all().filter(is_active=True)
    filterset_class = ArticlesFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

class FilesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = FilesSerializer
    queryset = Files.objects.all().filter(is_active=True)
    filterset_class = FilesFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

class ImagesViewSet(GenericViewSet, mixins.CreateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    serializer_class = ImagesSerializer
    queryset = Images.objects.all()