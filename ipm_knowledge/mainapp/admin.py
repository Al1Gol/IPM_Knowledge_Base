from django.contrib import admin
from mainapp.models import SrvReleases, PlcReleases, ReleaseChanges
from authapp.models import Roles, Users
# Register your models here.

admin.site.register(Roles)
admin.site.register(Users)
admin.site.register(SrvReleases)
admin.site.register(PlcReleases)
admin.site.register(ReleaseChanges)