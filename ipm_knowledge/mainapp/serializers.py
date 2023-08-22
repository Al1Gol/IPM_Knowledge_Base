from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mainapp.models import Menu, Sections, Articles, Files, Images


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
    
class FilesSerializer(ModelSerializer):
    class Meta:
        model = Files
        fields = ['id', 'article_id', 'name', 'file']

#   def create(self, validated_data):
#       return Files.objects.create(**validated_data)

class ImagesSerializer(ModelSerializer):
    class Meta:
        model = Images
        fields = ['img']