
export function vinnuskylda(aldur) {
	switch(aldur) {
		case '30 ára-':
			return 720;
		case '30-37 ára':
			return 708;
		default:
			return 696;
	}
}


export function kennsluafslattur(aldur) {
	switch(aldur) {
		case '55-60 ára':
			return (1/24*100);
		case '60 ára+':
			return 5/24*100;
		case '60 ára+ (17 tímar)':
			return 7/24*100;	
		default:
			return 0;
	}
}

export function talaToString(tala,digit) {
    
	return tala?tala.toFixed(digit).toString().replace('.',','):0;
}

export const skerdingarprosenta = (n)=> {
	
	return (n<=3)?0.08*(n-1)/n:0.08*(n-2)/n;
}
export function addProps(afangi,synidaemi) {
	
	afangi = {...afangi, 
			...synidaemi,
			einingar: parseFloat(afangi.einingar.replace(',','.')),
            skiptitimar: parseFloat(afangi.skiptitimar.replace(',','.')),
			heiti: afangi.heiti
	};
	const f = (synidaemi.heiti === 'Hægferð')?1:parseFloat(afangi.einingar)/3;
    afangi.onnur_vinna = afangi.skiptitimar > 0 ? 0:afangi.onnur_vinna; 
    afangi.skiptitimarHlutfall = 0.625*parseFloat(afangi.skiptitimar)/(parseFloat(afangi.kennslustundir)*parseFloat(afangi.lengdKst));

	afangi.medalfjoldi = afangi.hopar.reduce((summa,hopur)=>summa + hopur.fjoldi,0)/afangi.hopar.length;
	afangi.skerdingarprosenta = 100*skerdingarprosenta(afangi.hopar.length);
	afangi.stadinKennsla = afangi.kennsluvikur*afangi.kennslustundir*afangi.lengdKst/60;
	afangi.undirbuningurKennslu = afangi.stadinKennsla/40*afangi.undirb_kennslu;
	afangi.fastirLidir = (afangi.timar_namsAetlun + afangi.verkefnisgerd+ afangi.onnur_vinna)*f;
	afangi.samtalsAnNemenda = afangi.stadinKennsla+afangi.undirbuningurKennslu + afangi.fastirLidir;
	afangi.skerding = afangi.hopar.length===1?0:(afangi.samtalsAnNemenda+ vinnaVegnaNemenda(afangi.medalfjoldi,afangi))*(1+afangi.skiptitimarHlutfall)*(afangi.skerdingarprosenta)/100;
    afangi.hopar = afangi.hopar.map((hopur)=>{
    	return {fjoldi: hopur.fjoldi,
                vinnumatSkiptitimar:(afangi.samtalsAnNemenda + vinnaVegnaNemenda(hopur.fjoldi,afangi))*afangi.skiptitimarHlutfall,
    			vinnumat: (afangi.samtalsAnNemenda + vinnaVegnaNemenda(hopur.fjoldi,afangi))*(1+afangi.skiptitimarHlutfall)-afangi.skerding,
                fjoldiAnAlags: afangi.lagmark-hopur.fjoldi > 0 ? afangi.lagmark:(afangi.hamark_n-hopur.fjoldi > 0?hopur.fjoldi:afangi.hamark_n),
                fjoldi20Alag: afangi.hamark_n===afangi.hamark_e ? 0:Math.min(2,Math.max(0,hopur.fjoldi-afangi.hamark_n)),
                fjoldi100Alag: hopur.fjoldi-afangi.hamark_e > 0?hopur.fjoldi-afangi.hamark_e:0}
   	});
    	
    afangi.vinnumatTotal = afangi.hopar.reduce((summa,hopur)=> summa + hopur.vinnumat,0);
   
	return afangi;
}

