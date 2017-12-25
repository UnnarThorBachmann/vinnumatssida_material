
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
	afangi.skerding = afangi.hopar.length==1?0:(afangi.samtalsAnNemenda + vinnaVegnaNemenda(afangi.medalfjoldi,afangi))*(afangi.skerdingarprosenta)/100;
    afangi.hopar = afangi.hopar.map((hopur)=>{
    	return {fjoldi: hopur.fjoldi,
                vinnumatSkiptitimar:(afangi.samtalsAnNemenda-afangi.skerding + vinnaVegnaNemenda(hopur.fjoldi,afangi))*afangi.skiptitimarHlutfall,
    			vinnumat: (afangi.samtalsAnNemenda-afangi.skerding + vinnaVegnaNemenda(hopur.fjoldi,afangi))*(1+afangi.skiptitimarHlutfall),
                fjoldiAnAlags: afangi.lagmark-hopur.fjoldi > 0 ? afangi.lagmark:(afangi.hamark_n-hopur.fjoldi > 0?hopur.fjoldi:afangi.hamark_n),
                fjoldi20Alag: afangi.hamark_n===afangi.hamark_e ? 0:Math.min(2,Math.max(0,hopur.fjoldi-afangi.hamark_n)),
                fjoldi100Alag: hopur.fjoldi-afangi.hamark_e > 0?hopur.fjoldi-afangi.hamark_e:0}
   	});
    	
    afangi.vinnumatTotal = afangi.hopar.reduce((summa,hopur)=> summa + hopur.vinnumat,0);
   
	return afangi;
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



export const launatafla =
{
  "1": {"0": 368436, "1": 377647,"2": 386858, "3": 396069, "4": 405280, "5": 414491,  "6": 423702, "7": 432913, "8": 442124},
  "2": {"0": 386858, "1": 396530, "2": 406201, "3": 415873, "4": 425544, "5": 435215, "6": 444886, "7": 454560, "8": 464231},
  "3": {"0": 406201, "1": 416357, "2": 426511, "3": 436667, "4": 446822, "5": 456976, "6": 467132, "7": 477286, "8": 487442},
  "4": {"0": 426511, "1": 437174, "2": 447837, "3": 458500, "4": 469162, "5": 479825, "6": 490488, "7": 501151, "8": 511814},
  "5": {"0": 447837, "1": 459033, "2": 470228, "3": 481424, "4": 492622, "5": 503817, "6": 515013, "7": 526208, "8": 537404},
  "6": {"0": 470228, "1": 481985, "2": 493741, "3": 505497, "4": 517252, "5": 529007, "6": 540764, "7": 552518, "8": 564275},
  "7": {"0": 493741, "1": 506084, "2": 518428, "3": 530771, "4": 543114, "5": 555458, "6": 567802, "7": 580145, "8": 592489},
  "8": {"0": 518428, "1": 531388, "2": 544349, "3": 557309, "4": 570271, "5": 583231, "6": 596192, "7": 609152, "8": 622113},
  "9": {"0": 544349, "1": 557957, "2": 571566, "3": 585175, "4": 598784, "5": 612393, "6": 626000, "7": 639609, "8": 653219},
  "10":{"0": 571566, "1": 585856, "2": 600145, "3": 614433, "4": 628723, "5": 643012, "6": 657301, "7": 671590, "8": 685880},
  "11": {"0": 600145, "1": 615148, "2": 630151, "3": 645155, "4": 660159, "5": 675163, "6": 690166, "7": 705169, "8": 720174},
  "12": {"0": 630151, "1": 645906, "2": 661659, "3": 677413, "4": 693167, "5": 708920, "6": 724675, "7": 740428, "8": 756182},
  "13": {"0":661659, "1": 678200, "2": 694743, "3": 711284, "4": 727824, "5": 744367, "6": 760908, "7": 777451, "8": 793991},
  "14": {"0":694743,"1": 712111, "2": 729479, "3": 746848, "4": 764217, "5": 781585, "6": 798954, "7": 816322, "8": 833690},
  "15": {"0":729.479, "1": 747716, "2": 765954, "3": 784191, "4": 802427, "5": 820664, "6": 838902, "7": 857138, "8": 875375},
  "16": {"0":765954, "1": 785102, "2": 804251, "3": 823399, "4": 842549, "5": 861698, "6": 880846, "7": 899995, "8": 919144},
  "17": {"0":804251, "1": 824357, "2": 844464, "3": 864570, "4": 884677, "5": 904783, "6": 924888, "7": 944995, "8": 965101},
  "18": {"0":844464, "1": 865575, "2": 886687, "3": 907799, "4": 928910, "5": 950021, "6": 971133, "7": 992245, "8": 1013356}
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
      afram: true
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

