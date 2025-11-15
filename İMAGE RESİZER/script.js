const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const optimizeBtn = document.getElementById('optimizeBtn');
const qualityInput = document.getElementById('quality');

let img = new Image();
let fileType = 'image/jpeg';

fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  fileType = file.type; // PNG veya JPEG
  reader.onload = function(event) {
    img.src = event.target.result;
    preview.src = img.src;
    preview.style.display = 'block';
  }
  reader.readAsDataURL(file);
});

optimizeBtn.addEventListener('click', () => {
  if (!img.src) return alert("Önce bir fotoğraf seçin!");
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const quality = Math.min(Math.max(qualityInput.value / 100, 0), 1);
  const optimizedDataUrl = canvas.toDataURL(fileType, quality);

  const link = document.createElement('a');
  link.href = optimizedDataUrl;
  link.download = 'optimized_image.' + (fileType.includes('png') ? 'png' : 'jpg');
  link.click();
});
