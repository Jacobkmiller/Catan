from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Player(models.Model):

    name = models.CharField(max_length=25)
    color = models.CharField(max_length=5)
