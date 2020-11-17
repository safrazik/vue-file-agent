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

### accept

string, default `""`

e.g: `image/*,.pdf`

Equivalent to HTML5 file input [accept attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept). Validated and error message is shown when selecting invalid files.
Value can be a combination of: [Unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)

### averageColor

boolean, default true

Set it to false to disable smart background color (average color) for images and video thumbnails. Note: this prop is not reactive (not respected when changed at runtime)

### capture

string, default `undefined`

e.g: `environment` `user`

Equivalent to HTML5 file input [capture attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-capture).
Value can be either `environment` or `user`

### compact

boolean, default false

Enables the compact mode which is useful for single file upload within a fixed size container. (See Profile Picture example below)

### deletable

boolean, default `false`

Whether the file delete/cancel button should be showed.

### disabled

boolean, default `undefined`

Disables all user interactions on the component

### editable

boolean, default `false`

Whether the file name can be edited. The (modified) name can be retrieved by `fileRecord.name(withoutExtension = true)`. See also [rename](#rename) event.

### errorText

object `{ type: 'Invalid file type', size: 'Files should not exceed <maxSize> in size' }`

The error text messages to be displayed when `accept` or `maxSize` validation fails.

### helpText

string `Choose files or drag & drop here`

The text to be shown at the file input.

### linkable

boolean, default `false`

Whether the file icon is linkable (clickable/downloadable). Only available for preloaded files with urls.

### maxFiles

number, default none

e.g: `12`

Limits the maximum files allowed to be selected. Ignores the extra files.

### maxSize

string, default none

e.g: `2.5MB`

Validates each file and shows error message for invalid files.

### meta

boolean, default `true`

Whether the file meta (file name, size, etc) showed.

### multiple

boolean, default auto

Whether the file input allows multiple files. Default value is determined by the type of `v-model` - if an array is provided, multiple mode is enabled. Note that, when multiple is false, dragging and dropping a file results in replacing the existing file.

### resumable

boolean, default `false`

Enable resumable upload with [tus.io](https://tus.io/) protocol. You need to install [tus-js-client](https://github.com/tus/tus-js-client) for this to work. And you have to pass the `tus` object to `plugins.tus` as in the following example.

with npm:

```javascript
// npm install tus-js-client --save

import tus from 'tus-js-client';
import { plugins } from 'vue-file-agent';

plugins.tus = tus;
```

with script tag:

```html
<script src="https://unpkg.com/tus-js-client@latest/dist/tus.js"></script>
<script src="https://unpkg.com/vue-file-agent@latest/dist/vue-file-agent.umd.js"></script>
<script>
  if (window.tus && window.VueFileAgent) {
    window.VueFileAgent.plugins.tus = tus;
  }
</script>
```

### sortable

boolean or string (`true` - drag to sort, `'hold'` - hold and drag to sort, `'handle'` - drag the handle to sort), default `false`

Whether the files can be drag sorted. You need to install [vue-slicksort](https://github.com/Jexordexan/vue-slicksort) for this to work. And you have to define two components `vfa-sortable-list` and `vfa-sortable-item`.

with npm:

```javascript
// npm install vue-slicksort --save

import { SlickList, SlickItem } from 'vue-slicksort';

Vue.component('vfa-sortable-list', SlickList);
Vue.component('vfa-sortable-item', SlickItem);
```

with script tag:

```html
<script src="https://unpkg.com/vue-slicksort@latest/dist/vue-slicksort.min.js"></script>
<script>
  if (window.VueSlicksort) {
    Vue.component('vfa-sortable-list', window.VueSlicksort.SlickList);
    Vue.component('vfa-sortable-item', window.VueSlicksort.SlickItem);
  }
</script>
```

### theme

string, default none

When provided, a theme class is added to the container `.theme-<theme>`.
Officially supported themes: `default` (grid view), `list` (list view)

### thumbnailSize

number, default `360`

Image and Video file preview thumbnails are resized to this size. Bigger numbers resut in better quality thumbnails, smaller numbers result in faster preview generation.

### uploadConfig

function default none

Configure the [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) instance to be sent to server

e.g

```vue
<template>
  <VueFileAgent
    :uploadConfig="
      (xhr) => {
        xhr.timeout = 25000;
      }
    "
  >
  </VueFileAgent>
</template>
```

### uploadHeaders

object default none

Headers to pass to `uploadUrl`

### uploadUrl

string default none

When this prop is provided, built in uploader is triggerred as soon as files are selected. And when delete button is clicked, built in uploader's delete function is called.

### uploadWithCredentials

boolean default undefined

Set [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)

### value

See `v-model` below

### v-model

Accepts an object for single file upload and an array of serialized FileRecord objects for multiple file upload.

## Props Demo

Demo 1. Preloading Existing Files (<a target="_blank" href="https://codepen.io/safrazik/pen/BaBVNEE">CodePen</a>)

{% capture props_demo %}
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
      v-model="fileRecords"
    ></VueFileAgent>
  </div>
</template>
<script>
  export default {
    // ...
    data: function(){
      return {
        fileRecords: [
          {
            "name":"Some Invalid.exe",
            "size": 8165824,
            "type": "application/vnd.microsoft.portable-executable",
            "ext":"exe",
          },
          {
            "name": "Golf.mp4",
            "lastModified": 1576563996233,
            "sizeText": "549 KB",
            "size": 561813,
            "type": "video/mp4",
            "ext": "mp4",
            "dimensions": {
              "width": 640,
              "height": 360
            },
            "url": "https://safrazik.com/vue-file-agent/website/assets/files/Golf.mp4",
            "videoThumbnail": "https://safrazik.com/vue-file-agent/website/assets/files/Golf-thumb.jpg",
            "imageColor": [66, 62, 45]
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

{% include_relative website/includes/vue-code.md name="props_demo" code=props_demo codepen="https://codepen.io/safrazik/pen/BaBVNEE" title="Props Demo" %}

## Events

### delete

`$event`: FileRecord instance

### input

`$event`: array of serialized FileRecord

Fired whenever files are selected. Passes all selected files data (including previously selected). You shouldn't use this event directly. Instead, use v-model for two way binding, and use `select` event for other purposes

### beforedelete

`$event`: FileRecord instance

Fired when the remove icon (`x`) is pressed. You may have to call `deleteFileRecord` method ([See methods](#methods)) when `beforedelete` event is triggered. In auto upload mode `deleteFileRecord` is called implicitly.

E.g

```vue
<template>
  <VueFileAgent
    ref="fileAgent"
    @beforedelete="onBeforeDelete($event)"
    @delete="onDelete($event)"
  </VueFileAgent>
</template>
<script>
  export default {
    // ...
    metods: {
      // ...
      onBeforeDelete(fileRecord){
        if(confirm('Are you sure?')){
          this.$refs.fileAgent.deleteFileRecord(fileRecord);
        }
      },
      onDelete(fileRecord){
        this.$refs.fileAgent.deleteUpload(/* ... */);
      }
      // ...
    }
    // ...
  }
</script>
```

### rename

`$event`: FileRecord instance

Fired as soon as file is renamed. See also [editable](#editable) prop.

### select

`$event`: array of serialized FileRecord

Fired whenever files are selected. Passes the (newly selected) files data.

### upload, upload:error

`$event`: array of upload ajax response/error for each file

Fired after files are uploaded. If any file fails to be uploaded, representing `response.error` becomes truthy. If all files fail to be uploaded, `upload:error` is trigged instead.

```vue
<template>
  <VueFileAgent
    @upload="onUpload($event)"
    @upload:error="onUploadError($event)"
  </VueFileAgent>
</template>
<script>
  export default {
    // ...
    methods: {
      // ...
      onUpload(responses) {
        for (response of responses) {
          if (response.error) {
            // handle error
            continue;
          }
          // handle success
        }
      },
      onUploadError(failedResponses) {
        // handle error
      }
      // ...
    }
    // ...
  }
</script>
```

### upload:update, upload:update:error

`$event`: upload update response

Fired after file is updated (renamed). If the file fails to be uploaded, `upload:update:error` is triggered instead.

### upload:delete, upload:delete:error

`$event`: upload delete response

Fired after file is deleted. If the file fails to be deleted, `upload:delete:error` is triggered instead.

## Methods

### deleteFileRecord(`fileRecord`: FileRecord | RawFileRecord): void

- Removes the `fileRecord` from the list and triggers `delete` event

### upload(`uploadUrl` : string, `uploadHeaders` : object, `fileRecords` : FileRecord[] | RawFileRecord[], `createFormData` ?: (fileRecord: FileRecord) => FormData, `uploadConfig` ?: (request: XMLHttpRequest) => any): Promise

- `uploadUrl`: the url where a `POST` request will be sent
- `uploadHeaders`: a key value pair of custom headers. e.g: `{'Authorization': 'MyCustomAuthorizationHeader'}`
- `fileRecords`: array of files data to upload
- `createFormData`: [Optional] create a custom FormData instance for upload [See Example](https://github.com/safrazik/vue-file-agent/issues/12)
- `uploadConfig`: [Optional] configure the [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object to be sent to server

Trigger the default upload action.

### deleteUpload(`uploadUrl` : string, `uploadHeaders` : object, `fileRecord` : FileRecord | RawFileRecord, `uploadData` ?: any, `uploadConfig` ?: (request: XMLHttpRequest) => any): Promise

- `uploadUrl`: the url where a `DELETE` request will be sent
- `uploadHeaders`: an key value pair of custom headers. e.g: `{'Authorization': 'MyCustomAuthorizationHeader'}`
- `fileRecord`: file record to be deleted
- `uploadData`: [Optional] the data returned in `upload` operation
- `uploadConfig`: [Optional] configure the [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object to be sent to server

Trigger the default delete upload action.

## Slots

### after-inner

Content is placed (before) inside of the file input.

### after-outer

Content is placed (after) outside of the file input. Files can be dragged here. When files are over dragged over this area `is-drag-over` class is added to the parent.

### before-inner

Content is placed (before) inside of the file input.

### before-outer

Content is placed (before) outside of the file input. Files can be dragged here. When files are over dragged over this area `is-drag-over` class is added to the parent.

### file-preview

Preview block of each FileRecord. `fileRecord` and `index` slot properties are available

### file-preview-before

Content before preview block of each FileRecord. `fileRecord` and `index` slot properties are available

### file-preview-after

Content after preview block of each FileRecord. `fileRecord` and `index` slot properties are available

### file-preview-new

Upload help text ("Choose files...") and icon

### sortable-handle

Can be used to customize sortable handle icon

## Events, Methods and Slots Demo

Demo 2. Profile Picture (<a target="_blank" href="https://codepen.io/safrazik/pen/BaBpYme">CodePen</a>)

{% capture profile_picture_demo %}
{% raw %}
<template>

  <div id="profile-pic-demo" class="bg-light pt-3">
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
      onSelect: function(fileRecords){
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

{% include_relative website/includes/vue-code.md name="profile_picture_demo" code=profile_picture_demo codepen="https://codepen.io/safrazik/pen/BaBpYme" title="Profile Picture Demo" %}

## Extending

If you still can't make it with the built in customizations, (1) you can create a theme and pass it via theme prop, or (2) you can import the provided mixin and define a custom template. e.g:

{% raw %}

```vue
<!-- my-vue-file-agent.vue (component) -->
<template>
  <div class="my-vue-file-agent">
    <ul>
      <li v-for="fileRecord in fileRecords">
        {{ fileRecord.name() }}
      </li>
    </ul>
    <button @click="myCustomMethod()">Custom Button</button>
  </div>
</template>
<script>
import { mixin } from 'vue-file-agent';

export default {
  mixins: [mixin],
  methods: {
    myCustomMethod() {
      // bla bla
    },
  },
};
</script>
```

{% endraw %}

## Gmail Inspired Demo

Demo 3. Gmail Inspired Upload (<a target="_blank" href="https://codepen.io/safrazik/pen/OJLgvya">CodePen</a>)

`NOTE` In an ES6 environment, instead of using `<template v-slot:file-preview="slotProps">` you can use `<template v-slot:file-preview="{ fileRecord, index }">`

{% capture gmail_inspired_demo %}
{% raw %}
<template>

  <div class="vfa-demo bg-light pt-3">
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
      v-model="fileRecords"
    >
      <template v-slot:before-outer>
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
          <button type="button" class="close remove" aria-label="Remove" @click="removeFileRecord(slotProps.fileRecord)">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="progress" :class="{'completed': slotProps.fileRecord.progress() == 100}">
            <div class="progress-bar" role="progressbar" :style="{width: slotProps.fileRecord.progress() + '%'}"></div>
          </div>
          <strong>{{ slotProps.fileRecord.name() }}</strong> <span class="text-muted">({{ slotProps.fileRecord.size() }})</span>
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
        fileRecords: [],
        message: 'I am sending you the attachments',
      }
    },
    methods: {
      removeFileRecord: function(fileRecord){
        return this.$refs.vfaDemoRef.removeFileRecord(fileRecord);
      },
      send: function(){
        if(this.message.indexOf('attachment') !== -1 && this.fileRecords.length < 1){
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

.vfa-demo .file-preview-wrapper::before {
background: transparent;
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

.vfa-demo .upload-block {
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

{% include_relative website/includes/vue-code.md name="gmail_inspired_demo" code=gmail_inspired_demo codepen="https://codepen.io/safrazik/pen/OJLgvya" title="Gmail Inspired Demo" %}
