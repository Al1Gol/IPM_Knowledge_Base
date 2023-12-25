from django.conf import settings
from django.db import models

from .validators import validate_file_extension


class Menu(models.Model):
    name = models.CharField(verbose_name="элементы меню", max_length=100)
    img = models.FileField(
        verbose_name="иконка",
        validators=[validate_file_extension],
        upload_to="icons/menu/",
        max_length=100,
        blank=True,
        null=True,
    )
    depart_id = models.ForeignKey(
        "authapp.Departments",
        verbose_name="Отдел",
        on_delete=models.PROTECT,
        default=1,
    )
    is_article = models.BooleanField(verbose_name="видимость", default=False)

    def __str__(self):
        return self.name


class Sections(models.Model):
    menu_id = models.ForeignKey(
        "Menu", verbose_name="id меню", on_delete=models.CASCADE
    )
    name = models.CharField(verbose_name="элементы меню", max_length=200)
    img = models.FileField(
        verbose_name="иконка",
        upload_to="icons/sections/",
        validators=[validate_file_extension],
        max_length=100,
        blank=True,
        null=True,
    )
    is_article = models.BooleanField(verbose_name="видимость", default=False)

    def __str__(self):
        return self.name


class Articles(models.Model):
    menu_id = models.ForeignKey(
        "Menu",
        verbose_name="ID Меню",
        on_delete=models.PROTECT,
        blank=True,
        null=True,
    )
    section_id = models.ForeignKey(
        "Sections",
        verbose_name="ID Раздела",
        on_delete=models.PROTECT,
        blank=True,
        null=True,
    )
    name = models.CharField(
        verbose_name="Наименование статьи", max_length=200, unique=True
    )
    text = models.TextField(verbose_name="Описание", max_length=40000)
    is_article = models.BooleanField(verbose_name="видимость", default=False)

    def __str__(self):
        return self.text


class Files(models.Model):
    article_id = models.ForeignKey(
        "Articles", related_name="files", on_delete=models.PROTECT
    )
    name = models.CharField(verbose_name="название файла", max_length=200)
    file = models.FileField(upload_to="files/", verbose_name="файлы")
    is_article = models.BooleanField(verbose_name="видимость", default=False)

    def __str__(self):
        return self.name


class Images(models.Model):
    img = models.ImageField(
        verbose_name="изображения", upload_to="files/img/", max_length=100
    )

    def __str__(self):
        return self.img
