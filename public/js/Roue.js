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

            // Si nous sommes dans les 5 dernières itérations, ralentissons de manière exponentielle
            if (i >= random_nb_tour - 10) {
                vitesse *= 1.1; // Doublez la vitesse à chaque itération pour ralentir exponentiellement
            }

            this.current_elem++;
            if (this.current_elem >= 8)
                this.current_elem = 0;
        }
    }

}

export default Roue;
