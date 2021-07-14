## The Daily Circular (Django/Python, JavaScript, Vanilla CSS)<br><br>

![Demo gif](/media/daily-circ-demo.gif)<br><br>

**Description:** Single-page web application with randomized, physically-rotating circle of news articles pulled from varied sources, allowing the user to discover new topics they may not otherwise look at. 

**Languages/Frameworks:** 
- Backend: Django/Python, Beautiful Soup
- Frontend: Vanilla JS/CSS

**Technical Notes**

* Custom circle module controls circular movement of headline cards using basic trigonometry and the CSS "transform" property
* Custom Scraper class houses methods common to all web scraping tasks, while also housing unique methods tailored to each news site
* All CSS created without aid of frameworks
