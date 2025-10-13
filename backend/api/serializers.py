from rest_framework import serializers
from .models import *

class ClubSerializer(serializers.ModelSerializer):
        class Meta:
            model = Club
            fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
        class Meta:
            model = Post
            fields = "__all__"


class PresidentSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = President
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class VisePresidentSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = VisePresident
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class GeneralSecretarySerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = GeneralSecretary
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class TreasurerSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Treasurer
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class ExecutivesSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Executives
        fields = ['id', 'club', 'club_name', 'name', 'title', 'image', 'mail']

class EventsSerializer(serializers.ModelSerializer):
    club_name = serializers.CharField(source='club.name', read_only=True)
    
    class Meta:
        model = Events
        fields = ['id', 'club', 'club_name', 'title', 'description', 'image', 'date']