import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models


# Необходимо, чтобы имелась 1 запись с id = 1 для подвязки к администратору
class Departments(models.Model):
    name = models.CharField(
        verbose_name="наименование отдела", max_length=50, unique=True
    )
    created_at = models.DateTimeField(verbose_name="дата создания", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="дата обновления", auto_now=True)

    def __str__(self):
        return f"{self.name}"


class Users(AbstractUser):
    depart_id = models.ForeignKey(
        "Departments",
        related_name="depart_id",
        verbose_name="Отдел",
        on_delete=models.CASCADE,
        default=1,
    )
    is_moderate = models.BooleanField(verbose_name="Модератор", default=False)
    created_at = models.DateTimeField(verbose_name="дата создания", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="дата обновления", auto_now=True)

    def _create_user(self, **extra_fields):
        user.set_password(password)
        user.save(using=self._db)
        return user
