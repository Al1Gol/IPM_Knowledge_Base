import datetime

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.db import models


class Departments(models.Model):
    name = models.CharField(
        verbose_name="наименование отдела", max_length=50, unique=True
    )
    created_at = models.DateTimeField(verbose_name="дата создания", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="дата обновления", auto_now=True)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Подразделения"
        verbose_name_plural = "Подразделения"
        ordering = ["created_at"]


# Create your models here.
class Users(AbstractUser):
    depart_id = models.ForeignKey(
        "Departments",
        related_name="depart_id",
        verbose_name="Отдел",
        on_delete=models.CASCADE,
        default=1,
    )
    is_moderate = models.BooleanField(verbose_name="модератор", default=False)
    created_at = models.DateTimeField(verbose_name="дата создания", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Пользователи"
        verbose_name_plural = "Пользователи"
        ordering = ["created_at"]


# Данный метод не работает, так как при каждом сохранении хэширует уже хэшированный пароль
# Из-за этого после превого входа админ не работает
#    def save(self, *args, **kwargs):
#        self.password = make_password(self.password)
#        super(Users, self).save(*args, **kwargs)
