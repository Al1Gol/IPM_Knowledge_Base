# Generated by Django 4.2.1 on 2023-05-12 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0003_alter_releasechanges_plc_version_id_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ServerReleases',
            new_name='SrvReleases',
        ),
        migrations.RenameField(
            model_name='releasechanges',
            old_name='plc_version_id',
            new_name='plc_ver_id',
        ),
        migrations.RenameField(
            model_name='releasechanges',
            old_name='server_version_id',
            new_name='srv_ver_id',
        ),
    ]
