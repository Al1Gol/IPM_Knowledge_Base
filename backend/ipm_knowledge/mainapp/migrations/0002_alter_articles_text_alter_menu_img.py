# Generated by Django 4.2.1 on 2023-10-16 10:52

from django.db import migrations, models
import mainapp.validators


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='text',
            field=models.TextField(blank=True, max_length=40000, verbose_name='Описание'),
        ),
        migrations.AlterField(
            model_name='menu',
            name='img',
            field=models.FileField(blank=True, null=True, upload_to='icons/menu/', validators=[mainapp.validators.validate_file_extension], verbose_name='иконка'),
        ),
    ]
