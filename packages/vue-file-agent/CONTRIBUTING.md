# CONTRIBUTING

Replace `npm xxx` commands with `yarn` commands if you are using it instead.

## Project setup

Install dependencies

```
npm install
```

VS Code Extensions

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [TSLint Vue](https://marketplace.visualstudio.com/items?itemName=prograhammer.tslint-vue)

## Development

Development server with demo powered by vue cli

```
npm run serve
```

Open [http://localhost:8080](http://localhost:8080) for demo

#### (Optional) Upload Server

Fire up the built in example node upload server

```
npm run upload-server
```

Open [http://localhost:3000](http://localhost:3000) for upload server

## Testing and Linting

```
npm run test:unit
npm run lint
```

To develop tests and watch

```
npm run test:watch
```

## Production Build

Compiles and minifies for production

```
npm run build
```

## Documentation

> [Jekyll](https://jekyllrb.com/) is required for building documentation

Build and watch the library under `dist_dev` for documentation consumption

```
npm run build:dev
```

Serve the documentation consuming built files from `dist_dev`

```
npm run docs:serve:dev
or
jekyll serve --config _config.yml,_config_dev.yml --host 0.0.0.0
```

Serve the documentation consuming built files from `dist`

```
npm run docs:serve
or
jekyll serve --host 0.0.0.0
```
