<!-- TEXT_SECTION:header:START -->
<h1 style="text-align:center">Ilyas Benhssine taas frontend challenge</h1>
<div style="text-align:center;">
    <p style="text-align:center;">A Vue app to overview github repositories commits history</p>
</div>
<!-- TEXT_SECTION:header:END -->


## Monorepo Readme

this is a vue app created using vue-cli and scss and a simple express Nodejs backend.

## Getting Started


### Create Oauth app

[Create OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)

Authorisation callbackUrl: `http://localhost:8080` 

### Front end

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

### Back end

```bash
cd server
```
```bash
npm install
```
```bash
npm start
```
