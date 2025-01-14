import * as me from './../melonjs.module.js';
import game from './../game.js';

/**
 * An enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
class PathEnemyEntity extends me.Entity {
    /**
     * constructor
     */
    constructor(x, y, settings) {

        // save the area size defined in Tiled
        var width = settings.width || settings.framewidth;

        // adjust the setting size to the sprite one
        settings.width = settings.framewidth;
        settings.height = settings.frameheight;

        // redefine the default shape (used to define path) with a shape matching the renderable
        settings.shapes[0] = new me.Rect(0, 0, settings.framewidth, settings.frameheight);

        // call the super constructor
        super(x, y, settings);

        // set start/end position based on the initial area size
        x = this.pos.x;
        this.startX = x;
        this.endX   = x + width - settings.framewidth;
        this.pos.x  = x + width - settings.framewidth;

        // enemies are not impacted by gravity
        this.body.gravityScale = 0;

        this.walkLeft = false;

        // body walking & flying speed
        this.body.setMaxVelocity(settings.velX || 1, settings.velY || 0);

        // set a "enemyObject" type
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;

        // only check for collision against player and world shape
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT | me.collision.types.WORLD_SHAPE);

        // don't update the entities when out of the viewport
        this.alwaysUpdate = false;

        // a specific flag to recognize these enemies
        this.isMovingEnemy = true;

        // default tint for particles
        this.particleTint = "#FFF";
    }


    /**
     * manage the enemy movement
     */
    update(dt) {

        if (this.alive) {
            if (this.walkLeft === true)
                if (this.pos.x <= this.startX) {
                    // if reach start position
                    this.walkLeft = false;
                    this.renderable.flipX(true);
                } else {
                    this.body.force.x = -this.body.maxVel.x;
                }
            }

            if (this.walkLeft === false) {
                if (this.pos.x >= this.endX) {
                    // if reach the end position
                    this.walkLeft = true;
                    this.renderable.flipX(false);
                } else {
                    this.body.force.x = this.body.maxVel.x;
                }
        }

        // return true if we moved of if flickering
        return super.update(dt);
    }

    /**
     * collision handle
     */
    onCollision(response) {
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
            // make it dead
            this.alive = false;
            //avoid further collision and delete it
            this.body.setCollisionMask(me.collision.types.NO_OBJECT);
            // make the body static
            this.body.setStatic(true);
            // set dead animation
            this.renderable.setCurrentAnimation("dead");

            var emitter = new me.ParticleEmitter(this.centerX, this.centerY, {
                width: this.width / 4,
                height : this.height / 4,
                tint: this.particleTint,
                totalParticles: 32,
                angle: 0,
                angleVariation: 6.283185307179586,
                maxLife: 5,
                speed: 3
            });

            me.game.world.addChild(emitter,this.pos.z);
            me.game.world.removeChild(this);
            emitter.burstParticles();

            // dead sfx
            me.audio.play("enemykill", false);
            // give some score
            game.data.score += 150;
        }
        return false;
    }

};

/**
 * A Snowman enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
export class SnowmanEnemyEntity extends PathEnemyEntity {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // super constructor
        super(x, y, settings);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "snowman_1.png", "snowman_2.png"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animatin
        this.renderable.addAnimation ("walk", ["snowman_1.png","snowman_2.png"
        ]);
        // dead animatin
        this.renderable.addAnimation ("dead", ["snowman_1.png"]);  //TODO Need a dead snowman image

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);

        // particle tint matching the sprite color
        this.particleTint = "#FF35B8";

    }
};

/**
 * A Snowball enemy entity
 * follow a horizontal path defined by the box size in Tiled
 */
export class SnowballEnemyEntity extends PathEnemyEntity {
    /**
     * constructor
     */
    constructor(x, y, settings) {
        // super constructor
        super(x, y, settings);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "snowball_01.png", "snowball_02.png", "snowball_03.png",
            "snowball_04.png", "snowball_05.png", "snowball_06.png"
        ]);

        // custom animation speed ?
        if (settings.animationspeed) {
            this.renderable.animationspeed = settings.animationspeed;
        }

        // walking animation
        this.renderable.addAnimation ("walk", [
            "snowball_01.png", "snowball_02.png", "snowball_03.png",
            "snowball_04.png", "snowball_05.png", "snowball_06.png"
        ]);
        // dead animation
        this.renderable.addAnimation ("dead", ["snowball_06.png"]);  //TODO Need melted snowball

        // set default one
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);

        // particle tint matching the sprite color
        this.particleTint = "#000000";

    }
};


//Add a Trigger that will show ads if we are running cordova
export class AdTrigger extends me.Trigger {
    triggerEvent() {
        if (window.admob) {
            if (window.admob.readyToShow()) {
                window.admob.ShowAnAd();
            } else {
                if (window.admob.adStatus != 'requested') {
                    window.admob.GetAnAdReady();
                }
            }
        };
        super.triggerEvent();
    }
};

    me.pool.register("me.AdTrigger", AdTrigger);
