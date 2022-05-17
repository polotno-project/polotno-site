// here should be implementation for your own backend API
// but for demo we will just use local storage

const delay = (ms = 3000) => new Promise((resolve) => setTimeout(resolve, ms));

export async function localFileToURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export async function loadImages() {
  // delay to emulate network request
  await delay();
  return JSON.parse(localStorage.getItem('images') || '[]');
}

export async function saveImage(file) {
  // delay to emulate network request
  await delay();
  const url = await localFileToURL(file);
  const images = JSON.parse(localStorage.getItem('images') || '[]');
  images.push({
    id: Date.now().toString(),
    url,
  });
  localStorage.setItem('images', JSON.stringify(images));
}

export async function deleteImage(id) {
  // delay to emulate network request
  await delay();
  const images = JSON.parse(localStorage.getItem('images') || '[]');
  const newImages = images.filter((image) => image.id !== id);
  localStorage.setItem('images', JSON.stringify(newImages));
}
