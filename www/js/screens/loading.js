import * as me from './../melonjs.module.js';
import game from './../game.js';
import UIContainer from './../entities/HUD.js';

class LoadingScreen extends me.Stage {

        constructor(...args) {
            super(...args);
        }

        onResetEvent() {
            var sprite = new me.Sprite (0,0,
                             {image:me.loader.getImage('loading')}
                             );
            //TODO -> this doesn't work if the image hasn't been loaded yet
            //var spriteWidth = sprite.width;
            //var spriteHeight = sprite.height;
            //TODO so force the variables...
            var spriteWidth = 1920;
            var spriteHeight = 1080;

            var scaleX = (me.game.viewport.bounds.max.x - me.game.viewport.bounds.min.x) / spriteWidth;
            var scaleY = (me.game.viewport.bounds.max.y - me.game.viewport.bounds.min.y)/ spriteHeight;

            sprite.scale(scaleX, scaleY);
            sprite.anchorPoint.set(0, 0);
            // title screen
            me.game.world.addChild(sprite, 1);
        }
};



export default LoadingScreen;


