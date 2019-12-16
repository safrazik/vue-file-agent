export function getFilesFromDroppedItems(dataTransfer: DataTransfer): Promise<File[] | FileList> {
  return new Promise((resolve) => {
    if (!includesFolder(dataTransfer.files)) {
      return resolve(dataTransfer.files);
    }
    const files: File[] = [];
    const folderReadQueue = [];
    // tslint:disable-next-line
    for (let i = 0; i < dataTransfer.items.length; i++) {
      const item = dataTransfer.items[i];
      if (item.kind !== 'file') {
        continue;
      }
      const fileSystemEntries = getEntries(item);
      if (fileSystemEntries) {
        folderReadQueue.push(fileSystemEntries);
      } else {
        const file = item.getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
    Promise.all(folderReadQueue).then((filesInFolders) => {
      resolve(files.concat(...filesInFolders));
    });
  });
}

function getEntries(entry: any): Promise<File[]> | undefined {
  // convert DataTransferItem to FileSystemEntry first if necessary
  if (entry.getAsEntry) {
    return getEntries(entry.getAsEntry());
  }
  if (entry.webkitGetAsEntry) {
    return getEntries(entry.webkitGetAsEntry());
  }
  // return if item is from a browser that does not support webkitGetAsEntry
  if (entry.getAsFile) {
    return;
  }
  // Processing directories with more than 100 files:
  // https://github.com/lian-yue/vue-upload-component/commit/9c9d8aafbcef005a2cc598454383ec65205d61ee
  return new Promise((resolve) => {
    if (entry.isFile) {
      entry.file((file: File) => resolve([file]));
      return;
    }
    if (entry.isDirectory) {
      const files: File[] = [];
      const entryReader = entry.createReader();
      const readEntries = () => {
        entryReader.readEntries((entries: any[]) => {
          const iterateEntry = (i: number) => {
            if (!entries[i] && i === 0) {
              return resolve(files);
            }
            if (!entries[i]) {
              return readEntries();
            }
            (getEntries(entries[i]) as Promise<File[]>).then((entryFiles: File[]) => {
              files.push(...entryFiles);
              iterateEntry(i + 1);
            });
          };
          iterateEntry(0);
        });
      };
      readEntries();
    }
    if (!entry.isFile && !entry.isDirectory) {
      resolve([]);
    }
  });
}

function includesFolder(files: FileList): boolean {
  if (!files.length) {
    return true; // if dropping only folders, no files will exist
  }
  // tslint:disable-next-line
  for (var i = 0; i < files.length; i++) {
    // A folder has no type and has a size that is a multiple of 4096
    if (!files[i].type && files[i].size % 4096 === 0) {
      return true;
    }
  }
  return false;
}
