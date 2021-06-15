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
    if url == 'https://www.newyorker.com':
      self.results = self.new_yorker()
    elif url == 'https://www.reuters.com':
      self.results = self.reuters()


  def new_yorker(self):
    tags = self.content.find_all(class_='summary-item__hed-link')
    links = [f"https://www.newyorker.com{h['href']}" for h in tags]
    headlines = [h.contents[0].contents[0] for h in tags]
    return list(zip(headlines, links))

  def reuters(self):
    tags = self.content(class_=['MediaStoryCard__basic_hero___fSAEnM', 'MediaStoryCard__no_meta___3iQjxw',
    'MediaStoryCard__hub___2ECKOi'])
    links = [f"https://www.reuters.com{h['href']}" for h in tags]
    headlines = []
    for h in tags:
      span = h.select_one('span.MediaStoryCard__title___2PHMeX')
      headlines.append(*span.contents)
    return list(zip(headlines, links))

  def get_results(self):
    return self.results

  def random_choice(self):
    return random.choice(self.results)

