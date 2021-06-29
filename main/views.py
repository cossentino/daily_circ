from django.shortcuts import render
from django.http import HttpResponse
from django.utils.timezone import datetime
from .services.scraper import Scraper

# Create your views here.


def news_view(request):
  reuters_scraper = Scraper('https://www.reuters.com')
  reuters_article = reuters_scraper.random_choice()
  if len(reuters_article[1]) > 500:
    reuters_article[1] = reuters_article[1][:500]
  nyer_scraper = Scraper('https://www.newyorker.com')
  nyer_article = nyer_scraper.random_choice()
  if len(nyer_article[1]) > 500:
    nyer_article[1] = nyer_article[1][:500]
  return render(
  request,
  'main/news.html',
  {
    # 'nyer': nyer.new_yorker(),
    # 'reuters': reuters.reuters(),
    'article_1_info': reuters_article[0],
    'article_1_preview': reuters_article[1],
    'article_2_info': nyer_article[0],
    'article_2_preview': nyer_article[1],
    'article_1_sitename': reuters_scraper.site_name,
    'article_2_sitename': nyer_scraper.site_name,
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