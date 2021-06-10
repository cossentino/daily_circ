from django.urls import path
from .views import home_view, hello_there, wapo



app_name = 'main'

urlpatterns = [
  path('', home_view, name="home"),
  path('hello/<name>', hello_there, name="hello"),
  path('wapo', wapo, name="wapo")
]