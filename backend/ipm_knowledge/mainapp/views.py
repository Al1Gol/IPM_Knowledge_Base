from authapp.models import Departments
from django.conf import settings
from django.core.exceptions import ValidationError
from django.shortcuts import render
from mainapp.filters import (
    ArticlesFilter,
    FilesFilter,
    SectionsFilter,
    SubsectionsFilter,
)
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
    queryset = Menu.objects.all()
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]

    def list(self, request, *args, **kwargs):
        queryset = Menu.objects.all().filter(depart_id=request.user.depart_id)

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
    queryset = Sections.objects.all()
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
    filterset_class = SectionsFilter

    def perform_create(self, serializer):
        parent = Menu.objects.get(id=self.request.data["menu_id"])
        if parent.is_article == True:
            raise ValidationError(
                "Данный родитель уже используется для хранения статьи"
            )
        serializer.save()


class SubsectionsViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = SubsectionsSerializer
    queryset = Subsections.objects.all()
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
    filterset_class = SubsectionsFilter

    def perform_create(self, serializer):
        parent = Sections.objects.get(id=self.request.data["section_id"])
        if parent.is_article == True:
            raise ValidationError(
                "Данный родитель уже используется для хранения статьи"
            )
        serializer.save()


class ArticleViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = ArticlesSerializer
    queryset = Articles.objects.all()
    permission_classes = [ModerateCreateAndUpdateOrAdminOrAuthReadOnly]
    filterset_class = ArticlesFilter

    # Валидация количества родителей и выставление отметки is_article для родителя
    def perform_create(self, serializer):
        count_parent = 0
        if self.request.GET.get("menu_id"):
            count_parent += 1
            parent = Menu.objects.get(id=self.request.data["menu_id"])
            parent.is_article = True
        if self.request.GET.get("section_id"):
            count_parent += 1
            parent = Sections.objects.get(id=self.request.data["section_id"])
            parent.is_article = True
        if self.request.GET.get("subsection_id"):
            count_parent += 1
            parent = Subsections.objects.get(id=self.request.data["subsection_id"])
            parent.is_article = True
        if (count_parent > 1) or (count_parent == 0):
            raise ValidationError(
                f"Статья может иметь привязку к одному родительскому элементу. Текущее количество родительских элементов - {count_parent}"
            )
        parent.save()
        serializer.save()

    # Необходимо дописать снятие галочки is_article при удалении статьи
    def perform_destroy(self, instance):
        if instance.menu_id:
            parent = Menu.objects.get(id=instance.menu_id.id)
            parent.is_article = False
        elif instance.section_id:
            parent = Sections.objects.get(id=instance.section_id.id)
            parent.is_article = False
        elif instance.subsection_id:
            parent = Subsections.objects.get(id=instance.subsection_id.id)
            parent.is_article = False
        parent.save()
        instance.delete()


class FilesViewSet(
    GenericViewSet,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
):
    serializer_class = FilesSerializer
    queryset = Files.objects.all()
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
