from django.contrib import admin
from mainapp.models import ServerReleases, PlcReleases, ReleaseChanges
# Register your models here.

admin.site.register(ServerReleases)
admin.site.register(PlcReleases)
admin.site.register(ReleaseChanges)
