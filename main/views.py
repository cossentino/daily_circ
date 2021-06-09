from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
from .services.scraper import Scraper

# Create your views here.




def home_view(request):
  return HttpResponse("hello world")


def hello_there(request, name):
  return render(
    request, 
    'main/hello_there.html',
    {
      'name': name,
      'date': datetime.now()
    }
  )


def wapo(request):
  s = Scraper()
  s.wapo()
  return