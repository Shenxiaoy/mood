
//将base64转换为blob
export function dataURLtoFile(dataURI, type) {
  let binary = atob(dataURI.split(',')[1]);
  let array = [];
  for(let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: type});
}