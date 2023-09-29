from authapp.models import Departments, Users
from django.contrib import admin
from mainapp.models import (  # SrvReleases, PlcReleases, ReleaseChanges
    Articles,
    Files,
    Menu,
    Sections,
    Subsections,
)

# Register your models here.

# Таблицы доступные в базовой админке
# Не нужны в итоговом приложении, так как будет реализована своя админка, средствами React
"""
# admin.site.register(Roles)
admin.site.register(Users)
admin.site.register(Departments)
admin.site.register(Menu)
admin.site.register(Sections)
admin.site.register(Subsections)
admin.site.register(Articles)
admin.site.register(Files)
"""
