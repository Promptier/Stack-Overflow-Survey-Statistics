from bs4 import BeautifulSoup as bs4
import requests, json, re, pprint

HEADERS = {
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    'Accept-Language': 'en-US, en;q=0.5'
}

URLS = {
    "2017": "https://insights.stackoverflow.com/survey/2017",
    "2018": "https://insights.stackoverflow.com/survey/2018",
    "2019": "https://insights.stackoverflow.com/survey/2019",
    "2020": "https://insights.stackoverflow.com/survey/2020",
    "2021": "https://insights.stackoverflow.com/survey/2021",
    "2022": "https://survey.stackoverflow.co/2022",
    "2023": "https://survey.stackoverflow.co/2023/"
}

def fetch_soup(url):
    response = requests.get(url, headers=HEADERS)
    if response.status_code != 200:
        print('Fail to retrieve page.')
    else:
        print('Retrieved page succesfully.')
    return bs4(response.content, "lxml") if response.status_code == 200 else None

soups = {year: fetch_soup(url) for year, url in URLS.items()}

usage_data = {
    2017: {},
    2018: {},
    2019: {},
    2020: {},
    2021: {},
    2022: {},
    2023: {}
}
def scrape(soup,graph_id,year):
    graph = soup.find(id=graph_id)
    rows = graph.find_all("div", class_="bar-row")
    for row in rows:
        if "N/A" in str(row):
            continue

        label = row.find(class_ = "bar-label").text
        #print(label)
        stat = row.find("ul").find("li").text


        stripped_stat = re.sub('%', '', stat)
        fl_stat = float(stripped_stat)
        #print(fl_stat)
        #usage_data[year].append({label: fl_stat})
        usage_data[year][label] = fl_stat

def scrape_19(soup,graph_id, year):
    graph = soup.find(id=graph_id)
    rows = graph.find_all("div", class_="bar-row")
    for row in rows:
        if "N/A" in str(row):
            continue
        first_div = row.find("div")
        label = first_div.text

        second_div = first_div.find_next("div")
        stat = second_div.text

        stripped_stat = re.sub('%', '', stat)
        fl_stat = float(stripped_stat)
        #usage_data[year].append({label: fl_stat})
        usage_data[year][label] = fl_stat

"""This will work for 20-23"""
def scrape_20(soup,graph_id,year):
    graph = soup.find(id=graph_id)
    rows = graph.find_all("tr")
    for row in rows:
        label = row.find(class_ = "label").text
        cleaned_label = label.strip()
        stat = row.find(class_ = "bar").text
        stripped_stat = re.sub('%', '', stat)
        first_part = stripped_stat.split()[0]
        fl_stat = float(first_part)
        #usage_data[year].append({cleaned_label: fl_stat})
        usage_data[year][cleaned_label] = fl_stat

scrape(soups['2017'],"technology-most-popular-technologies--of-professional-developers",2017)
scrape(soups['2018'],"technology-most-popular-technologies-professional-developers",2018)
scrape_19(soups['2019'],"technology-most-popular-technologies-professional-developers",2019)
scrape_20(soups['2020'], "technology-programming-scripting-and-markup-languages-professional-developers",2020)
scrape_20(soups['2021'], "most-popular-technologies-language",2021)
scrape_20(soups['2022'], "most-popular-technologies-language-prof",2022)
scrape_20(soups['2023'], "most-popular-technologies-language-prof",2023)
pprint.pprint(usage_data)


json_data = json.dumps(usage_data)

with open('language-usage-professional', 'w') as file:
    file.write(json_data)
