import * as me from './../melonjs.module.js';
import game from './../game.js';

class PlayerEntity extends me.Entity {
    constructor(x, y, settings) {
        // call the constructor
        super(x, y , settings);

        // set a "player object" type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;

        this.body.gravityScale = 0.4;

        // player can exit the viewport (jumping, falling into a hole, etc.)
        this.alwaysUpdate = true;

        // walking & jumping speed
        this.body.setMaxVelocity(6, 25);
        this.body.setFriction(0.4, 0);

        this.dying = false;

        this.multipleJump = 1;

        // set the viewport to follow this renderable on both axis, and enable damping
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH, 0.1);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.X,     "jump", true);
        me.input.bindKey(me.input.KEY.UP,    "jump", true);
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);
        me.input.bindKey(me.input.KEY.DOWN,  "down");

        me.input.bindKey(me.input.KEY.A,     "left");
        me.input.bindKey(me.input.KEY.D,     "right");
        me.input.bindKey(me.input.KEY.W,     "jump", true);
        me.input.bindKey(me.input.KEY.S,     "down");

        //me.input.registerPointerEvent("pointerdown", this, this.onCollision.bind(this));
        //me.input.bindPointer(me.input.pointer.RIGHT, me.input.KEY.LEFT);

        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_1}, me.input.KEY.UP);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_2}, me.input.KEY.UP);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.DOWN}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_3}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.FACE_4}, me.input.KEY.DOWN);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.LEFT}, me.input.KEY.LEFT);
        me.input.bindGamepad(0, {type: "buttons", code: me.input.GAMEPAD.BUTTONS.RIGHT}, me.input.KEY.RIGHT);

        // map axes
        me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: -0.5}, me.input.KEY.LEFT);
        me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LX, threshold: 0.5}, me.input.KEY.RIGHT);
        me.input.bindGamepad(0, {type:"axes", code: me.input.GAMEPAD.AXES.LY, threshold: -0.5}, me.input.KEY.UP);

        // set a renderable
        this.renderable = game.texture.createAnimationFromName([
            "Santa1_1.png", "Santa1_2.png", "Santa1_3.png",
            "Santa1_4.png", "Santa1_5.png", "Santa1_6.png",
            "Santa1_7.png", "Santa1_8.png", "Santa1_9.png",
            "Santa1_10.png", "Santa1_11.png",
            "Santa2_1.png", "Santa2_2.png", "Santa2_3.png",
            "Santa2_4.png", "Santa2_5.png", "Santa2_6.png",
            "Santa2_7.png", "Santa2_8.png", "Santa2_9.png",
            "Santa2_10.png", 
            "Santa3_1.png", "Santa3_2.png", "Santa3_3.png",
            "Santa3_4.png", "Santa3_5.png", "Santa3_6.png",
            "Santa3_7.png", "Santa3_8.png", "Santa3_9.png",
            "Santa3_10.png", "Santa3_11.png",
            "Santa4_1.png", "Santa4_2.png", "Santa4_3.png",
            "Santa4_4.png", "Santa4_5.png", "Santa4_6.png",
            "Santa4_7.png", "Santa4_8.png", "Santa4_9.png",
            "Santa5_1.png", "Santa5_2.png", "Santa5_3.png",
            "Santa5_4.png", "Santa5_5.png", "Santa5_6.png",
            "Santa5_7.png", "Santa5_8.png", "Santa5_9.png",
            "Santa6_1.png", "Santa6_2.png", "Santa6_3.png",
            "Santa6_4.png", "Santa6_5.png", "Santa6_6.png",
            "Santa6_7.png", "Santa6_8.png", "Santa6_9.png"
        ]);

        //define a die an1mation
        this.renderable.addAnimation ("die",  [{ name: "Santa6_1.png", delay: 50 },
                                                { name: "Santa6_2.png", delay: 50 },
                                                { name: "Santa6_3.png", delay: 50 },
                                                { name: "Santa6_4.png", delay: 50 },
                                                { name: "Santa6_5.png", delay: 50 },
                                                { name: "Santa6_6.png", delay: 50 },
                                                { name: "Santa6_7.png", delay: 50 },
                                                { name: "Santa6_8.png", delay: 50 },
                                                { name: "Santa6_9.png", delay: 50 }]);

        //define an idle an1mation
        this.renderable.addAnimation ("idle",  [{ name: "Santa1_1.png", delay: 50 },
                                                { name: "Santa1_2.png", delay: 50 },
                                                { name: "Santa1_3.png", delay: 50 },
                                                { name: "Santa1_4.png", delay: 50 },
                                                { name: "Santa1_5.png", delay: 50 },
                                                { name: "Santa1_6.png", delay: 50 },
                                                { name: "Santa1_7.png", delay: 50 },
                                                { name: "Santa1_8.png", delay: 50 },
                                                { name: "Santa1_9.png", delay: 50 },
                                                { name: "Santa1_10.png", delay: 50 },
                                                { name: "Santa1_11.png", delay: 50 }]);

        //define a run animation
        this.renderable.addAnimation ("run",  [{ name: "Santa3_1.png", delay: 50 },
                                                { name: "Santa3_2.png", delay: 50 },
                                                { name: "Santa3_3.png", delay: 50 },
                                                { name: "Santa3_4.png", delay: 50 },
                                                { name: "Santa3_5.png", delay: 50 },
                                                { name: "Santa3_6.png", delay: 50 },
                                                { name: "Santa3_7.png", delay: 50 },
                                                { name: "Santa3_8.png", delay: 50 },
                                                { name: "Santa3_9.png", delay: 50 },
                                                { name: "Santa3_10.png", delay: 50 },
                                                { name: "Santa3_11.png", delay: 50 }]);

        // define a basic walking animation
        this.renderable.addAnimation ("walk",  [{ name: "Santa2_1.png", delay: 50 },
                                                { name: "Santa2_2.png", delay: 50 },
                                                { name: "Santa2_3.png", delay: 50 },
                                                { name: "Santa2_4.png", delay: 50 },
                                                { name: "Santa2_5.png", delay: 50 },
                                                { name: "Santa2_6.png", delay: 50 },
                                                { name: "Santa2_7.png", delay: 50 },
                                                { name: "Santa2_8.png", delay: 50 },
                                                { name: "Santa2_9.png", delay: 50 },
                                                { name: "Santa2_10.png", delay: 50 }]);
        //define a jump animation
        this.renderable.addAnimation ("jump",  [{ name: "Santa4_1.png", delay: 50 },
                                                { name: "Santa4_2.png", delay: 50 },
                                                { name: "Santa4_3.png", delay: 50 },
                                                { name: "Santa4_4.png", delay: 50 },
                                                { name: "Santa4_5.png", delay: 50 },
                                                { name: "Santa4_6.png", delay: 50 },
                                                { name: "Santa4_7.png", delay: 50 },
                                                { name: "Santa4_8.png", delay: 50 },
                                                { name: "Santa4_9.png", delay: 50 }]);

        // set as default
        this.renderable.setCurrentAnimation("walk");

        // set the renderable position to bottom center
        this.anchorPoint.set(0.5, 0.5);
    }

    /**
     ** update the force applied
     */
    update(dt) {
        if (me.input.isKeyPressed("left"))    {
            this.body.force.x = -this.body.maxVel.x;
            this.renderable.flipX(true);
            if (!this.body.jumping && !this.renderable.current.name == "walk") {this.renderable.setCurrentAnimation("run");}
        } else if (me.input.isKeyPressed("right")) {
            this.body.force.x = this.body.maxVel.x;
            this.renderable.flipX(false);
            if (!this.body.jumping && !this.renderable.current.name == "walk") {this.renderable.setCurrentAnimation("run");}
        }

        if (me.input.isKeyPressed("jump") && (this.body.vel.y <= 0)) {
            this.body.jumping = true;
            this.renderable.setCurrentAnimation("jump");
            if (this.multipleJump <= 2) {
                // easy "math" for double jump
                this.body.force.y = -this.body.maxVel.y * this.multipleJump++;
                me.audio.stop("jump");
                me.audio.play("jump", false);
            }
        } else {
            if (!this.body.falling && !this.body.jumping) {
                // reset the multipleJump flag if on the ground
                this.multipleJump = 1;
            }
            else if (this.body.falling && this.multipleJump < 2) {
                // reset the multipleJump flag if falling
                this.multipleJump = 2;
            }
        }

        // check if we fell into a hole
        if (!this.inViewport && (this.pos.y > me.video.renderer.getHeight())) {
            // if yes reset the game
            this.renderable.setCurrentAnimation("die");
            me.game.world.removeChild(this);
            me.game.score = me.game.previousScore || 0;
            me.game.viewport.fadeIn("#fff", 150, function(){
                me.audio.play("die", false);
                me.level.reload();
                me.game.viewport.fadeOut("#fff", 150);
            });
            return true;
        }

       if (this.body && this.body.vel.x == 0 && this.body.vel.y == 0) {
            if (this.renderable && this.renderable.current && !this.renderable.current.name == "idle") {
                this.renderable.setCurrentAnimation("idle");
            }
        } else {

            // check if we moved (an "idle" animation would definitely be cleaner)
            if (this.body.vel.x !== 0 || this.body.vel.y !== 0 ||
                (this.renderable && this.renderable.isFlickering())
            ) {
                super.update(dt);
                return true;
            }
        }
        return false;
    }


    /**
     * collision handler
     */
    onCollision(response, other) {
        switch (other.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                // Simulate a platform object
                if (other.type === "platform") {
                    if (this.body.falling &&
                        !me.input.isKeyPressed("down") &&
                        // Shortest overlap would move the player upward
                        (response.overlapV.y > 0) &&
                        // The velocity is reasonably fast enough to have penetrated to the overlap depth
                        (~~this.body.vel.y >= ~~response.overlapV.y)
                    ) {
                        // Disable collision on the x axis
                        response.overlapV.x = 0;
                        // Repond to the platform (it is solid)
                        return true;
                    }
                    // Do not respond to the platform (pass through)
                    return false;
                }

                // Custom collision response for slopes
                else if (other.type === "slope") {
                    // Always adjust the collision response upward
                    response.overlapV.y = Math.abs(response.overlap);
                    response.overlapV.x = 0;

                    // Respond to the slope (it is solid)
                    return true;
                }
                break;

            case me.collision.types.ENEMY_OBJECT:
                if (!other.isMovingEnemy) {
                    // spike or any other fixed danger
                    this.body.vel.y -= this.body.maxVel.y * me.timer.tick;
                    this.hurt();
                }
                else {
                    // a regular moving enemy entity
                    if ((response.overlapV.y > 0) && this.body.falling) {
                        // jump
                        this.body.vel.y -= this.body.maxVel.y * 1.5 * me.timer.tick;
                    }
                    else {
                        this.hurt();
                    }
                    // Not solid
                    return false;
                }
                break;

            default:
                // Do not respond to other objects (e.g. coins)
                return false;
        }

        // Make the object solid
        return true;
    }

    /**
     * ouch
     */
    hurt() {
        var sprite = this.renderable;

        if (!sprite.isFlickering()) {

            // tint to red and flicker
            sprite.tint.setColor(255, 192, 192);
            sprite.flicker(750, function () {
                // clear the tint once the flickering effect is over
                sprite.tint.setColor(255, 255, 255);
            });

            // flash the screen
            me.game.viewport.fadeIn("#FFFFFF", 75);
            me.audio.play("die", false);
        }
    }
};

export default PlayerEntity;
