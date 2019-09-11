---
layout: page
permalink: /docs/
---

# Docs & Examples


- [Props](#props)
    - [Props Demo](#props-demo)
- [Events](#events)
- [Methods](#methods)
- [Slots](#slots)
    - [Events, Methods and Slots Demo](#events-methods-and-slots-demo)
- [Extending](#extending)
    - [Gmail Inspired Demo](#gmail-inspired-demo)


## Props

### multiple

boolean, default auto

Whether the file input allows multiple files. Default value is determined by the type of `v-model` - if an array is provided, multiple mode is enabled. Note that, when multiple is false, dragging and dropping a file results in replacing the existing file.

### deletable

boolean, default  `false`

Whether the file delete/cancel button should be showed.

### disabled

boolean, default  `undefined`

Disables all user interactions on the component

### meta

boolean, default  `true`

Whether the file meta (file name, size, etc) showed.

### accept

string, default `""`

e.g: `image/*,.pdf`

Equivalent to HTML5 file input [accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept). Validated and error message is shown when selecting invalid files.
Value can be a combination of: [Unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)


### maxSize

string, default none

e.g: `2.5MB`

Validates each file and shows error message for invalid files.


### maxFiles

number, default none

e.g: `12`

Limits the maximum files allowed to be selected. Ignores the extra files.


### helpText

string `Choose files or drag & drop here`

The text to be shown at the file input.


### errorText

object `{
  type: 'Invalid file type',
  size: 'Files should not exceed <maxSize> in size'
}`

The error text messages to be displayed when `accept` or `maxSize` validation fails.

### uploadUrl

string default none

When this prop is provided, built in uploader is triggerred as soon as files are selected. And when delete button is clicked, built in uploader's delete function is called. 

### uploadHeaders

object default none

Headers to pass to `uploadUrl`

### thumbnailSize

number, default `360`

Image and Video file preview thumbnails are resized to this size. Bigger numbers resut in better quality thumbnails, smaller numbers result in faster preview generation.

### compact

boolean, default false

Enables the compact mode which is useful for single file upload within a fixed size container. (See Profile Picture example below)

### theme

string, default none

When provided, a theme class is added to the container `.theme-<theme>`.
Officially supported themes: `default` (grid view), `list` (list view)

### value

See `v-model` below

### v-model

Accepts an object for single file upload and an array of serialized FileData objects for multiple file upload.


## Props Demo

{% capture code %}
{% raw %}
<template>
  <div>
    <VueFileAgent
      :uploadUrl="'https://www.mocky.io/v2/5d4fb20b3000005c111099e3'"
      :uploadHeaders="{}"
      :multiple="true"
      :deletable="true"
      :meta="true"
      :accept="'image/*,video/*,.pdf,.zip'"
      :maxSize="'14MB'"
      :maxFiles="8"
      :helpText="'Select files'"
      :errorText="{
        type: 'Please select images, videos, pdf or zip files',
        size: 'You selected a larger file!',
      }"
      :thumbnailSize="120"
      :theme="'list'"
      v-model="filesData"
    ></VueFileAgent>
  </div>
</template>
<script>
  export default {
    // ...
    data: function(){
      return {
        filesData: [
          {
            "name":"Some Invalid.exe",
            "size": 8165824,
            "type": "application/vnd.microsoft.portable-executable",
            "ext":"exe",
          },
          {
            "name":"DSC_0261.jpg",
            "lastModified":1564648335292,
            "sizeText":"64 KB",
            "size":65762,
            "type":"image/jpeg",
            "ext":"jpg",
            "url": "https://safrazik.github.io/vue-file-agent/website/assets/files/DSC_0261.jpg"
          },
          {
            "name":"Some Large File.zip",
            "size": 25165824, // 24 MB
            "type": "application/zip",
            "ext":"zip",
          },
        ]
      };
    },
    // ...
  }
</script>
{% endraw %}
{% endcapture %}

{% include_relative website/includes/vue-code.md name="props_demo" code=code %}

## Events


### input

`$event`: array of serialized FileData

Fired whenever files are selected. Passes all selected files data (including previously selected). You shouldn't use this event directly. Instead, use v-model for two way binding, and use `select` event for other purposes


### select

`$event`: array of serialized FileData

Fired whenever files are selected. Passes the (newly selected) files data.


## Methods

### upload(`uploadUrl`, `uploadHeaders`, `filesData`): Promise

- `uploadUrl`: the url where a `POST` request will be sent
- `uploadHeaders`: a key value pair of custom headers. e.g: `{'Authorization': 'MyCustomAuthorizationHeader'}`
- `filesData`: array of files data to upload


Trigger the default upload action.


### deleteUpload(`uploadUrl`, `uploadHeaders`, `fileData`): Promise

- `uploadUrl`: the url where a `DELETE` request will be sent
- `uploadHeaders`: an key value pair of custom headers. e.g: `{'Authorization': 'MyCustomAuthorizationHeader'}`
- `fileData`: file data to be deleted

Trigger the default delete upload action.


## Slots

### file-preview

Preview block of each FileData 

### file-preview-new

Upload help text ("Choose files...") and icon

### before-outer

Content is placed (before) outside of the file input. Files can be dragged here. When files are over dragged over this area `is-drag-over` class is added to the parent.

### before-inner

Content is placed (before) inside of the file input.

### after-inner

Content is placed (before) inside of the file input.

### after-outer

Content is placed (after) outside of the file input. Files can be dragged here. When files are over dragged over this area `is-drag-over` class is added to the parent.

## Events, Methods and Slots Demo

{% capture code2 %}
{% raw %}
<template>
  <div id="profile-pic-demo" class="bg-light">
    <VueFileAgent
      class="profile-pic-upload-block"
      ref="profilePicRef"
      :multiple="false"
      :deletable="false"
      :meta="false"
      :compact="true"
      :accept="'image/*'"
      :helpText="'Drag an image file here'"
      :errorText="{
        type: 'Please select an image',
      }"
      v-model="profilePic"
      @select="onSelect($event)"
    >
      <template v-slot:before-outer>
        <h2 title="before-outer">Profile Picture Demo</h2>
      </template >
      <template v-slot:after-inner>
        <span title="after-inner" class="btn btn-link btn-sm btn-block">Select image file</span>
      </template >
      <template v-slot:after-outer>
        <div title="after-outer">
          <p>Please select an image and click the upload button</p>
          <div class="drop-help-text">
            <p class="text-success">Drop the file!</p>
          </div>
          <button type="button" class="btn btn-primary" :class="{'disabled': uploaded || !profilePic}" @click="upload()">Upload</button>
          <button type="button" class="btn" :class="[uploaded ? 'btn-danger' : 'btn-secondary']" v-if="profilePic" @click="removePic()">Remove</button>
          <div class="clearfix"></div>
        </div>
      </template >
    </VueFileAgent>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        name: 'Gapal',
        profilePic: null,
        uploaded: false,
        uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
        uploadHeaders: {},
      }
    },
    methods: {
      removePic: function(){
       var profilePic = this.profilePic;
        this.$refs.profilePicRef.deleteUpload(this.uploadUrl, this.uploadHeaders, [profilePic]);
        this.profilePic = null;
        this.uploaded = false;
      },
      upload: function(){
        var self = this;
        this.$refs.profilePicRef.upload(this.uploadUrl, this.uploadHeaders, [this.profilePic]).then(function(){
          self.uploaded = true;
          setTimeout(function(){
            self.profilePic.progress(0);          
          }, 500);
        });
      },
      onSelect: function(filesData){
        this.uploaded = false;
      }
    }
  }
</script>
<style>
  #profile-pic-demo .drop-help-text {
    display: none;
  }
  #profile-pic-demo .is-drag-over .drop-help-text {
    display: block;
  }
  #profile-pic-demo .profile-pic-upload-block {
    border: 2px dashed transparent;
    padding: 20px;
    padding-top: 0;
  }

  #profile-pic-demo .is-drag-over.profile-pic-upload-block {
    border-color: #AAA;
  }
  #profile-pic-demo .vue-file-agent {
    width: 180px;
    float: left;
    margin: 0 15px 5px 0;
    border: 0;
    box-shadow: none;
  }
