import Global from '/js/Global.js';

class Roue {
    constructor(id, tab_elem) {
        this.id = id;
        this.tab_elem = tab_elem;
        this.current_elem = 1;
    }

    async update(ctx) {
        let random_nb_tour = Math.floor(Math.random() * 100) + 30;
        let vitesse = 10;
        for (let i = 0; i < random_nb_tour; i++) {

            let refresh = Global.TAILLE_ICON / 4;

            for (let i = 0; i < 4; i++) {
                ctx.clearRect(Global.TAILLE_ICON * this.id, 0, Global.TAILLE_ICON, Global.HEIGHT_CANVAS);
                this.tab_elem.forEach(elem => {
                    elem.update(ctx, refresh);
                });
                await new Promise(resolve => setTimeout(resolve, vitesse));
            }

            if (i >= random_nb_tour - 10) {
                vitesse *= 1.1;
            }

            this.current_elem--;
            if (this.current_elem < 0)
                this.current_elem = Global.NB_ELEM - 1;
        }
    }

}

export default Roue;
