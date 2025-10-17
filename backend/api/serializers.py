from rest_framework import serializers
from .models import *
import re
from django.contrib.auth.models import User

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)
    date_joined = serializers.DateTimeField(source='user.date_joined', read_only=True)
    
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'username', 'email', 'date_joined', 'image', 'gender']

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['gender']
    
    def update(self, instance, validated_data):
        instance.gender = validated_data.get('gender', instance.gender)
        instance.save()
        return instance

class EmailFormatValidator:
    def __call__(self, value):
        pattern = r'^[a-zA-Z0-9._%+-]+@uap-bd\.edu$'
        if not re.match(pattern, value):
            raise serializers.ValidationError('Email must be in the format: username@uap-bd.edu')
        return value

class BaseMemberSerializer(serializers.ModelSerializer):
    mail = serializers.EmailField(validators=[EmailFormatValidator()])
    
    class Meta:
        abstract = True

class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class ConvenerSerializer(BaseMemberSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Convener
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class PresidentSerializer(BaseMemberSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = President
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class VisePresidentSerializer(BaseMemberSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = VisePresident
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class GeneralSecretarySerializer(BaseMemberSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = GeneralSecretary
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class TreasurerSerializer(BaseMemberSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Treasurer
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class ExecutivesSerializer(BaseMemberSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Executives
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class EventsSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Events
        fields = ['id', 'club', 'club_name', 'title', 'description', 'image', 'date']