from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
from .services.scraper.scraper import Scraper
from .services.scraper import attributes


# Create your views here.

URLS = ['reuters', 'newyorker']


def news(request):
  scrapers = []
  for url in URLS:
    sc = Scraper(f"https://www.{url}.com")
    sc.scrape_response(sc.url)
    sc.get_headlines()
    for _ in range(4):
      sc.get_preview(eval(f"attributes.{sc.site_name.upper()}"))
    scrapers.append(sc)
  return render(
  request,
  'main/news.html', {
    'scrapers': scrapers
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