from bs4 import BeautifulSoup as BS, SoupStrainer as SS
import requests
import random
import pdb
import re


class Scraper():

  def __init__(self, url):
    self.url = url
    self.content = None
    self.results = None
    self.site_name = re.compile("www\.(.+)\.").search(url).group(1)
    self.selected_headline = None
    self.selected_preview = None
 

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

  def get_preview(self):
    while True:
      selection = self.choose_random_article()
      text = eval(f"self.{self.site_name}_getpreview('{selection[1]}')")
      if self.validate_preview(text):
        self.selected_headline = selection[0]
        self.selected_preview = text
        break

  def theatlantic_getpreview(self, article_url):
    content = self.scrape_response(article_url)
    paras = content.find_all(name="p", class_="ArticleParagraph_root__2QM08")
    return " ".join([p.text for p in paras])

  def validate_preview(self, text):
    end_idx = max(len(text) - 1, 100)
    if text:
      for char in text[0:end_idx]:
        if not (char.isalpha() or char.isspace()):
          return False
      return True
    return False



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
      pp_1 = article_soup.find(class_='article__body')
      if pp_1 and pp_1.p:
        return pp_1.p.contents[0]
      else:
        return "Preview unavailable for this article"

  def random_choice(self):
    while True:
      article_info = random.choice(self.results)
      if self.site_name.lower() == 'reuters':
        article_preview = self.get_reuters_article_preview(article_info[1])          
      elif self.site_name.lower() == 'new yorker':
        article_preview = self.get_new_yorker_article_preview(article_info[1])
      if article_preview and article_preview[0].isalpha():
        break
    return [article_info, article_preview]

