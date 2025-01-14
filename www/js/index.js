import * as me from './melonjs.module.js';

import game from './game.js';
import resources from './resources.js';
import PlayerEntity from './entities/player.js';
import { SnowmanEnemyEntity, SnowballEnemyEntity } from './entities/enemies.js';
import { Tree, CoinEntity } from './entities/coin.js';
import PlayScreen from './screens/play.js';
import LoadingScreen from './screens/loading.js';



/**
 *
 * Initialize the application
 */
export default function onload() {

    // init the video
    if (!me.video.init(10*256, 10*256*.75, {parent : "screen", scaleMethod : "flex-width", renderer : me.video.AUTO, preferWebGL1 : false, subPixel : false })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the Debug Panel
    import('./plugin/debug/debugPanel.js').then((plugin) => {
        // automatically register the debug panel
        me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel");
    });


    // initialize the "sound engine"
    me.audio.init("mp3,ogg");

   // preload loading image
   me.loader.load({name: "loading",  type:"image",  src: "data/img/loading.png"});

   // load everything & display a loading screen
   me.state.set(me.state.LOADING, new LoadingScreen());

       //me.state.transition("fade","#000", 333);

   me.state.change(me.state.LOADING);

    // set all resources to be loaded
    me.loader.preload(resources, () => {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", PlayerEntity);
        me.pool.register("SnowmanEntity", SnowmanEnemyEntity);
        me.pool.register("SnowballEntity", SnowballEnemyEntity);
        me.pool.register("CoinEntity", CoinEntity, true);
        me.pool.register("Tree", Tree, true);

        // load the texture atlas file
        // this will be used by renderable object later
        game.texture = new me.TextureAtlas(
            me.loader.getJSON("texture"),
            me.loader.getImage("texture")
        );

        // add some keyboard shortcuts
        me.event.on(me.event.KEYDOWN, (action, keyCode /*, edge */) => {

            // change global volume setting
            if (keyCode === me.input.KEY.PLUS) {
                // increase volume
                me.audio.setVolume(me.audio.getVolume()+0.1);
            } else if (keyCode === me.input.KEY.MINUS) {
                // decrease volume
                me.audio.setVolume(me.audio.getVolume()-0.1);
            }

            // toggle fullscreen on/off
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen()) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    });
}
