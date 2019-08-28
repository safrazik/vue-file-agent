<template>
	<svg :viewBox="viewBoxComputed">
		<template v-for="d in icon.paths">
	  		<path :d="d" v-if="d" />
		</template>
	</svg>
</template>
<style>
</style>
<script>

import {getIconFromExt} from '../lib/icons';

export default {
	props: ['ext', 'viewBox'],
	computed: {
		viewBoxComputed(){
			if(!this.viewBox && this.icon && this.icon.viewBox){
				return this.icon.viewBox;
			}
			return this.viewBox ? this.viewBox : '0 0 100 100';
		},
		icon(){
			var svgIcon = getIconFromExt(this.ext);
			return svgIcon;
		}
	},
};

</script>