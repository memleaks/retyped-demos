/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 17.0.0
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
                            throw new System.ArgumentOutOfRangeException.$ctor1("number");
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
     * Original Demo is available here: https://phaser.io/examples/v2/games/invaders
     *
     * @public
     * @class PhaserDemo.Games.GameState1
     * @augments PhaserDemo.Games.AbstractGameState
     */
    Bridge.define("PhaserDemo.Games.GameState1", {
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
     * Original Demo is available here: https://phaser.io/examples/v2/basics/03-move-an-image
     *
     * @public
     * @class PhaserDemo.Games.GameState3
     * @augments PhaserDemo.Games.AbstractGameState
     */
    Bridge.define("PhaserDemo.Games.GameState3", {
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
});
