import * as me from './../melonjs.module.js';
import game from './../game.js';

export class Tree extends me.Sprite {

    constructor(x, y, settings) {
        // call the super constructor
        super(x, y,
            {
                image: game.texture,
                region : settings.image,
                frameheight : settings.frameheight || 256,
                framewidth : settings.framewidth || 256
            }
        );
    }

}

export class CoinEntity extends me.Collectable {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // call the super constructor
        super(x, y,
            Object.assign({
                image: game.texture,
                region : settings.image,
                shapes :[new me.Rect(0, 0, settings.framewidth || 256, settings.frameheight|| 256)] // coins are 35x35
            })
        );
    }

    // add a onResetEvent to enable object recycling
    onResetEvent(x, y, settings) {
        this.shift(x, y);
        // only check for collision against player
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    }

    /**
     * collision handling
     */
    onCollision(/*response*/) {

        // do something when collide
        me.audio.play("cling", false);
        // give some score
        game.data.score += 250;

        //avoid further collision and delete it
        this.body.setCollisionMask(me.collision.types.NO_OBJECT);

        me.game.world.removeChild(this);

        return false;
    }
};

//export default CoinEntity;
