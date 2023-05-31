from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from authapp.models import Roles, Users

#Превращают данные модели в JSON

#Сериализация таблицы "Роли пользователя"
class RolesSerializer(ModelSerializer):
    class Meta:
        model = Roles
        fields =  '__all__'

#Сериализация таблицы "Пользователи"
class UsersSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields =  'username'
#        extra_kwargs = {'password': {'write_only': True}}



#    def create(self, validated_data):
#        password = validated_data.pop("password")
#        users = Users(**validated_data)
#        users.set_password(password)
#        users.save()
#        return users 

