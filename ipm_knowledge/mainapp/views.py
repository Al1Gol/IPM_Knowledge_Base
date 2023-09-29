from authapp.models import Departments
from django.conf import settings
from django.shortcuts import render
from mainapp.filters import FilesFilter, SectionsFilter, SubsectionsFilter
from mainapp.models import Articles, Files, Images, Menu, Sections, Subsections
from mainapp.serializers import (
    ArticlesSerializer,
    FilesSerializer,
    ImagesSerializer,
    MenuSerializer,
    SectionsSerializer,
    SubsectionsSerializer,
)
from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, mixins

from ipm_knowledge.permissions import ModerateCreateAndUpdateOrAdminOrAuthReadOnly

# LOG = logging.getLogger('django.request')


# Контроллер для обработки Меню
class MenuViewSet(
    GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all().filter(is_active=True)
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = Menu.objects.all().filter(is_active=True).filter(depart_id=request.user.depart_id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # Вместо удаления объектов, скрываем их, убрав галочку в поле is_active
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


# Контроллер для обработки Разделов
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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
    filterset_class = SectionsFilter

    # Вместо удаления объектов, скрываем их, убрав галочку в поле is_active
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


# Контроллер для обработки Подразделов
class SubsectionsViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = SubsectionsSerializer
    queryset = Subsections.objects.all().filter(is_active=True)
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
    filterset_class = SubsectionsFilter

    # Вместо удаления объектов, скрываем их, убрав галочку в поле is_active
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


# Контроллер для обработки Статей
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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]

    # Вместо удаления объектов, скрываем их, убрав галочку в поле is_active
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


# Контроллер для обработки Файлов статьи
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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]

    # Вместо удаления объектов, скрываем их, убрав галочку в поле is_active
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


# Контроллер для обработки Изображений внутри Статей
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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
