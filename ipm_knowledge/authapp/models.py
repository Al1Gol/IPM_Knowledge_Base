from django.contrib.auth.models import AbstractUser
from django.db import models


class Roles(models.Model):
    name = models.CharField(
        verbose_name="наименование роли", max_length=50, unique=True
    )
    is_active = models.BooleanField(verbose_name="Видимость", default=True)

    def __str__(self):
        return f"{self.name}"


# Create your models here.
class Users(AbstractUser):
    role_id = models.ForeignKey(
        "Roles", verbose_name="роль пользоватея", on_delete=models.CASCADE, default=1
    )

    def __str__(self):
        return f"{self.username}"
