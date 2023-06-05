# Generated by Django 4.2.1 on 2023-05-10 11:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PlcReleases',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('versions', models.CharField(max_length=20, unique=True, verbose_name='версии')),
            ],
        ),
        migrations.CreateModel(
            name='ServerReleases',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('versions', models.CharField(max_length=20, unique=True, verbose_name='версии')),
            ],
        ),
        migrations.CreateModel(
            name='ReleaseChanges',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('short_desc', models.CharField(max_length=200, verbose_name='краткое описание')),
                ('desc', models.TextField(max_length=10000, verbose_name='Описание')),
                ('plc_version_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.plcreleases')),
                ('server_version_id', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.serverreleases')),
            ],
        ),
    ]