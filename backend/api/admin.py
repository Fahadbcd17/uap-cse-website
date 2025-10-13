from django.contrib import admin

from .models import *

admin.site.register([Post,Club,Convener,President,VisePresident,GeneralSecretary,Treasurer,Executives,Events])
