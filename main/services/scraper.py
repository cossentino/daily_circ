from bs4 import BeautifulSoup as BS, SoupStrainer as SS
import requests
import random
import pdb


class Scraper():

  def __init__(self, url):
    self.content = self.scrape_response(url)
    if url == 'https://www.newyorker.com':
      self.results = self.get_new_yorker_headlines()
      self.site_name="New Yorker"
    elif url == 'https://www.reuters.com':
      self.results = self.get_reuters_headlines()
      self.site_name="Reuters"

  def scrape_response(self, url):
      try:
        page = requests.get(url)
        return BS(page.content, 'lxml')
      except requests.ConnectionError as e:
        print(e)
        return None

  def get_new_yorker_headlines(self):
    tags = self.content.find_all(class_='summary-item__hed-link')
    links = [f"https://www.newyorker.com{h['href']}" for h in tags]
    headlines = [h.contents[0].contents[0] for h in tags]
    return list(zip(headlines, links))

  def get_reuters_headlines(self):
    tags = self.content(class_=['MediaStoryCard__basic_hero___fSAEnM', 'MediaStoryCard__no_meta___3iQjxw',
    'MediaStoryCard__hub___2ECKOi'])
    links = [f"https://www.reuters.com{h['href']}" for h in tags]
    headlines = []
    for h in tags:
      span = h.select_one('span.MediaStoryCard__title___2PHMeX')
      headlines.append(*span.contents)
    return list(zip(headlines, links))


  def get_reuters_article_preview(self, url):
    article_soup = self.scrape_response(url)
    if not article_soup:
      return None
    pp_1 = article_soup.find(class_='ArticleBody__content___2gQno2').p
    return pp_1.contents[0]

  def get_new_yorker_article_preview(self, url):
    article_soup = self.scrape_response(url)
    if not article_soup:
      return None
    pp_1 = article_soup.find(class_="article__body").p
    return pp_1.contents[0]


  def get_results(self):
    return self.results

  def random_choice(self):
    while True:
      article_info = random.choice(self.results)
      if self.site_name.lower() == 'reuters':
        article_preview = self.get_reuters_article_preview(article_info[1])          
      elif self.site_name.lower() == 'new yorker':
        article_preview = self.get_new_yorker_article_preview(article_info[1])
      if article_preview:
        break
    return [article_info, article_preview]

