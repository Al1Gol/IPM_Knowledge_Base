from django.contrib import admin
from mainapp.models import SrvReleases, PlcReleases, ReleaseChanges
# Register your models here.

admin.site.register(SrvReleases)
admin.site.register(PlcReleases)
admin.site.register(ReleaseChanges)
