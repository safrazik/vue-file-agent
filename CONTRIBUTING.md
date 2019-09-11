# CONTRIBUTING

## Project setup
```
npm install
```

### Compiles and documentation for development

```
npm run serve
```

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

### Testing
```
npm run test:unit
npm run test:watch
```