export function extendState(afangar,Synidaemi) {
    const heitin = Object.keys(afangar);
    
    for (const heiti of heitin) {
        afangar[heiti] = addProps({...afangar[heiti], 
                                    einingar: afangar[heiti].einingar.toString(),
                                    skiptitimar: afangar[heiti].skiptitimar.toString()}, 
                                    Synidaemi[afangar[heiti].synidaemi]);
            
    }
    return afangar;
}
export const vinnaVegnaNemenda = (nemfjoldi,self)=> {
		
		
		let lagmark = self.lagmark;
		let hamark_e = self.hamark_e;
		let hamark_n = self.hamark_n;
        const f = (self.synidaemi === 'Hægferð')?1:parseFloat(self.einingar)/3;

		let vinna_per_nemanda = self.vinna_per_nemanda*f;
			
		let vinnumat = 0;
		
		if (nemfjoldi-hamark_e > 0) {
			vinnumat += (nemfjoldi-hamark_e)*vinna_per_nemanda*2/60;
			nemfjoldi = hamark_e;
		}

		if (nemfjoldi-hamark_n > 0 ) {
			vinnumat += (nemfjoldi-hamark_n)*vinna_per_nemanda*1.20/60;
			nemfjoldi = hamark_n;
		}

		if (nemfjoldi-lagmark > 0 ) {
			vinnumat += (nemfjoldi-lagmark)*vinna_per_nemanda/60;
			
		}

		nemfjoldi = lagmark;
		vinnumat += lagmark*vinna_per_nemanda/60;

		return vinnumat;

	}



export const launatafla  =
{
"1": {"0": 384110, "1": 393713, "2": 403316, "3": 412918, "4":  422522, "5":  432124, "6": 441727, "7": 451330, "8": 460933},
"2": {"0":403316, "1": 413399, "2": 423482, "3": 433565, "4": 443648, "5":  453730, "6": 463812, "7": 473898, "8": 483981},
"3": {"0":423482, "1": 434069, "2": 444656, "3": 455243, "4": 465831, "5":  476417, "6": 487005, "7": 497591, "8": 508178},
"4" : {"0":444656, "1":455773, "2": 466889, "3": 478006,"4":  489121, "5":  500238, "6": 511355, "7": 522471, "8": 533588},
"5": {"0":466889, "1":478562, "2": 490232, "3": 501904, "4": 513579, "5":  525250, "6": 536923, "7": 548594, "8": 560267},
"6": {"0":490232, "1":502490, "2": 514746, "3": 527001,"4":  539257,  "5": 551512, "6": 563769, "7": 576024, "8": 588280},
"7": {"0":514746, "1":527613, "2": 540483, "3": 553351, "4": 566219, "5": 579089, "6": 591957, "7": 604825, "8": 617695},
"8": {"0":540483, "1":553995, "2": 567507, "3": 581019,"4":  594531, "5": 608042, "6": 621555, "7": 635066, "8": 648579},
"9": {"0":567507, "1":581694, "2": 595882, "3": 610069, "4": 624257, "5": 638446, "6": 652632, "7": 666819, "8": 681008},
"10": {"0":595882, "1":610779, "2": 625676, "3": 640572, "4": 655470, "5": 670367, "6": 685264, "7": 700161, "8": 715059},
"11": {"0":625676, "1":641318, "2": 656959, "3": 672601, "4": 688244, "5": 703886, "6": 719527, "7": 735168, "8": 750812},
"12": {"0":656959, "1":673385, "2": 689808, "3": 706232, "4": 722656, "5": 739079, "6": 755504, "7": 771927, "8": 788352},
"13": {"0":689808, "1":707052, "2": 724299, "3": 741543, "4": 758787, "5": 776034, "6": 793278, "7": 810526, "8": 827769},
"14": {"0":724299, "1":742406, "2": 760512, "3": 778620, "4": 796728, "5": 814835, "6": 832943, "7": 851050, "8": 869157},
"15": {"0":760512, "1":779526, "2": 798540, "3": 817552, "4": 836564, "5": 855577, "6": 874591, "7": 893603, "8": 912615},
"16": {"0":798540, "1":818502, "2": 838466, "3": 858428, "4": 878392, "5": 898357, "6": 918319, "7": 938283, "8": 958246},
"17": {"0":838466, "1":859427, "2": 880390, "3": 901351, "4": 922313, "5": 943275, "6": 964235, "7": 985197, "8": 1006159},
"18": {"0":880390, "1":902398, "2": 924409, "3": 946418, "4": 968428, "5": 990436, "6": 1012447, "7": 1034457, "8": 1056466}
};

export const initialState = {

      aldur: '30 ára-',
      vinnuskylda: 720,
      timar: '0',
      starfshlutfall: 100,
      kennsluafslattur: 0,
      launaflokkur: 1,
      threp: 0,
      grunnlaun: launatafla[1][0],
      afangar: {},
      afram: true,
      laun: false,
      fulltStarf: false

};

