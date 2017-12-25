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
  },
  stikar: {
    className: 'stikar',
    width:'90%',
    paddingTop: '0%',
    paddingBottom: '0%',
    marginTop:'1%',
    marginBottom:'1%'
  }
};


class NidurstodurSundurlidun extends Component {
  constructor(props) {
    super(props);

  }
 

  render() {
    const {afangar} = this.props;
    const heitin = Object.keys(afangar);
    
    for (let heiti of heitin) {
      afangar[heiti].hopar = afangar[heiti].hopar.map((hopur,index)=> {
        const a = afangar[heiti];
        console.log(a);
        const vvn = hopur.vinnumat-a.stadinKennsla-a.fastirLidir + a.skerding-a.undirbuningurKennslu-hopur.vinnumatSkiptitimar;
        const vvnaa = hopur.fjoldiAnAlags*a.vinna_per_nemanda/60;
        const vvn20a = hopur.fjoldi20Alag*1.2*a.vinna_per_nemanda/60;
        const vvn100a = hopur.fjoldi100Alag*2*a.vinna_per_nemanda/60;
        const f = (afangar[heiti].synidaemi ==='Hægferð')?1:parseFloat(a.einingar)/3;
        console.log(vvn);
        return {
          ...afangar[heiti],
          ...hopur,
          heiti: `${afangar[heiti].heiti}, hópur ${index+1}`,
          vinnumatTotal: hopur.vinnumat-a.stadinKennsla-a.fastirLidir+a.skerding-a.undirbuningurKennslu-hopur.vinnumatSkiptitimar,
          stadinKennslaStrengur: `${a.kennsluvikur} vikur x ${a.kennslustundir} kennslustundir x ${a.lengdKst} mín = ${a.stadinKennsla} klst.`,
          undirbuningurKennsluStrengur: `${a.kennsluvikur} vikur x ${a.kennslustundir} kennslustundir x ${a.lengdKst} mín/40 mín x ${a.undirb_kennslu} mín = ${a.undirbuningurKennslu} klst.`,
          undirbuningurTolurStrengur: `= ${talaToString(a.timar_namsAetlun*f,1)} klst. + ${talaToString(a.verkefnisgerd*f,1)} klst. + ${talaToString(a.onnur_vinna*f,1)} klst. = ${talaToString(a.fastirLidir,1)} klst.`,
          vinnaVegnaNemendaStrengur: `${hopur.fjoldiAnAlags} x ${talaToString(a.vinna_per_nemanda/60*f,2)} + ${hopur.fjoldi20Alag} x ${talaToString(a.vinna_per_nemanda/60*f*1.2,1)} + ${hopur.fjoldi100Alag} x ${talaToString(a.vinna_per_nemanda/60*f*2,1)} = ${talaToString(vvnaa,1)} + ${talaToString(vvn20a,1)} + ${talaToString(vvn100a,1)} = ${talaToString(vvn,1)} klst.`,
          skiptitimarStrengur: `62,5% x ${a.skiptitimar} mín/(${a.kennslustundir}x${a.lengdKst} mín) x vinnumat án skiptitíma=${talaToString(hopur.vinnumatSkiptitimar,1)} klst.`,
          skerdingarStrengur: `${talaToString(a.skerdingarprosenta,1)} % af vinnumati meðalhóps.`,
          f: f    
        }
      });
    }
    
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
                    <div key={hopur.heiti} style={styles.main}>
                    <List style={{padding: '0%',margin:'0%'}}>
                      <ListItem 
                        primaryText={`Heiti: ${hopur.heiti}`}
                        innerDivStyle={styles.stikar}
                      />
                      
                      <ListItem 
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Sýnidæmi: `}</div>
                            <div>{`${hopur.synidaemi}`}</div>
                          </div>
                        } 
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Fjöldi: `}</div>
                            <div>{`${talaToString(hopur.fjoldi,0)} nem.`}</div>
                          </div>
                        } 
                      />
                      
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Einingar: `}</div>
                            <div>{`${talaToString(hopur.einingar,0)} einingar (gamlar)`}</div>
                          </div>
                        } 
                      />
                       <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Námsáætlun/skipulag/vinnumat:`}</div>
                            <div>{`${talaToString(hopur.timar_namsAetlun*hopur.f,1)} klst.`}</div>
                          </div>
                        }
                        secondaryText={
                          <div>
                            <div>
                              { hopur.f !== 1 &&
                              <div>
                               {`${talaToString(hopur.timar_namsAetlun,1)} klst. x ${talaToString(hopur.f,2)} = ${talaToString(hopur.timar_namsAetlun*hopur.f,1)} klst.`}
                              </div>
                              }
                              
                            </div>
                          </div>
                        }   
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Verkefnis og prófagerð á kennslutíma:`}</div>
                            <div>{`${talaToString(hopur.verkefnisgerd*hopur.f,1)} klst.`}</div>
                          </div>
                        }
                        secondaryText={
                          <div>
                            <div>
                              { hopur.f !== 1 &&
                              <div>
                               {`${talaToString(hopur.verkefnisgerd,1)} klst. x ${talaToString(hopur.f,2)} = ${talaToString(hopur.verkefnisgerd*hopur.f,1)} klst.`}
                              </div>
                              }
                              
                            </div>
                          </div>
                        }    
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Önnur vinna óháð nemendafjölda:`}</div>
                            <div>{`${talaToString(hopur.onnur_vinna*hopur.f,1)} klst.`}</div>
                          </div>
                        }
                        secondaryText={
                          <div>
                            <div>
                              { hopur.f !== 1 &&
                              <div>
                               {`${talaToString(hopur.onnur_vinna,1)} klst. x ${talaToString(hopur.f,2)} = ${talaToString(hopur.onnur_vinna*hopur.f,1)} klst.`}
                              </div>
                              }
                              
                            </div>
                          </div>
                        }    
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Undirbúningur að jafnaði fyrir hverja kennslustund (m.v. 40 mín):`}</div>
                            <div>{`${talaToString(hopur.undirb_kennslu,0)} min.`}</div>
                          </div>
                        } 
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Öll yfirferð og frágangur námsmats á hvern nemanda:`}</div>
                            <div>{`${talaToString(hopur.vinna_per_nemanda/60*hopur.f,2)} klst.`}</div>
                          </div>
                        }
                        secondaryTextLines={hopur.f===1?1:2} 
                        secondaryText={
                          <div>
                            <div>
                              { hopur.f !== 1 &&
                              <div>
                               {`${talaToString(hopur.vinna_per_nemanda/60,2)} x ${talaToString(hopur.f,2)} = ${talaToString(hopur.vinna_per_nemanda/60*hopur.f,2)} klst.`}
                              </div>
                              }
                              <div>
                                {(hopur.hamark_e === hopur.hamark_n)?`Með 100% álagi ${talaToString(hopur.vinna_per_nemanda/60*hopur.f*2,1)} klst.`
                                  :`Með 20% álagi ${talaToString(hopur.vinna_per_nemanda/60*hopur.f*1.2,1)} klst. og 100% álagi ${talaToString(hopur.vinna_per_nemanda/60*hopur.f*2,1)} klst.`}
                              </div>
                            </div>
                          </div>
                        }  
                      />
                      {
                        hopur.vinnumatSkiptitimar > 0 &&
                        <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Skiptitímar (mín. á viku):`}</div>
                            <div>{`${talaToString(hopur.skiptitimar,1)} mín.`}</div>
                          </div>
                        }
                        
                      />
                      }
                              
                      <ListItem
                        leftIcon={<Forward color={'white'}/>}
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Staðin kennsla: `}</div>
                            <div>{`${talaToString(hopur.stadinKennsla,1)} klst.`}</div>
                          </div>
                        } 
                        secondaryText={hopur.stadinKennslaStrengur}/>
                      <ListItem
                        leftIcon={<Add/>} 
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Undirbúningur: `}</div>
                            <div>{`${hopur.undirbuningurKennslu} klst.`}</div>
                          </div>
                        } 
                        secondaryText={hopur.undirbuningurKennsluStrengur}/>
                      {
                        hopur.skiptitimar > 0 &&
                        <ListItem
                        leftIcon={<Add/>} 
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >    
                            <div>{`Vinnumat vegna skiptitíma: `}</div>
                            <div>{`${talaToString(hopur.vinnumatSkiptitimar,1)} klst.`}</div>
                          </div>
                        } 
                        secondaryText={hopur.skiptitimarStrengur}/> 
                      }  
                      <ListItem
                        leftIcon={<Add/>}  
                        primaryText={
                          <div style={{display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'}}
                          >   
                            <div>{`Fastir liðir: `}</div>
                            <div>{`${talaToString(hopur.fastirLidir,1)} klst.`}</div>
                          </div>
                        } 
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '0%',marginTop:'0%',marginBottom:'0%'}}
                        secondaryTextLines={2} 
                        secondaryText={
                          <div>
                            <div>
                              <div>
                              <span>{`Fastir liðir = Skipulag + Verkefnisgerð + Önnur vinna`}</span>
                              </div>
                              <div>
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                              <span>{hopur.undirbuningurTolurStrengur}</span>
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
                            <div>{`${talaToString(hopur.vinnumatTotal,1)} klst.`}</div>
                          </div>
                        } 
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '0%',marginTop:'0%',marginBottom:'0%'}} 
                        secondaryTextLines={2}
                        secondaryText={hopur.vinnaVegnaNemendaStrengur}/>
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
                              <div>{hopur.skerdingarStrengur}</div>
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