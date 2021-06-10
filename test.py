from bs4 import BeautifulSoup as BS
from bs4 import SoupStrainer as SS
import requests
import cchardet
import random

print('hello')

class Scraper():

  def __init__(self, url):
    self.my_site = requests.get(url)


  def wapo(self):
    results = self.content.find(class_="font--headline")
    my_result = results[random.randint(0, len(results))]
    return my_result.text



s = Scraper('https://www.reuters.com/')

soup = BS(s.my_site.text, 'lxml', parse_only=SS('h2'))
print(soup.prettify())