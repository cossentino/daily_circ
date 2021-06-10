from bs4 import BeautifulSoup as BS, SoupStrainer as SS
import requests
import random
import pdb

def scrape_response(url):
  page = requests.get(url)
  return BS(page.content, 'lxml')



class Scraper():

  def __init__(self, url):
    self.content = scrape_response(url)


  def new_yorker(self):
    headlines = self.content.find_all(class_='summary-item__hed-link')
    links = [f"https://www.newyorker.com{h['href']}" for h in headlines]
    text = [h.contents[0].contents[0] for h in headlines]
    return zip(text, links)




s = Scraper('https://www.newyorker.com')
s.new_yorker()