from django.urls import path
from .views import home_view, hello_there, new_yorker



app_name = 'main'

urlpatterns = [
  path('', home_view, name="home"),
  path('hello/<name>', hello_there, name="hello"),
  path('nyer', new_yorker, name="nyer")
]