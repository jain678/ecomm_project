# Generated by Django 4.1.5 on 2023-08-10 12:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0002_product_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                blank=True, default="/nature.jpg", null=True, upload_to=""
            ),
        ),
    ]
