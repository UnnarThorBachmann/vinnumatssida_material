import {initialState} from '../helpers';

//const STORAGE_KEY = '1aff148nvm3493ma6';
/*
function getSize() {
	let summa = 0;
	for (let key of Object.keys(localStorage)) {
		console.log(key + ' ' + localStorage[key].length);
		summa += localStorage[key].length;
	}
	console.log(`Samtals ${summa.toString()}`);
}*/
 export function storedData() {
  //getSize();
  
  let storedState = {aldur: localStorage.getItem('aldur')? localStorage.getItem('aldur'): initialState.aldur,
  						fulltStarf: localStorage.getItem('fulltStarf')? (localStorage.getItem('fulltStarf')==='true'): initialState.fulltStarf,
  						grunnlaun: localStorage.getItem('grunnlaun')? parseFloat(localStorage.getItem('grunnlaun')): initialState.grunnlaun,
  						kennsluafslattur: localStorage.getItem('kennsluafslattur')? parseFloat(localStorage.getItem('kennsluafslattur')): initialState.fulltStarf,
  						laun: localStorage.getItem('laun')? (localStorage.getItem('laun')==='true'): initialState.laun,
  						launaflokkur: localStorage.getItem('launaflokkur')? parseInt(localStorage.getItem('launaflokkur'),10): initialState.launaflokkur,
  						starfshlutfall: localStorage.getItem('starfshlutfall')? parseInt(localStorage.getItem('starfshlutfall'),10): initialState.starfshlutfall,
  						threp: localStorage.getItem('threp')? parseInt(localStorage.getItem('threp'),10): initialState.threp,
  						timar: localStorage.getItem('timar')? localStorage.getItem('timar'): initialState.timar,
  						vinnuskylda: localStorage.getItem('vinnuskylda')? parseInt(localStorage.getItem('vinnuskylda'),10): initialState.vinnuskylda,
						afangar: {}
					};
	if (localStorage.getItem('heitin')) {
		for (let heiti of localStorage.getItem('heitin').split(',')) {
			const paramArray = localStorage.getItem(heiti).split(';');
			const hopar = [];
			for (let f of  paramArray[7].split(',')) {
			hopar.push({fjoldi: parseInt(f,10)})
			}
			storedState.afangar[heiti] ={
				heiti: paramArray[0],
				einingar: paramArray[1],
				synidaemi: paramArray[2],
				kennslustundir: parseInt(paramArray[3],10),
				kennsluvikur: parseInt(paramArray[4],10),
				lengdKst: parseInt(paramArray[5],10),
				skiptitimar:paramArray[6],
				hopar: hopar,
				heitiNotEmpty: false,
      			einingarIsNumber: true,
      			skiptitimarIsNumber: true,
      			disabled: false,
      			selectedHeiti: null
			};
		}
	} 
  return storedState;
 }

 export function storeData(data) {

 	
 	try {
 		localStorage.setItem('aldur',data.aldur);
 		localStorage.setItem('fulltStarf',data.fulltStarf);
 		localStorage.setItem('grunnlaun',data.grunnlaun);
 		localStorage.setItem('kennsluafslattur',data.kennsluafslattur);
 		localStorage.setItem('laun',data.laun);
 		localStorage.setItem('launaflokkur',data.launaflokkur);
 		localStorage.setItem('starfshlutfall',data.starfshlutfall);
 		localStorage.setItem('threp',data.threp);
 		localStorage.setItem('timar',data.timar);
 		localStorage.setItem('vinnuskylda',data.vinnuskylda);
 		localStorage.setItem('heitin',Object.keys(data.afangar));
		for (const heiti of Object.keys(data.afangar)) {
			let af = data.afangar[heiti];
			let fjoldar = []
			for (const hopur of af.hopar) {
				fjoldar.push(hopur.fjoldi);
			}
			localStorage.setItem(heiti,`${af.heiti};${af.einingar};${af.synidaemi};${af.kennslustundir};${af.kennsluvikur};${af.lengdKst};${af.skiptitimar};${fjoldar.join()}`)
		}
 
 	}
 	catch(e) {
 		alert('Minnið er fullt! Þú ert örugglega að drepa þig úr vinnu.')
 	}
 	


 	
  	
 }

 export function deleteData() {
  localStorage.clear();
 }


 