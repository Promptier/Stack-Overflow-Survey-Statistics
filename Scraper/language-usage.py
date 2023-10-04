""" BS4 and requests are basic web scraping requirements, re is for regexes to sift through 
data, json is pythons basic library to convert our giant python dictionary to json data, and 
finally, pprint is just to prettify the print output of the dictionary in python as you are 
scraping and debugging"""

from bs4 import BeautifulSoup as bs4
import requests, json, re, pprint

HEADERS = {
    'user-agent' : 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36',
    'Accept-Language': 'en-US, en;q=0.5'
    }

""" Numbers are abbreviated for the years. This script visits 7 urls, so it is quite slow."""

url_16 = "https://insights.stackoverflow.com/survey/2016"
url_17 = "https://insights.stackoverflow.com/survey/2017"
url_18 = "https://insights.stackoverflow.com/survey/2018"
url_19 = "https://insights.stackoverflow.com/survey/2019"
url_20 = "https://insights.stackoverflow.com/survey/2020"
url_21 = "https://insights.stackoverflow.com/survey/2021"
url_22 = "https://survey.stackoverflow.co/2022"

page_16 = requests.get(url_16, headers = HEADERS) 
page_17 = requests.get(url_17, headers = HEADERS) 
page_18 = requests.get(url_18, headers = HEADERS) 
page_19 = requests.get(url_19, headers = HEADERS) 
page_20 = requests.get(url_20, headers = HEADERS) 
page_21 = requests.get(url_21, headers = HEADERS) 
page_22 = requests.get(url_22, headers = HEADERS) 

# Basic debug statement that can come in handy
#if page.status_code != 200:
    #print('Fail to retrieve page.')   
#else:
    #print('Retrieved page succesfully.')

soup_16 = bs4(page_16.content, "lxml") 
soup_17 = bs4(page_17.content, "lxml") 
soup_18 = bs4(page_18.content, "lxml") 
soup_19 = bs4(page_19.content, "lxml") 
soup_20 = bs4(page_20.content, "lxml") 
soup_21 = bs4(page_21.content, "lxml") 
soup_22 = bs4(page_22.content, "lxml") 

"""This will contain all our usage/popularity data in one giant dictionary, with years 
being keys, and an array of dictionaries being the value. Each dictionary will have a 
name/label (i.e Python) and a percent float. This is the best way I could 
come up with to resemble javascript objects (JSON), which it will be converted to. """

usage_data = {
    2013: {},
    2014: {},
    2015: {},
    2016: {},
    2017: {},
    2018: {},
    2019: {},
    2020: {},
    2021: {},
    2022: {}
}

"""The slight differences in the graphs of the websites over the years requires slight 
modifications, some labels are in divs, others in tr elements, etc."""
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

"""This will work for 20-22"""
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
        usage_data[year][label] = fl_stat

scrape(soup_16, "technology-most-popular-technologies-2013",2013)
scrape(soup_16, "technology-most-popular-technologies-2014",2014)
scrape(soup_16, "technology-most-popular-technologies-2015",2015)
scrape(soup_16, "technology-most-popular-technologies-2016",2016)
scrape(soup_17, "technology-most-popular-technologies--of-this-category",2017)
scrape(soup_18, "technology-most-popular-technologies-all-respondents",2018)
scrape_19(soup_19, "technology-most-popular-technologies-all-respondents",2019)
scrape_20(soup_20, "technology-programming-scripting-and-markup-languages-all-respondents",2020)
scrape_20(soup_21, "most-popular-technologies-language",2021)
scrape_20(soup_22, "most-popular-technologies-language",2022)

#pprint.pprint(usage_data)

"""First we dump the entire dictionary into a string format, then make a json file out of it."""
json_data = json.dumps(usage_data)

with open('langauge-usage-all.json', 'w') as file:
    file.write(json_data)

"""This just makes it easier if you want to sit at the terminal and 
enter ID's, as you are testing what graph can be scraped, or not"""
#while True:
    #user_input = input("Please enter an ID, or type 'exit' to quit: ")
    #if user_input.lower() == "exit":
        #break
    #else:
        #scrape(soup, user_input)