</style>
{% endraw %}
{% endcapture %}

{% include_relative website/includes/vue-code.md name="profile_picture2" code=code2 %}


## Extending

If you still can't make it with the built in customizations, (1) you can create a theme and pass it via theme prop, or (2) you can import the provided mixin and define a custom template. e.g:

{% raw %}
```html
<!-- my-vue-file-agent.vue (component) -->
<template>
  <div class="my-vue-file-agent">
    <ul>
      <li v-for="fileData in filesData">
        {{ fileData.name() }}
      </li>
    </ul>
    <button @click="myCustomMethod()">Custom Button</button>
  </div>
</template>
<script>
  import {mixin} from 'vue-file-agent';

  export default {
    mixins: [mixin],
    methods: {
      myCustomMethod(){
        // bla bla
      }
    }
  }
</script>
```
{% endraw %}


## Gmail Inspired Demo

`NOTE` In an ES6 environment, instead of using `<template v-slot:file-preview="slotProps">` you can use `<template v-slot:file-preview="{ fileData, index }">`


{% capture gmail_inspired_demo %}
{% raw %}
<template>
  <div class="vfa-demo bg-light">
    <VueFileAgent
      class="upload-block"
      ref="vfaDemoRef"
      :uploadUrl="'https://www.mocky.io/v2/5d4fb20b3000005c111099e3'"
      :uploadHeaders="{}"
      :multiple="true"
      :deletable="true"
      :theme="'list'"
      :maxSize="'25MB'"
      :errorText="{
        size: 'This file is too large to be attached',
      }"
      v-model="filesData"
    >
      <template v-slot:before-outer>
        <h3 class="my-3">Send Email</h3>
        <p>Email Attachment example with drag & drop support and <span class="badge">attachment</span> keyword basic detection.</p>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Your Name" value="John Doe">
        </div>
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email address" value="johndoe@example.com">
        </div>
        <div class="form-group">
          <textarea v-model="message" class="form-control" placeholder="Your Message"></textarea>
        </div>
      </template >
      <template v-slot:file-preview="slotProps">
        <div :key="slotProps.index" class="grid-box-item file-row">
          <button type="button" class="close remove" aria-label="Remove" @click="removeFileData(slotProps.fileData)">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="progress" :class="{'completed': slotProps.fileData.progress() == 100}">
            <div class="progress-bar" role="progressbar" :style="{width: slotProps.fileData.progress() + '%'}"></div>
          </div>
          <strong>{{ slotProps.fileData.name() }}</strong> <span class="text-muted">({{ slotProps.fileData.size() }})</span>
        </div>
      </template >
      <template v-slot:file-preview-new>
        <div class="text-left my-3" key="new">
          <a href="#" class="">Select files</a> or drag & drop here
        </div>
      </template >
