const SET_LAUNAFLOKKUR = 'SET_LAUNFLOKKUR';
const SET_THREP = 'SET_THREP';
const SET_VINNUSKYLDA = 'SET_VINNUSKYLDA';
const SET_C_HLUTI = 'SET_C_HLUTI';
const SET_STARFSHLUTFALL = 'SET_STARFSHLUTFALL';
const ADD_AFANGI = 'ADD_AFANGI';
const DELETE_AFANGI = 'DELETE_AFANGI';

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
      vinnuskylda: aldur
    }
}

export function setCHluti(cHluti) {
  return {
      type: SET_C_HLUTI,
      cHluti: cHluti
    }
}

export function setStarfshlutfall(starfshlutfall) {
  return {
      type: SET_STARFSHLUTFALL,
      launaflokkur: launaflokkur
    }
}

export function addAfangi(afangi) {
  return {
      type: SET_LAUNAFLOKKUR,
      afangi: afangi
    }
}

export function deleteAfangi(nafn) {
  return {
      type: SET_LAUNAFLOKKUR,
      nafn: nafn
    }
}