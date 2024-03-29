from django.contrib import admin
from mainapp.models import Articles, Files, Menu, Sections

# Mainapp


class MenuAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "depart_id", "created_at", "updated_at")
    list_display_links = ("id", "name", "depart_id", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = ("depart_id",)


class SectionsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "menu_id", "created_at", "updated_at")
    list_display_links = ("id", "name", "menu_id", "created_at", "updated_at")
    search_fields = ("name",)
    list_filter = (
        "menu_id__depart_id",
        "menu_id",
    )


class ArticlesAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "section_id", "created_at", "updated_at")
    list_display_links = ("id", "name", "section_id", "created_at", "updated_at")
    search_fields = ("name", "text")
    list_filter = (
        "section_id__menu_id__depart_id",
        "section_id__menu_id",
        "section_id",
    )


class FilesAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "article_id", "created_at", "updated_at")
    list_display_links = ("id", "name", "article_id", "created_at", "updated_at")
    search_fields = ("name", "text")
    list_filter = ("article_id",)


admin.site.register(Menu, MenuAdmin)
admin.site.register(Sections, SectionsAdmin)
admin.site.register(Articles, ArticlesAdmin)
admin.site.register(Files, FilesAdmin)


# Заголовки
admin.site.site_title = "IPM Wiki"
admin.site.site_header = "IPM Wiki"
