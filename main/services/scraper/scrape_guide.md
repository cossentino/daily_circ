## List of web scraping identifiers to retrieve headline titles and links


#### Reuters
1. all tags with classes:
  1. 'MediaStoryCard__basic_hero___fSAEnM'
  2. 'MediaStoryCard__no_meta___3iQjxw'
  3. 'MediaStoryCard__hub___2ECKOi'
2. href attr for each of the above corresponds to link to that article


#### Atlantic
  1. Get all elements with 'o-hed' class
  2. First a tag in o-hed contains link and text
  3. Make sure to validate


### MIT Tech review
  1. Get all h2 > a, h3 > a
  2. Get inner text of the a's

