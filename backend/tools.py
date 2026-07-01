from langchain.tools import tool
import requests
from bs4 import BeautifulSoup
from tavily import TavilyClient
from dotenv import load_dotenv
import os
from rich import print

load_dotenv()
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@tool

def get_news(query: str) -> str:
    """
    Get news articles related to a query using Tavily API. returns title, url , snippets
    """

    results = tavily_client.search(query=query, limit=3)

    out=[]

    for r in results['results']:
        
        out.append(f"Title: {r['title']}\nURL: {r['url']}\nSnippet: {r['content'][:200]}\n")

    return "\n-----\n".join(out)



@tool

def scrape_url(url: str) -> str:
    """
    Scrape the content of a URL and return the text.
    """
    try:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, 'html.parser')

        for tag in soup(['script', 'style','nav','header','footer']):
            tag.decompose()
        
        return soup.get_text(separator="\n", strip=True)[:3000]


    except Exception as e:
        return f"Error fetching the URL: {e}"

