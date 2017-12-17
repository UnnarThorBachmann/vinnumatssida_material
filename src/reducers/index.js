import {
 SET_LAUNAFLOKKUR,
 SET_THREP,
 SET_VINNUSKYLDA,
 SET_C_HLUTI,
 SET_STARFSHLUTFALL,
 ADD_AFANGI,
 DELETE_AFANGI
} from '../actions';


export default function comments(state={launaflokkur: 1},action) {
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
          vinnuskylda: action.vinnuskylda
        }
      case SET_C_HLUTI:
        return {
          ...state,
          cHluti: action.cHluti
        }
      case SET_STARFSHLUTFALL:
        return {
          ...state,
          cHluti: action.starfshlutfall
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