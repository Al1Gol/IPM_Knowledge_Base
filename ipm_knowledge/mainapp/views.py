import logging

from django.shortcuts import render
from mainapp.filters import ArticlesFilter, FilesFilter, SectionsFilter
from mainapp.models import Articles, Files, Images, Menu, Sections
from mainapp.serializers import (
    ArticlesSerializer,
    FilesSerializer,
    ImagesSerializer,
    MenuSerializer,
    SectionsSerializer,
)
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet, mixins

# LOG = logging.getLogger('django.request')


class MenuViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all().filter(is_active=True)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class SectionsViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = SectionsSerializer
    queryset = Sections.objects.all().filter(is_active=True)
    filterset_class = SectionsFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class ArticleViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = ArticlesSerializer
    queryset = Articles.objects.all().filter(is_active=True)
    filterset_class = ArticlesFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class FilesViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = FilesSerializer
    queryset = Files.objects.all().filter(is_active=True)
    filterset_class = FilesFilter

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


class ImagesViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = ImagesSerializer
    queryset = Images.objects.all()
