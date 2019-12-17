---
layout: home
---

{% capture code %}
{% raw %}
<template>
  <div style="width: 180px;">
    <VueFileAgent
      :uploadUrl="uploadUrl"
      :multiple="false"
      :deletable="false"
      :meta="false"
      :compact="true"
      accept="image/*"
      help-text="Select or drag an image here"
      :errorText="{
        type: 'Please select an image',
      }"
      v-model="profilePic"
      @select="onSelect($event)"
    ></VueFileAgent>
  </div>
</template>
<script>
export default {
  data: function(){
    return {
      // ...
      profilePic: null,
      uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
      // ...
    };
  },
  // ...
}
</script>
{% endraw %}
{% endcapture %}


<div style="float: left;padding: 20px 20px 10px 0;background: #FFF;" class="single-file-demo">
{% include_relative website/includes/vue-code.md name="profile_picture" code=code result_only=true %}
  <a href="https://codepen.io/safrazik/pen/BaBpYme" class="mt-1 d-inline-block" style="width: 180px; text-align: center; font-size: 14px;">CodePen Playground</a>
</div>

{% capture README %}{% include_relative README.md %}{% endcapture %}

<div class="readme-content" v-pre>
  {{ README | markdownify }}
</div>
