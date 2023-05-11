from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mainapp.models import ServerReleases, PlcReleases, ReleaseChanges

#Превращают данные модели в JSON

#Сериализация таблицы ServerReleases
class ServerReleaseSerializer(ModelSerializer):
    class Meta:
        model = ServerReleases
        fields =  '__all__'

#Сериализация таблицы PlcReleases
class PlcReleaseSerializer(ModelSerializer):
    class Meta:
        model = PlcReleases
        fields =  '__all__'

#Сериализация таблицы ReleaseChanges
class ReleaseChangesSerializer(ModelSerializer):
    class Meta:
        model = ReleaseChanges
        fields =  '__all__'
