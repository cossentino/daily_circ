from django.urls import path
from .views import home_view, hello_there, news_view



app_name = 'main'

urlpatterns = [
  path('', home_view, name="home"),
  path('hello/<name>', hello_there, name="hello"),
  path('news', news_view, name="nyer")
]