import VueFilePreview from '@/components/vue-file-preview.vue';
import FileData, {RawFileData, Options} from '@/lib/file-data';
import helper from './helper';

describe('vue-file-preview.vue', () => {

  const rawFileData = {
    name: 'sample.pdf',
    lastModified: 1565232623243,
    // "sizeText":"3 KB",
    size: 3028,
    type: 'application/pdf',
    ext: 'pdf',
  };

  it('renders FileData when passed', () => {
    const fileData = new FileData(rawFileData as RawFileData, {} as Options);
    const wrapper = helper.getWrapper(VueFilePreview, {
      value: fileData,
    }, {});
    expect(helper.getText(wrapper, '.file-name')).toBe('sample');
    expect(helper.getText(wrapper, '.file-ext')).toBe('pdf');
    expect(helper.getText(wrapper, '.file-size')).toBe('3 KB');
  });

  it('renders raw FileData when passed', () => {
    const fileData = rawFileData;
    const wrapper = helper.getWrapper(VueFilePreview, {
      value: fileData,
    }, {});
    expect(helper.getText(wrapper, '.file-name')).toBe('sample');
    expect(helper.getText(wrapper, '.file-ext')).toBe('pdf');
    expect(helper.getText(wrapper, '.file-size')).toBe('3 KB');
  });
});
