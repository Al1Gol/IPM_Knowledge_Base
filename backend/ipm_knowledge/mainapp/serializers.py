from mainapp.models import Articles, Files, Images, Menu, Sections, Subsections
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class MenuSerializer(ModelSerializer):
    class Meta:
        model = Menu
        fields = ["id", "name", "img", "is_article"]

    def create(self, validated_data):
        return Menu.objects.create(**validated_data)


class SectionsSerializer(ModelSerializer):
    depart_id = serializers.ReadOnlyField(source="menu_id.depart_id.id")

    class Meta:
        model = Sections
        fields = ["id", "menu_id", "name", "img", "depart_id", "is_article"]

    def create(self, validated_data):
        return Sections.objects.create(**validated_data)


class SubsectionsSerializer(ModelSerializer):
    depart_id = serializers.ReadOnlyField(source="menu_id.section_id.depart_id.id")

    class Meta:
        model = Subsections
        fields = ["id", "section_id", "name", "img", "depart_id", "is_article"]

    def create(self, validated_data):
        return Subsections.objects.create(**validated_data)


class FilesSerializer(ModelSerializer):
    class Meta:
        model = Files
        fields = ["id", "article_id", "name", "file"]


#   def create(self, validated_data):
#       return Files.objects.create(**validated_data)


class ArticlesSerializer(ModelSerializer):
    files = FilesSerializer(many=True, read_only=True)
    depart_id = serializers.ReadOnlyField(
        source="subsection_id.section_id.menu_id.depart_id.id"
    )

    class Meta:
        model = Articles

        fields = [
            "id",
            "menu_id",
            "section_id",
            "subsection_id",
            "text",
            "depart_id",
            "files",
        ]

    def create(self, validated_data):
        depart_id = serializers.IntegerField(
            source="subsection_id.section_id.menu_id.depart_id.id"
        )
        return Articles.objects.create(**validated_data)


class ImagesSerializer(ModelSerializer):
    class Meta:
        model = Images
        fields = ["img"]
