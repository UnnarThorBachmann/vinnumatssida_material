import {
 SET_LAUNAFLOKKUR,
 SET_THREP,
 SET_VINNUSKYLDA,
 SET_ONNUR_STORF,
 SET_STARFSHLUTFALL,
 ADD_AFANGI,
 DELETE_AFANGI,
 FULLT_STARF,
 LAUN
} from '../actions';

const initialState = {
      aldur: '30 ára-',
      timar: '0',
      starfshlutfall: 100,
      launaflokkur: 1,
      threp: 0,
    };
export default function comments(state={...initialState},action) {
  switch(action.type) {
      case  SET_LAUNAFLOKKUR:
        return {
            ...state,
          	launaflokkur: action.launaflokkur
          }
      case SET_THREP:
        return {
            ...state,
          	threp: action.threp
          }
      case SET_VINNUSKYLDA:
        return {
          ...state,
          aldur: action.aldur
        }
      case SET_ONNUR_STORF:
        return {
          ...state,
          timar: action.timar
        }
      case SET_STARFSHLUTFALL:
        return {
          ...state,
          starfshlutfall: action.starfshlutfall
        }
      case FULLT_STARF:
        return {
          ...state,
          fulltStarf: action.fulltStarf
        }
      case LAUN:
        return {
          ...state,
          laun: action.laun
        }
      case ADD_AFANGI:
        return {
          ...state,
          
        }
      case DELETE_AFANGI:
        return {
          ...state,
          
        }
      
      default:
        return state;
  }
}