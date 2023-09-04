from authapp.models import Users
from django.contrib import admin
from mainapp.models import (  # SrvReleases, PlcReleases, ReleaseChanges
    Articles,
    Files,
    Menu,
    Sections,
)

# Register your models here.

# admin.site.register(Roles)
admin.site.register(Users)
admin.site.register(Menu)
admin.site.register(Sections)
admin.site.register(Articles)
admin.site.register(Files)
