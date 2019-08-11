# DEVELOPMENT

## Project setup
```
npm install
```

### Compiles and documentation for development

`Jekyll` is needed for documentation to be generated
```
npm run watch
jekyll serve --config _config.yml,_config_dev.yml
```

### Compiles and minifies for production
```
npm run build
jekyll build
```