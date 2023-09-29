from django_filters import rest_framework as filters
from mainapp.models import Files, Sections, Subsections


# Фильтрация Разделов по родительскому Меню
class SectionsFilter(filters.FilterSet):
    class Meta:
        model = Sections
        fields = ["menu_id"]


# Фильтрация Подазделов по родительскому Разделу
class SubsectionsFilter(filters.FilterSet):
    class Meta:
        model = Subsections
        fields = ["section_id"]


# Фильтрация Файлов по родительской Статье
class FilesFilter(filters.FilterSet):
    class Meta:
        model = Files
        fields = ["article_id"]