<!--       <template v-slot:after-inner>
        <div class="text-left pt-1">
          <a href="#" class="">Select files</a> or drag & drop here
        </div>
      </template > -->
      <template v-slot:after-outer>
        <div title="after-outer">
          <div class="drop-help-text">
            <p>Drop here</p>
          </div>
          <button type="button" class="btn btn-primary" @click="send()">Send</button>
        </div>
      </template >
    </VueFileAgent>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        filesData: [],
        message: 'I am sending you the attachments',
      }
    },
    methods: {
      removeFileData: function(fileData){
        return this.$refs.vfaDemoRef.removeFileData(fileData);
      },
      send: function(){
        if(this.message.indexOf('attachment') !== -1 && this.filesData.length < 1){
          if(!confirm('You have mentioned about attachments in your message. Are you sure to send without attachments?')){
            return;
          }
        }
        alert('Message sent!');
      }
    }
  }
</script>
<style>
  .vfa-demo {
    position: relative;
  }

  .vfa-demo .file-row {
    position: relative;
    z-index: 15;
    line-height: 24px;
    text-align: left;
    background: #EEE;
    margin-bottom: 5px;
    padding: 2px 5px;
  }

  .vfa-demo .remove {
    float: right;
    margin-top: -3px;
  }

  .vfa-demo .progress {
    float: right;
    width: 85px;
    height: 10px;
    margin-top: 7px;
    margin-right: 10px;
    background: #FFF;
    border: 1px solid #AAA;
  }

  .vfa-demo .progress.completed {
    display: none;
  }

  .vfa-demo .drop-help-text {
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    margin: 2px;
    background: rgba(255, 255, 255, 0.75);
    z-index: 1200;
    font-size: 32px;
    font-weight: bold;
    color: #888;
    align-items: center;
    justify-content: center;
    display: none;
  }

  .vfa-demo .is-drag-over .drop-help-text {
    display: flex;
  }

  .vfa-demo .upload-block  {
    border: 2px dashed transparent;
    padding: 20px;
    padding-top: 0;
  }

  .vfa-demo .is-drag-over.upload-block {
    border-color: #AAA;
  }

  .vfa-demo .vue-file-agent {
    border: 0 !important;
    box-shadow: none !important;
  }

</style>
{% endraw %}
{% endcapture %}

{% include_relative website/includes/vue-code.md name="gmail_inspired_demo" code=gmail_inspired_demo %}