/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 16.6.1
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
                        label.innerHTML = "Hit SPACE to start. Use ARROWS to control the pad.";
    
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTdmdKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlBvbmdHYW1lLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O2dCQVlZQSxrQkFBa0JBLFlBQStCQTtnQkFDakRBLG1CQUFtQkEsWUFBK0JBOztnQkFFbERBLHNCQUFzQkE7b0JBRWxCQTtvQkFDQUE7OztnQkFHSkEsdUJBQXVCQTtvQkFFbkJBO29CQUNBQTs7Ozs7Ozs7O3dCQU1KQSxJQUFJQSwwQkFBWUE7NEJBRVpBLDBCQUEwRUE7Ozs7d0JBSTlFQSxhQUFhQTt3QkFDYkEsSUFBSUEsNEJBQWtCQTs7O3dCQUd0QkEsWUFBWUE7d0JBQ1pBOzs7d0JBR0FBLHlCQUFXQTt3QkFDWEEsbUNBQXlEQTt3QkFDekRBLG1DQUEyREE7O3dCQUUzREEsMEJBQTBFQTs7Ozt3QkFLMUVBLElBQUlBLDBCQUFZQTs0QkFFWkEsMEJBQTBFQTs7Ozt3QkFJOUVBLFlBQVlBOzs7d0JBUVpBLGFBQWFBOzt3QkFFYkEsV0FBV0EsTUFBMkJBO3dCQUN0Q0EsV0FBV0EsVUFBVUEsQUFBZ0RBOzRCQUVqRUEsVUFBVUE7Ozt3QkFHZEEsNklBSVVBOzt3QkFFVkEsZ0NBQWdDQSxBQUF3QkE7NEJBQU1BLFdBQVdBOzs7O3dCQUd6RUEseUJBQVdBO3dCQUNYQSxtQ0FBMkRBO3dCQUMzREEsbUNBQXlEQTs7d0JBRXpEQSwwQkFBMEVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDakQzREE7O29CQUdmQTtvQkFDQUE7OztvQkFHQUEsWUFBT0EsTUFBMkJBO29CQUNsQ0EsZUFBVUEsWUFBT0E7b0JBQ2pCQSx3QkFBbUJBLFlBQU9BOzs7b0JBRzFCQSxpQkFBaUJBLGVBQVVBLFlBQU9BOzs7b0JBR2xDQSxXQUFXQSxlQUFVQSwwQ0FBY0EsdUNBQVdBO29CQUM5Q0EsWUFBWUE7OztvQkFRWkE7b0JBQ0FBOzs7b0JBR0FBLGtC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U3lzdGVtO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE1pc3NpbmdBUEk7XHJcblxyXG5uYW1lc3BhY2UgU3ZnSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBfcm9vdERpdjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ0blBvbmdHYW1lID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuUG9uZ0dhbWVcIik7XHJcbiAgICAgICAgICAgIHZhciBidG5BbmltYXRpb24gPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5BbmltYXRpb25cIik7XHJcblxyXG4gICAgICAgICAgICBidG5Qb25nR2FtZS5vbmNsaWNrID0gZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVuZGVyUG9uZ0dhbWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYnRuQW5pbWF0aW9uLm9uY2xpY2sgPSBldiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZW5kZXJBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW5kZXJQb25nR2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3Jvb3REaXYgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEaXYgZm9yIFNWRyBlbGVtZW50czpcclxuICAgICAgICAgICAgdmFyIHN2Z0RpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBuZXcgUG9uZ0dhbWUoKS5SZW5kZXIoc3ZnRGl2KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBMYWJlbDpcclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gbmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gXCJIaXQgU1BBQ0UgdG8gc3RhcnQuIFVzZSBBUlJPV1MgdG8gY29udHJvbCB0aGUgcGFkLlwiO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHJvb3QgRGl2IHRvIHRoZSBEb2N1bWVudFxyXG4gICAgICAgICAgICBfcm9vdERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBfcm9vdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzdmdEaXYpO1xyXG4gICAgICAgICAgICBfcm9vdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+KGxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdm9pZCBSZW5kZXJBbmltYXRpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9yb290RGl2ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgSW5wdXQgZm9yIHRleHQ6XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcInRleHRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gXCJSZXR5cGVkLnN2Zy5qcyAtLSAtIC0+XCIsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9IFwiVHlwZSB0ZXh0IGhlcmUuLi5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIERpdiBmb3IgU1ZHIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICB2YXIgc3ZnRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZHJhdyA9IFJldHlwZWQuc3ZnX2pzLnN2Z2pzMi5TZWxmKHN2Z0Rpdikudmlld2JveCgwLCAwLCAzMDAsIDE0MCkuVmFsdWU7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZHJhdy50ZXh0KChnbG9iYWw6OlJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbnRhaW5lci50ZXh0Rm4pKGFkZCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhZGQudHNwYW4oaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgICAgICAucGF0aChcIk0xMCA4MCBDIDQwIDEwLCA2NSAxMCwgOTUgODAgUyAxNTAgMTUwLCAxODAgODBcIikuVmFsdWVcclxuICAgICAgICAgICAgICAgIC5hbmltYXRlKDEwMDAsIFwiPD5cIilcclxuICAgICAgICAgICAgICAgIC5wbG90KFwiTTEwIDgwIEMgNDAgMTUwLCA2NSAxNTAsIDk1IDgwIFMgMTUwIDEwLCAxODAgODBcIilcclxuICAgICAgICAgICAgICAgIC5sb29wKG51bGwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+IHRleHQudHNwYW4oaW5wdXQudmFsdWUpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm9vdCBEaXYgdG8gdGhlIERvY3VtZW50XHJcbiAgICAgICAgICAgIF9yb290RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIF9yb290RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oaW5wdXQpO1xyXG4gICAgICAgICAgICBfcm9vdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzdmdEaXYpO1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgTWlzc2luZ0FQSVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFN2Z0pzRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5sb29wKHsxfSwgezJ9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBUIGxvb3A8VD4odGhpcyBUIGVsLCBpbnQ/IHRpbWVzLCBib29sIHJldmVyc2UpXHJcbiAgICAgICAgICAgIHdoZXJlIFQgOiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5FbGVtZW50O1xyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH0ubG9vcCh7MX0sIHsyfSlcIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5zdmdfanMuc3ZnanMuQW5pbWF0aW9uIGxvb3AodGhpcyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gZWwsIGludD8gdGltZXMsIGJvb2wgcmV2ZXJzZSk7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5wbG90KHsxfSlcIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5zdmdfanMuc3ZnanMuQW5pbWF0aW9uIHBsb3QodGhpcyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gYW5pbWF0aW9uLCBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Qb2ludEFycmF5QWxpYXMgcG9pbnRzKTtcclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9Lm9wYWNpdHkoezF9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gb3BhY2l0eSh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBhbmltYXRpb24sIGRvdWJsZSB2YWx1ZSk7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5mb250KHsxfSwgezJ9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0IGZvbnQodGhpcyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0IGZvbnQsIHN0cmluZyBhdHRyLCBzdHJpbmcgdmFsdWUpO1xyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH0ub24oezF9LCB7Mn0sIHszfSlcIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gdm9pZCBvbih0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkxpYnJhcnkgc3ZnLCBSZXR5cGVkLmRvbS5FdmVudFRhcmdldCB0YXJnZXQsIHN0cmluZyBhY3Rpb24sIERlbGVnYXRlIGhhbmRsZXIpO1xyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2U7XHJcblxyXG51c2luZyBNaXNzaW5nQVBJO1xyXG5cclxudXNpbmcgTWF0aCA9IFJldHlwZWQuZXM1Lk1hdGg7XHJcblxyXG5uYW1lc3BhY2UgU3ZnSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQb25nR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuRG9jIGRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgd2lkdGg7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgaGVpZ2h0O1xyXG5cclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNpcmNsZSBiYWxsO1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHZ4O1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHZ5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgaW50IGRpZmZpY3VsdHk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuUmVjdCBwYWRkbGVMZWZ0O1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuRWxlbWVudCBwYWRkbGVSaWdodDtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBwYWRkbGVXaWR0aDtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBwYWRkbGVIZWlnaHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgcGFkZGxlRGlyZWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgaW50IHBhZGRsZVNwZWVkO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQgc2NvcmVMZWZ0O1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCBzY29yZVJpZ2h0O1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBsYXllckxlZnQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBsYXllclJpZ2h0O1xyXG4gICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db2xvciBiYWxsQ29sb3I7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgbGFzdFRpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgYW5pbUZyYW1lO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBkb2N1bWVudCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgICAgICAgIHdpZHRoID0gNjQwO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSA0ODA7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgU1ZHIGRvY3VtZW50IGFuZCBzZXQgaXRzIHNpemVcclxuICAgICAgICAgICAgZHJhdyA9IFJldHlwZWQuc3ZnX2pzLnN2Z2pzMi5TZWxmKHJvb3QpO1xyXG4gICAgICAgICAgICBkcmF3LnNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGRyYXcudmlld2JveCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgYmFja2dyb3VuZFxyXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9IGRyYXcucmVjdCh3aWR0aCwgaGVpZ2h0KS5maWxsKFwiI2RkZTNlMVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgbGluZVxyXG4gICAgICAgICAgICB2YXIgbGluZSA9IGRyYXcubGluZSh3aWR0aCAvIDIsIDAsIHdpZHRoIC8gMiwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgbGluZS5zdHJva2UobmV3IFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlN0cm9rZURhdGFcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSA1LFxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSBcIiNmZmZcIixcclxuICAgICAgICAgICAgICAgIGRhc2hhcnJheSA9IFwiNSw1XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZGVmaW5lIHBhZGRsZSB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgICAgICAgIHBhZGRsZVdpZHRoID0gMTU7XHJcbiAgICAgICAgICAgIHBhZGRsZUhlaWdodCA9IDgwO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBwb3NpdGlvbiBsZWZ0IHBhZGRsZVxyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0ID0gZHJhdy5yZWN0KHBhZGRsZVdpZHRoLCBwYWRkbGVIZWlnaHQpO1xyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0LngoMCkuVmFsdWUuY3koaGVpZ2h0IC8gMikuVmFsdWUuZmlsbChcIiMwMGZmOTlcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYW5kIHBvc2l0aW9uIHJpZ2h0IHBhZGRsZVxyXG4gICAgICAgICAgICBwYWRkbGVSaWdodCA9IHBhZGRsZUxlZnQuY2xvbmUoKTtcclxuICAgICAgICAgICAgcGFkZGxlUmlnaHQueCh3aWR0aCAtIHBhZGRsZVdpZHRoKS5WYWx1ZS5maWxsKFwiI2ZmMDA2NlwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFsbCBzaXplXHJcbiAgICAgICAgICAgIHZhciBiYWxsU2l6ZSA9IDEwO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGJhbGxcclxuICAgICAgICAgICAgYmFsbCA9IGRyYXcuY2lyY2xlKGJhbGxTaXplKTtcclxuICAgICAgICAgICAgYmFsbC5jZW50ZXIod2lkdGggLyAyLCBoZWlnaHQgLyAyKS5WYWx1ZS5maWxsKFwiIzdmN2Y3ZlwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgaW5pdGFsIHBsYXllciBzY29yZVxyXG4gICAgICAgICAgICBwbGF5ZXJMZWZ0ID0gMC4wO1xyXG4gICAgICAgICAgICBwbGF5ZXJSaWdodCA9IDAuMDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0ZXh0IGZvciB0aGUgc2NvcmUsIHNldCBmb250IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgc2NvcmVMZWZ0ID0gKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQpIGRyYXcudGV4dChwbGF5ZXJMZWZ0ICsgXCJcIikuZm9udChcclxuICAgICAgICAgICAgICAgIG5ldyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Gb250RGF0YVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSAzMixcclxuICAgICAgICAgICAgICAgICAgICBmYW1pbHkgPSBcIk1lbmxvLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yID0gXCJlbmRcIixcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6I2ZmZlwiXHJcbiAgICAgICAgICAgICAgICAgICAgLy9maWxsID0gXCIjZmZmXCIgLy9UT0RPOiB1cFxyXG4gICAgICAgICAgICAgICAgfSkuVmFsdWUubW92ZSh3aWR0aCAvIDIgLSAxMCwgMTApO1xyXG5cclxuICAgICAgICAgICAgLy8gY2xvbmluZyByb2NrcyFcclxuICAgICAgICAgICAgc2NvcmVSaWdodCA9IChSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0KSAoKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQpIHNjb3JlTGVmdC5jbG9uZSgpKVxyXG4gICAgICAgICAgICAgICAgLnRleHQocGxheWVyUmlnaHQgKyBcIlwiKS5WYWx1ZVxyXG4gICAgICAgICAgICAgICAgLmZvbnQoXCJhbmNob3JcIiwgXCJzdGFydFwiKVxyXG4gICAgICAgICAgICAgICAgLngod2lkdGggLyAyICsgMTApO1xyXG5cclxuICAgICAgICAgICAgLy8gQUkgZGlmZmljdWx0eVxyXG4gICAgICAgICAgICBkaWZmaWN1bHR5ID0gMjtcclxuXHJcbiAgICAgICAgICAgIGNhbGxiYWNrKDApO1xyXG5cclxuICAgICAgICAgICAgcGFkZGxlRGlyZWN0aW9uID0gMDtcclxuICAgICAgICAgICAgcGFkZGxlU3BlZWQgPSA1O1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5zdmdfanMuc3ZnanMyLm9uKFJldHlwZWQuZG9tLmRvY3VtZW50LCBcImtleWRvd25cIiwgbmV3IEFjdGlvbjxSZXR5cGVkLmRvbS5LZXlib2FyZEV2ZW50PihlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIExldCdzIHNraXAgbm9uLWNvbnRyb2wga2V5c1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAzOClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT0gNDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGxlRGlyZWN0aW9uID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT0gMzIgJiYgdnggPT0gMCAmJiB2eSA9PSAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJhbmRvbSB2ZWxvY2l0eSBmb3IgdGhlIGJhbGwgYXQgc3RhcnRcclxuICAgICAgICAgICAgICAgICAgICB2eSA9IFJldHlwZWQuZXM1Lk1hdGgucmFuZG9tKCkgKiA1MDAgLSAxNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgdnggPSBSZXR5cGVkLmVzNS5NYXRoLnJhbmRvbSgpID4gMC41ID8gMjUwIDogLTI1MDtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuc3ZnX2pzLnN2Z2pzMi5vbihSZXR5cGVkLmRvbS5kb2N1bWVudCwgXCJrZXl1cFwiLCBuZXcgQWN0aW9uPFJldHlwZWQuZG9tLktleWJvYXJkRXZlbnQ+KGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gTGV0J3Mgc2tpcCBub24tY29udHJvbCBrZXlzXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDM4IHx8IGUua2V5Q29kZSA9PSA0MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYmFsbCBjb2xvciB1cGRhdGVcclxuICAgICAgICAgICAgYmFsbENvbG9yID0gQ3JlYXRlQ29sb3IoXCIjZmYwMDY2XCIpO1xyXG4gICAgICAgICAgICBiYWxsQ29sb3IubW9ycGgoXCIjMDBmZjk5XCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIHVwZGF0ZShkb3VibGUgZHQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBiYWxsIGJ5IGl0cyB2ZWxvY2l0eVxyXG4gICAgICAgICAgICBiYWxsLmRtb3ZlKHZ4ICogZHQsIHZ5ICogZHQpO1xyXG5cclxuICAgICAgICAgICAgIC8vIGdldCBwb3NpdGlvbiBvZiBiYWxsXHJcbiAgICAgICAgICAgIHZhciBjeCA9IGJhbGwuY3goKTtcclxuICAgICAgICAgICAgdmFyIGN5ID0gYmFsbC5jeSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gZ2V0IHBvc2l0aW9uIG9mIGJhbGwgYW5kIHBhZGRsZVxyXG4gICAgICAgICAgICB2YXIgcGFkZGxlTGVmdEN5ID0gcGFkZGxlTGVmdC5jeSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgbGVmdCBwYWRkbGUgaW4gdGhlIGRpcmVjdGlvbiBvZiB0aGUgYmFsbFxyXG4gICAgICAgICAgICB2YXIgZHkgPSBSZXR5cGVkLmVzNS5NYXRoLm1pbihkaWZmaWN1bHR5LCBSZXR5cGVkLmVzNS5NYXRoLmFicyhjeSAtIHBhZGRsZUxlZnRDeSkpO1xyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0Q3kgKz0gY3kgPiBwYWRkbGVMZWZ0Q3kgPyBkeSA6IC1keTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnN0cmFpbnQgdGhlIG1vdmUgdG8gdGhlIGNhbnZhcyBhcmVhXHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnQuY3koUmV0eXBlZC5lczUuTWF0aC5tYXgocGFkZGxlSGVpZ2h0IC8gMiwgUmV0eXBlZC5lczUuTWF0aC5taW4oaGVpZ2h0IC0gcGFkZGxlSGVpZ2h0IC8gMiwgcGFkZGxlTGVmdEN5KSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgaGl0IHRvcC9ib3R0b20gYm9yZGVyc1xyXG4gICAgICAgICAgICBpZiAoKHZ5IDwgMCAmJiBjeSA8PSAwKSB8fCAodnkgPiAwICYmIGN5ID49IGhlaWdodCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZ5ID0gLXZ5O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFkZGxlTGVmdFkgPSBwYWRkbGVMZWZ0LnkoKTtcclxuICAgICAgICAgICAgdmFyIHBhZGRsZVJpZ2h0WSA9IHBhZGRsZVJpZ2h0LnkoKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGhpdCB0aGUgcGFkZGxlXHJcbiAgICAgICAgICAgIGlmICgodnggPCAwICYmIGN4IDw9IHBhZGRsZVdpZHRoICYmIGN5ID4gcGFkZGxlTGVmdFkgJiYgY3kgPCBwYWRkbGVMZWZ0WSArIHBhZGRsZUhlaWdodCkgfHxcclxuICAgICAgICAgICAgICAgICh2eCA+IDAgJiYgY3ggPj0gd2lkdGggLSBwYWRkbGVXaWR0aCAmJiBjeSA+IHBhZGRsZVJpZ2h0WSAmJiBjeSA8IHBhZGRsZVJpZ2h0WSArIHBhZGRsZUhlaWdodCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlcGVuZGluZyBvbiB3aGVyZSB0aGUgYmFsbCBoaXQgd2UgYWRqdXN0IHkgdmVsb2NpdHlcclxuICAgICAgICAgICAgICAgIC8vIGZvciBtb3JlIHJlYWxpc3RpYyBjb250cm9sIHdlIHdvdWxkIG5lZWQgYSBiaXQgbW9yZSBtYXRoIGhlcmVcclxuICAgICAgICAgICAgICAgIC8vIGp1c3Qga2VlcCBpdCBzaW1wbGVcclxuICAgICAgICAgICAgICAgIHZ5ID0gKGN5IC0gKCh2eCA8IDAgPyBwYWRkbGVMZWZ0WSA6IHBhZGRsZVJpZ2h0WSkgKyBwYWRkbGVIZWlnaHQgLyAyKSkgKiA3OyAvLyBtYWdpYyBmYWN0b3JcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBtYWtlIHRoZSBiYWxsIGZhc3RlciBvbiBoaXRcclxuICAgICAgICAgICAgICAgIHZ4ID0gLXZ4ICogMS4wNTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgaGl0IGxlZnQvcmlnaHQgYm9yZGVyc1xyXG4gICAgICAgICAgICBpZiAoKHZ4IDwgMCAmJiBjeCA8PSAwKSB8fCAodnggPiAwICYmIGN4ID49IHdpZHRoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB4LXZlbG9jaXR5IGlzIG5lZ2F0aXZlLCBpdFwicyBhIHBvaW50IGZvciBwbGF5ZXIgMiwgb3RoZXJ3aXNlIHBsYXllciAxXHJcbiAgICAgICAgICAgICAgICBpZiAodnggPCAwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICsrcGxheWVyUmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytwbGF5ZXJMZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJlc2V0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2NvcmVMZWZ0LnRleHQocGxheWVyTGVmdCArIFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgc2NvcmVSaWdodC50ZXh0KHBsYXllclJpZ2h0ICsgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG1vdmUgcGxheWVyIHBhZGRsZVxyXG4gICAgICAgICAgICB2YXIgcGxheWVyUGFkZGxlWSA9IHBhZGRsZVJpZ2h0LnkoKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXJQYWRkbGVZIDw9IDAgJiYgcGFkZGxlRGlyZWN0aW9uID09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWRkbGVSaWdodC5jeShwYWRkbGVIZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChwbGF5ZXJQYWRkbGVZID49IGhlaWdodCAtIHBhZGRsZUhlaWdodCAmJiBwYWRkbGVEaXJlY3Rpb24gPT0gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFkZGxlUmlnaHQueShoZWlnaHQgLSBwYWRkbGVIZWlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFkZGxlUmlnaHQuZHkocGFkZGxlRGlyZWN0aW9uICogcGFkZGxlU3BlZWQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgYmFsbCBjb2xvciBiYXNlZCBvbiBwb3NpdGlvblxyXG4gICAgICAgICAgICBiYWxsLmZpbGwoYmFsbENvbG9yLmF0KDEgLyB3aWR0aCAqIGJhbGwueCgpKS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBjYWxsYmFjayhkb3VibGUgbXMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyB3ZSBnZXQgcGFzc2VkIGEgdGltZXN0YW1wIGluIG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAgICAvLyB3ZSB1c2UgaXQgdG8gZGV0ZXJtaW5lIGhvdyBtdWNoIHRpbWUgaGFzIHBhc3NlZCBzaW5jZSB0aGUgbGFzdCBjYWxsXHJcbiAgICAgICAgICAgIGlmIChsYXN0VGltZSA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZSgobXMgLSBsYXN0VGltZSkgLyAxMDAwKTsgLy8gY2FsbCB1cGRhdGUgYW5kIHBhc3MgZGVsdGEgdGltZSBpbiBzZWNvbmRzXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxhc3RUaW1lID0gbXM7XHJcblxyXG4gICAgICAgICAgICBhbmltRnJhbWUgPSBSZXR5cGVkLmRvbS5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobmV3IEFjdGlvbjxkb3VibGU+KGNhbGxiYWNrKS5BczxSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjaz4oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgcmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gdmlzdWFsaXplIGJvb21cclxuICAgICAgICAgICAgYm9vbSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzZXQgc3BlZWQgdmFsdWVzXHJcbiAgICAgICAgICAgIHZ4ID0gMDtcclxuICAgICAgICAgICAgdnkgPSAwO1xyXG5cclxuICAgICAgICAgICAgLy8gcG9zaXRpb24gdGhlIGJhbGwgYmFjayBpbiB0aGUgbWlkZGxlXHJcbiAgICAgICAgICAgIGJhbGwuYW5pbWF0ZSgxMDApLmNlbnRlcih3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBwYWRkbGVzXHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnQuYW5pbWF0ZSgxMDApLmN5KGhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICBwYWRkbGVSaWdodC5hbmltYXRlKDEwMCkuY3koaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzaG93IHZpc3VhbCBleHBsb3Npb24gXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGJvb20oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZGV0ZWN0IHdpbm5pbmcgcGxheWVyXHJcbiAgICAgICAgICAgIHZhciBwYWRkbGUgPSBiYWxsLmN4KCkgPiB3aWR0aCAvIDIgPyBwYWRkbGVMZWZ0IDogcGFkZGxlUmlnaHQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgZ3JhZGllbnRcclxuICAgICAgICAgICAgdmFyIGdyYWRpZW50ID0gZHJhdy5ncmFkaWVudChcInJhZGlhbFwiLCAoZ2xvYmFsOjpSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db250YWluZXIuZ3JhZGllbnRGbikoc3RvcCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdG9wLmF0KDAsIChSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db2xvckFsaWFzKSBwYWRkbGUuYXR0cihcImZpbGxcIiksIDEpO1xyXG4gICAgICAgICAgICAgICAgc3RvcC5hdCgxLCAoUmV0eXBlZC5zdmdfanMuc3ZnanMuQ29sb3JBbGlhcykgcGFkZGxlLmF0dHIoXCJmaWxsXCIpLCAwKTtcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGNpcmNsZSB0byBjYXJyeSB0aGUgZ3JhZGllbnRcclxuICAgICAgICAgICAgdmFyIGJsYXN0ID0gZHJhdy5jaXJjbGUoMzAwKTtcclxuICAgICAgICAgICAgYmxhc3QuY2VudGVyKGJhbGwuY3goKSwgYmFsbC5jeSgpKS5WYWx1ZS5maWxsKGdyYWRpZW50KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gYW5pbWF0ZSB0byBpbnZpc2liaWxpdHlcclxuICAgICAgICAgICAgYmxhc3QuYW5pbWF0ZSgxMDAwLCBcIj5cIikub3BhY2l0eSgwKS5hZnRlcigoZ2xvYmFsOjpTeXN0ZW0uQWN0aW9uKSgoKSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBibGFzdC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETzogUmV0eXBlZCBpc3N1ZTogU1ZHanMgQ29sb3IncyBOZXcgbWV0aG9kcyBzaG91bGQgYmUgdHJhbnNsYXRlZCBpbnRvIGNvbnN0cnVjdG9yc1xyXG4gICAgICAgIFtUZW1wbGF0ZShcIm5ldyBzdmdqcy5Db2xvcih7MH0pXCIpXVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db2xvciBDcmVhdGVDb2xvcihzdHJpbmcgY29sb3IpO1xyXG4gICAgfVxyXG59Il0KfQo=
