# Generated by Django 4.1.5 on 2023-08-13 12:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0003_alter_product_image"),
    ]

    operations = [
        migrations.RenameField(
            model_name="review",
            old_name="Product",
            new_name="product",
        ),
    ]