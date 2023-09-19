from authapp.models import Departments, Users
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

# Превращают данные модели в JSON


# Сериализация таблицы "Роли пользователя"
class DepartmentsSerializer(ModelSerializer):
    class Meta:
        model = Departments
        fields = ["id", "name"]

    def create(self, validated_data):
        return Departments.objects.create(**validated_data)


# Сериализация таблицы "Пользователи"
class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username", "password", "depart_id", "is_staff", "is_moderate"]
        extra_kwargs = {"password": {"write_only": True}}
