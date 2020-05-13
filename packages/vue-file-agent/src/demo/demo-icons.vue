<template>
  <!-- {% raw %} -->
  <div class="bg-light">
    <span
      :key="ext"
      v-for="(color, ext) in icons"
      style="width: 42px; height: 42px; display: inline-block;"
      :style="{ color: color }"
    >
      <VueFileIcon :ext="ext" style="width: 100%; height: 100%; fill: currentColor;"></VueFileIcon>
    </span>
  </div>
  <!-- {% endraw %} -->
</template>

<script>
export default {
  data: function() {
    return {
      icons: {
        pdf: 'red',
        doc: 'blue',
        ods: 'green',
        zip: 'orange',
        db: 'brown',
      },
    };
  },
  methods: {},
  mounted: function() {},
};
</script>
