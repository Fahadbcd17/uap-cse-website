from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status, generics, permissions
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update']:
            return UserProfileUpdateSerializer
        return UserProfileSerializer

    def get_queryset(self):
        if self.request.user.is_superuser:
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get', 'put', 'patch'], parser_classes=[MultiPartParser, FormParser])
    def me(self, request):
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        if request.method == 'GET':
            serializer = self.get_serializer(user_profile)
            return Response(serializer.data)
        
        elif request.method in ['PUT', 'PATCH']:
            serializer = UserProfileUpdateSerializer(
                user_profile, 
                data=request.data, 
                partial=(request.method == 'PATCH')
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            
            updated_profile = UserProfile.objects.get(user=request.user)
            full_serializer = UserProfileSerializer(updated_profile)
            return Response(full_serializer.data)

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