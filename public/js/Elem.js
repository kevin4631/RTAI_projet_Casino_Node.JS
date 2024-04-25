import Global from '/js/Global.js';

class Elem {
    constructor(id, x, y, name, ctx) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = new Image();
        this.img.src = '/images/' + this.name + '.png';
        this.img.onload = () => {
            this.update(ctx, 0);
        };
    }

    update(ctx, vy) {
        this.y += vy;

        if (this.y >= Global.TAILLE_ICON * Global.NB_ELEM + Global.DECALLAGE_HAUT - Global.TAILLE_ICON)
            this.y = Global.DECALLAGE_HAUT - Global.TAILLE_ICON;

        this.draw(ctx)
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, Global.TAILLE_ICON, Global.TAILLE_ICON);
    }
}


export default Elem;
