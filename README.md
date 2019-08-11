# Vue File Agent

>  Every file deserves to be treated equally

High performant Vue file upload component with elegant and distinguishable previews for every file type and support for drag and drop, validations, default uploader with progress support and externally customizable in the "vue way"

See it in action

## Features

- Exclusively designed for Vue with performance and simplicity in mind
- Elegant and truly responsive grid based design
- File input with drag and drop
- Smooth Transitions
- Multiple File Uploads
- Max File Size, Accepted file types validation
- Image/Video/Audio Previews
- File type icons
- Default uploader with progress 
- Externally controllable via Vue bindings and methods
- Built in support for server side validation and error handling
<!-- - Example server implementation for [PHP](server-examples/php) and [Node](server-examples/node) available -->


## Basic Usage


<!-- #### Template -->

```html
<template>
  <VueFileAgent
    :uploadUrl="uploadUrl"
    v-model="filesData"
  ></VueFileAgent>
</template>
```

<!-- #### Script -->

<!-- ```javascript -->
```html
<script>
export default {
  data(){
    return {
      filesData: [],
      uploadUrl: 'https://example.com',
    };
  },
  // ...
}
</script>
```

### That's it?

Yes. That's it. It's that simple. See [Advanced Usage](#advanced-usage) section below to tailor it for your specific needs.

## Installation

```
npm install vue-file-agent --save
```

```javascript
import Vue from 'vue';
import VueFileAgent from 'vue-file-agent';
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);
```

or with script tag

```html
 <!-- jsdelivr cdn -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vue-file-agent@latest/dist/vue-file-agent.css">
  <script src="https://cdn.jsdelivr.net/npm/vue-file-agent@latest/dist/vue-file-agent.umd.js"></script>

  <!-- unpkg -->
  <link rel="stylesheet" href="https://unpkg.com/vue-file-agent@latest/dist/vue-file-agent.css">
  <script src="https://unpkg.com/vue-file-agent@latest/dist/vue-file-agent.umd.js"></script>
```

## Advanced Usage


<!-- #### Template -->

```html
<template>
  <VueFileAgent
    :url="uploadUrl"
    v-model="filesData"
  ></VueFileAgent>
</template>
```

<!-- #### Script -->

<!-- ```javascript -->
```html
<script>
export default {
  data(){
    return {
      filesData: [],
      uploadUrl: 'https://example.com',
    };
  },
  // ...
}
</script>
```