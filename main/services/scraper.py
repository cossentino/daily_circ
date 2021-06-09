from bs4 import BeautifulSoup as BS
import requests


class Scraper():

  def wapo(self):
    URL = 'https://www.washingtonpost.com'
    page = requests.get(URL)
    soup = BS(page.content, 'lxml')
    results = soup.find_all('h2', class_="font--headline")
    print(results)