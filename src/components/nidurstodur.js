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
      vinnuskyldaReiknud} = this.props;
      const heitin = Object.keys(afangar);
      
  
    let vinnumat = 0;
    
    for (let heiti of heitin) {
      vinnumat += afangar[heiti].hopar.reduce((summa,hopur)=>summa+hopur.vinnumat,0)
    }
    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
        { fulltStarf  &&
        <div style={styles.main}>
          <h4>Um kennarann</h4>   
            <List>
              <ListItem primaryText={`Aldur: ${aldur}`}></ListItem>
              <ListItem primaryText={`Vinnuskylda: ${vinnuskylda} klst`}></ListItem>
              <ListItem primaryText={`Kennsluafsláttur: ${talaToString(kennsluafslattur,1)} %`}></ListItem>
              <ListItem primaryText={`Önnur vinna: ${timar} klst`}></ListItem>
              <ListItem primaryText={`Vinnuskylda að frádregnum kennsluafslætti: ${talaToString(vinnuskyldaReiknud,1)} klst`}></ListItem>
            </List>
        
        </div>
        }
        {
        <div style={styles.main}>
          <h4>A-hluti</h4>
            <List style={{padding: '0%',margin:'0%'}}>   
            {
              heitin.map((heiti)=>
                    afangar[heiti].hopar.map((hopur,index)=>
                    <ListItem 
                    key={heiti + index.toString()} innerDivStyle={{padding: '0%',margin:'0%'}} 
                    primaryText={`${heiti}-${index+1}:\t\t${talaToString(hopur.vinnumat,1)} klst`}/>))
  
            }
            <ListItem primaryText={"\n"}/>
            <Divider/>
            <ListItem 
              innerDivStyle={{paddingLeft: '0%', paddingRight: '0%', paddingTop: '5%',margin:'0%'}}
              primaryText={`Samtals: ${talaToString(vinnumat,1)} klst.`}/>
            </List>
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
    get vinnuskyldaReiknud() {
      const vinnuhluti = parseFloat(this.vinnuskylda)-parseFloat(this.timar);
      return vinnuhluti <= 0 ? parseFloat(this.vinnuskylda):(parseFloat(vinnuhluti)*(1-parseFloat(this.kennsluafslattur)/100));
     
    }
});

export default connect(mapStateToProps)(Nidurstodur)