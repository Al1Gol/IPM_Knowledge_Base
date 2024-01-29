from authapp.models import Departments, Users
from django.contrib import admin
from mainapp.models import (
    Articles,
    Files,
    Menu,
    Sections,
)

# Authapp
admin.site.register(Users)
admin.site.register(Departments)

# Mainapp
admin.site.register(Menu)
admin.site.register(Sections)
admin.site.register(Articles)
admin.site.register(Files)
