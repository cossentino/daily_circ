from django.urls import path
from .views import home_view, hello_there, news



app_name = 'main'

urlpatterns = [
  path('', home_view, name="home"),
  path('hello/<name>', hello_there, name="hello"),
  path('news', news, name="nyer")
]