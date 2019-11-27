<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>

export default {
  props: ['value', 'axis', 'appendTo'],
};

</script>