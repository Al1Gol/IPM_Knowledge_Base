from mainapp.models import Articles, Files, Images, Menu, Sections, Subsections
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


# JSON сериализатор таблицы Меню
class MenuSerializer(ModelSerializer):
    class Meta:
        model = Menu
        fields = ["id", "name", "img", "depart_id"]
        extra_kwargs = {"depart_id": {"read_only": True}}

    def create(self, validated_data):
        return Menu.objects.create(**validated_data)


# JSON сериализатор таблицы Разделы
class SectionsSerializer(ModelSerializer):
    depart_id = serializers.ReadOnlyField(
        source="menu_id.depart_id.id"
    )  # Добавление поля id подразделения, привязанного к текущему id подразделения в меню

    class Meta:
        model = Sections
        fields = ["id", "menu_id", "name", "img", "depart_id"]

    def create(self, validated_data):
        return Sections.objects.create(**validated_data)


# JSON сериализатор таблицы Подразделы
class SubsectionsSerializer(ModelSerializer):
    depart_id = serializers.ReadOnlyField(
        source="section_id.menu_id.depart_id.id"
    )  # Добавление поля id подразделения, привязанного к текущему id подразделения в меню

    class Meta:
        model = Subsections
        fields = ["id", "section_id", "name", "img", "depart_id"]

    def create(self, validated_data):
        return Subsections.objects.create(**validated_data)


# JSON сериализатор дял Статей
class ArticlesSerializer(ModelSerializer):
    depart_id = serializers.ReadOnlyField(
        source="subsection_id.section_id.menu_id.depart_id.id"
    )  # Добавление поля id подразделения, привязанного к текущему id подразделения в меню

    class Meta:
        model = Articles
        fields = ["id", "subsection_id", "text", "depart_id"]

    def create(self, validated_data):
        depart_id = serializers.IntegerField(
            source="subsection_id.section_id.menu_id.depart_id.id"
        )  # Добавление поля id подразделения, привязанного к текущему id подразделения в меню
        return Articles.objects.create(**validated_data)


# JSON сериализатор дял файлов статей
class FilesSerializer(ModelSerializer):
    class Meta:
        model = Files
        fields = ["id", "article_id", "name", "file"]


#   def create(self, validated_data):
#       return Files.objects.create(**validated_data)


# JSON сериализатор дял картинок интегрированных в статьи
class ImagesSerializer(ModelSerializer):
    class Meta:
        model = Images
        fields = ["img"]
