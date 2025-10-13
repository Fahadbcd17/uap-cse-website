from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status, generics, permissions

class ClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [IsAuthenticated] 

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated] 
 
class ConvenerViewSet(viewsets.ModelViewSet):
    queryset = Convener.objects.all()
    serializer_class = ConvenerSerializer
    permission_classes = [IsAuthenticated]

class PresidentViewSet(viewsets.ModelViewSet):
    queryset = President.objects.all()
    serializer_class = PresidentSerializer
    permission_classes = [IsAuthenticated]

class VisePresidentViewSet(viewsets.ModelViewSet):
    queryset = VisePresident.objects.all()
    serializer_class = VisePresidentSerializer
    permission_classes = [IsAuthenticated]

class GeneralSecretaryViewSet(viewsets.ModelViewSet):
    queryset = GeneralSecretary.objects.all()
    serializer_class = GeneralSecretarySerializer
    permission_classes = [IsAuthenticated]

class TreasurerViewSet(viewsets.ModelViewSet):
    queryset = Treasurer.objects.all()
    serializer_class = TreasurerSerializer
    permission_classes = [IsAuthenticated]

class ExecutivesViewSet(viewsets.ModelViewSet):
    queryset = Executives.objects.all()
    serializer_class = ExecutivesSerializer
    permission_classes = [IsAuthenticated]

class EventsViewSet(viewsets.ModelViewSet):
    queryset = Events.objects.all()
    serializer_class = EventsSerializer
    permission_classes = [IsAuthenticated]