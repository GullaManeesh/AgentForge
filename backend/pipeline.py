from agents import search_agent, reader_agent, writer_chain, critic_chain

def run_research_pipeline(topic: str):
    state={}


    #search agent

    

    search_agent_res = search_agent().invoke({
        "messages":[("user",f"Find me the latest and reliable information on the topic: {topic}.")],
    })
   
    state['search_results']= search_agent_res['messages'][-1].content


    #scrape agent

    reader_agent_res = reader_agent().invoke({
    "messages": [(
        "user",
        f"""
        Search Results:
        {state['search_results']}

        Extract all URLs from the search results.
        Use the scrape_url tool on each relevant URL.
        Summarize the scraped content.
        Do not answer using only the search snippets.
        """
    )]
})

    state['scraped_content']= reader_agent_res['messages'][-1].content



   
    combined_research = (
        f"search_results:\n{state['search_results']}\n\n"
        f"scraped_content:\n{state['scraped_content']}"
    )
    writer_res = writer_chain.invoke({
        "topic": topic,
        "research": combined_research
    })

    state['report'] = writer_res

  

    critic_res = critic_chain.invoke({
        "report": state['report']
    })

    state['critique'] = critic_res


    return state


if __name__ == "__main__":
    topic = input("Enter a research topic: ")
    
    run_research_pipeline(topic)