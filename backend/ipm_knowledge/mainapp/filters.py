from django_filters import rest_framework as filters
from mainapp.models import Files, Sections, Subsections, Articles


class SectionsFilter(filters.FilterSet):
    class Meta:
        model = Sections
        fields = ["menu_id"]


class SubsectionsFilter(filters.FilterSet):
    class Meta:
        model = Subsections
        fields = ["section_id"]


class FilesFilter(filters.FilterSet):
    class Meta:
        model = Files
        fields = ["article_id"]


class ArticlesFilter(filters.FilterSet):
    class Meta:
        model = Articles
        fields = ["subsection_id"]