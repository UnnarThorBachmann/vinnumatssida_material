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
      for (var heiti of heitin) {

      Object.defineProperty(afangar[heiti], 'stadinKennsla', {
        configurable: true,
        get: function() { return this.kennsluvikur*this.kennslustundir*this.lengdKst/60;}
      });

      Object.defineProperty(afangar[heiti], 'undirbuningurKennslu', {
        configurable: true,
        get: function() { return this.kennsluvikur*this.kennslustundir*this.lengdKst/40*this.undirb_kennslu/60;}
      });

      Object.defineProperty(afangar[heiti], 'fastirLidir', {
        configurable: true,
        get: function() { return (this.timar_namsAetlun + this.verkefnisgerd+ this.onnur_vinna)*this.einingar/3;}
      });

      Object.defineProperty(afangar[heiti], 'samtalsAnNemenda', {
        configurable: true,
        get: function() { return (this.stadinKennsla+this.undirbuningurKennslu+this.fastirLidir);}
      });

      Object.defineProperty(afangar[heiti], 'samtalsNemendur', {
        configurable: true,
        get: function() { return this.hopar.reduce((summa,hopur)=>summa + vinnaVegnaNemenda(hopur.fjoldi,this),0);}
      });

      Object.defineProperty(afangar[heiti], 'skerdingarprosenta', {
        configurable: true,
        get: function() { return 100*skerdingarprosenta(this.hopar.length)}
      });
      const hopar = Object.keys(afangar[heiti].hopar);
      for (var hopur of hopar) {
      
        Object.defineProperty(afangar[heiti].hopar[hopur], 'vinnumat', {
        configurable: true,
        get: function() {return afangar[heiti].samtalsAnNemenda + vinnaVegnaNemenda(this.fjoldi,afangar[heiti])}
      });
      }

      Object.defineProperty(afangar[heiti], 'samtals', {
        configurable: true,
        get: function() { return this.hopar.reduce((summa,hopur)=>summa + hopur.vinnumat,0);}
      });
    }
    


     
  
    /*
         <ListItem primaryText={`Staðin kennsla: ${talaToString(afangar[item].stadinKennsla,1)} klst.`}></ListItem>
                  <ListItem primaryText={`Undirbúningur kennslu: ${talaToString(afangar[item].undirbuningurKennslu,1)} klst.`}></ListItem>
                  <ListItem primaryText={`Fastir liðir: ${talaToString(afangar[item].fastirLidir,1)} klst.`}></ListItem>
                  <ListItem primaryText={`Samtals vegna nemenda: ${talaToString(afangar[item].samtalsNemendur,1)} klst.`}></ListItem>
                  <ListItem primaryText={`Einingafjöldi: ${afangar[item].einingar}`}></ListItem>
                  <ListItem primaryText={`Sýnidæmi: ${afangar[item].synidaemi}`}></ListItem>
                  <ListItem primaryText={`Skerðing hvers hóps: ${talaToString(afangar[item].skerdingarprosenta,2)} %`}></ListItem>
    */

    return (
      <div> 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start'}}
        >
        { fulltStarf &&
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
        <div style={styles.main}>
          <h4>A-hluti</h4>
            <List style={{padding: '0%',margin:'0%'}}>   
            {
              heitin.map((item)=>
                <ListItem key={item} innerDivStyle={{padding: '0%',margin:'0%'}}>
                <h4>{`Heiti: ${item}`}</h4>
                  <ul>
                  <li>{`Vinnumat hópa`}</li>
                  <ol>
                  {
                    afangar[item].hopar.map((hopur,index)=><li key={index}>{`${talaToString(hopur.vinnumat,1)} klst`}</li>)
                  }
                  </ol>
                  <li>{`Samtals: ${talaToString(afangar[item].samtals,1)} klst.`}</li>
                  </ul>
                </ListItem>
              )
            } 
            </List>
        </div>
        
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