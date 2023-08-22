from django_filters import rest_framework as filters
from mainapp.models import Sections, Articles, Files #ReleaseChanges


class SectionsFilter(filters.FilterSet):
    class Meta:
        model = Sections
        fields = ['menu_id']

class ArticlesFilter(filters.FilterSet):
    class Meta:
        model = Articles
        fields = ['section_id']

class FilesFilter(filters.FilterSet):
    class Meta:
        model = Files
        fields = ['article_id']
        