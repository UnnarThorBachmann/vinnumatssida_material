import {
 SET_LAUNAFLOKKUR,
 SET_THREP,
 SET_VINNUSKYLDA,
 SET_ONNUR_STORF,
 SET_STARFSHLUTFALL,
 ADD_AFANGI,
 DELETE_AFANGI,
 FULLT_STARF,
 LAUN,
 SET,
 REFRESH
} from '../actions';
import {vinnuskylda,
  kennsluafslattur,
  Synidaemi,
  addProps,
  launatafla,
  initialState} from '../helpers';

import {storeData} from '../utils';


export default function reducerinn(state={...initialState},action) {
  switch(action.type) {
      case  SET_LAUNAFLOKKUR:
        storeData({
            ...state,
            launaflokkur: action.launaflokkur,
            grunnlaun: launatafla[action.launaflokkur][state.threp]
          });
        return {
            ...state,
          	launaflokkur: action.launaflokkur,
            grunnlaun: launatafla[action.launaflokkur][state.threp]
          }
      case SET_THREP:
        storeData({
            ...state,
            threp: action.threp,
            grunnlaun: launatafla[state.launaflokkur][action.threp]
          });
        return {
            ...state,
          	threp: action.threp,
            grunnlaun: launatafla[state.launaflokkur][action.threp]
          }
      case SET_VINNUSKYLDA:
        storeData({
          ...state,
          aldur: action.aldur,
          vinnuskylda: vinnuskylda(action.aldur),
          kennsluafslattur: kennsluafslattur(action.aldur)
        });
        return {
          ...state,
          aldur: action.aldur,
          vinnuskylda: vinnuskylda(action.aldur),
          kennsluafslattur: kennsluafslattur(action.aldur)
        }
      case SET_ONNUR_STORF:
        storeData({
          ...state,
          timar: action.timar
        });
        return {
          ...state,
          timar: action.timar
        }
      case SET_STARFSHLUTFALL:
        storeData({
          ...state,
          starfshlutfall: action.starfshlutfall,
        });
        return {
          ...state,
          starfshlutfall: action.starfshlutfall,
        }
      case FULLT_STARF:
        storeData({
          ...state,
          fulltStarf: action.fulltStarf
        });
        return {
          ...state,
          fulltStarf: action.fulltStarf
        }
      case LAUN:
        storeData({
          ...state,
          laun: action.laun
        });
        return {
          ...state,
          laun: action.laun
        }
      case ADD_AFANGI:
        const afangiExtended = addProps(action.afangi,Synidaemi[action.afangi.synidaemi]);
        storeData({
          ...state,
          afangar: {
            ...state.afangar,
            [action.afangi.heiti]: {
              ...afangiExtended
            }
          }
        })
        return {
          ...state,
          afangar: {
            ...state.afangar,
            [action.afangi.heiti]: {
              ...afangiExtended
            }
          }
        }
      case DELETE_AFANGI:
        const nyr_afangar = {...state.afangar};
        delete nyr_afangar[action.nafn];
        storeData({
          ...state,
          afangar: {
            ...nyr_afangar
          } 
        });
        return {
          ...state,
          afangar: {
            ...nyr_afangar
          }
          
        }
      case SET:
        return {
          ...action.state
        }
      case REFRESH:
        return {
        ...initialState
      }

      default:
        return state;
  }
}