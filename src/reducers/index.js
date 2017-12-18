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
import {vinnuskylda,kennsluafslattur,Synidaemi,initialState,getterState} from '../helpers';


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
          aldur: action.aldur,
          vinnuskylda: vinnuskylda(action.aldur),
          kennsluafslattur: kennsluafslattur(action.aldur)
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
          afangar: {
            ...state.afangar,
            [action.afangi.heiti]: {
              ...action.afangi,
              ...Synidaemi[action.afangi.synidaemi],
              heiti: action.afangi.heiti
            }
          },

        }
      case DELETE_AFANGI:
        return {
          ...state,
          
        }
      
      default:
        return state;
  }
}