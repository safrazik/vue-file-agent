import utils from '../lib/utils';
import VueFileIcon from './vue-file-icon.vue';
import FileData, { RawFileData, Options } from '../lib/file-data';
import Vue from 'vue';

export default Vue.extend({
  props: ['value', 'deletable', 'editable', 'linkable', 'errorText', 'disabled', 'thumbnailSize'],
  components: {
    VueFileIcon,
  },
  data() {
    return {
      isEditInputFocused: false,
      isEditCancelable: true,
      fileData: {} as FileData,
    };
  },
  computed: {
    hasLinkableUrl(): boolean {
      if (!this.linkable) {
        return false;
      }
      return !!this.fileData.url && !this.fileData.isPlayableVideo() && !this.fileData.isPlayableAudio();
    },
  },
  methods: {
    updateFileData() {
      if (this.value instanceof FileData) {
        this.fileData = this.value;
        return;
      }
      FileData.fromRaw(this.value, {
        thumbnailSize: this.thumbnailSize,
      } as Options).then((fileData) => {
        this.fileData = fileData;
      });
      this.fileData = FileData.fromRawSync(this.value, {
        thumbnailSize: this.thumbnailSize,
      } as Options);
    },
    createThumbnail(fileData: FileData, video: HTMLVideoElement) {
      if (fileData.videoThumbnail) {
        video.poster = fileData.src();
        return;
      }
      const canvas = document.createElement('canvas');
      utils.createVideoThumbnail(video, canvas, this.fileData.thumbnailSize).then((thumbnail) => {
        fileData.imageColor = thumbnail.color;
        fileData.videoThumbnail = thumbnail.url;
        fileData.dimensions.width = thumbnail.width;
        fileData.dimensions.height = thumbnail.height;
        video.poster = fileData.src();
      });
    },

    playAv(fileData: FileData) {
      if (fileData.stopAv) {
        fileData.stopAv();
        return;
      }
      const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
      const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;

      const wrapper = this.$refs.wrapper as HTMLElement;
      const player = document.createElement(fileData.isAudio() ? 'audio' : 'video');
      if (player instanceof HTMLVideoElement && fileData.isPlayableVideo()) {
        this.createThumbnail(fileData, player);
      }
      player.controls = true;
      // player.style.width = this.prvWidth + 'px';
      wrapper.appendChild(player);
      const url = fileData.url || createObjectURL(fileData.file);
      player.src = url;
      player.play();
      fileData.isPlayingAv = true;
      fileData.stopAv = () => {
        // player.src = null;
        player.src = '';
        wrapper.removeChild(player);
        revokeObjectURL(url);
        fileData.isPlayingAv = false;
        fileData.stopAv = null;
      };
    },

    removeFileData(fileData: FileData) {
      if (this.clearFilename()) {
        return;
      }
      if (this.disabled === true) {
        return;
      }
      this.$emit('remove', fileData);
    },

    editFileName() {
      if (this.editable !== true) {
        return;
      }
      if (!this.$refs.input) {
        return;
      }
      (this.$refs.input as HTMLInputElement).focus();
    },

    editInputFocused() {
      this.isEditInputFocused = true;
      this.isEditCancelable = true;
    },

    editInputBlured() {
      this.fileData.oldFileName = this.fileData.name();
      const oldValue = this.fileData.name(true);
      const value = (this.$refs.input as HTMLInputElement).value;
      this.fileData.customName = value;
      const newValue = this.fileData.name(true);
      if (newValue !== oldValue) {
        this.fileData.oldCustomName = oldValue;
        this.$emit('rename', this.fileData);
      }
      const timeout = 100;
      setTimeout(() => {
        this.$nextTick(() => {
          if (!this.isEditCancelable) {
            return;
          }
          this.isEditInputFocused = false;
        });
      }, timeout);
    },

    filenameChanged(completed?: boolean) {
      if (completed) {
        (this.$refs.input as HTMLInputElement).blur(); // @see editInputBlured method
      }
      if (completed === false) {
        this.clearFilename();
      }
    },

    filenameClearPressed() {
      if (!(this.editable === true && this.isEditInputFocused)) {
        return;
      }
      this.isEditCancelable = false;
    },

    clearFilename() {
      if (!(this.editable === true && this.isEditInputFocused)) {
        return false;
      }
      (this.$refs.input as HTMLInputElement).value = '';
      this.isEditCancelable = true;
      this.editInputBlured();
      return true;
    },

    dismissError() {
      this.fileData.error = false;
    },
  },
  created() {
    this.updateFileData();
  },
  watch: {
    value() {
      this.updateFileData();
    },
  },
});
