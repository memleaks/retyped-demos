/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.5.0
 */
Bridge.assembly("PhaserDemo", function ($asm, globals) {
    "use strict";

    Bridge.define("PhaserDemo.App", {
        main: function Main () {
            // Init Event handlers:
            PhaserDemo.App.InitEventHandlers();

            // Run Game1 on start:
            PhaserDemo.App.SwitchGameTo(1);
        },
        statics: {
            fields: {
                _game: null,
                _isRun: false
            },
            methods: {
                InitEventHandlers: function () {
                    // Init event handler for buttons switching scenes
                    var btns = System.Array.init([document.getElementById("sample1Btn"), document.getElementById("sample2Btn"), document.getElementById("sample3Btn")], HTMLElement);

                    for (var i = 0; i < btns.length; i = (i + 1) | 0) {
                        var index = { v : i };
                        btns[System.Array.index(i, btns)].onclick = (function ($me, index) {
                            return function (e) {
                                PhaserDemo.App.SwitchGameTo(((index.v + 1) | 0));
                                return null;
                            };
                        })(this, index);
                    }
                },
                SwitchGameTo: function (number) {
                    if (PhaserDemo.App._isRun) {
                        PhaserDemo.App._game.destroy();
                        PhaserDemo.App._game = null;
                        PhaserDemo.App._isRun = false;
                    }

                    PhaserDemo.App._game = PhaserDemo.App.RunGame(number);
                    PhaserDemo.App._isRun = true;
                },
                RunGame: function (number) {
                    switch (number) {
                        case 1: 
                            var state1 = new PhaserDemo.Games.GameState1();
                            return new Phaser.Game(800, 600, Phaser.AUTO, "phaserRoot", state1);
                        case 2: 
                            var state2 = new PhaserDemo.Games.GameState2();
                            return new Phaser.Game(800, 600, Phaser.AUTO, "phaserRoot", state2);
                        case 3: 
                            var state3 = new PhaserDemo.Games.GameState3();
                            return new Phaser.Game(800, 600, Phaser.AUTO, "phaserRoot", state3);
                        default: 
                            throw new System.ArgumentOutOfRangeException("number");
                    }
                }
            }
        }
    });

    Bridge.define("PhaserDemo.Games.AbstractGameState", {
        inherits: [Phaser.State],
        methods: {
            preload: function () { },
            create: function () { },
            update: function () { },
            render: function () { }
        }
    });

    /** @namespace PhaserDemo.Games */

    /**
     * Original Demo is available here: https://phaser.io/examples/v2/basics/03-move-an-image
     *
     * @public
     * @class PhaserDemo.Games.GameState1
     * @augments PhaserDemo.Games.AbstractGameState
     */
    Bridge.define("PhaserDemo.Games.GameState1", {
        inherits: [PhaserDemo.Games.AbstractGameState],
        methods: {
            preload: function () {
                this.game.load.crossOrigin = true;
                this.game.load.image("einstein", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/pics/ra_einstein.png");
            },
            create: function () {
                //  This creates a simple sprite that is using our loaded image and
                //  displays it on-screen
                //  and assign it to a variable
                var image = this.game.add.sprite(0, 0, "einstein");

                this.game.physics.enable(image, Phaser.Physics.ARCADE);

                var imageBody = image.body;
                imageBody.velocity.x = 150;
            }
        }
    });

    /**
     * Original Demo is available here: https://phaser.io/examples/v2/p2-physics/accelerate-to-object
     *
     * @public
     * @class PhaserDemo.Games.GameState2
     * @augments PhaserDemo.Games.AbstractGameState
     */
    Bridge.define("PhaserDemo.Games.GameState2", {
        inherits: [PhaserDemo.Games.AbstractGameState],
        fields: {
            _bullets: null,
            _cursors: null,
            _ship: null
        },
        methods: {
            preload: function () {
                this.game.load.crossOrigin = true;
                this.game.load.image("car", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/car.png");
                this.game.load.image("tinycar", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/tinycar.png");
            },
            create: function () {
                this.game.physics.startSystem(Phaser.Physics.P2JS);

                this._bullets = this.game.add.group();

                for (var i = 0; i < 10; i = (i + 1) | 0) {
                    var bullet = this._bullets.create(this.game.rnd.integerInRange(200, 1700), this.game.rnd.integerInRange(-200, 400), "tinycar");
                    this.game.physics.p2.enable(Bridge.unbox(bullet), false);
                }

                this._cursors = this.game.input.keyboard.createCursorKeys();
                this._ship = this.game.add.sprite(32, this.game.world.height - 150, "car");

                this.game.physics.p2.enable(this._ship);
            },
            update: function () {
                var shipBody = this._ship.body;

                this._bullets.forEachAlive(Bridge.fn.cacheBind(this, this.MoveBullets), this); //make bullets accelerate to ship

                if (this._cursors.left.isDown) {
                    shipBody.rotateLeft(100);
                } else if (this._cursors.right.isDown) {
                    shipBody.rotateRight(100);
                } else {
                    shipBody.setZeroRotation();
                }
                if (this._cursors.up.isDown) {
                    shipBody.thrust(400);
                } else if (this._cursors.down.isDown) {
                    shipBody.reverse(400);
                }
            },
            MoveBullets: function (bullet) {
                this.AccelerateToObject(bullet, this._ship, 30); //start accelerateToObject on every bullet
            },
            AccelerateToObject: function (obj1, obj2, speed) {
                if (isNaN(speed)) {
                    speed = 60;
                }

                var obj1Body = obj1.body;

                var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

                obj1Body.rotation = angle + Math.PI / 2; // correct angle of angry bullets (depends on the sprite used)
                obj1Body.force.x = Math.cos(angle) * speed; // accelerateToObject 
                obj1Body.force.y = Math.sin(angle) * speed;
            }
        }
    });

    /**
     * Original Demo is available here: https://phaser.io/examples/v2/games/invaders
     *
     * @public
     * @class PhaserDemo.Games.GameState3
     * @augments PhaserDemo.Games.AbstractGameState
     */
    Bridge.define("PhaserDemo.Games.GameState3", {
        inherits: [PhaserDemo.Games.AbstractGameState],
        fields: {
            _player: null,
            _aliens: null,
            _bullets: null,
            _bulletTime: 0,
            _cursors: null,
            _fireButton: null,
            _explosions: null,
            _starfield: null,
            _score: 0,
            _scoreString: null,
            _scoreText: null,
            _lives: null,
            _enemyBullets: null,
            _firingTimer: 0,
            _stateText: null,
            _livingEnemies: null
        },
        ctors: {
            init: function () {
                this._scoreString = "";
                this._livingEnemies = new Array(0);
            }
        },
        methods: {
            preload: function () {
                this.game.load.crossOrigin = true;
                this.game.load.image("bullet", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/bullet.png");
                this.game.load.image("enemyBullet", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/enemy-bullet.png");
                this.game.load.spritesheet("invader", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/invader32x32x4.png", 32, 32);
                this.game.load.image("ship", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/player.png");
                this.game.load.spritesheet("kaboom", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/explode.png", 128, 128);
                this.game.load.image("starfield", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/invaders/starfield.png");
                this.game.load.image("background", "https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/games/starstruck/background2.png");
            },
            create: function () {
                this.game.physics.startSystem(Phaser.Physics.ARCADE);

                //  The scrolling starfield background
                this._starfield = this.game.add.tileSprite(0, 0, 800, 600, "starfield");

                //  Our bullet group
                this._bullets = this.game.add.group();
                this._bullets.enableBody = true;
                this._bullets.physicsBodyType = Phaser.Physics.ARCADE;
                this._bullets.createMultiple(30, "bullet");
                this._bullets.setAll("anchor.x", 0.5);
                this._bullets.setAll("anchor.y", 1);
                this._bullets.setAll("outOfBoundsKill", true);
                this._bullets.setAll("checkWorldBounds", true);

                // The enemy"s bullets
                this._enemyBullets = this.game.add.group();
                this._enemyBullets.enableBody = true;
                this._enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
                this._enemyBullets.createMultiple(30, "enemyBullet");
                this._enemyBullets.setAll("anchor.x", 0.5);
                this._enemyBullets.setAll("anchor.y", 1);
                this._enemyBullets.setAll("outOfBoundsKill", true);
                this._enemyBullets.setAll("checkWorldBounds", true);

                //  The hero!
                this._player = this.game.add.sprite(400, 500, "ship");
                this._player.anchor.setTo(0.5, 0.5);
                this.game.physics.enable(this._player, Phaser.Physics.ARCADE);

                //  The baddies!
                this._aliens = this.game.add.group();
                this._aliens.enableBody = true;
                this._aliens.physicsBodyType = Phaser.Physics.ARCADE;

                this.CreateAliens();

                //  The score
                this._scoreString = "Score : ";
                this._scoreText = this.game.add.text(10, 10, (this._scoreString || "") + System.Double.format(this._score), { font: "34px Arial", fill: "#fff" });

                //  Lives
                this._lives = this.game.add.group();
                this.game.add.text(this.game.world.width - 100, 10, "Lives : ", { font: "34px Arial", fill: "#fff" });

                //  Text
                this._stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, " ", { font: "84px Arial", fill: "#fff" });
                this._stateText.anchor.setTo(0.5, 0.5);
                this._stateText.visible = false;

                for (var i = 0; i < 3; i = (i + 1) | 0) {
                    var ship = Bridge.cast(this._lives.create(this.game.world.width - 100 + (Bridge.Int.mul(30, i)), 60, "ship"), Phaser.Sprite);
                    ship.anchor.setTo(0.5, 0.5);
                    ship.angle = 90;
                    ship.alpha = 0.4;
                }

                //  An explosion pool
                this._explosions = this.game.add.group();
                this._explosions.createMultiple(30, "kaboom");
                this._explosions.forEach(Bridge.fn.cacheBind(this, this.SetupInvader), this);

                //  And some controls to play the game with
                this._cursors = this.game.input.keyboard.createCursorKeys();
                this._fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            },
            CreateAliens: function () {
                for (var y = 0; y < 4; y = (y + 1) | 0) {
                    for (var x = 0; x < 10; x = (x + 1) | 0) {
                        var alien = Bridge.cast(this._aliens.create(Bridge.Int.mul(x, 48), Bridge.Int.mul(y, 50), "invader"), Phaser.Sprite);

                        alien.anchor.setTo(0.5, 0.5);
                        alien.animations.add("fly", System.Array.init([0, 1, 2, 3], System.Double), 20, true);
                        alien.play("fly");

                        alien.body.moves = false;
                    }
                }

                this._aliens.x = 100;
                this._aliens.y = 50;

                //  All this does is basically start the invaders moving. Notice we"re moving the Group they belong to, rather than the invaders directly.
                var tween = this.game.add.tween(this._aliens).to({ x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

                //  When the tween loops it calls descend
                tween.onLoop.add(Bridge.fn.cacheBind(this, this.Descend), this);
            },
            SetupInvader: function (invader) {
                invader.anchor.x = 0.5;
                invader.anchor.y = 0.5;
                invader.animations.add("kaboom");
            },
            Descend: function () {
                this._aliens.y += 10;
            },
            update: function () {
                var $t;
                //  Scroll the background
                $t = this._starfield.tilePosition;
                $t.y += 2;

                if (this._player.alive) {
                    //  Reset the player, then check for movement keys
                    var playerBody = this._player.body;

                    playerBody.velocity.setTo(0, 0);

                    if (this._cursors.left.isDown) {
                        playerBody.velocity.x = -200;
                    } else if (this._cursors.right.isDown) {
                        playerBody.velocity.x = 200;
                    }

                    //  Firing?
                    if (this._fireButton.isDown) {
                        this.FireBullet();
                    }

                    if (this.game.time.now > this._firingTimer) {
                        this.EnemyFires();
                    }

                    //  Run collision
                    this.game.physics.arcade.overlap(this._bullets, this._aliens, Bridge.fn.cacheBind(this, this.collisionHandler), null, this);
                    this.game.physics.arcade.overlap(this._enemyBullets, this._player, Bridge.fn.cacheBind(this, this.EnemyHitsPlayer), null, this);
                }
            },
            render: function () {
                //for (var i = 0; i < _aliens.length; i++)
                //{
                //    game.debug.body((Sprite)_aliens.children[i]);
                //}
            },
            collisionHandler: function (bullet, alien) {
                var alienBody = alien.body;

                //  When a bullet hits an alien we kill them both
                bullet.kill();
                alien.kill();

                //  Increase the score
                this._score += 20;
                this._scoreText.text = (this._scoreString || "") + System.Double.format(this._score);

                //  And create an explosion :)
                var explosion = Bridge.cast(this._explosions.getFirstExists(false), Phaser.Sprite);
                explosion.reset(alienBody.x, alienBody.y);
                explosion.play("kaboom", 30, false, true);

                if (this._aliens.countLiving() === 0) {
                    this._score += 1000;
                    this._scoreText.text = (this._scoreString || "") + System.Double.format(this._score);

                    this._enemyBullets.callAll("kill", this);
                    this._stateText.text = " You Won, \n Click to restart";
                    this._stateText.visible = true;

                    //the "click to restart" handler
                    this.game.input.onTap.addOnce(Bridge.fn.cacheBind(this, this.Restart), this);
                }

            },
            EnemyHitsPlayer: function (player, bullet) {
                var playerBody = player.body;

                bullet.kill();

                var live = Bridge.cast(this._lives.getFirstAlive(), Phaser.Sprite);

                if (live != null) {
                    live.kill();
                }

                //  And create an explosion :)
                var explosion = Bridge.cast(this._explosions.getFirstExists(false), Phaser.Sprite);
                explosion.reset(playerBody.x, playerBody.y);
                explosion.play("kaboom", 30, false, true);

                // When the player dies
                if (this._lives.countLiving() < 1) {
                    player.kill();
                    this._enemyBullets.callAll("kill", null);

                    this._stateText.text = " GAME OVER \n Click to restart";
                    this._stateText.visible = true;

                    //the "click to restart" handler
                    this.game.input.onTap.addOnce(Bridge.fn.cacheBind(this, this.Restart), this);
                }
            },
            EnemyFires: function () {
                //  Grab the first bullet we can from the pool
                var enemyBullet = Bridge.cast(this._enemyBullets.getFirstExists(false), Phaser.Sprite);

                this._livingEnemies.length = 0;

                this._aliens.forEachAlive(Bridge.fn.bind(this, function (alien) {
                    // put every living enemy in an array
                    this._livingEnemies.push(alien);
                }), null);

                if (enemyBullet != null && this._livingEnemies.length > 0) {

                    var random = this.game.rnd.integerInRange(0, this._livingEnemies.length - 1);

                    // randomly select one of them
                    var shooter = this._livingEnemies[random];
                    // And fire the bullet from this enemy
                    var shooterBody = shooter.body;
                    enemyBullet.reset(shooterBody.x, shooterBody.y);

                    this.game.physics.arcade.moveToObject(enemyBullet, this._player, 120);
                    this._firingTimer = this.game.time.now + 2000;
                }
            },
            FireBullet: function () {
                //  To avoid them being allowed to fire too fast we set a time limit
                if (this.game.time.now > this._bulletTime) {
                    //  Grab the first bullet we can from the pool
                    var bullet = Bridge.cast(this._bullets.getFirstExists(false), Phaser.Sprite);
                    if (bullet != null) {
                        var bulletBody = bullet.body;

                        //  And fire it
                        bullet.reset(this._player.x, this._player.y + 8);
                        bulletBody.velocity.y = -400;
                        this._bulletTime = this.game.time.now + 200;
                    }
                }

            },
            ResetBullet: function (bullet) {
                //  Called if the bullet goes out of the screen
                bullet.kill();
            },
            Restart: function () {
                //  A new level starts

                //resets the life count
                this._lives.callAll("revive", null);

                // And brings the aliens back from the dead :)
                this._aliens.removeAll();

                this.CreateAliens();

                //revives the player
                this._player.revive();

                //hides the text
                this._stateText.visible = false;
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJQaGFzZXJEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJBcHAuY3MiLCJHYW1lcy9HYW1lU3RhdGUxLmNzIiwiR2FtZXMvR2FtZVN0YXRlMi5jcyIsIkdhbWVzL0dhbWVTdGF0ZTMuY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O1lBY1lBOzs7WUFHQUE7Ozs7Ozs7Ozs7b0JBTUFBLFdBQVdBLG1CQUVQQSx1Q0FDQUEsdUNBQ0FBOztvQkFHSkEsS0FBS0EsV0FBV0EsSUFBSUEsYUFBYUE7d0JBRTdCQSxrQkFBWUE7d0JBQ1pBLHdCQUFLQSxHQUFMQSxpQkFBa0JBOztnQ0FFZEEsNEJBQWFBO2dDQUNiQSxPQUFPQTs7Ozs7d0NBS2FBO29CQUU1QkEsSUFBSUE7d0JBRUFBO3dCQUNBQSx1QkFBUUE7d0JBQ1JBOzs7b0JBR0pBLHVCQUFRQSx1QkFBUUE7b0JBQ2hCQTs7bUNBRzZDQTtvQkFFN0NBLFFBQVFBO3dCQUVKQTs0QkFDSUEsYUFBYUEsSUFBSUE7NEJBQ2pCQSxPQUFPQSxJQUFJQSxzQkFBcUNBLDJCQUEwQ0E7d0JBRTlGQTs0QkFDSUEsYUFBYUEsSUFBSUE7NEJBQ2pCQSxPQUFPQSxJQUFJQSxzQkFBcUNBLDJCQUEwQ0E7d0JBRTlGQTs0QkFDSUEsYUFBYUEsSUFBSUE7NEJBQ2pCQSxPQUFPQSxJQUFJQSxzQkFBcUNBLDJCQUEwQ0E7d0JBRTlGQTs0QkFDSUEsTUFBTUEsSUFBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkM3RGxCQTtnQkFDQUE7Ozs7OztnQkFRQUEsWUFBWUE7O2dCQUVaQSx5QkFBb0JBLE9BQU9BOztnQkFFM0JBLGdCQUFnQkEsQUFBMkNBO2dCQUMzREE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkNSQUE7Z0JBQ0FBO2dCQUNBQTs7O2dCQUtBQSw4QkFBeUJBOztnQkFFekJBLGdCQUFXQTs7Z0JBRVhBLEtBQUtBLFdBQVdBLFFBQVFBO29C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IFN5c3RlbTtcclxudXNpbmcgUGhhc2VyRGVtby5HYW1lcztcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBQaGFzZXJEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR2FtZSBfZ2FtZTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBib29sIF9pc1J1bjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gSW5pdCBFdmVudCBoYW5kbGVyczpcclxuICAgICAgICAgICAgSW5pdEV2ZW50SGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJ1biBHYW1lMSBvbiBzdGFydDpcclxuICAgICAgICAgICAgU3dpdGNoR2FtZVRvKDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBJbml0RXZlbnRIYW5kbGVycygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBJbml0IGV2ZW50IGhhbmRsZXIgZm9yIGJ1dHRvbnMgc3dpdGNoaW5nIHNjZW5lc1xyXG4gICAgICAgICAgICB2YXIgYnRucyA9IG5ld1tdXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRvbS5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhbXBsZTFCdG5cIiksXHJcbiAgICAgICAgICAgICAgICBkb20uZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYW1wbGUyQnRuXCIpLFxyXG4gICAgICAgICAgICAgICAgZG9tLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2FtcGxlM0J0blwiKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidG5zLkxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnRuc1tpXS5vbmNsaWNrID0gZSA9PlxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFN3aXRjaEdhbWVUbyhpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFN3aXRjaEdhbWVUbyhpbnQgbnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9pc1J1bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2dhbWUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgX2dhbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgX2lzUnVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9nYW1lID0gUnVuR2FtZShudW1iZXIpO1xyXG4gICAgICAgICAgICBfaXNSdW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR2FtZSBSdW5HYW1lKGludCBudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG51bWJlcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGF0ZTEgPSBuZXcgR2FtZVN0YXRlMSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdhbWUoODAwLCA2MDAsIFJldHlwZWQucGhhc2VyLlBoYXNlci5BVVRPLCBcInBoYXNlclJvb3RcIiwgc3RhdGUxKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXRlMiA9IG5ldyBHYW1lU3RhdGUyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR2FtZSg4MDAsIDYwMCwgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkFVVE8sIFwicGhhc2VyUm9vdFwiLCBzdGF0ZTIpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhdGUzID0gbmV3IEdhbWVTdGF0ZTMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJldHlwZWQucGhhc2VyLlBoYXNlci5HYW1lKDgwMCwgNjAwLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuQVVUTywgXCJwaGFzZXJSb290XCIsIHN0YXRlMyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQXJndW1lbnRPdXRPZlJhbmdlRXhjZXB0aW9uKFwibnVtYmVyXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbm5hbWVzcGFjZSBQaGFzZXJEZW1vLkdhbWVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBPcmlnaW5hbCBEZW1vIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL3BoYXNlci5pby9leGFtcGxlcy92Mi9iYXNpY3MvMDMtbW92ZS1hbi1pbWFnZVxyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lU3RhdGUxIDogQWJzdHJhY3RHYW1lU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBQcmVsb2FkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5jcm9zc09yaWdpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShcImVpbnN0ZWluXCIsIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZXMvYXNzZXRzL3BpY3MvcmFfZWluc3RlaW4ucG5nXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgQ3JlYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBUaGlzIGNyZWF0ZXMgYSBzaW1wbGUgc3ByaXRlIHRoYXQgaXMgdXNpbmcgb3VyIGxvYWRlZCBpbWFnZSBhbmRcclxuICAgICAgICAgICAgLy8gIGRpc3BsYXlzIGl0IG9uLXNjcmVlblxyXG4gICAgICAgICAgICAvLyAgYW5kIGFzc2lnbiBpdCB0byBhIHZhcmlhYmxlXHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IGdhbWUuYWRkLnNwcml0ZSgwLCAwLCBcImVpbnN0ZWluXCIpO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS5waHlzaWNzLmVuYWJsZShpbWFnZSwgUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuQVJDQURFKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBpbWFnZUJvZHkgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkJvZHkpaW1hZ2UuYm9keTtcclxuICAgICAgICAgICAgaW1hZ2VCb2R5LnZlbG9jaXR5LnggPSAxNTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBQaGFzZXJEZW1vLkdhbWVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBPcmlnaW5hbCBEZW1vIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL3BoYXNlci5pby9leGFtcGxlcy92Mi9wMi1waHlzaWNzL2FjY2VsZXJhdGUtdG8tb2JqZWN0XHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEdhbWVTdGF0ZTIgOiBBYnN0cmFjdEdhbWVTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdyb3VwIF9idWxsZXRzO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkN1cnNvcktleXMgX2N1cnNvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlIF9zaGlwO1xyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBQcmVsb2FkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5jcm9zc09yaWdpbiA9IHRydWU7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShcImNhclwiLCBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9waG90b25zdG9ybS9waGFzZXItZXhhbXBsZXMvbWFzdGVyL2V4YW1wbGVzL2Fzc2V0cy9zcHJpdGVzL2Nhci5wbmdcIik7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShcInRpbnljYXJcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvc3ByaXRlcy90aW55Y2FyLnBuZ1wiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIENyZWF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnYW1lLnBoeXNpY3Muc3RhcnRTeXN0ZW0oUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuUDJKUyk7XHJcblxyXG4gICAgICAgICAgICBfYnVsbGV0cyA9IGdhbWUuYWRkLmdyb3VwKCk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBidWxsZXQgPSBfYnVsbGV0cy5jcmVhdGUoZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoMjAwLCAxNzAwKSwgZ2FtZS5ybmQuaW50ZWdlckluUmFuZ2UoLTIwMCwgNDAwKSwgXCJ0aW55Y2FyXCIpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5waHlzaWNzLnAyLmVuYWJsZShidWxsZXQsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2N1cnNvcnMgPSBnYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICAgICAgX3NoaXAgPSBnYW1lLmFkZC5zcHJpdGUoMzIsIGdhbWUud29ybGQuaGVpZ2h0IC0gMTUwLCBcImNhclwiKTtcclxuXHJcbiAgICAgICAgICAgIGdhbWUucGh5c2ljcy5wMi5lbmFibGUoX3NoaXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzaGlwQm9keSA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5QMi5Cb2R5KSBfc2hpcC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgX2J1bGxldHMuZm9yRWFjaEFsaXZlKChBY3Rpb248UmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZT4pIE1vdmVCdWxsZXRzLCB0aGlzKTsgLy9tYWtlIGJ1bGxldHMgYWNjZWxlcmF0ZSB0byBzaGlwXHJcblxyXG4gICAgICAgICAgICBpZiAoX2N1cnNvcnMubGVmdC5pc0Rvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNoaXBCb2R5LnJvdGF0ZUxlZnQoMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfY3Vyc29ycy5yaWdodC5pc0Rvd24pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNoaXBCb2R5LnJvdGF0ZVJpZ2h0KDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQm9keS5zZXRaZXJvUm90YXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX2N1cnNvcnMudXAuaXNEb3duKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzaGlwQm9keS50aHJ1c3QoNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChfY3Vyc29ycy5kb3duLmlzRG93bilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2hpcEJvZHkucmV2ZXJzZSg0MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgTW92ZUJ1bGxldHMoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBidWxsZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRlVG9PYmplY3QoYnVsbGV0LCBfc2hpcCwgMzApOyAvL3N0YXJ0IGFjY2VsZXJhdGVUb09iamVjdCBvbiBldmVyeSBidWxsZXRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBBY2NlbGVyYXRlVG9PYmplY3QoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBvYmoxLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlIG9iajIsIGRvdWJsZSBzcGVlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChkb3VibGUuSXNOYU4oc3BlZWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDYwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb2JqMUJvZHkgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuUDIuQm9keSkgb2JqMS5ib2R5O1xyXG5cclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gZXM1Lk1hdGguYXRhbjIob2JqMi55IC0gb2JqMS55LCBvYmoyLnggLSBvYmoxLngpO1xyXG5cclxuICAgICAgICAgICAgb2JqMUJvZHkucm90YXRpb24gPSBhbmdsZSArIGVzNS5NYXRoLlBJIC8gMjsgLy8gY29ycmVjdCBhbmdsZSBvZiBhbmdyeSBidWxsZXRzIChkZXBlbmRzIG9uIHRoZSBzcHJpdGUgdXNlZClcclxuICAgICAgICAgICAgb2JqMUJvZHkuZm9yY2UueCA9IGVzNS5NYXRoLmNvcyhhbmdsZSkgKiBzcGVlZDsgLy8gYWNjZWxlcmF0ZVRvT2JqZWN0IFxyXG4gICAgICAgICAgICBvYmoxQm9keS5mb3JjZS55ID0gZXM1Lk1hdGguc2luKGFuZ2xlKSAqIHNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIFN5c3RlbTtcclxudXNpbmcgUmV0eXBlZDtcclxuXHJcbm5hbWVzcGFjZSBQaGFzZXJEZW1vLkdhbWVzXHJcbntcclxuICAgIC8vLyA8c3VtbWFyeT5cclxuICAgIC8vLyBPcmlnaW5hbCBEZW1vIGlzIGF2YWlsYWJsZSBoZXJlOiBodHRwczovL3BoYXNlci5pby9leGFtcGxlcy92Mi9nYW1lcy9pbnZhZGVyc1xyXG4gICAgLy8vIDwvc3VtbWFyeT5cclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lU3RhdGUzIDogQWJzdHJhY3RHYW1lU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUgX3BsYXllcjtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5Hcm91cCBfYWxpZW5zO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdyb3VwIF9idWxsZXRzO1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIF9idWxsZXRUaW1lO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkN1cnNvcktleXMgX2N1cnNvcnM7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuS2V5IF9maXJlQnV0dG9uO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdyb3VwIF9leHBsb3Npb25zO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLlRpbGVTcHJpdGUgX3N0YXJmaWVsZDtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBfc2NvcmU7XHJcbiAgICAgICAgcHJpdmF0ZSBzdHJpbmcgX3Njb3JlU3RyaW5nID0gXCJcIjtcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQucGhhc2VyLlBoYXNlci5UZXh0IF9zY29yZVRleHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuR3JvdXAgX2xpdmVzO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLkdyb3VwIF9lbmVteUJ1bGxldHM7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgX2ZpcmluZ1RpbWVyO1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5waGFzZXIuUGhhc2VyLlRleHQgX3N0YXRlVGV4dDtcclxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGVzNS5BcnJheTxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPiBfbGl2aW5nRW5lbWllcyA9IG5ldyBlczUuQXJyYXk8UmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZT4oMCk7XHJcblxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFByZWxvYWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLmNyb3NzT3JpZ2luID0gdHJ1ZTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKFwiYnVsbGV0XCIsIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZXMvYXNzZXRzL2dhbWVzL2ludmFkZXJzL2J1bGxldC5wbmdcIik7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShcImVuZW15QnVsbGV0XCIsIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZXMvYXNzZXRzL2dhbWVzL2ludmFkZXJzL2VuZW15LWJ1bGxldC5wbmdcIik7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5zcHJpdGVzaGVldChcImludmFkZXJcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvaW52YWRlcnMvaW52YWRlcjMyeDMyeDQucG5nXCIsIDMyLCAzMik7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShcInNoaXBcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvaW52YWRlcnMvcGxheWVyLnBuZ1wiKTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLnNwcml0ZXNoZWV0KFwia2Fib29tXCIsIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZXMvYXNzZXRzL2dhbWVzL2ludmFkZXJzL2V4cGxvZGUucG5nXCIsIDEyOCwgMTI4KTtcclxuICAgICAgICAgICAgZ2FtZS5sb2FkLmltYWdlKFwic3RhcmZpZWxkXCIsIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3Bob3RvbnN0b3JtL3BoYXNlci1leGFtcGxlcy9tYXN0ZXIvZXhhbXBsZXMvYXNzZXRzL2dhbWVzL2ludmFkZXJzL3N0YXJmaWVsZC5wbmdcIik7XHJcbiAgICAgICAgICAgIGdhbWUubG9hZC5pbWFnZShcImJhY2tncm91bmRcIiwgXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vcGhvdG9uc3Rvcm0vcGhhc2VyLWV4YW1wbGVzL21hc3Rlci9leGFtcGxlcy9hc3NldHMvZ2FtZXMvc3RhcnN0cnVjay9iYWNrZ3JvdW5kMi5wbmdcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBDcmVhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZ2FtZS5waHlzaWNzLnN0YXJ0U3lzdGVtKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFSQ0FERSk7XHJcblxyXG4gICAgICAgICAgICAvLyAgVGhlIHNjcm9sbGluZyBzdGFyZmllbGQgYmFja2dyb3VuZFxyXG4gICAgICAgICAgICBfc3RhcmZpZWxkID0gZ2FtZS5hZGQudGlsZVNwcml0ZSgwLCAwLCA4MDAsIDYwMCwgXCJzdGFyZmllbGRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyAgT3VyIGJ1bGxldCBncm91cFxyXG4gICAgICAgICAgICBfYnVsbGV0cyA9IGdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgICAgIF9idWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBfYnVsbGV0cy5waHlzaWNzQm9keVR5cGUgPSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BUkNBREU7XHJcbiAgICAgICAgICAgIF9idWxsZXRzLmNyZWF0ZU11bHRpcGxlKDMwLCBcImJ1bGxldFwiKTtcclxuICAgICAgICAgICAgX2J1bGxldHMuc2V0QWxsKFwiYW5jaG9yLnhcIiwgMC41KTtcclxuICAgICAgICAgICAgX2J1bGxldHMuc2V0QWxsKFwiYW5jaG9yLnlcIiwgMSk7XHJcbiAgICAgICAgICAgIF9idWxsZXRzLnNldEFsbChcIm91dE9mQm91bmRzS2lsbFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgX2J1bGxldHMuc2V0QWxsKFwiY2hlY2tXb3JsZEJvdW5kc1wiLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZSBlbmVteVwicyBidWxsZXRzXHJcbiAgICAgICAgICAgIF9lbmVteUJ1bGxldHMgPSBnYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLmVuYWJsZUJvZHkgPSB0cnVlO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLnBoeXNpY3NCb2R5VHlwZSA9IFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFSQ0FERTtcclxuICAgICAgICAgICAgX2VuZW15QnVsbGV0cy5jcmVhdGVNdWx0aXBsZSgzMCwgXCJlbmVteUJ1bGxldFwiKTtcclxuICAgICAgICAgICAgX2VuZW15QnVsbGV0cy5zZXRBbGwoXCJhbmNob3IueFwiLCAwLjUpO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLnNldEFsbChcImFuY2hvci55XCIsIDEpO1xyXG4gICAgICAgICAgICBfZW5lbXlCdWxsZXRzLnNldEFsbChcIm91dE9mQm91bmRzS2lsbFwiLCB0cnVlKTtcclxuICAgICAgICAgICAgX2VuZW15QnVsbGV0cy5zZXRBbGwoXCJjaGVja1dvcmxkQm91bmRzXCIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gIFRoZSBoZXJvIVxyXG4gICAgICAgICAgICBfcGxheWVyID0gZ2FtZS5hZGQuc3ByaXRlKDQwMCwgNTAwLCBcInNoaXBcIik7XHJcbiAgICAgICAgICAgIF9wbGF5ZXIuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgZ2FtZS5waHlzaWNzLmVuYWJsZShfcGxheWVyLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BUkNBREUpO1xyXG5cclxuICAgICAgICAgICAgLy8gIFRoZSBiYWRkaWVzIVxyXG4gICAgICAgICAgICBfYWxpZW5zID0gZ2FtZS5hZGQuZ3JvdXAoKTtcclxuICAgICAgICAgICAgX2FsaWVucy5lbmFibGVCb2R5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgX2FsaWVucy5waHlzaWNzQm9keVR5cGUgPSBSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BUkNBREU7XHJcblxyXG4gICAgICAgICAgICBDcmVhdGVBbGllbnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBUaGUgc2NvcmVcclxuICAgICAgICAgICAgX3Njb3JlU3RyaW5nID0gXCJTY29yZSA6IFwiO1xyXG4gICAgICAgICAgICBfc2NvcmVUZXh0ID0gZ2FtZS5hZGQudGV4dCgxMCwgMTAsIF9zY29yZVN0cmluZyArIF9zY29yZSwgbmV3IHtmb250ID0gXCIzNHB4IEFyaWFsXCIsIGZpbGwgPSBcIiNmZmZcIn0pO1xyXG5cclxuICAgICAgICAgICAgLy8gIExpdmVzXHJcbiAgICAgICAgICAgIF9saXZlcyA9IGdhbWUuYWRkLmdyb3VwKCk7XHJcbiAgICAgICAgICAgIGdhbWUuYWRkLnRleHQoZ2FtZS53b3JsZC53aWR0aCAtIDEwMCwgMTAsIFwiTGl2ZXMgOiBcIiwgbmV3IHtmb250ID0gXCIzNHB4IEFyaWFsXCIsIGZpbGwgPSBcIiNmZmZcIn0pO1xyXG5cclxuICAgICAgICAgICAgLy8gIFRleHRcclxuICAgICAgICAgICAgX3N0YXRlVGV4dCA9IGdhbWUuYWRkLnRleHQoZ2FtZS53b3JsZC5jZW50ZXJYLCBnYW1lLndvcmxkLmNlbnRlclksIFwiIFwiLCBuZXcge2ZvbnQgPSBcIjg0cHggQXJpYWxcIiwgZmlsbCA9IFwiI2ZmZlwifSk7XHJcbiAgICAgICAgICAgIF9zdGF0ZVRleHQuYW5jaG9yLnNldFRvKDAuNSwgMC41KTtcclxuICAgICAgICAgICAgX3N0YXRlVGV4dC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNoaXAgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSkgX2xpdmVzLmNyZWF0ZShnYW1lLndvcmxkLndpZHRoIC0gMTAwICsgKDMwICogaSksIDYwLCBcInNoaXBcIik7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmFuY2hvci5zZXRUbygwLjUsIDAuNSk7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmFuZ2xlID0gOTA7XHJcbiAgICAgICAgICAgICAgICBzaGlwLmFscGhhID0gMC40O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyAgQW4gZXhwbG9zaW9uIHBvb2xcclxuICAgICAgICAgICAgX2V4cGxvc2lvbnMgPSBnYW1lLmFkZC5ncm91cCgpO1xyXG4gICAgICAgICAgICBfZXhwbG9zaW9ucy5jcmVhdGVNdWx0aXBsZSgzMCwgXCJrYWJvb21cIik7XHJcbiAgICAgICAgICAgIF9leHBsb3Npb25zLmZvckVhY2goKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgU2V0dXBJbnZhZGVyLCB0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vICBBbmQgc29tZSBjb250cm9scyB0byBwbGF5IHRoZSBnYW1lIHdpdGhcclxuICAgICAgICAgICAgX2N1cnNvcnMgPSBnYW1lLmlucHV0LmtleWJvYXJkLmNyZWF0ZUN1cnNvcktleXMoKTtcclxuICAgICAgICAgICAgX2ZpcmVCdXR0b24gPSBnYW1lLmlucHV0LmtleWJvYXJkLmFkZEtleShSZXR5cGVkLnBoYXNlci5QaGFzZXIuS2V5Ym9hcmQuU1BBQ0VCQVIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUFsaWVucygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IDQ7IHkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCAxMDsgeCsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbGllbiA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlKSBfYWxpZW5zLmNyZWF0ZSh4ICogNDgsIHkgKiA1MCwgXCJpbnZhZGVyXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhbGllbi5hbmNob3Iuc2V0VG8oMC41LCAwLjUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsaWVuLmFuaW1hdGlvbnMuYWRkKFwiZmx5XCIsIG5ldyBkb3VibGVbXSB7MCwgMSwgMiwgM30sIDIwLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGllbi5wbGF5KFwiZmx5XCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAoKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KSBhbGllbi5ib2R5KS5tb3ZlcyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfYWxpZW5zLnggPSAxMDA7XHJcbiAgICAgICAgICAgIF9hbGllbnMueSA9IDUwO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFsbCB0aGlzIGRvZXMgaXMgYmFzaWNhbGx5IHN0YXJ0IHRoZSBpbnZhZGVycyBtb3ZpbmcuIE5vdGljZSB3ZVwicmUgbW92aW5nIHRoZSBHcm91cCB0aGV5IGJlbG9uZyB0bywgcmF0aGVyIHRoYW4gdGhlIGludmFkZXJzIGRpcmVjdGx5LlxyXG4gICAgICAgICAgICB2YXIgdHdlZW4gPSBnYW1lLmFkZC50d2VlbihfYWxpZW5zKS50byhuZXcge3ggPSAyMDB9LCAyMDAwLCAoRnVuYzxkb3VibGUsIGRvdWJsZT4pIFJldHlwZWQucGhhc2VyLlBoYXNlci5FYXNpbmcuTGluZWFyLk5vbmUsIHRydWUsIDAsIDEwMDAsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gIFdoZW4gdGhlIHR3ZWVuIGxvb3BzIGl0IGNhbGxzIGRlc2NlbmRcclxuICAgICAgICAgICAgdHdlZW4ub25Mb29wLmFkZCgoQWN0aW9uKSBEZXNjZW5kLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBTZXR1cEludmFkZXIoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBpbnZhZGVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW52YWRlci5hbmNob3IueCA9IDAuNTtcclxuICAgICAgICAgICAgaW52YWRlci5hbmNob3IueSA9IDAuNTtcclxuICAgICAgICAgICAgaW52YWRlci5hbmltYXRpb25zLmFkZChcImthYm9vbVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERlc2NlbmQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgX2FsaWVucy55ICs9IDEwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBTY3JvbGwgdGhlIGJhY2tncm91bmRcclxuICAgICAgICAgICAgX3N0YXJmaWVsZC50aWxlUG9zaXRpb24ueSArPSAyO1xyXG5cclxuICAgICAgICAgICAgaWYgKF9wbGF5ZXIuYWxpdmUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICBSZXNldCB0aGUgcGxheWVyLCB0aGVuIGNoZWNrIGZvciBtb3ZlbWVudCBrZXlzXHJcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyQm9keSA9IChSZXR5cGVkLnBoYXNlci5QaGFzZXIuUGh5c2ljcy5BcmNhZGUuQm9keSkgX3BsYXllci5ib2R5O1xyXG5cclxuICAgICAgICAgICAgICAgIHBsYXllckJvZHkudmVsb2NpdHkuc2V0VG8oMCwgMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKF9jdXJzb3JzLmxlZnQuaXNEb3duKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBsYXllckJvZHkudmVsb2NpdHkueCA9IC0yMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChfY3Vyc29ycy5yaWdodC5pc0Rvd24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyQm9keS52ZWxvY2l0eS54ID0gMjAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vICBGaXJpbmc/XHJcbiAgICAgICAgICAgICAgICBpZiAoX2ZpcmVCdXR0b24uaXNEb3duKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZpcmVCdWxsZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2FtZS50aW1lLm5vdyA+IF9maXJpbmdUaW1lcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBFbmVteUZpcmVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gIFJ1biBjb2xsaXNpb25cclxuICAgICAgICAgICAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUub3ZlcmxhcChfYnVsbGV0cywgX2FsaWVucywgKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgY29sbGlzaW9uSGFuZGxlciwgbnVsbCwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLnBoeXNpY3MuYXJjYWRlLm92ZXJsYXAoX2VuZW15QnVsbGV0cywgX3BsYXllciwgKEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlLCBSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPikgRW5lbXlIaXRzUGxheWVyLCBudWxsLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgUmVuZGVyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vZm9yICh2YXIgaSA9IDA7IGkgPCBfYWxpZW5zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgZ2FtZS5kZWJ1Zy5ib2R5KChTcHJpdGUpX2FsaWVucy5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGNvbGxpc2lvbkhhbmRsZXIoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBidWxsZXQsIFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUgYWxpZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgYWxpZW5Cb2R5ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KSBhbGllbi5ib2R5O1xyXG5cclxuICAgICAgICAgICAgLy8gIFdoZW4gYSBidWxsZXQgaGl0cyBhbiBhbGllbiB3ZSBraWxsIHRoZW0gYm90aFxyXG4gICAgICAgICAgICBidWxsZXQua2lsbCgpO1xyXG4gICAgICAgICAgICBhbGllbi5raWxsKCk7XHJcblxyXG4gICAgICAgICAgICAvLyAgSW5jcmVhc2UgdGhlIHNjb3JlXHJcbiAgICAgICAgICAgIF9zY29yZSArPSAyMDtcclxuICAgICAgICAgICAgX3Njb3JlVGV4dC50ZXh0ID0gX3Njb3JlU3RyaW5nICsgX3Njb3JlO1xyXG5cclxuICAgICAgICAgICAgLy8gIEFuZCBjcmVhdGUgYW4gZXhwbG9zaW9uIDopXHJcbiAgICAgICAgICAgIHZhciBleHBsb3Npb24gPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSkgX2V4cGxvc2lvbnMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBsb3Npb24ucmVzZXQoYWxpZW5Cb2R5LngsIGFsaWVuQm9keS55KTtcclxuICAgICAgICAgICAgZXhwbG9zaW9uLnBsYXkoXCJrYWJvb21cIiwgMzAsIGZhbHNlLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChfYWxpZW5zLmNvdW50TGl2aW5nKCkgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX3Njb3JlICs9IDEwMDA7XHJcbiAgICAgICAgICAgICAgICBfc2NvcmVUZXh0LnRleHQgPSBfc2NvcmVTdHJpbmcgKyBfc2NvcmU7XHJcblxyXG4gICAgICAgICAgICAgICAgX2VuZW15QnVsbGV0cy5jYWxsQWxsKFwia2lsbFwiLCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIF9zdGF0ZVRleHQudGV4dCA9IFwiIFlvdSBXb24sIFxcbiBDbGljayB0byByZXN0YXJ0XCI7XHJcbiAgICAgICAgICAgICAgICBfc3RhdGVUZXh0LnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhlIFwiY2xpY2sgdG8gcmVzdGFydFwiIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQub25UYXAuYWRkT25jZSgoQWN0aW9uKSBSZXN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBFbmVteUhpdHNQbGF5ZXIoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBwbGF5ZXIsIFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUgYnVsbGV0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllckJvZHkgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkJvZHkpIHBsYXllci5ib2R5O1xyXG5cclxuICAgICAgICAgICAgYnVsbGV0LmtpbGwoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBsaXZlID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5TcHJpdGUpIF9saXZlcy5nZXRGaXJzdEFsaXZlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobGl2ZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsaXZlLmtpbGwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gIEFuZCBjcmVhdGUgYW4gZXhwbG9zaW9uIDopXHJcbiAgICAgICAgICAgIHZhciBleHBsb3Npb24gPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSkgX2V4cGxvc2lvbnMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG4gICAgICAgICAgICBleHBsb3Npb24ucmVzZXQocGxheWVyQm9keS54LCBwbGF5ZXJCb2R5LnkpO1xyXG4gICAgICAgICAgICBleHBsb3Npb24ucGxheShcImthYm9vbVwiLCAzMCwgZmFsc2UsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gV2hlbiB0aGUgcGxheWVyIGRpZXNcclxuICAgICAgICAgICAgaWYgKF9saXZlcy5jb3VudExpdmluZygpIDwgMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLmtpbGwoKTtcclxuICAgICAgICAgICAgICAgIF9lbmVteUJ1bGxldHMuY2FsbEFsbChcImtpbGxcIiwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAgICAgX3N0YXRlVGV4dC50ZXh0ID0gXCIgR0FNRSBPVkVSIFxcbiBDbGljayB0byByZXN0YXJ0XCI7XHJcbiAgICAgICAgICAgICAgICBfc3RhdGVUZXh0LnZpc2libGUgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdGhlIFwiY2xpY2sgdG8gcmVzdGFydFwiIGhhbmRsZXJcclxuICAgICAgICAgICAgICAgIGdhbWUuaW5wdXQub25UYXAuYWRkT25jZSgoQWN0aW9uKSBSZXN0YXJ0LCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIEVuZW15RmlyZXMoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIEdyYWIgdGhlIGZpcnN0IGJ1bGxldCB3ZSBjYW4gZnJvbSB0aGUgcG9vbFxyXG4gICAgICAgICAgICB2YXIgZW5lbXlCdWxsZXQgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSkgX2VuZW15QnVsbGV0cy5nZXRGaXJzdEV4aXN0cyhmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICBfbGl2aW5nRW5lbWllcy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICAgICAgX2FsaWVucy5mb3JFYWNoQWxpdmUobmV3IEFjdGlvbjxSZXR5cGVkLnBoYXNlci5QaGFzZXIuU3ByaXRlPihhbGllbiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBwdXQgZXZlcnkgbGl2aW5nIGVuZW15IGluIGFuIGFycmF5XHJcbiAgICAgICAgICAgICAgICBfbGl2aW5nRW5lbWllcy5wdXNoKGFsaWVuKTtcclxuICAgICAgICAgICAgfSksIG51bGwpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVuZW15QnVsbGV0ICE9IG51bGwgJiYgX2xpdmluZ0VuZW1pZXMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciByYW5kb20gPSBnYW1lLnJuZC5pbnRlZ2VySW5SYW5nZSgwLCBfbGl2aW5nRW5lbWllcy5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyByYW5kb21seSBzZWxlY3Qgb25lIG9mIHRoZW1cclxuICAgICAgICAgICAgICAgIHZhciBzaG9vdGVyID0gX2xpdmluZ0VuZW1pZXNbcmFuZG9tXTtcclxuICAgICAgICAgICAgICAgIC8vIEFuZCBmaXJlIHRoZSBidWxsZXQgZnJvbSB0aGlzIGVuZW15XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvb3RlckJvZHkgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlBoeXNpY3MuQXJjYWRlLkJvZHkpIHNob290ZXIuYm9keTtcclxuICAgICAgICAgICAgICAgIGVuZW15QnVsbGV0LnJlc2V0KHNob290ZXJCb2R5LngsIHNob290ZXJCb2R5LnkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGdhbWUucGh5c2ljcy5hcmNhZGUubW92ZVRvT2JqZWN0KGVuZW15QnVsbGV0LCBfcGxheWVyLCAxMjApO1xyXG4gICAgICAgICAgICAgICAgX2ZpcmluZ1RpbWVyID0gZ2FtZS50aW1lLm5vdyArIDIwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBGaXJlQnVsbGV0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vICBUbyBhdm9pZCB0aGVtIGJlaW5nIGFsbG93ZWQgdG8gZmlyZSB0b28gZmFzdCB3ZSBzZXQgYSB0aW1lIGxpbWl0XHJcbiAgICAgICAgICAgIGlmIChnYW1lLnRpbWUubm93ID4gX2J1bGxldFRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vICBHcmFiIHRoZSBmaXJzdCBidWxsZXQgd2UgY2FuIGZyb20gdGhlIHBvb2xcclxuICAgICAgICAgICAgICAgIHZhciBidWxsZXQgPSAoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSkgX2J1bGxldHMuZ2V0Rmlyc3RFeGlzdHMoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1bGxldCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBidWxsZXRCb2R5ID0gKFJldHlwZWQucGhhc2VyLlBoYXNlci5QaHlzaWNzLkFyY2FkZS5Cb2R5KSBidWxsZXQuYm9keTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gIEFuZCBmaXJlIGl0XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LnJlc2V0KF9wbGF5ZXIueCwgX3BsYXllci55ICsgOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0Qm9keS52ZWxvY2l0eS55ID0gLTQwMDtcclxuICAgICAgICAgICAgICAgICAgICBfYnVsbGV0VGltZSA9IGdhbWUudGltZS5ub3cgKyAyMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUmVzZXRCdWxsZXQoUmV0eXBlZC5waGFzZXIuUGhhc2VyLlNwcml0ZSBidWxsZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyAgQ2FsbGVkIGlmIHRoZSBidWxsZXQgZ29lcyBvdXQgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICBidWxsZXQua2lsbCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJlc3RhcnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gIEEgbmV3IGxldmVsIHN0YXJ0c1xyXG5cclxuICAgICAgICAgICAgLy9yZXNldHMgdGhlIGxpZmUgY291bnRcclxuICAgICAgICAgICAgX2xpdmVzLmNhbGxBbGwoXCJyZXZpdmVcIiwgbnVsbCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBbmQgYnJpbmdzIHRoZSBhbGllbnMgYmFjayBmcm9tIHRoZSBkZWFkIDopXHJcbiAgICAgICAgICAgIF9hbGllbnMucmVtb3ZlQWxsKCk7XHJcblxyXG4gICAgICAgICAgICBDcmVhdGVBbGllbnMoKTtcclxuXHJcbiAgICAgICAgICAgIC8vcmV2aXZlcyB0aGUgcGxheWVyXHJcbiAgICAgICAgICAgIF9wbGF5ZXIucmV2aXZlKCk7XHJcblxyXG4gICAgICAgICAgICAvL2hpZGVzIHRoZSB0ZXh0XHJcbiAgICAgICAgICAgIF9zdGF0ZVRleHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdCn0K
