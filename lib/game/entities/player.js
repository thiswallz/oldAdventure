/**
 * Created with JetBrains WebStorm.
 * User: mauriciobarria
 * Date: 14-04-13
 * Time: 20:33
 * To change this template use File | Settings | File Templates.
 */
ig.module(
        'game.entities.player'
    )
    .requires(
        'impact.entity'
    )
    .defines(function(){

        EntityPlayer = ig.Entity.extend({
            size: {x: 32, y: 48},
            offset: {x: 0, y: 0},
            maxVel: {x: 200, y: 200},
            type: ig.Entity.TYPE.A,
            checkAgainst: ig.Entity.TYPE.NONE,
            collides: ig.Entity.COLLIDES.PASSIVE, // Collision is already handled by Box2D!
            animSheet: new ig.AnimationSheet( 'media/player/player.png', 32, 48),
            player: true,
            starPosition: null,
            flip: {x: false, y: false},

            velocity: 120,

            kill: function(){
                this.parent();
                var x = this.starPosition.x;
                var y = this.starPosition.y;

                ig.game.spawnEntity(EntityPlayer, x, y)
            },
            init: function( x, y, settings ) {
                this.parent( x, y, settings );

                //basic movement
                this.addAnim('idle',  1,    [0] );
                this.addAnim('left',  0.13, [4,5,6,7,6,5] );
                this.addAnim('right', 0.13, [8,9,10,11,10,9] );
                this.addAnim('up',    0.13, [12,13,14,15,14,13] );
                this.addAnim('down',  0.13, [0,1,2,3,2,1] );

                this.starPosition = this.pos;

                ig.game.player = this;
            },
            update: function() {
                // set the current animation, based on the player's speed

                //mov x mov y
                if(ig.input.state('left')) {
                    this.currentAnim = this.anims.left;
                    this.vel.x = -this.velocity;
                    this.vel.y = 0;
                }
                else if(ig.input.state('right')) {
                    this.currentAnim = this.anims.right;
                    this.vel.x = this.velocity;
                    this.vel.y = 0;
                }
                else if(ig.input.state('up')) {
                    this.currentAnim = this.anims.up;
                    this.vel.y = -this.velocity;
                    this.vel.x = 0;
                }else if( ig.input.state('down') ) {
                    this.currentAnim = this.anims.down;
                    this.vel.y = this.velocity;
                    this.vel.x = 0;
                }else{
                    this.vel.y = 0;
                    this.vel.x = 0;
                }
                //basic mov
                if(this.vel.y == 0 && this.vel.x == 0){
                    this.currentAnim = this.anims.idle;
                }

                // move!
                this.parent();
            }
        });
    });