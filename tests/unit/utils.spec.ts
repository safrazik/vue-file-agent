import utils from '@/lib/utils';
import { createFile } from './shared';

describe('utills', () => {
  it('arrayMove', () => {
    const inp = ['a', 'b', 'c', 'd', 'e', 'f'];
    const out = ['a', 'c', 'd', 'e', 'b', 'f'];
    const moved = utils.arrayMove(inp, inp.indexOf('b'), inp.indexOf('e'));
    // expect(moved).toBe(['a', 'c', 'd', 'b', 'e', 'd', 'f']);
    for (let i = 0; i < moved.length; i++) {
      expect(moved[i]).toBe(out[i]);
    }
    //
  });
  //   it('createVideoThumbnail', () => {
  //     //
  //   });
  //   it('getFilesFromDroppedItems', () => {
  //     //
  //   });
  //   it('getDataURL', () => {
  //     //
  //   });
  //   it('getSizeFormatted', () => {
  //     //
  //   });
  //   it('getColorForText', () => {
  //     //
  //   });
  it('validateType', () => {
    const file = createFile('Hello.html', 16500, 'text/html');
    expect(utils.validateType(file, '.html')).toBe(true);
    expect(utils.validateType(file, '.jpg')).toBe(false);
    expect(utils.validateType(file, '.jpg,.html')).toBe(true);
    expect(utils.validateType(file, '.jpg,.txt')).toBe(false);
    expect(utils.validateType(file, 'image/jpeg')).toBe(false);
    expect(utils.validateType(file, 'text/html')).toBe(true);
  });
  it('validateSize', () => {
    const size = '146 KB';
    const bytes = utils.getSizeParsed(size);
    expect(utils.getSizeFormatted(bytes)).toBe(size);

    const file = createFile('Hello.html', bytes, 'text/html');
    expect(utils.validateSize(file, '145KB')).toBe(false);
    expect(utils.validateSize(file, '146KB')).toBe(true);
    expect(utils.validateSize(file, '147KB')).toBe(true);
    expect(utils.validateSize(file, '5KB')).toBe(false);
    expect(utils.validateSize(file, '2MB')).toBe(true);
    expect(utils.validateSize(file, '10B')).toBe(false);
  });
  //   it('resizeImage', () => {
  //     //
  //   });
});
