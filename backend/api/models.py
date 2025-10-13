from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User


class Club(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='club-img/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    def __str__(self):
        return self.name

class Post(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='post-img/', blank=True, null=True)  
    def __str__(self):
        return self.name


class Convener(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField()
    def __str__(self):
        return self.name
    
class President(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField()
    def __str__(self):
        return self.name
    

class VisePresident(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField()
    def __str__(self):
        return self.name
    

class GeneralSecretary(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField()
    def __str__(self):
        return self.name
    

class Treasurer(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField()
    def __str__(self):
        return self.name
    

class Executives(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField()
    def __str__(self):
        return self.name
    
class Events(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    date = models.DateField()
    
    def __str__(self):
        return self.title  