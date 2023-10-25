from django.shortcuts import render, redirect
from .forms import *
from django.contrib.auth import login, logout, authenticate
from .models import *
import datetime

def Main(request):
    if request.method == "POST":
        logform = LoginForm(request.POST)
        if logform.is_valid():
            cd = logform.cleaned_data
            user = authenticate(username=cd['username'], password=cd['password'])
            if user.is_active:
                login(request, user)
    else:
        logform = LoginForm(request.POST)


    if request.user.is_authenticated:
        user = request.user.username


        if request.method == "POST":
            time = request.POST['time']
            for i in time:
                min = time[0] + time[1]
                sec = time[3] + time[4]    
                break
            t = datetime.datetime.now()
            user_bd = Duration.objects.all()
            user_bd = Duration(username=user, day=t, hours=0, minutes=min, seconds=sec)
            user_bd.save()
    else:
        user = "None"

    return render(request, 'main.html', {'logform':logform, 'user':user})


def Mini_games(request):
    return render(request, 'mini-games.html')


def lu(request):
    logout(request)
    return redirect('/')