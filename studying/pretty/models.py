from django.db import models


class Duration(models.Model):
    username = models.CharField(max_length=100)
    day = models.DateTimeField()
    hours = models.IntegerField()
    minutes = models.IntegerField()
    seconds = models.IntegerField()
    
    
class Motivation(models.Model):
    phrase = models.TextField(blank=True)
    day = models.DateTimeField()