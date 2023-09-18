from authapp.models import Departments
from django.conf import settings
from django.db.models import Q
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
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, mixins

from ipm_knowledge.permissions import ModerateCreateAndUpdateOrAdminOrAuthReadOnly

# LOG = logging.getLogger('django.request')


class MenuViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = MenuSerializer
    queryset = Menu.objects.all().filter(is_active=True)
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]

    def list(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user_depart = Departments.objects.get(name="Общее")
            if str(user_depart.name) == str(request.user.depart_id):
                queryset = self.filter_queryset(self.get_queryset()).order_by("-depart_id")
            else:
                queryset = (
                    self.filter_queryset(self.get_queryset())
                    .filter(Q(depart_id=request.user.depart_id) | Q(depart_id=user_depart.id))
                    .order_by("-depart_id")
                )

            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
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
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]

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
