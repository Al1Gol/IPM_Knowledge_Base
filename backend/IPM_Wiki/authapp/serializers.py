from authapp.models import Departments, Users
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

# Превращают данные модели в JSON


# Сериализация таблицы "Роли пользователя"
class DepartmentsSerializer(ModelSerializer):
    class Meta:
        model = Departments
        fields = [
            "id",
            "name",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        return Departments.objects.create(**validated_data)


# Сериализация таблицы "Пользователи"
class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = [
            "id",
            "username",
            "password",
            "depart_id",
            "is_staff",
            "is_moderate",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"password": {"write_only": True}}


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = [
            "id",
            "username",
            "depart_id",
            "is_staff",
            "is_moderate",
            "created_at",
            "updated_at",
        ]
