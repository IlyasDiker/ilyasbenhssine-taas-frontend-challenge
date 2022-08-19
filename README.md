<!-- TEXT_SECTION:header:START -->
![image](https://cdn.discordapp.com/attachments/988418669895884830/1009951595955499060/unknown.png)

<h1 align="center">Ilyas Benhssine taas frontend challenge</h1>
<p align="center">A Vue app to overview github repositories commits history</p>


<!-- TEXT_SECTION:header:END -->


## Getting Started


### Creating Oauth app

The app require [Creating an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) 
- Create a new OAuth appp 
- Set the **"Homepage URL"** to `http://localhost:8080` and the **"Authorization callback URL"** to `http://localhost:8080`
- Copy the "Client secret" and "Client ID" and save it for later.

<br/>

![image](https://cdn.discordapp.com/attachments/988418669895884830/1009944776688275606/unknown.png)

### Frontend

Go to the front-end directory and then install the node packages.
```bash
cd front
```
```bash
npm install
```
Create a new `.env` file 
```bash
cp .env.example .env
```

Fill the created `.env file` with the `VUE_APP_API_URL` api url and the `VUE_APP_CLIENT_ID` with the Github [Oauth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) Client id
Then you can run the server
```bash
# to run the dev server
npm run server 

# to build and run the dist
npm run build && cd ./dist && php -S 0.0.0.0:8080  
```
------------------------------
![image](https://cdn.discordapp.com/attachments/988418669895884830/1009944899552034913/unknown.png)

### Backend

Go to the back-end directory and then install the node packages.
```bash
cd server
```
```bash
npm install
```
Create a new `.env` file 
```bash
cp .env.example .env
```

Fill the created `.env file` with the `GITHUB_OAUTH` with the "Github Client Secret"  & api url and the `CLIENT_ID` with the Github [Oauth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) Client ID

The you can start the server and go to `http://localhost:8080`
```bash
npm start
```
