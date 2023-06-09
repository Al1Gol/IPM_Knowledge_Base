from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mainapp.models import Menu, Sections, Articles #SrvReleases, PlcReleases, ReleaseChanges

#Превращают данные модели в JSON

'''
#Сериализация таблицы ServerReleases
class SrvReleaseSerializer(ModelSerializer):
    class Meta:
        model = SrvReleases
        fields =  ['id', 'versions']
    
    def create(self, validated_data):
        return SrvReleases.objects.create(**validated_data)

#Сериализация таблицы PlcReleases
class PlcReleaseSerializer(ModelSerializer):
    class Meta:
        model = PlcReleases
        fields =  ['id', 'versions']

    def create(self, validated_data):
        return PlcReleases.objects.create(**validated_data)

#Сериализация таблицы ReleaseChanges
class ReleaseChangesSerializer(ModelSerializer):
    #srv_ver = serializers.SerializerMethodField()
    #plc_ver = serializers.SerializerMethodField()
    class Meta:
        model = ReleaseChanges
        fields =  ['id', 'srv_ver_id', 'plc_ver_id', 'short_desc', 'desc']

#    def get_srv_ver(self, obj):
#        if obj.srv_ver_id == None:
#            print('srv_ves is None')
#            return None
#        else:
#            srv_obj = SrvReleases.objects.get(id=obj.id).versions
#            return srv_obj
        
#    def get_plc_ver(self, obj):
#        if obj.plc_ver_id == None:
#            print('plc_ver is None')
#            return None
#        else:
#            plc_obj = PlcReleases.objects.get(id=obj.id).versions
#            return plc_obj
        
    def create(self, validated_data):
        return ReleaseChanges.objects.create(**validated_data)
'''
class MenuSerializer(ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'img']
    
    def create(self, validated_data):
        return Menu.objects.create(**validated_data)
    
class SectionsSerializer(ModelSerializer):
    class Meta:
        model = Sections
        fields = ['id', 'menu_id', 'name', 'img']

    def create(self, validated_data):
        return Sections.objects.create(**validated_data)

class ArticlesSerializer(ModelSerializer):
    class Meta:
        model = Articles
        fields = ['id', 'section_id', 'text']
    
    def create(self, validated_data):
        return Articles.objects.create(**validated_data)