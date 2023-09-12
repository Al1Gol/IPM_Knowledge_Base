from authapp.models import Departament, Users
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

# Превращают данные модели в JSON


# Сериализация таблицы "Роли пользователя"
class DepartamentSerializer(ModelSerializer):
    class Meta:
        model = Departament
        fields = ["id", "name"]

    def create(self, validated_data):
        return Departament.objects.create(**validated_data)


# Сериализация таблицы "Пользователи"
class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ["id", "username", "password"]

    #        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Users(**validated_data)
        user.set_password(password)
        user.save()
        return user
