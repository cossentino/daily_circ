from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
from .services.scraper import Scraper

# Create your views here.


def news_view(request):
  nyer = Scraper('https://www.newyorker.com')
  reuters = Scraper('https://www.reuters.com')
  return render(
  request,
  'main/news.html',
  {
    # 'nyer': nyer.new_yorker(),
    # 'reuters': reuters.reuters(),
    'random_nyer': nyer.random_choice(),
    'random_reuters': reuters.random_choice()
  })


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