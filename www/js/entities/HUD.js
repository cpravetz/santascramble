import * as me from './../melonjs.module.js';
import game from './../game.js';

/**
 * a basic control to toggle fullscreen on/off
 */
class FSControl extends me.UISpriteElement {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            region : "shadedDark30.png"
        });
        this.setOpacity(0.75);
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.75);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
        if (!me.device.isFullscreen()) {
            me.device.requestFullscreen();
        } else {
            me.device.exitFullscreen();
        }
        return false;
    }
};

/**
 * a basic control to toggle fullscreen on/off
 */
class AudioControl extends me.UISpriteElement {
    /**
     * constructor
     */
    constructor(x, y) {
        super(x, y, {
            image: game.texture,
            region : "shadedDark13.png" // ON by default
        });
        this.setOpacity(0.75);
        this.isMute = false;
    }

    /**
     * function called when the pointer is over the object
     */
    onOver(/* event */) {
        this.setOpacity(1.0);
    }

    /**
     * function called when the pointer is leaving the object area
     */
    onOut(/* event */) {
        this.setOpacity(0.75);
    }

    /**
     * function called when the object is clicked on
     */
    onClick(/* event */) {
        if (this.isMute) {
            me.audio.unmuteAll();
            this.setRegion(game.texture.getRegion("shadedDark13.png"));
            this.isMute = false;
        } else {
            me.audio.muteAll();
            this.setRegion(game.texture.getRegion("shadedDark15.png"));
            this.isMute = true;
        }
        return false;
    }
};

/**
 * a basic HUD item to display score
 */
class ScoreItem extends me.BitmapText {
    /**
     * constructor
     */
    constructor(x, y) {
        // call the super constructor
        super(
            x,
            y,
            {
                font : "Dimbo",
                size: 4,
                fillStyle: "red", //new me.Color(255,255,0),
                textAlign : "right",
                textBaseline : "bottom",
                text : "0"
            }
        );

        this.relative = new me.Vector2d(me.game.viewport.width-x, me.game.viewport.height-y);

        // local copy of the global score
        this.score = -1;

        // recalculate the object position if the canvas is resize
        me.event.on(me.event.CANVAS_ONRESIZE, (function(w, h){
            this.pos.set(Math.min(4000,w - 300), 200);
        }).bind(this));
    }

    /**
     * update function
     */
    update( dt ) {
        if (this.score !== game.data.score) {
            this.score = game.data.score;
            this.setText(this.score);
            this.isDirty = true;
        }
        return super.update(dt);
    }
};

/**
 * a HUD container and child items
 */
class UIContainer extends me.Container {

    constructor() {
        // call the constructor
        super();

        // persistent across level change
        this.isPersistent = true;

        // Use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at position
        var scoreBox = new ScoreItem(Math.min(4000,me.game.viewport.width - 300), 200);
        this.addChild(scoreBox);  // me.game.viewport.width - 300  // me.game.viewport.width*0.95

        // add our audio control object
        this.addChild(new AudioControl(72, 112));

        if (!me.device.isMobile) {
            // add our fullscreen control object
            this.addChild(new FSControl(72 + 10 + 96, 112));
        }

    }
};

export default UIContainer;
