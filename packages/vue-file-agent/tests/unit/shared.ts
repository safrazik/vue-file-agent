// typical File instance
/*
name: "icon.png"
lastModified: 1582642697362
lastModifiedDate: Tue Feb 25 2020 20:28:17 GMT+0530 (India Standard Time) {}
webkitRelativePath: ""
size: 33113
type: "image/png"
 */

// mock file

export const createFile = (name: string, size: number, mimeType: string) => {
  name = name || 'mock.txt';
  size = size || 1024;
  mimeType = mimeType || 'plain/txt';

  const range = (count: number) => {
    let output = '';
    for (let i = 0; i < count; i++) {
      output += 'a';
    }
    return output;
  };

  const blob = new Blob([range(size)], { type: mimeType });
  (blob as any).lastModifiedDate = new Date();
  (blob as any).name = name;

  return blob as File;
};
