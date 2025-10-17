from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.models import User 
from django.db.models.signals import post_save
from django.dispatch import receiver

# Custom validator for email format
email_validator = RegexValidator(
    regex=r'^[a-zA-Z0-9._%+-]+@uap-bd\.edu$',
    message='Email must be in the format: username@uap-bd.edu'
)

class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='user-pic/', blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
   
    def __str__(self):
        return self.user.username

# Signal to automatically create UserProfile when User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'userprofile'):
        instance.userprofile.save()

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
    mail = models.EmailField(validators=[email_validator])
    
    def __str__(self):
        return self.name
    
class President(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField(validators=[email_validator])
    
    def __str__(self):
        return self.name
    
class VisePresident(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField(validators=[email_validator])
    
    def __str__(self):
        return self.name
    
class GeneralSecretary(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField(validators=[email_validator])
    
    def __str__(self):
        return self.name
    
class Treasurer(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField(validators=[email_validator])
    
    def __str__(self):
        return self.name
    
class Executives(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    image = models.ImageField(upload_to='profile-pic', blank=True, null=True)
    mail = models.EmailField(validators=[email_validator])
    
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