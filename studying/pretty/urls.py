from django.urls import path
from .views import *


urlpatterns = [
    path('', Main, name='Main'),
    path('mini-games/', Mini_games, name='Mini-games'), 
    path('logout/', lu)
]