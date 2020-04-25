import utils from '../lib/utils';
import VueFileIcon from './vue-file-icon.vue';
import FileRecord, { RawFileRecord, Options } from '../lib/file-record';
import Vue from 'vue';

export default Vue.extend({
  props: ['value', 'deletable', 'editable', 'linkable', 'errorText', 'disabled', 'thumbnailSize', 'averageColor'],
  components: {
    VueFileIcon,
  },
  data() {
    return {
      isEditInputFocused: false,
      isEditCancelable: true,
      fileRecord: {} as FileRecord,
    };
  },
  computed: {
    hasLinkableUrl(): boolean {
      if (!this.linkable) {
        return false;
      }
      return !!this.fileRecord.url() && !this.fileRecord.isPlayableVideo() && !this.fileRecord.isPlayableAudio();
    },
  },
  methods: {
    updateFileRecord() {
      if (this.value instanceof FileRecord) {
        this.fileRecord = this.value;
        return;
      }
      FileRecord.fromRaw(this.value, {
        thumbnailSize: this.thumbnailSize,
        averageColor: this.averageColor,
      } as Options).then((fileRecord) => {
        this.fileRecord = fileRecord;
      });
      this.fileRecord = FileRecord.fromRawSync(this.value, {
        thumbnailSize: this.thumbnailSize,
        averageColor: this.averageColor,
      } as Options);
    },
    createThumbnail(fileRecord: FileRecord, video: HTMLVideoElement) {
      if (fileRecord.videoThumbnail) {
        video.poster = fileRecord.src();
        return;
      }
      const canvas = document.createElement('canvas');
      utils
        .createVideoThumbnail(video, canvas, this.fileRecord.thumbnailSize, this.averageColor !== false)
        .then((thumbnail) => {
          fileRecord.imageColor = thumbnail.color;
          fileRecord.videoThumbnail = thumbnail.url;
          fileRecord.dimensions.width = thumbnail.width;
          fileRecord.dimensions.height = thumbnail.height;
          video.poster = fileRecord.src();
        });
    },

    playAv(fileRecord: FileRecord) {
      if (fileRecord.stopAv) {
        fileRecord.stopAv();
        return;
      }
      const createObjectURL = (window.URL || window.webkitURL || {}).createObjectURL;
      const revokeObjectURL = (window.URL || window.webkitURL || {}).revokeObjectURL;

      const wrapper = this.$refs.wrapper as HTMLElement;
      const player = document.createElement(fileRecord.isAudio() ? 'audio' : 'video');
      if (player instanceof HTMLVideoElement && fileRecord.isPlayableVideo()) {
        this.createThumbnail(fileRecord, player);
      }
      player.controls = true;
      // player.style.width = this.prvWidth + 'px';
      wrapper.appendChild(player);
      const url = (fileRecord.url() as string) || createObjectURL(fileRecord.file);
      player.src = url;
      player.play();
      fileRecord.isPlayingAv = true;
      fileRecord.stopAv = () => {
        // player.src = null;
        player.src = '';
        wrapper.removeChild(player);
        revokeObjectURL(url);
        fileRecord.isPlayingAv = false;
        fileRecord.stopAv = null;
      };
    },

    removeFileRecord(fileRecord: FileRecord) {
      if (this.clearFilename()) {
        return;
      }
      if (this.disabled === true) {
        return;
      }
      this.$emit('remove', fileRecord);
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
      this.fileRecord.oldFileName = this.fileRecord.name();
      const oldValue = this.fileRecord.name(true);
      const value = (this.$refs.input as HTMLInputElement).value;
      this.fileRecord.customName = value;
      const newValue = this.fileRecord.name(true);
      if (newValue !== oldValue) {
        this.fileRecord.oldCustomName = oldValue;
        this.$emit('rename', this.fileRecord);
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
      if (this.fileRecord.error && (this.fileRecord.error.size || this.fileRecord.error.type)) {
        return;
      }
      this.fileRecord.error = false;
    },
  },
  created() {
    this.updateFileRecord();
  },
  watch: {
    value() {
      this.updateFileRecord();
    },
  },
});
