from django.db import models
from django.conf import settings

from .validators import validate_file_extension

class Menu(models.Model):
    name = models.CharField(verbose_name="элементы меню", max_length=100)
    img = models.FileField(verbose_name="иконка", validators=[validate_file_extension], upload_to='icons/menu/', max_length=100, blank=True)
    is_active = models.BooleanField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.name    

class Sections(models.Model):
    menu_id = models.ForeignKey('Menu', verbose_name="id меню", on_delete=models.CASCADE)
    name = models.CharField(verbose_name="элементы меню", max_length=200)
    img = models.FileField(verbose_name="иконка", upload_to='icons/sections/', validators=[validate_file_extension], max_length=100, blank=True)
    is_active = models.CharField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.name 

class Articles(models.Model):
    section_id = models.ForeignKey('Sections', verbose_name="id раздела", on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Описание", max_length=10000)
    is_active = models.BooleanField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.text 
    
class Files(models.Model):
    articles_id = models.ForeignKey('Articles', on_delete=models.CASCADE )
    name = models.CharField(verbose_name='название файла', max_length=200)
    file = models.FileField(upload_to='files/', verbose_name='файлы')
    is_active = models.BooleanField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.name


