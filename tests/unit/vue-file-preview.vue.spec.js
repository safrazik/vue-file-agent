import VueFilePreview from '@/components/vue-file-preview.vue'
import FileData from '@/lib/file-data'
import helper from './helper'

describe('vue-file-preview.vue', () => {
  it('renders FileData when passed', () => {
    var fileData = new FileData({
      "name":"sample.pdf",
      "lastModified":1565232623243,
      // "sizeText":"3 KB",
      "size":3028,
      "type":"application/pdf",
      "ext":"pdf"
    });
    var wrapper = helper.getWrapper(VueFilePreview, {
      fileData: fileData,
    }, {})
    expect(helper.getText(wrapper, '.file-name')).toBe('sample')
    expect(helper.getText(wrapper, '.file-ext')).toBe('pdf')
    expect(helper.getText(wrapper, '.file-size')).toBe('3 KB')
  })
})
