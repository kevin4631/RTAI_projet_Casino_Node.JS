import Global from '/js/Global.js';
import Elem from '/js/Elem.js';
import Roue from '/js/Roue.js';


class MachineSous {
    constructor(ctx) {
        this.tab_roue = [
            this.createRoue(0, ['orange', 'bar', 'raisins', 'pasteque', 'cloche', 'citron', 'cerise', 'sept'], ctx),
            this.createRoue(1, ['raisins', 'orange', 'bar', 'pasteque', 'citron', 'cloche', 'cerise', 'sept'], ctx),
            this.createRoue(2, ['sept', 'bar', 'citron', 'pasteque', 'cloche', 'cerise', 'orange', 'raisins'], ctx),
            this.createRoue(3, ['pasteque', 'sept', 'raisins', 'orange', 'cloche', 'bar', 'citron', 'cerise'], ctx),
            this.createRoue(4, ['citron', 'cloche', 'sept', 'bar', 'pasteque', 'cerise', 'raisins', 'orange'], ctx)
        ]
    }

    createRoue(id_roue, tab_nomElem, ctx) {
        let tab_elem = [];
        let id_elm = 0;

        tab_nomElem.forEach(nom => {
            tab_elem.push(new Elem(id_elm, Global.TAILLE_ICON * id_roue, Global.TAILLE_ICON * id_elm - 30, nom, ctx));
            id_elm++;
        });

        return new Roue(id_roue, tab_elem);
    }


    update(ctx) {
        // Créer un tableau de promesses pour stocker les promesses de chaque appel à la méthode update de chaque instance de Roue
        const promises = this.tab_roue.map(roue => roue.update(ctx));

        // Utiliser Promise.all pour attendre que toutes les promesses soient résolues
        return Promise.all(promises);
    }


    verifierCombinaison(tab_result) {
        // Cas -1 : ENV DE TEST UNIQUEMENT
        for (let i = 0; i < tab_result.length - 2; i++) {
            if (tab_result[i] === tab_result[i + 1] || tab_result[i+1] === tab_result[i + 2]) {
                return -1;
            }
        }

        // Cas 3 : Cinq éléments identiques
        let firstElement = tab_result[0];
        if (tab_result.every(elem => elem === firstElement)) {
            return 3;
        }

        // Cas 2 : Trois éléments identiques consécutifs et 2 Identique
        if (tab_result[0] === tab_result[1] && tab_result[1] === tab_result[2] && tab_result[3] === tab_result[4]
            || tab_result[0] === tab_result[1] && tab_result[2] === tab_result[3] && tab_result[3] === tab_result[4]
            || tab_result[0] === tab_result[4] && tab_result[1] === tab_result[2] && tab_result[2] === tab_result[3])
            return 2;

        // Cas 1 : Trois éléments identiques consécutifs
        for (let i = 0; i < tab_result.length - 2; i++) {
            if (tab_result[i] === tab_result[i + 1] && tab_result[i] === tab_result[i + 2]) {
                return 1;
            }
        }

        // Cas 0 : Perdue
        return 0;
    }

    isWin() {
        let tab_result = [];

        this.tab_roue.forEach(roue => {
            tab_result.push(roue.tab_elem[roue.current_elem].name)
        });

        console.log(tab_result);
        return this.verifierCombinaison(tab_result);
    }

    async jouer(ctx) {
        console.log("machine start");
        await this.update(ctx);
        console.log("machine stop");

        return this.isWin();
    }

}


export default MachineSous;
