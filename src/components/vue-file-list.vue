<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">

export default {
  props: ['value', 'axis', 'appendTo'],
};

</script>