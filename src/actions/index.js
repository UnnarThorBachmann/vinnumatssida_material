export const SET_LAUNAFLOKKUR = 'SET_LAUNFLOKKUR';
export const SET_THREP = 'SET_THREP';
export const SET_VINNUSKYLDA = 'SET_VINNUSKYLDA';
export const SET_ONNUR_STORF = 'SET_ONNUR_STORF';
export const SET_STARFSHLUTFALL = 'SET_STARFSHLUTFALL';
export const FULLT_STARF = 'FULLT_STARF';
export const LAUN = 'LAUN';
export const ADD_AFANGI = 'ADD_AFANGI';
export const DELETE_AFANGI = 'DELETE_AFANGI';
export const SET = 'SET';
export const GET = 'GET';

export function fulltStarf(fulltStarf) {
  return {
      type: FULLT_STARF,
      fulltStarf: fulltStarf
    }
}

export function laun(laun) {
  return {
      type: LAUN,
      laun: laun
    }
}

export function setLaunaflokkur(launaflokkur) {
  return {
      type: SET_LAUNAFLOKKUR,
      launaflokkur: launaflokkur
    }
}

export function setThrep(threp) {
  return {
      type: SET_THREP,
      threp: threp
    }
}

export function setVinnuskylda(aldur) {
  return {
      type: SET_VINNUSKYLDA,
      aldur: aldur
    }
}

export function setOnnurStorf(timar) {
  return {
      type: SET_ONNUR_STORF,
      timar: timar
    }
}

export function setStarfshlutfall(starfshlutfall) {
  return {
      type: SET_STARFSHLUTFALL,
      starfshlutfall: starfshlutfall
    }
}

export function addAfangi(afangi) {

  return {
      type: ADD_AFANGI,
      afangi: afangi
    }
}

export function deleteAfangi(nafn) {
  return {
      type: DELETE_AFANGI,
      nafn: nafn
    }

}

export function set(state) {
  return {
      type: SET,
      state: state
    }
  
}
