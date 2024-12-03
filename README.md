# Excess Parking Tool
To run follow the running commands from the React Workshop in class (below). The only amendment is that we should add the OpenAI key in a .env file inside server/ with API_KEY={key goes here}.

## Motivation 
This tool seeks to help with wheelchair-accessible navigation instructions. The user enters origin and destination, and then the chatbot goes step-by-step, awaiting immediate feedback from user before providing the next instruction. The tool is capable of going into further details wherever it is needed.

The problem tackled with this tool is that existing resources for navigations provide instructions in an unintuitive way, particularly for people with disabilities.
For instance, see below MBTA's Trip Planner, which although they provide wheelchair accessible detailed instructions, they are generic and not very intuitive. 

![alt text](https://github.com/joerovar/CS5170-GPT-React-Workshop/blob/disabilities/mbta-screenshot.png?raw=true)

Previous efforts have focused on campus navigation (Mabunda 2019, Dimo 2022, Sobhana 2022). These employ very advanced techniques such as ingesting mapping inputs in their models for providing detailed instructions. However, these have not focused on providing wheelchair-accessible instructions, therefore they have biases against people with mobility limitations. Additionally, it is not applied for larger scale mobility, namely city-wide scales for navigation. 

With our tool, we can leverage data sources for navigation directions:
- MBTA trip planner API
- Crowdsourced user feedback for paths that require further details beyond the base information 

We can leverage the above to train our chatbot to provide the paths and present them in an intuitive way.

## Methodology
The system relies on OpenAI's GPT-4o mini. For this preliminary step, the model is provided system prompts with the guidelines for instructions. Since this is a proof of comncept, no real-world paths are provided, this is for future research, which could include mapping and imaging inputs. 

## Biases and potential harms
- Since the tool is text-based it may be difficult for users with visual impediments; we can incorporate a text-to-audio version for both typing out the text and hearing out the response, like a phone call.

## User Interface
![alt text](https://github.com/joerovar/CS5170-GPT-React-Workshop/blob/disabilities/mockup.png?raw=true)

## Demo

![til](https://github.com/joerovar/CS5170-GPT-React-Workshop/blob/disabilities/demo.gif)

## References

Mabunda, K., & Ade-Ibijola, A. (2019, November). Pathbot: An intelligent chatbot for guiding visitors and locating venues. In 2019 6th international conference on soft computing & machine intelligence (ISCMI) (pp. 160-168). IEEE.

Dimo, G., van Vuuren, J. J., & van Vuuren, A. M. J. (2022). Using a Smart Chatbot System as a Communication Tool for Campus Navigation.

Sobhana, M., Yamini, A., Hindu, K., & Narayana, Y. L. (2022). Navbot—College Navigation Chatbot Using Deep Neural Network. In IoT Based Control Networks and Intelligent Systems: Proceedings of 3rd ICICNIS 2022 (pp. 533-545). Singapore: Springer Nature Singapore.


# Generic instructions from CS5170-GPT-React-Workshop

Follow along workshop for CS5170

To install necessary software go the project root folders for both the frontend and server folders, and enter: `npm i`

Enter the server folder, and run `npm install -g nodemon`

Enter your OPENAI api key in the corresponding server file.

First run the server with `nodemon index.js` from the server folder.

Then, from a different terminal window, run the frontend with `npm run dev` from the frontend folder.

NOTE: Your editor may show errors when using `react-hook-form` in a couple of the components, such as: `Module '"react-hook-form"' has no exported member 'useForm'.` This should not prevent the code from running, and can be ignored.


