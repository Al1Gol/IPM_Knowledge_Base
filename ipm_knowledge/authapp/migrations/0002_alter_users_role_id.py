# Generated by Django 4.2.1 on 2023-05-24 06:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='role_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='authapp.roles', verbose_name='роль пользоватея'),
        ),
    ]