from authapp.models import Departments, Users
from django.contrib import admin


# Authapp
class UsersAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "username",
        "depart_id",
        "is_staff",
        "is_moderate",
        "created_at",
        "updated_at",
    )
    list_display_links = (
        "id",
        "username",
        "depart_id",
        "is_staff",
        "is_moderate",
        "created_at",
        "updated_at",
    )
    exclude = [
        "groups",
        "first_name",
        "last_name",
        "email",
        "user_permissions",
        "last_login",
    ]
    search_fields = ("name",)


class DepartmentsAdmin(admin.ModelAdmin):
    list_display = ("id", "name")
    list_display_links = ("id", "name")
    search_fields = ("name",)


admin.site.register(Users, UsersAdmin)
admin.site.register(Departments, DepartmentsAdmin)
