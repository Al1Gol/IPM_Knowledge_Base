from django.db import models
from django.core.exceptions import ValidationError

# Список релизов сервера
class ServerReleases(models.Model):
    versions = models.CharField(verbose_name="версии сервера", max_length=20, unique=True)

    def __str__(self):
        return self.versions   
        
# Список релизов КПЛ
class PlcReleases(models.Model):
    versions = models.CharField(verbose_name="версии кпл", max_length=20, unique=True)

    def __str__(self):
        return self.versions
    

# Список изменений в релизах
class ReleaseChanges(models.Model):
    server_version_id = models.ForeignKey("ServerReleases", on_delete=models.CASCADE, null=True, blank=True)
    plc_version_id = models.ForeignKey("PlcReleases", on_delete=models.CASCADE, null=True, blank=True)
    short_desc = models.CharField(verbose_name="краткое описание", max_length=200)
    desc = models.TextField(verbose_name="Описание", max_length=10000)

    def __str__(self):
        return self.short_desc     
    
    def clean(self):
        if not self.server_version_id and not self.plc_version_id:
            raise ValidationError(
                {'server_version_id': "Укажите версию релиза КПЛ или сервера",
                 'plc_version_id': "Укажите версию релиза КПЛ или сервера",
                 }   
                )


