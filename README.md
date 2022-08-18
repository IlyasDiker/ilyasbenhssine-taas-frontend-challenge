<!-- TEXT_SECTION:header:START -->
![image](https://cdn.discordapp.com/attachments/988418669895884830/1009951595955499060/unknown.png)

# Ilyas Benhssine taas frontend challenge
A Vue app to overview github repositories commits history


<!-- TEXT_SECTION:header:END -->


## Monorepo Readme

this is a vue app created using vue-cli and scss and a simple express Nodejs backend.

## Getting Started


### Create Oauth app

[Create OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

Authorisation callbackUrl: `http://localhost:8080` 

![image](https://cdn.discordapp.com/attachments/988418669895884830/1009944776688275606/unknown.png)

```bash
cd front
```

```bash
npm install
```

```bash
cp .env.example .env
```

Fill the created `.env file` with the `VUE_APP_API_URL` api url and the `VUE_APP_CLIENT_ID` with the Github [Oauth](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps) Client id

```bash
cp .env.example .env
```

```bash
npm run server
```
------------------------------
![image](https://cdn.discordapp.com/attachments/988418669895884830/1009944899552034913/unknown.png)

```bash
cd server
```
```bash
npm install
```
```bash
npm start
```