export const Synidaemi = {
  'Sjúkraliðanám': {
    'heiti': 'Sjúkraliðanám',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Stærðfræði': {
    'heiti': 'Stærðfræði',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 3,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Tungumál': {
    'heiti': 'Tungumál',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  
  'Félagsgreinar': {
    'heiti': 'Félagsgreinar',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Almenn braut': {
    'heiti': 'Almenn braut',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 22,
    'onnur_vinna': 15,
    'vinna_per_nemanda': 200,
    'kostn_per_nem_yn': 6.7,
    'kostn_per_nem_ye': 6.7
  },
  'Hægferð': {
    'heiti': 'Hægferð',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 22,
    'onnur_vinna': 3,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Íslenska': {
    'heiti': 'Íslenska',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 7,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Listgreinar': {
    'heiti': 'Listgreinar',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 18,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Raungreinar': {
    'heiti': 'Raungreinar',
    'lagmark': 15,
    'hamark_n': 26,
    'hamark_e': 26,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 7.5,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Verklegt': {
    'heiti': 'Verklegt',
    'lagmark': 8,
    'hamark_n': 14,
    'hamark_e': 14,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 30,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 5.0,
    'kostn_per_nem_ye': 5.0
  },
  'Fagbóklegt': {
    'heiti': 'Fagbóklegt',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 16.5,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Tölvuáfangar': {
    'heiti': 'Tölvuáfangar',
    'lagmark': 12,
    'hamark_n': 22,
    'hamark_e': 22,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 12,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Íþróttafræði': {
    'heiti': 'Íþróttafræði',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 0,
    'vinna_per_nemanda': 140,
    'kostn_per_nem_yn': 2.8,
    'kostn_per_nem_ye': 4.7
  },
  'Íþróttir': {
    'heiti': 'Íþróttir',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 14.1,
    'onnur_vinna': 6,
    'vinna_per_nemanda': 159,
    'kostn_per_nem_yn': 3.3,
    'kostn_per_nem_ye': 5.4
  },
    'Starfsbraut (1/3)': {
    'heiti': 'Starfsbraut (1/3)',
    'lagmark': 1,
    'hamark_n': 3,
    'hamark_e': 3,
    'timar_namsAetlun': 12,
    'undirb_kennslu': 20,
    'verkefnisgerd': 21,
    'onnur_vinna': 54,
    'vinna_per_nemanda': 195,
    'kostn_per_nem_yn': 0,
    'kostn_per_nem_ye': 0
  },
    'Starfsbraut (4/6)': {
    'heiti': 'Starfsbraut (4/6)',
    'lagmark': 4,
    'hamark_n': 6,
    'hamark_e': 6,
    'timar_namsAetlun': 12,
    'undirb_kennslu': 20,
    'verkefnisgerd': 21,
    'onnur_vinna': 54,
    'vinna_per_nemanda': 180,
    'kostn_per_nem_yn': 0,
    'kostn_per_nem_ye': 0
  },
    'Starfsbraut (7/12)': {
    'heiti': 'Starfsbraut (7/12)',
    'lagmark': 7,
    'hamark_n': 12,
    'hamark_e': 12,
    'timar_namsAetlun': 12,
    'undirb_kennslu': 20,
    'verkefnisgerd': 21,
    'onnur_vinna': 54,
    'vinna_per_nemanda': 165,
    'kostn_per_nem_yn': 0,
    'kostn_per_nem_ye': 0
  },
  'Sýnidæmið mitt': {
    'heiti': 'Sýnidæmið mitt',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Stærðfræði, neðra þrep (gamalt)': {
    'heiti': 'Stærðfræði, neðra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 0,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Stærðfræði, efra þrep (gamalt)': {
    'heiti': 'Stærðfræði, efra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 0,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Jarðfræði (gamalt)': {
    'heiti': 'Jarðfræði (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 0,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Enska, neðra þrep (gamalt)': {
    'heiti': 'Enska, neðra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Enska, efra þrep (gamalt)': {
    'heiti': 'Enska, efra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
    'Danska, neðra þrep (gamalt)': {
    'heiti': 'Danska, neðra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Danska, efra þrep (gamalt)': {
    'heiti': 'Danska, efra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
   'Erlend mál, neðra þrep (gamalt)': {
    'heiti': 'Erlend mál, neðra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Erlend mál, efra þrep (gamalt)': {
    'heiti': 'Erlend mál, efra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
   'Félagsgreinar, neðra þrep (gamalt)': {
    'heiti': 'Félagsgreinar, neðra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Félagsgreinar, efra þrep (gamalt)': {
    'heiti': 'Félagsgreinar, efra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 4,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Almenn braut (gamalt)': {
    'heiti': 'Almenn braut (gamalt)',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 20,
    'onnur_vinna': 18.5,
    'vinna_per_nemanda': 190,
    'kostn_per_nem_yn': 6.3,
    'kostn_per_nem_ye': 6.3
  },
  'Íslenska, hægferð (gamalt)': {
    'heiti': 'Íslenska, hægferð (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 20,
    'onnur_vinna': 3.5,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Stærðfræði, hægferð (gamalt)': {
    'heiti': 'Stærðfræði, hægferð (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 20,
    'onnur_vinna': 3.5,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
    'Danska, hægferð (gamalt)': {
    'heiti': 'Danska, hægferð (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 20,
    'onnur_vinna': 3.5,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Enska, hægferð (gamalt)': {
    'heiti': 'Enska, hægferð (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 15,
    'verkefnisgerd': 20,
    'onnur_vinna': 3.5,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5
  },
  'Íslenska, neðra þrep (gamalt)': {
    'heiti': 'Íslenska, neðra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 5,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
  'Íslenska, efra þrep (gamalt)': {
    'heiti': 'Íslenska, efra þrep (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 7,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 3.2,
    'kostn_per_nem_ye': 5.3
  },
    'Listgreinar, neðra þrep (gamalt)': {
    'heiti': 'Listgreinar, neðra þrep (gamalt)',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'lokaprof': 0,
    'onnur_vinna': 21,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 5,
    'kostn_per_nem_ye': 5
  },
  'Listgreinar, efra þrep (gamalt)': {
    'heiti': 'Listgreinar, efra þrep (gamalt)',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 18,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5,
    'kostn_per_nem_ye': 5
  },
  'Raungreinar, efra þrep (gamalt)': {
    'heiti': 'Raungreinar, efra þrep (gamalt)',
    'lagmark': 15,
    'hamark_n': 26,
    'hamark_e': 26,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 7.5,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Raungreinar, neðra þrep (gamalt)': {
    'heiti': 'Raungreinar, neðra þrep (gamalt)',
    'lagmark': 15,
    'hamark_n': 26,
    'hamark_e': 26,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 7.5,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 5,
    'kostn_per_nem_ye': 5
  },
  'Verklegt (gamalt)': {
    'heiti': 'Verklegt (gamalt)',
    'lagmark': 8,
    'hamark_n': 14,
    'hamark_e': 14,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 31.5,
    'vinna_per_nemanda': 135,
    'kostn_per_nem_yn': 4.5,
    'kostn_per_nem_ye': 4.5
  },
  'Fagbóklegt (gamalt)': {
    'heiti': 'Fagbóklegt (gamalt)',
    'lagmark': 10,
    'hamark_n': 18,
    'hamark_e': 18,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 22,
    'onnur_vinna': 16.5,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Tölvuáfangar (gamalt)': {
    'heiti': 'Tölvuáfangar (gamalt)',
    'lagmark': 12,
    'hamark_n': 22,
    'hamark_e': 22,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 12,
    'vinna_per_nemanda': 160,
    'kostn_per_nem_yn': 5.3,
    'kostn_per_nem_ye': 5.3
  },
  'Íþróttafræði (gamalt)': {
    'heiti': 'Íþróttafræði (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 20,
    'onnur_vinna': 4.3,
    'vinna_per_nemanda': 130,
    'kostn_per_nem_yn': 2.6,
    'kostn_per_nem_ye': 4.3
  },
  'Íþróttir (gamalt)': {
    'heiti': 'Íþróttir (gamalt)',
    'lagmark': 17,
    'hamark_n': 28,
    'hamark_e': 30,
    'timar_namsAetlun': 6,
    'undirb_kennslu': 20,
    'verkefnisgerd': 12,
    'onnur_vinna': 6,
    'vinna_per_nemanda': 150,
    'kostn_per_nem_yn': 3,
    'kostn_per_nem_ye': 5.1
  }
};

