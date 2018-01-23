/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.7.0
 */
Bridge.assembly("SvgJsDemo", function ($asm, globals) {
    "use strict";

    require(["svg.js"], function (svgjs) {
        Bridge.define("MissingAPI.SvgJsExtensions");
    
        Bridge.define("SvgJsDemo.App", {
            main: function Main () {
                var btnPongGame = Bridge.cast(document.querySelector("#btnPongGame"), HTMLButtonElement);
                var btnAnimation = Bridge.cast(document.querySelector("#btnAnimation"), HTMLButtonElement);
    
                btnPongGame.onclick = function (ev) {
                    SvgJsDemo.App.RenderPongGame();
                    return Bridge.box(true, System.Boolean, System.Boolean.toString);
                };
    
                btnAnimation.onclick = function (ev) {
                    SvgJsDemo.App.RenderAnimation();
                    return Bridge.box(true, System.Boolean, System.Boolean.toString);
                };
    
                // Render Pong Game by default
                SvgJsDemo.App.RenderPongGame();
            },
            statics: {
                fields: {
                    _rootDiv: null
                },
                methods: {
                    RenderPongGame: function () {
                        if (SvgJsDemo.App._rootDiv != null) {
                            document.body.removeChild(SvgJsDemo.App._rootDiv);
                        }
    
                        // Create Div for SVG elements:
                        var svgDiv = document.createElement("div");
                        new SvgJsDemo.PongGame().Render(svgDiv);
    
                        // Add Label:
                        var label = document.createElement("label");
                        label.innerHTML = "You are Red. Hit SPACE to start. Use ARROWS to control the pad.";
    
                        // Add root Div to the Document
                        SvgJsDemo.App._rootDiv = document.createElement("div");
                        SvgJsDemo.App._rootDiv.appendChild(svgDiv);
                        SvgJsDemo.App._rootDiv.appendChild(label);
    
                        document.body.appendChild(SvgJsDemo.App._rootDiv);
                    },
                    RenderAnimation: function () {
                        var $t;
                        if (SvgJsDemo.App._rootDiv != null) {
                            document.body.removeChild(SvgJsDemo.App._rootDiv);
                        }
    
                        // Create Input for text:
                        var input = ($t = document.createElement("input"), $t.type = "text", $t.value = "Retyped.svg.js -- - ->", $t.placeholder = "Type text here...", $t);
    
                        // Create Div for SVG elements:
                        var svgDiv = document.createElement("div");
    
                        var draw = svgjs(svgDiv).viewbox(0, 0, 300, 140);
                        var text = draw.text(function (add) {
                            add.tspan(input.value);
                        });
    
                        text.path("M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80").animate(1000, "<>").plot("M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80").loop(null, true);
    
                        input.addEventListener("keyup", function () {
                            text.tspan(input.value);
                        });
    
                        // Add root Div to the Document
                        SvgJsDemo.App._rootDiv = document.createElement("div");
                        SvgJsDemo.App._rootDiv.appendChild(input);
                        SvgJsDemo.App._rootDiv.appendChild(svgDiv);
    
                        document.body.appendChild(SvgJsDemo.App._rootDiv);
                    }
                }
            }
        });
    
        Bridge.define("SvgJsDemo.PongGame", {
            fields: {
                draw: null,
                width: 0,
                height: 0,
                ball: null,
                vx: 0,
                vy: 0,
                difficulty: 0,
                paddleLeft: null,
                paddleRight: null,
                paddleWidth: 0,
                paddleHeight: 0,
                paddleDirection: 0,
                paddleSpeed: 0,
                scoreLeft: null,
                scoreRight: null,
                playerLeft: 0,
                playerRight: 0,
                ballColor: null,
                lastTime: 0,
                animFrame: 0
            },
            methods: {
                Render: function (root) {
                    // define document width and height
                    this.width = 640;
                    this.height = 480;
    
                    // create SVG document and set its size
                    this.draw = svgjs(root);
                    this.draw.size(this.width, this.height);
                    this.draw.viewbox(0, 0, this.width, this.height);
    
                    // draw background
                    var background = this.draw.rect(this.width, this.height).fill("#dde3e1");
    
                    // draw line
                    var line = this.draw.line(((Bridge.Int.div(this.width, 2)) | 0), 0, ((Bridge.Int.div(this.width, 2)) | 0), this.height);
                    line.stroke({ width: 5, color: "#fff", dasharray: "5,5" });
    
                    // define paddle width and height
                    this.paddleWidth = 15;
                    this.paddleHeight = 80;
    
                    // create and position left paddle
                    this.paddleLeft = this.draw.rect(this.paddleWidth, this.paddleHeight);
                    this.paddleLeft.x(0).cy(((Bridge.Int.div(this.height, 2)) | 0)).fill("#00ff99");
    
                    // create and position right paddle
                    this.paddleRight = this.paddleLeft.clone();
                    this.paddleRight.x(this.width - this.paddleWidth).fill("#ff0066");
    
    
                    // define ball size
                    var ballSize = 10;
    
                    // create ball
                    this.ball = this.draw.circle(ballSize);
                    this.ball.center(((Bridge.Int.div(this.width, 2)) | 0), ((Bridge.Int.div(this.height, 2)) | 0)).fill("#7f7f7f");
    
    
                    // define inital player score
                    this.playerLeft = 0.0;
                    this.playerRight = 0.0;
    
                    // create text for the score, set font properties
                    this.scoreLeft = this.draw.text(System.Double.format(this.playerLeft) + "").font({ size: 32, family: "Menlo, sans-serif", anchor: "end", style: "color:#fff" }).move(((((Bridge.Int.div(this.width, 2)) | 0) - 10) | 0), 10);
    
                    // cloning rocks!
                    this.scoreRight = this.scoreLeft.clone().text(System.Double.format(this.playerRight) + "").font("anchor", "start").x(((((Bridge.Int.div(this.width, 2)) | 0) + 10) | 0));
    
                    // AI difficulty
                    this.difficulty = 2;
    
                    this.callback(0);
    
                    this.paddleDirection = 0;
                    this.paddleSpeed = 5;
    
                    svgjs.on(document, "keydown", Bridge.fn.bind(this, function (e) {
                            // Let's skip non-control keys
                            if (e.keyCode === 38) {
                                this.paddleDirection = -1;
                                e.preventDefault();
                            } else if (e.keyCode === 40) {
                                this.paddleDirection = 1;
                                e.preventDefault();
                            } else if (e.keyCode === 32 && this.vx === 0 && this.vy === 0) {
                                // random velocity for the ball at start
                                this.vy = Math.random() * 500 - 150;
                                this.vx = Math.random() > 0.5 ? 250 : -250;
                                e.preventDefault();
    
                            } else {
                                this.paddleDirection = 0;
                            }
                        }));
    
                    svgjs.on(document, "keyup", Bridge.fn.bind(this, function (e) {
                            // Let's skip non-control keys
                            if (e.keyCode === 38 || e.keyCode === 40) {
                                this.paddleDirection = 0;
                                e.preventDefault();
                            }
                        }));
    
                    // ball color update
                    this.ballColor = new svgjs.Color("#ff0066");
                    this.ballColor.morph("#00ff99");
                },
                update: function (dt) {
                    // move the ball by its velocity
                    this.ball.dmove(this.vx * dt, this.vy * dt);
    
                    // get position of ball
                    var cx = this.ball.cx();
                    var cy = this.ball.cy();
    
                    // get position of ball and paddle
                    var paddleLeftCy = this.paddleLeft.cy();
    
                    // move the left paddle in the direction of the ball
                    var dy = Math.min(this.difficulty, Math.abs(cy - paddleLeftCy));
                    paddleLeftCy += cy > paddleLeftCy ? dy : -dy;
    
                    // constraint the move to the canvas area
                    this.paddleLeft.cy(Math.max(this.paddleHeight / 2, Math.min(this.height - this.paddleHeight / 2, paddleLeftCy)));
    
                    // check if we hit top/bottom borders
                    if ((this.vy < 0 && cy <= 0) || (this.vy > 0 && cy >= this.height)) {
                        this.vy = -this.vy;
                    }
    
                    var paddleLeftY = this.paddleLeft.y();
                    var paddleRightY = this.paddleRight.y();
    
                    // check if we hit the paddle
                    if ((this.vx < 0 && cx <= this.paddleWidth && cy > paddleLeftY && cy < paddleLeftY + this.paddleHeight) || (this.vx > 0 && cx >= this.width - this.paddleWidth && cy > paddleRightY && cy < paddleRightY + this.paddleHeight)) {
                        // depending on where the ball hit we adjust y velocity
                        // for more realistic control we would need a bit more math here
                        // just keep it simple
                        this.vy = (cy - ((this.vx < 0 ? paddleLeftY : paddleRightY) + this.paddleHeight / 2)) * 7; // magic factor
    
                        // make the ball faster on hit
                        this.vx = -this.vx * 1.05;
                    } else if ((this.vx < 0 && cx <= 0) || (this.vx > 0 && cx >= this.width)) {
                        // when x-velocity is negative, it"s a point for player 2, otherwise player 1
                        if (this.vx < 0) {
                            ++this.playerRight;
                        } else {
                            ++this.playerLeft;
                        }
    
                        this.reset();
    
                        this.scoreLeft.text(System.Double.format(this.playerLeft) + "");
                        this.scoreRight.text(System.Double.format(this.playerRight) + "");
                    }
    
                    // move player paddle
                    var playerPaddleY = this.paddleRight.y();
    
                    if (playerPaddleY <= 0 && this.paddleDirection === -1) {
                        this.paddleRight.cy(this.paddleHeight / 2);
                    } else if (playerPaddleY >= this.height - this.paddleHeight && this.paddleDirection === 1) {
                        this.paddleRight.y(this.height - this.paddleHeight);
                    } else {
                        this.paddleRight.dy(Bridge.Int.mul(this.paddleDirection, this.paddleSpeed));
                    }
    
                    // update ball color based on position
                    this.ball.fill(this.ballColor.at(((Bridge.Int.div(1, this.width)) | 0) * this.ball.x()).toString());
                },
                callback: function (ms) {
                    // we get passed a timestamp in milliseconds
                    // we use it to determine how much time has passed since the last call
                    if (this.lastTime > 0) {
                        this.update((ms - this.lastTime) / 1000); // call update and pass delta time in seconds
                    }
    
                    this.lastTime = ms;
    
                    this.animFrame = requestAnimationFrame(Bridge.fn.cacheBind(this, this.callback));
                },
                reset: function () {
                    // visualize boom
                    this.boom();
    
                    // reset speed values
                    this.vx = 0;
                    this.vy = 0;
    
                    // position the ball back in the middle
                    this.ball.animate(100).center(((Bridge.Int.div(this.width, 2)) | 0), ((Bridge.Int.div(this.height, 2)) | 0));
    
                    // reset the position of the paddles
                    this.paddleLeft.animate(100).cy(((Bridge.Int.div(this.height, 2)) | 0));
                    this.paddleRight.animate(100).cy(((Bridge.Int.div(this.height, 2)) | 0));
                },
                boom: function () {
                    // detect winning player
                    var paddle = this.ball.cx() > ((Bridge.Int.div(this.width, 2)) | 0) ? this.paddleLeft : this.paddleRight;
    
                    // create the gradient
                    var gradient = this.draw.gradient("radial", function (stop) {
                        stop.at(0, paddle.attr("fill"), 1);
                        stop.at(1, paddle.attr("fill"), 0);
                    });
    
                    // create circle to carry the gradient
                    var blast = this.draw.circle(300);
                    blast.center(this.ball.cx(), this.ball.cy()).fill(gradient);
    
                    // animate to invisibility
                    blast.animate(1000, ">").opacity(0).after(function () {
                        blast.remove();
                    });
                }
            }
        });
        Bridge.init();
    });
});
