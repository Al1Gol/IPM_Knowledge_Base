# Generated by Django 4.2.1 on 2023-06-09 06:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0005_plcreleases_is_active_releasechanges_is_active_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, verbose_name='Меню')),
                ('link', models.CharField(max_length=400, verbose_name='краткое описание')),
                ('icon', models.CharField(max_length=600, verbose_name='Ссылка')),
            ],
        ),
    ]
