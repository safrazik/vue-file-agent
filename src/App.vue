<template>
<div class="container">
  <h2>Demo Basic</h2>
  <div>
    <demo-basic></demo-basic>
  </div>
  <hr>
  <h2>Demo Advanced</h2>
  <div>
    <demo-advanced></demo-advanced>
  </div>
</div>
</template>
<style>
  @import "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css";
</style>
<script>

  import DemoBasic from './demo/demo-basic.vue';
  import DemoAdvanced from './demo/demo-advanced.vue';

  export default {
    components: {
      DemoBasic,
      DemoAdvanced
    }
  }

</script>