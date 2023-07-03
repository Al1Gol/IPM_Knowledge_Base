from django.db import models
from django.core.exceptions import ValidationError
'''
# Список релизов сервера
class SrvReleases(models.Model):
    versions = models.CharField(verbose_name="версии сервера", max_length=20, unique=True)
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return self.versions   
        
# Список релизов КПЛ
class PlcReleases(models.Model):
    versions = models.CharField(verbose_name="версии кпл", max_length=20, unique=True)
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return self.versions

#Список релизов IPM Terminal    
class PlcTerminalReleases(models.Model):
    versions = models.CharField(verbose_name="версии кпл", max_length=20, unique=True)
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return self.versions
    
class PlcTerminalReleases(models.Model):
    versions = models.CharField(verbose_name="версии кпл", max_length=20, unique=True)
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return self.versions
    

# Список изменений в релизах
class ReleaseChanges(models.Model):
    srv_ver_id = models.ForeignKey("SrvReleases", on_delete=models.CASCADE, null=True, blank=True)
    plc_ver_id = models.ForeignKey("PlcReleases", on_delete=models.CASCADE, null=True, blank=True)
    short_desc = models.CharField(verbose_name="краткое описание", max_length=200)
    desc = models.TextField(verbose_name="Описание", max_length=10000)
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return self.short_desc     
    
    def clean(self):
        if not self.srv_ver_id and not self.plc_ver_id:
            raise ValidationError(
                {'srv_ver_id': "Укажите версию релиза КПЛ или сервера",
                 'plc_ver_id': "Укажите версию релиза КПЛ или сервера",
                 }   
                )
'''

class Menu(models.Model):
    name = models.CharField(verbose_name="элементы меню", max_length=100, unique=True)
    img = models.ImageField(verbose_name="иконка", max_length=100, blank=True)
    is_active = models.BooleanField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.name    

class Sections(models.Model):
    menu_id = models.ForeignKey('Menu', verbose_name="id меню", on_delete=models.CASCADE)
    name = models.CharField(verbose_name="элементы меню", max_length=200, unique=True)
    img = models.CharField(verbose_name="иконка", max_length=100, blank=True)
    is_active = models.CharField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.name 

class Articles(models.Model):
    section_id = models.ForeignKey('Sections', verbose_name="id раздела", on_delete=models.CASCADE)
    text = models.TextField(verbose_name="Описание", max_length=10000)
    is_active = models.BooleanField(verbose_name="видимость", default=True)

    def __str__(self):
        return self.text 