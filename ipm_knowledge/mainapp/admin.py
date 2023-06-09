from django.contrib import admin
from mainapp.models import Menu, Sections, Articles#SrvReleases, PlcReleases, ReleaseChanges
from authapp.models import Roles, Users
# Register your models here.

admin.site.register(Roles)
admin.site.register(Users)
admin.site.register(Menu)
admin.site.register(Sections)
admin.site.register(Articles)