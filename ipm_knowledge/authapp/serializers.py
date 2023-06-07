from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from authapp.models import Roles, Users

#Превращают данные модели в JSON

#Сериализация таблицы "Роли пользователя"
class RolesSerializer(ModelSerializer):
    class Meta:
        model = Roles
        fields =  ['id', 'name']

#Сериализация таблицы "Пользователи"
class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields =  ['id', 'username', 'password']
#        extra_kwargs = {'password': {'write_only': True}}



    def create(self, validated_data):
        password = validated_data.pop("password")
        user = Users(**validated_data)
        user.set_password(password)
        user.save()
        return user

