from authapp.models import Departments
from django.conf import settings
from django.shortcuts import render
from mainapp.filters import FilesFilter, SectionsFilter, SubsectionsFilter, ArticlesFilter
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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]


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
