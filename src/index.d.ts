import Vue, { PluginFunction } from "vue";

export default class VueFileAgentPlugin {
  static install: PluginFunction<never>;
  static VueFileIcon: Vue;
  static VueFilePreview: Vue;
  static VueFileAgent: Vue;
  static component: Vue;
  static mixin: Vue;
}

export const mixin: Vue;
