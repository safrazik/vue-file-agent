
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
{{ include.code | replace: "export default {", cmp_start, | replace: "<script>", "<script type='text/javascript'>" | replace: "</script>", vue_mount | replace: "<template>", el_start | replace: "</template>", "</script>" }}
{% endcapture %}


{% capture output %}
{% if include.result_only %}
  {{ processed_code }}
{% else %}

> Code


```html
{{ include.code | strip }}
```

> Result

---

{{ processed_code }}

---

{% endif %}
{% endcapture %}

<div id="{{ include.name }}-wrapper">
  {{ output | markdownify }}
</div>