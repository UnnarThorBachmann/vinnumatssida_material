const STORAGE_KEY = '1aff148nvm3493ma6';



 export function storedData() {
  return localStorage.getItem(STORAGE_KEY);
 }

 export function storeData(data) {
  
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
 }

 export function deleteData() {
  localStorage.clear();
 }


 