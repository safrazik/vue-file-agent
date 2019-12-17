window.getFilesDataInitial = function() {
  var filesBaseUrl =
    window.location.port == '4000'
      ? '/vue-file-agent/website/assets/files/'
      : 'https://safrazik.github.io/vue-file-agent/website/assets/files/';

  var videoData = {
    name: 'Golf.mp4',
    lastModified: 1576563996233,
    sizeText: '549 KB',
    size: 561813,
    type: 'video/mp4',
    ext: 'mp4',
    dimensions: { width: 640, height: 360 },
  };
  videoData.videoThumbnail = filesBaseUrl + 'Golf-thumb.jpg';
  videoData.imageColor = [66, 62, 45];

  var filesData = [];
  [
    {
      name: 'sample.pdf',
      lastModified: 1565232623243,
      sizeText: '3 KB',
      size: 3028,
      type: 'application/pdf',
      ext: 'pdf',
    },
    {
      name: 'Superb Fairy-wren.jpg',
      lastModified: 1576522061394,
      sizeText: '37 KB',
      size: 38093,
      type: 'image/jpeg',
      ext: 'jpg',
    },
    { name: 'Important sheet.ods', lastModified: 1564392646095, sizeText: '31 KB', size: 31276, type: '', ext: 'ods' },
    videoData,
    {
      name: 'Test Files.zip',
      lastModified: 1572147928098,
      sizeText: '198 KB',
      size: 202680,
      type: 'application/x-zip-compressed',
      ext: 'zip',
    },
    { name: 'Document 3.docx', lastModified: 1564392646097, sizeText: '109 KB', size: 111303, type: '', ext: 'docx' },
  ].forEach(function(fd) {
    fd.url = filesBaseUrl + fd.name;
    // fd.progress = 10;
    filesData.push(fd);
  });

  return filesData;
};

window.uploadUrl = localStorage.getItem('uploadUrl') || 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3';

if (window.VueSlicksort && window.Vue) {
  window.Vue.component('vfa-sortable-list', window.VueSlicksort.SlickList);
  window.Vue.component('vfa-sortable-item', window.VueSlicksort.SlickItem);
}
if (window.VueFileAgent && window.tus) {
  window.VueFileAgent.plugins.tus = window.tus;
}
