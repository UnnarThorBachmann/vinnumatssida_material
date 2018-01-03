import React, {Component} from 'react';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Add from 'material-ui/svg-icons/content/add';
import Forward from 'material-ui/svg-icons/content/forward';
import Remove from 'material-ui/svg-icons/content/remove';
import Equal from 'material-ui/svg-icons/editor/drag-handle';
import {talaToString} from '../helpers';

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
    marginTop:'4%',
    marginBottom:'4%'
  }
};


class NidurstodurSundurlidun extends Component {
  
 

  render() {
    const {afangar} = this.props;
    const heitin = Object.keys(afangar);
    
    for (let heiti of heitin) {
      afangar[heiti].hopar = afangar[heiti].hopar.map((hopur,index)=> {
        const a = afangar[heiti];
        const vvn = hopur.vinnumat-a.stadinKennsla-a.fastirLidir + a.skerding-a.undirbuningurKennslu-hopur.vinnumatSkiptitimar;
        
        const f = (afangar[heiti].synidaemi ==='Hægferð')?1:parseFloat(a.einingar)/3;
        let vinnaVegnaNemendaStrengur = `${hopur.fjoldiAnAlags} x ${talaToString(a.vinna_per_nemanda/60*f,2)} klst.`;
        
        if (hopur.fjoldi20Alag > 0)
          vinnaVegnaNemendaStrengur += ` + ${hopur.fjoldi20Alag} x ${talaToString(a.vinna_per_nemanda/60*f*1.2,1)} klst.`;
        

        if (hopur.fjoldi100Alag > 0)
          vinnaVegnaNemendaStrengur += ` + ${hopur.fjoldi100Alag} x ${talaToString(a.vinna_per_nemanda/60*f*2,1)} klst.`;
        
        vinnaVegnaNemendaStrengur += ` = ${talaToString(vvn,1)} klst.`
        
        return {
          ...afangar[heiti],
          ...hopur,
          heiti: `${afangar[heiti].heiti}, hópur ${index+1}`,
          vinnumatTotal: hopur.vinnumat-a.stadinKennsla-a.fastirLidir+a.skerding-a.undirbuningurKennslu-hopur.vinnumatSkiptitimar,
          stadinKennslaStrengur: `${a.kennsluvikur} vikur x ${a.kennslustundir} kennslustundir x ${a.lengdKst} mín = ${a.stadinKennsla} klst.`,
          undirbuningurKennsluStrengur: `${a.kennsluvikur} vikur x ${a.kennslustundir} kennslustundir x ${a.lengdKst} mín/40 mín x ${a.undirb_kennslu} mín = ${a.undirbuningurKennslu} klst.`,
          undirbuningurTolurStrengur: `= ${talaToString(a.timar_namsAetlun*f,1)} klst. + ${talaToString(a.verkefnisgerd*f,1)} klst. + ${talaToString(a.onnur_vinna*f,1)} klst. = ${talaToString(a.fastirLidir,1)} klst.`,
          vinnaVegnaNemendaStrengur: vinnaVegnaNemendaStrengur,
          skiptitimarStrengur: `62,5% x ${a.skiptitimar} mín/(${a.kennslustundir}x${a.lengdKst} mín) x vinnumat án skiptitíma og skerðinga=${talaToString(hopur.vinnumatSkiptitimar,1)} klst.`,
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
                        primaryText={`Sýnidæmi: `}
                        secondaryText={`${hopur.synidaemi}`} 
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={`Fjöldi: `}
                        secondaryText={`${talaToString(hopur.fjoldi,0)} nem.`}
                      
                      />
                      
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={`Einingar: `}
                        secondaryText={`${talaToString(hopur.einingar,0)} einingar (gamlar)`}
                      />
                       <ListItem
                          innerDivStyle={styles.stikar}
                          primaryText={`Námsáætlun/skipulag/vinnumat:`}
                          secondaryText={`${talaToString(hopur.timar_namsAetlun*hopur.f,1)} klst.`}
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={`Verkefnis og prófagerð á kennslutíma:`}
                        secondaryText={`${talaToString(hopur.verkefnisgerd*hopur.f,1)} klst.`}    
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={`Önnur vinna óháð nemendafjölda:`}
                        secondaryText={`${talaToString(hopur.onnur_vinna*hopur.f,1)} klst.`}    
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={`Undirbúningur að jafnaði fyrir hverja kennslustund (m.v. 40 mín):`}
                        secondaryText={`${talaToString(hopur.undirb_kennslu,0)} min.`}
                      />
                      <ListItem
                        innerDivStyle={styles.stikar}
                        primaryText={`Öll yfirferð og frágangur námsmats á hvern nemanda:`}
                        secondaryText={`${talaToString(hopur.vinna_per_nemanda/60*hopur.f,2)} klst.`}
                        secondaryTextLines={hopur.f===1?1:2} 
                      />
                      {
                        hopur.vinnumatSkiptitimar > 0 &&
                        <ListItem
                          innerDivStyle={styles.stikar}
                          primaryText={`Skiptitímar (mín. á viku):`}
                          secondaryText={`${talaToString(hopur.skiptitimar,1)} mín.`}   
                        />
                      }
                              
                      <ListItem
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '0%',marginTop:'0%',marginBottom:'0%'}}
                        leftIcon={<Forward color={'white'}/>}
                        primaryText={`Staðin kennsla: `}
                        secondaryText={`${talaToString(hopur.stadinKennsla,1)} klst.`}
                      />
                      <ListItem
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '5%',marginTop:'0%',marginBottom:'0%'}}
                        leftIcon={<Add/>} 
                        primaryText={<div><div></div><div>{`Undirbúningur: `}</div></div>}
                        secondaryText={`${hopur.undirbuningurKennslu} klst.`}
                      />
                      <ListItem
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '5%',marginTop:'0%',marginBottom:'0%'}}
                        leftIcon={<Add/>}  
                        primaryText={`Fastir liðir: `}
                        secondaryText={`${talaToString(hopur.fastirLidir,1)} klst.`}
                      />
                      
                      <ListItem
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '5%',marginTop:'0%',marginBottom:'0%'}}
                        leftIcon={<Add/>}  
                        primaryText={`Vegna nemenda: `}
                        secondaryText={`${talaToString(hopur.vinnumatTotal,1)} klst.`} 
                      />
                      {
                        hopur.skiptitimar > 0 &&
                        <ListItem
                          innerDivStyle={{paddingTop: '0%',paddingBottom: '5%',marginTop:'0%',marginBottom:'0%'}}
                          leftIcon={<Add/>} 
                          primaryText={`Vinnumat vegna skiptitíma: `}
                          secondaryText={`${talaToString(hopur.vinnumatSkiptitimar,1)} klst.`}
                        />
                      }  
                      <ListItem
                        leftIcon={<Remove/>} 
                        innerDivStyle={{paddingTop: '0%',paddingBottom: '5%',marginTop:'0%',marginBottom:'0%'}}
                        primaryText={`Skerðing:`}
                        secondaryText={`${talaToString(afangar[heiti].skerding,1)} klst.`}
                      />
                      <ListItem
                        leftIcon={<Equal/>} 
                        innerDivStyle={{marginTop:'0%',marginBottom:'0%'}}
                        primaryText={`${talaToString(hopur.vinnumat,1)} klst.`}
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