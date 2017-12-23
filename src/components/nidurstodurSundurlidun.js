import React, {Component} from 'react';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Add from 'material-ui/svg-icons/content/add';
import Forward from 'material-ui/svg-icons/content/forward';
import Remove from 'material-ui/svg-icons/content/remove';
import Equal from 'material-ui/svg-icons/editor/drag-handle';



import {talaToString,vinnaVegnaNemenda,skerdingarprosenta} from '../helpers';
const styles = {
  main: {
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '1%',
    borderStyle: 'solid',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderWidth: '1px',
    borderRadius: '10px',
    width: '90%'
  }
};


class NidurstodurSundurlidun extends Component {
  constructor(props) {
    super(props);

  }
 

  render() {
    const {afangar} = this.props;
    const heitin = Object.keys(afangar);
    
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
        <div style={{width: '100%'}}>
          <h4 style={{marginBottom: '5%',marginTop: '3%'}}>Sundurliðun A-hluta (prentvænt)</h4>
            {
              heitin.map((heiti)=>
                    afangar[heiti].hopar.map((hopur,index)=> 
                    <div style={styles.main}>
                    <List key={heiti+hopur.toString()}style={{padding: '0%',margin:'0%'}}>
                      <ListItem 
                        primaryText={`Heiti: ${afangar[heiti].heiti}-${index+1}`}>
                      </ListItem>
                      <ListItem 
                        primaryText={`Fjöldi: ${hopur.fjoldi}`}>
                      </ListItem>    
                      <ListItem
                        leftIcon={<Forward color={'white'}/>}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Staðin kennsla: `}</div>
                            <div>{`${talaToString(afangar[heiti].stadinKennsla,1)} klst.`}</div>
                          </div>
                        } 
                        secondaryText={`${afangar[heiti].kennsluvikur} vikur x ${afangar[heiti].kennslustundir} kennslustundir x ${afangar[heiti].lengdKst} mín/60 mín= ${afangar[heiti].stadinKennsla} klst.`}>
                      </ListItem>
                      <ListItem
                        leftIcon={<Add/>} 
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Undirbúningur: `}</div>
                            <div>{`${talaToString(afangar[heiti].undirbuningurKennslu,1)} klst.`}</div>
                          </div>
                        } 
                        secondaryText={`${afangar[heiti].kennsluvikur} vikur x ${afangar[heiti].kennslustundir} kennslustundir x ${afangar[heiti].lengdKst} mín/${afangar[heiti].undirb_kennslu} mín klst.= ${afangar[heiti].undirbuningurKennslu} klst.`}>
                      </ListItem>   
                      <ListItem
                        leftIcon={<Add/>}  
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >   
                            <div>{`Fastir liðir: `}</div>
                            <div>{`${talaToString(afangar[heiti].fastirLidir,1)} klst.`}</div>
                          </div>
                        } 
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '0%',marginTop:'0%',marginBottom:'0%'}}
                        secondaryTextLines={2} 
                        secondaryText={
                          <div>
                            <div>
                              <div>
                              <span>{`Fastir liðir = Gerð námsáætlunnar + Verkefnisgerð + Önnur vinna`}</span>
                              </div>
                              <div>
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              <span>{`= ${talaToString(afangar[heiti].timar_namsAetlun,1)} klst. + ${talaToString(afangar[heiti].verkefnisgerd,1)} klst. + ${talaToString(afangar[heiti].onnur_vinna,1)} klst. = ${talaToString(afangar[heiti].fastirLidir,1)} klst.`}</span>
                              </div>
                            </div>
                          </div>
                        }
                      />
                      
                      <ListItem
                        leftIcon={<Add/>}  
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Vegna nemenda: `}</div>
                            <div>{`${talaToString(hopur.vinnumat-afangar[heiti].stadinKennsla-afangar[heiti].fastirLidir+afangar[heiti].skerding-afangar[heiti].undirbuningurKennslu,1)} klst.`}</div>
                          </div>
                        } 
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '0%',marginTop:'0%',marginBottom:'0%'}} 
                        secondaryTextLines={2}
                        secondaryText={`${hopur.fjoldiAnAlags} x ${talaToString(afangar[heiti].vinna_per_nemanda/60,2)} + ${hopur.fjoldi20Alag} x ${talaToString(afangar[heiti].kostn_per_nem_yn,1)} + ${hopur.fjoldi100Alag} x ${talaToString(afangar[heiti].kostn_per_nem_ye,1)} = ${talaToString(hopur.fjoldiAnAlags*afangar[heiti].vinna_per_nemanda/60,1)} + ${talaToString(hopur.fjoldi20Alag*1.2*afangar[heiti].vinna_per_nemanda/60,1)} + ${talaToString(hopur.fjoldi100Alag*2*afangar[heiti].vinna_per_nemanda/60,1)} = ${talaToString(hopur.vinnumat-afangar[heiti].stadinKennsla-afangar[heiti].fastirLidir + afangar[heiti].skerding-afangar[heiti].undirbuningurKennslu,1)} klst.`}
                      />
                      <ListItem 
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Skerðing:`}</div>
                            <div>{`${talaToString(afangar[heiti].skerding,1)} klst.`}</div>
                          </div>
                        }
                        leftIcon={<Remove/>} 
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '0%',marginTop:'0%',marginBottom:'0%'}}
                        secondaryTextLines={2} 
                        secondaryText={
                          <div>
                            <div>
                              <div>{`Sem prósenta af  vinnumati meðaltalshóps: ${talaToString(afangar[heiti].skerdingarprosenta,1)} %`}</div>
                            </div>
                          </div>
                        }
                      />
                      <ListItem
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{``}</div>
                            <div>{`${talaToString(hopur.vinnumat,1)} klst.`}</div>
                          </div>
                        }
                        secondaryText={''}
                        leftIcon={<Equal/>} 
                        innerDivStyle={{marginTop:'0%',marginBottom:'0%'}}
                      />
                       

                    </List>
                    <footer></footer>
                    </div>))
  
            }
        </div>
        
        

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=> ({
    afangar: {...state.afangar,
    }, 
});

export default connect(mapStateToProps)(NidurstodurSundurlidun)