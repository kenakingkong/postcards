export default async function downloadItem(src: string, filename: string) {
  try {
    const response = await fetch(src);
    const blobImage = await response.blob();
    const href = URL.createObjectURL(blobImage);
    
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  } catch (error) {
    console.error(error);
  }
}
