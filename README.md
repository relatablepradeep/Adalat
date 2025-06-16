
# Adalat – Legal Literacy

Adalat is a digital platform designed to bridge the gap between the common people and the Indian legal system. It primarily aims to support individuals who lack knowledge about their legal rights, constitutional protections, and the overall judicial process. Whether someone is unfamiliar with the law, struggling to find legal help, or facing language barriers, Adalat offers essential tools and resources in one accessible place.

Key Features:
🏛️ Legal Knowledge Center
Access to the Indian Constitution, including detailed explanations of fundamental rights, duties, and key articles.

Information on Bhartiya Nagarik Suraksha Sanhita (BNSS) and other criminal and civil laws.

Coverage of personal laws (Hindu, Muslim, Christian, etc.) related to marriage, inheritance, divorce, etc.

Easy-to-understand summaries to help users grasp complex legal terms.

👨‍⚖️ Find Lawyers Nearby
Connect with lawyers in your local area.

As lawyers are not permitted to self-promote, Adalat introduces users to lawyers listed on official government portals.

Especially useful for individuals who cannot afford legal counsel or don’t know where to start.

🧕 Support for Women and Vulnerable Groups
Get information about NGOs that provide free or low-cost legal aid, especially those focusing on women’s rights, domestic abuse, and gender-based violence.

Contact details and locations of support centers are available within the app.

✍️ Community Blog System
Users can share their personal experiences with the legal system, such as how Adalat helped them or how their court trial went.

This creates a space for peer learning, support, and awareness.

🌐 Multi-Language Support with Bhashini API
Adalat integrates the Bhashini API, supporting most Indian languages.

This breaks the language barrier and ensures legal resources are accessible to everyone, regardless of their native tongue.

Why Adalat?
In India, millions of people are unaware of their rights or don’t know how to seek justice. Many also struggle with affordability, access, or language. Adalat exists to empower citizens, especially the underprivileged, by making legal information and support accessible, understandable, and localized.




# Acknowledgments


Government of India Legal Portals – For providing publicly accessible data on lawyers and legal rights.

Bhashini API – For enabling multilingual support across Indian languages and helping break language barriers.

NGOs and Legal Aid Organizations – Whose mission to support vulnerable communities inspired key features of this project.



# API Reference

### 🗂️ File: apicall/Translate_text.js

### 🔹 Endpoint

POST https://dhruva-api.bhashini.gov.in/services/inference/pipeline

### 🔹 Headers

### Authorization: Enter your Bhashini API key

### 🔹 Description
This endpoint connects to the Bhashini Inference Pipeline, used for performing multilingual tasks such as text translation, speech-to-text, and other NLP operations. You must pass a properly formatted JSON payload and include your Authorization token in the request headers.


### 🗂️ File: public/index.html

## 🔹 Endpoint

POST https://meity-auth.ulcacontrib.org/ulca/apis/v0/model/getModelsPipeline



### 🔹 Required Parameters
### userID: Your user ID

### ulcaApiKey: Your ULCA API key

### pipelineId: The ID of the pipeline to use

🔹 Description
This endpoint is used to access the ULCA model pipeline, which provides language processing configurations such as translation, transliteration, or ASR (Automatic Speech Recognition). It fetches the appropriate model setup that can be used in the Bhashini API pipeline.
## Appendix

Any additional information goes here


## Authors

- [@relatablepradeep](https://github.com/relatablepradeep)


## Installation

Install my-project with git

```bash
  git clone https://github.com/relatablepradeep/Adalat.git 

  cd Adalat

  npm i
  
  npm run dev 

```

```bash
  
  cd bhasni_Api 
  
  npm i 

  npm start

  ```
    