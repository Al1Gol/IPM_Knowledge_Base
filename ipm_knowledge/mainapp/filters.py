from django_filters import rest_framework as filters
from mainapp.models import Sections, Articles #ReleaseChanges

'''
class ReleaseChangesFilter(filters.FilterSet):

    class Meta:
        model = ReleaseChanges
        fields = ['srv_ver_id', 'plc_ver_id']
'''

class SectionsFilter(filters.FilterSet):
    class Meta:
        model = Sections
        fields = ['menu_id']

class ArticlesFilter(filters.FilterSet):
    class Meta:
        model = Articles
        fields = ['section_id']
        