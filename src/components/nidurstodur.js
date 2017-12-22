import React, {Component} from 'react';
import {grey900,deepOrangeA400} from 'material-ui/styles/colors';
import {connect} from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

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
    width: '25%'
  }
};


class Nidurstodur extends Component {
  constructor(props) {
    super(props);

  }
 

  render() {
    const {launaflokkur, 
      threp, 
      timar, 
      aldur, 
      starfshlutfall,
      fulltStarf,
      laun,
      afangar,
      vinnuskylda,
      kennsluafslattur,
      vinnuskyldaA,
      vinnuskyldaB,
      vinnuskyldaC,
      vinnumat,
      totalVinnumat,
      yfirvinna,
      vinnuskyldaTotal,
      starfshlutfallReiknad} = this.props;
      const heitin = Object.keys(afangar);
  
    
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
        { fulltStarf  &&
        <div style={styles.main}>
          <h4 style={{marginBottom: '5%',marginTop: '3%'}}>Um kennarann</h4>   
            <List style={{padding: '0%',margin:'0%'}}>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} primaryText={`Aldur:`} secondaryText={ `${aldur}`}></ListItem>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} primaryText={`Starfshlutfall:`} secondaryText={`${talaToString(starfshlutfall,1)} %`}></ListItem>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} primaryText={`Kennsluafsláttur:`} secondaryText={`${talaToString(kennsluafslattur,1)} %`}></ListItem>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} primaryText={`Reiknað starfshlutfall:`} secondaryText={`${talaToString(starfshlutfallReiknad,1)} %`}></ListItem>
            </List>
        
        </div>
        }
        {
        <div style={styles.main}>
          <h4 style={{marginBottom: '5%',marginTop: '3%'}}>Vinnumat</h4>
            <List style={{padding: '0%',margin:'0%'}}> 
            <ListItem 
                      innerDivStyle={{padding: '0%',margin:'0%'}}
                      primaryText={'A-hluti'}
            />
            {
              heitin.map((heiti)=>
                    afangar[heiti].hopar.map((hopur,index)=>
                    <ListItem 
                    key={heiti + index.toString()} innerDivStyle={{padding: '0%',margin:'0%'}} 
                    primaryText={`${heiti}-${index+1}:\t\t${talaToString(hopur.vinnumat,1)} klst`}/>))
  
            }
            
            <Divider style={{marginTop:'10px'}}/>
            <ListItem 
              innerDivStyle={{paddingLeft: '0%', paddingRight: '0%', paddingTop: '5%',margin:'0%'}}
              primaryText={`Samtals:`}
              secondaryText={`${talaToString(vinnumat,1)} klst.`}
              />
            </List>
            {
              fulltStarf  &&
              <div>
                <List style={{padding: '0%',margin:'0%'}}> 
                  <ListItem 
                      innerDivStyle={{padding: '0%',margin:'0%'}}
                      primaryText={'B-hluti'}
                      secondaryText={`${talaToString(vinnuskyldaB,1)} klst.`}
                  />
                  <ListItem innerDivStyle={{padding: '0%',margin:'0%'}}
                            primaryText={'C-hluti'}
                            secondaryText={`Önnur vinna: ${timar} klst.`}
                  />
                  
                </List>
              </div>
            }
        </div>
        }
        { fulltStarf  &&
        <div style={styles.main}>
          <div>
          <h4 style={{marginBottom: '5%',marginTop: '3%'}}>Vinnuskylda</h4>   
            <List style={{padding: '0%',margin:'0%'}}>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} 
                primaryText={`A+B+C:`} 
                secondaryText={`${talaToString(vinnuskyldaA,1)} + ${talaToString(vinnuskyldaB,1)} + ${talaToString(vinnuskyldaC,1)} = ${talaToString(vinnuskyldaTotal,1)} klst.`}></ListItem>              
            </List>
            <h4 style={{marginBottom: '1%',marginTop: '3%'}}>Vinnumat</h4>   
            <List style={{padding: '0%',margin:'0%'}}>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} 
                            secondaryText={`${talaToString(totalVinnumat,1)} klst.`}
              />
            </List>
            <h4 style={{marginBottom: '1%',marginTop: '3%'}}>Vinnumat-vinnuskylda</h4>   
            <List style={{padding: '0%',margin:'0%'}}>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} 
                            secondaryText={`${talaToString(totalVinnumat-vinnuskyldaTotal,1)} klst.`}
              />
            </List>
            <h4 style={{marginBottom: '1%',marginTop: '3%'}}>Yfirvinna</h4>   
            <List style={{padding: '0%',margin:'0%'}}>
              <ListItem innerDivStyle={{padding: '0%',margin:'0%'}} 
                            secondaryText={`${talaToString(yfirvinna,1)} klst.`}
              />
            </List>
          </div>
        </div>
        }

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=> ({
    launaflokkur: state.launaflokkur,
    threp: state.threp,
    timar: state.timar,
    aldur: state.aldur,
    starfshlutfall: state.starfshlutfall,
    fulltStarf: state.fulltStarf,
    laun: state.laun,
    afangar: {...state.afangar,
    },
    vinnuskylda: state.vinnuskylda,
    kennsluafslattur: state.kennsluafslattur,
    get vinnumat() {
      const heitin = Object.keys(state.afangar);
      let vinnumat = 0; 
      for (let heiti of heitin) 
        vinnumat += state.afangar[heiti].hopar.reduce((summa,hopur)=>summa+hopur.vinnumat,0)
      
      return vinnumat;
    },
    get vinnuskyldaA() {
      const vinnuskyldaKennslu = parseFloat(this.vinnuskylda)*state.starfshlutfall/100-parseFloat(this.timar);
      return vinnuskyldaKennslu <= 0?0:vinnuskyldaKennslu*parseFloat(100-this.kennsluafslattur)/100;
     
    },
    get vinnuskyldaB() {
      
      return 180*this.starfshlutfall/100;
    },
    get vinnuskyldaC() {
      const vinnuskyldaOnnur = parseFloat(this.timar)-parseFloat(this.vinnuskylda)*state.starfshlutfall/100; 
      return vinnuskyldaOnnur>0?parseFloat(this.vinnuskylda)*state.starfshlutfall/100:parseFloat(this.timar);
    },
    get starfshlutfallReiknad() {
      return 100*(parseFloat(this.timar)+this.vinnuskyldaB + this.vinnumat)/(this.vinnuskyldaA + this.vinnuskyldaB + this.vinnuskyldaC);
    },
    get totalVinnumat() {
      return this.vinnumat + this.vinnuskyldaB + parseFloat(this.timar);
    },
    get vinnuskyldaTotal() {
      return this.vinnuskyldaA + this.vinnuskyldaB+this.vinnuskyldaC;
    },
    get yfirvinna() {
      return this.starfshlutfallReiknad < 100 ? 0:this.totalVinnumat-this.vinnuskyldaTotal;
    },

     
});

export default connect(mapStateToProps)(Nidurstodur)