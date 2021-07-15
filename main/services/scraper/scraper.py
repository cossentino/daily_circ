from bs4 import BeautifulSoup as BS, SoupStrainer as SS
import requests
import random
import pdb
import re



"""Contains functionality to scrape headines from various news websites, and retrieve article
preview information. Currently, supports Reuters, The New Yorker, and The Atlantic.
"""
class Scraper():

  def __init__(self, url):
    self.url = url
    self.site_name = re.compile("www\.(.+)\.").search(url).group(1)
    self.content = None
    self.results = None
    self.selected_headlines = []
    self.selected_headline_links = []
    self.selected_previews = []
 

  def scrape_response(self, url):
      try:
        page = requests.get(url)
        self.content = BS(page.content, 'lxml')
        return self.content
      except requests.ConnectionError as e:
        print(e)
        return None

  def get_headlines(self):
    self.results = eval(f"self.{self.site_name}()")

  def reuters(self):
    tags = self.content(class_= re.compile('MediaStoryCard'), name="a")
    links = [f"https://www.reuters.com{h['href']}" for h in tags]
    headlines = [tag.select_one('span.MediaStoryCard__title___2PHMeX').string for tag in tags]
    return list(zip(headlines, links))

  def newyorker(self):
    tags = self.content.find_all(class_='summary-item__hed-link')
    links = [f"https://www.newyorker.com{h['href']}" for h in tags]
    headlines = [h.contents[0].contents[0] for h in tags]
    return list(zip(headlines, links))

  def theatlantic(self):
    wrappers = self.content.find_all(class_="o-hed")
    tags = [w.select_one('a') for w in wrappers if w.select_one('a') != None]
    headlines = [tag.string.strip() for tag in tags if tag.string != None]
    links = [tag['href'] for tag in tags if tag.string != None]
    return list(zip(headlines, links))

  # On hold for now - scraping might not be possible
  def technologyreview(self):
    wrappers = self.content.find_all(['h2', 'h3'])
    tags = [w.a for w in wrappers if w.a != None]
    links = [tag['href'] for tag in tags]
    headlines = [tag.string for tag in tags]
    return list(zip(headlines, links))

  # Returns tuple chosen at random from self.results
  def choose_random_article(self):
    return random.choice(self.results) if self.results else None

  def get_preview(self, *args, **kwargs):
    while True:
      selection = self.choose_random_article()
      content = self.scrape_response(selection[1])
      paras = content.find_all(**kwargs)
      text = "\n\n".join([p.text for p in paras])
      if text and text[0].isalpha():
        self.selected_headlines.append([selection[0], selection[1], text[0:min(len(text), 501)]])
        # self.selected_headline_links.append(selection[1])
        # self.selected_previews.append(text[0:min(len(text), 501)])
        break

  def validate_preview(self, text):
    end_idx = min(len(text) - 1, 100)
    if text:
      for char in text[0:end_idx]:
        if not (char.isalpha() or char.isspace()):
          return False
      return True
    return False

  def formatted_site_title(self):
    return self.content.find("title").text

