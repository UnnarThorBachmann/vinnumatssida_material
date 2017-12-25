import {launatafla} from '../helpers'

const STORAGE_KEY = '1aff148nvm3493ma6';



 export function storedData() {
  return localStorage.getItem(STORAGE_KEY);
 }

 export function storeData(data) {
  console.log(data)
  localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
 }


 /*
 export function saekjaGogn(vinnagogn) {
  return localStorage.getItem(STORAGE_KEY).then(vinnagogn).catch(function(err){console.log(err)});
 }
 export const getDecks =(loadDecks) => {
		return AsyncStorage.getItem(STORAGE_KEY).then(loadDecks)
		.then((data)=>{AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))}).catch(function(err){alert(err)});
 }

 // Under influence from class.
 export function addCardToDeck({key,question,answer}) {
 	return AsyncStorage.getItem(STORAGE_KEY)
     .then((results) => {
       const data = JSON.parse(results)
       
       data[key].questions.push({question: question, answer: answer})
       AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
     }).catch(function(err){console.log(err)});
 }
 
 export function saveDeckTitle({key,deck}) {

 	AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
 		[key]: deck
 	}))
 }

*/