from django_filters import rest_framework as filters
from mainapp.models import ReleaseChanges

class ReleaseChangesFilter(filters.FilterSet):

    class Meta:
        model = ReleaseChanges
        fields = ['srv_ver_id', 'plc_ver_id']