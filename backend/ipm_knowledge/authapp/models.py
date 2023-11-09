from django.contrib.auth.models import AbstractUser
from django.db import models


# Список подразделений компании
class Departments(models.Model):
    name = models.CharField(verbose_name="наименование отдела", max_length=50, unique=True)
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return f"{self.name}"


# Список пользователей
class Users(AbstractUser):
    depart_id = models.ForeignKey(
        "Departments",
        related_name="depart_id",
        verbose_name="Отдел",
        on_delete=models.CASCADE,
        default=1,
    )
    is_moderate = models.BooleanField(verbose_name="Модератор", default=False)
