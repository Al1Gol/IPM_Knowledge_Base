# Generated by Django 4.2.1 on 2023-05-11 08:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_alter_plcreleases_versions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='releasechanges',
            name='plc_version_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.plcreleases'),
        ),
        migrations.AlterField(
            model_name='releasechanges',
            name='server_version_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='mainapp.serverreleases'),
        ),
    ]
