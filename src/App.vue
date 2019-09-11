<template>
<div>
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

<script>

  import './scss/vue-file-agent.scss';
  import DemoBasic from './demo/demo-basic.vue';
  import DemoAdvanced from './demo/demo-advanced.vue';

  export default {
    components: {
      DemoBasic,
      DemoAdvanced
    }
  }

</script>