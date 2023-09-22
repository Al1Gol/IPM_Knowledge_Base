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
        fields = ["id", "username", "depart_id", "is_staff", "is_moderate"]


class PasswordChangeSerializer(ModelSerializer):
    class Meta:
        model = Users
        old_password = serializers.CharField()
        new_password = serializers.CharField()
        new_password_repeat = serializers.CharField()
        fields = ["old_password", "new_password", "new_password_repeat"]

        extra_kwargs = {
            "old_password": {"write_only": True},
            "new_password": {"write_only": True},
            "new_password_repeat": {"write_only": True},
        }


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username", "depart_id", "is_staff", "is_moderate"]
