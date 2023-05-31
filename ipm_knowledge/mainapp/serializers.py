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
    srv_ver = serializers.SerializerMethodField()
    plc_ver = serializers.SerializerMethodField()
    class Meta:
        model = ReleaseChanges
        fields =  ['id', 'srv_ver_id', 'srv_ver', 'plc_ver_id', 'plc_ver', 'short_desc', 'desc']

    def get_srv_ver(self, obj):
        if obj.srv_ver_id == None:
            print('srv_ves is None')
            return None
        else:
            srv_obj = SrvReleases.objects.get(id=obj.id).versions
            return srv_obj
        
    def get_plc_ver(self, obj):
        if obj.plc_ver_id == None:
            print('plc_ver is None')
            return None
        else:
            plc_obj = PlcReleases.objects.get(id=obj.id).versions
            return plc_obj
