from django.contrib.auth.models import AbstractUser
from django.db import models


class Departament(models.Model):
    name = models.CharField(
        verbose_name="наименование отдела", max_length=50, unique=True
    )
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return f"{self.name}"


# Create your models here.
class Users(AbstractUser):
    depart_id = models.ForeignKey(
        "Departament",
        verbose_name="Отдел",
        on_delete=models.CASCADE,
        default=1,
    )

    def __str__(self):
        return f"{self.username}"
