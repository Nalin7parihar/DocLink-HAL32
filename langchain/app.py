from langchain_core.prompts import ChatPromptTemplate,MessagesPlaceholder
from langchain_ollama.llms import OllamaLLM
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage,SystemMessage
from langchain_community.chat_message_histories import ChatMessageHistory
import re
import streamlit as st



if "chat_history" not in st.session_state:
    st.session_state.chat_history = ChatMessageHistory()

# Add the system message if it's not already in the history
if len(st.session_state.chat_history.messages) == 0:
    st.session_state.chat_history.add_message(SystemMessage(content="You are a helpful AI medical assistant.Only answer the asked queriew"))



model = OllamaLLM(model = "monotykamary/medichat-llama3")




prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful AI medical assistant that provides answers related to health."),
    MessagesPlaceholder(variable_name="messages") #Placeholder for chat history
])
output_parser = StrOutputParser()
#streamlit framework
st.title("Langchain Medical Assistant")
input_text = st.text_input("How can I help you?")


if input_text:
  with st.spinner("Generating a response..."):
        st.session_state.chat_history.add_message(HumanMessage(content=input_text))  # Add user message to history
        # Format the prompt with the current messages
        chain = prompt | model | output_parser
        response = chain.invoke({"messages":st.session_state.chat_history.messages[1:] })  # No input needed as the prompt has all the context
        cleaned_response = re.sub(r'function\(\)\s*{[^}]*}', '', response)
        st.session_state.chat_history.add_message(SystemMessage(content=cleaned_response))  # Add AI response to history
        st.write(cleaned_response)
        
  # Display chat history
  

  #st.subheader("Chat History:")
  #for message in st.session_state.chat_history:
   #   if isinstance(message, HumanMessage):
    #      if message.content != response: #check if the message is not the recent response
     #         st.write(f"**You:** {message.content}")
      #    else:
       #       st.write(f"**AI:** {message.content}")
      #elif isinstance(message, SystemMessage):
       #   pass  # Don't display system messages in the chat history
 

