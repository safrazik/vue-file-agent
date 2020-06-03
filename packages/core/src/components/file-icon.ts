import { Component } from './component';
import { getIconFromExt, getIconByName, SvgIcon } from '../lib/icons';

interface Props {
  ext?: string;
  name?: string;
  viewBox?: string;
}

export class FileIcon extends Component {
  constructor(public $props: Props) {
    super();
  }

  get icon() {
    if (this.$props.name) {
      return getIconByName(this.$props.name);
    }
    const svgIcon = getIconFromExt(this.$props.ext as string);
    return svgIcon;
  }

  get viewBox() {
    if (!this.$props.viewBox && this.icon && this.icon.viewBox) {
      return this.icon.viewBox;
    }
    return this.$props.viewBox ? this.$props.viewBox : '0 0 100 100';
  }

  getEl() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', this.viewBox);
    for (const d of this.icon.paths) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      svg.appendChild(path);
    }
    return svg;
  }
}

/* <template>
  <svg :viewBox="viewBoxComputed">
    <template v-for="(d, index) in icon.paths">
      <path :d="d" v-if="d" :key="index" />
    </template>
  </svg>
</template>
<style></style>
<script lang="ts">
import { getIconFromExt, getIconByName, SvgIcon } from '../lib/icons';
import Vue from 'vue';

export default Vue.extend({
  props: ['ext', 'name', 'viewBox'],
  computed: {
    viewBoxComputed(): string {
      if (!this.viewBox && this.icon && this.icon.viewBox) {
        return this.icon.viewBox;
      }
      return this.viewBox ? this.viewBox : '0 0 100 100';
    },
    icon(): SvgIcon {
      if (this.name) {
        return getIconByName(this.name);
      }
      const svgIcon = getIconFromExt(this.ext);
      return svgIcon;
    },
  },
});
</script>
 */
