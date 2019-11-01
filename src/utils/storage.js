export function setItem(obj) {
  for (let key in obj) {
    if (obj[key]) {
      localStorage.setItem(key, obj[key]);
    } else {
      localStorage.removeItem(key);
    }
  }
}



export function getItem(val) {
  return localStorage.getItem(val);
}