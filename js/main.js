const mojSuperElement = new Vue({
    el: '#mojSuperElement',
    data: {
        hmotnost: null,
        vyska: null
    },
    computed: {
        bmi: function () {
            var bmiCalc = this.hmotnost / (this.vyska / 100 * this.vyska / 100);
            if (!isNaN(bmiCalc) && isFinite(bmiCalc)) {
                return bmiCalc.toFixed(2);
            } else {
                return 0;
            }
        },
        bmiText: function () {
            if (!isFinite(this.bmi)) {
                return '';
            } else if (this.bmi > 0 && this.bmi <= 17.5) {
                return 'podvýživa. Čím je číslo menšie, tým viac sa približujete k podvýžive. Týka sa predovšetkým trpiacich anorexiou či bulímiou. Telo nie je dostatočne vyživované, chýbajú mu základné stopové prvky, čo sa prejavuje častými ochoreniami a celkovým oslabením organizmu.';
            } else if (this.bmi > 17.5 && this.bmi <= 25) {
                return 'ideálna a zdravá váha. Človek s týmto BMI by si mal svoju váhu udržať vyváženou stravou a dostatkom pohybu. Zdravotné komplikácie spojené s hmotnosťou sú v tejto skupine najmenej časté.';
            } else if (this.bmi > 25 && this.bmi <= 30) {
                return 'mierna nadváha. Riziko vysokého tlaku či srdcových ťažkostí sa tu mierne zvyšuje. Poväčšine ide o nesprávne stravovacie návyky, napríklad nadmerné konzumovanie večer a v noci, alebo nevyvážený podiel tukov a iných zložiek potravy. Takisto je tu častý nedostatok pohybu či sedavé zamestnanie.';
            } else if (this.bmi > 30 && this.bmi <= 40) {
                return 'obezita. V tomto prípade ide o pomerne vážne zdravotné riziko.';
            } else if (this.bmi > 40) {
                return 'ťažká obezita. V tomto štádiu je potrebná radikálna zmena stravovacieho režimu a návykov.';
            } else {
                return '';
            }
        }
    }
})