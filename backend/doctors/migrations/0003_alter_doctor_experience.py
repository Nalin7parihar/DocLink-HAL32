# Generated by Django 5.1.5 on 2025-01-31 04:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0002_rename_date_doctor_join_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctor',
            name='experience',
            field=models.TextField(blank=True, default=''),
        ),
    ]
