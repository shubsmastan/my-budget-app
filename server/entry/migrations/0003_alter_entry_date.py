# Generated by Django 4.2.4 on 2023-08-13 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('entry', '0002_alter_entry_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='date',
            field=models.DateField(unique=True),
        ),
    ]
