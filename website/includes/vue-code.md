
{% capture el_start %}
<div id="{{ include.name }}-mount">
  <{{ include.name }}></{{ include.name }}>
</div>
<script type="text/x-template" id="{{ include.name }}-template">
{% endcapture %}

{% capture cmp_start %}
var component = { template: '#{{ include.name }}-template',
{% endcapture %}

{% capture vue_mount %}
; new Vue({ components: {'{{ include.name }}': component}, el: '#{{ include.name }}-mount'});
</script>
{% endcapture %}

{% capture processed_code %}
{{ include.code | replace: "export default {", cmp_start, | replace: "<script>", "<script type='text/javascript'>" | replace: "</script>", vue_mount | replace: "<template>", el_start | replace: "</template>", "</script>" | replace: "<style>", "<style type='text/css'>" }}
{% endcapture %}


{% if include.result_only %}
  <div id="{{ include.name }}-wrapper">
    {{ processed_code }}
  </div>
{% else %}
  <div id="{{ include.name }}-wrapper">
    <div class="row">
      <div class="col-md-6">
        <blockquote>Code</blockquote>
        {% highlight html %}{{ include.code | strip }}{% endhighlight %}
      </div>
      <div class="col-md-6">
        <blockquote>Result</blockquote>
        {{ processed_code }}
      </div>
    </div>
  </div>
{% endif %}

<style type="text/css">
  #{{ include.name }}-wrapper blockquote {
    background: #BBB;
    color: #FFF;
    margin-bottom: 0;
  }
  #{{ include.name }}-wrapper .highlight pre {
    max-height: 300px;
  }
</style>