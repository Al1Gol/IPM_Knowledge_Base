from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mainapp.models import SrvReleases, PlcReleases, ReleaseChanges

#Превращают данные модели в JSON

#Сериализация таблицы ServerReleases
class SrvReleaseSerializer(ModelSerializer):
    class Meta:
        model = SrvReleases
        fields =  '__all__'

#Сериализация таблицы PlcReleases
class PlcReleaseSerializer(ModelSerializer):
    class Meta:
        model = PlcReleases
        fields =  '__all__'

#Сериализация таблицы ReleaseChanges
class ReleaseChangesSerializer(ModelSerializer):
    ser_ver = serializers.CharField(source = 'srv_ver_id.versions')
    plc_ver = serializers.CharField(source = 'plc_ver_id.versions')
    class Meta:
        model = ReleaseChanges
        fields =  ['id', 'srv_ver_id', 'ser_ver', 'plc_ver_id', 'plc_ver', 'short_desc', 'desc']
