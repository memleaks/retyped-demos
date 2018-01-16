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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTdmdKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlBvbmdHYW1lLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O2dCQVlZQSxrQkFBa0JBLFlBQStCQTtnQkFDakRBLG1CQUFtQkEsWUFBK0JBOztnQkFFbERBLHNCQUFzQkE7b0JBRWxCQTtvQkFDQUE7OztnQkFHSkEsdUJBQXVCQTtvQkFFbkJBO29CQUNBQTs7OztnQkFJSkE7Ozs7Ozs7O3dCQUtBQSxJQUFJQSwwQkFBWUE7NEJBRVpBLDBCQUEwRUE7Ozs7d0JBSTlFQSxhQUFhQTt3QkFDYkEsSUFBSUEsNEJBQWtCQTs7O3dCQUd0QkEsWUFBWUE7d0JBQ1pBOzs7d0JBR0FBLHlCQUFXQTt3QkFDWEEsbUNBQXlEQTt3QkFDekRBLG1DQUEyREE7O3dCQUUzREEsMEJBQTBFQTs7Ozt3QkFLMUVBLElBQUlBLDBCQUFZQTs0QkFFWkEsMEJBQTBFQTs7Ozt3QkFJOUVBLFlBQVlBOzs7d0JBUVpBLGFBQWFBOzt3QkFFYkEsV0FBV0EsTUFBMkJBO3dCQUN0Q0EsV0FBV0EsVUFBVUEsQUFBZ0RBOzRCQUVqRUEsVUFBVUE7Ozt3QkFHZEEsNklBSVVBOzt3QkFFVkEsZ0NBQWdDQSxBQUF3QkE7NEJBQU1BLFdBQVdBOzs7O3dCQUd6RUEseUJBQVdBO3dCQUNYQSxtQ0FBMkRBO3dCQUMzREEsbUNBQXlEQTs7d0JBRXpEQSwwQkFBMEVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDcEQzREE7O29CQUdmQTtvQkFDQUE7OztvQkFHQUEsWUFBT0EsTUFBMkJBO29CQUNsQ0EsZUFBVUEsWUFBT0E7b0JBQ2pCQSx3QkFBbUJBLFlBQU9BOzs7b0JBRzFCQSxpQkFBaUJBLGVBQVVBLFlBQU9BOzs7b0JBR2xDQSxXQUFXQSxlQUFVQSwwQ0FBY0EsdUNBQVdBO29CQUM5Q0EsWUFBWUE7OztvQkFRWkE7b0JBQ0FBOzs7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IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE1pc3NpbmdBUEk7XHJcblxyXG5uYW1lc3BhY2UgU3ZnSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBfcm9vdERpdjtcclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGJ0blBvbmdHYW1lID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuUG9uZ0dhbWVcIik7XHJcbiAgICAgICAgICAgIHZhciBidG5BbmltYXRpb24gPSAoUmV0eXBlZC5kb20uSFRNTEJ1dHRvbkVsZW1lbnQpUmV0eXBlZC5kb20uZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5BbmltYXRpb25cIik7XHJcblxyXG4gICAgICAgICAgICBidG5Qb25nR2FtZS5vbmNsaWNrID0gZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVuZGVyUG9uZ0dhbWUoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgYnRuQW5pbWF0aW9uLm9uY2xpY2sgPSBldiA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZW5kZXJBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIFBvbmcgR2FtZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgIFJlbmRlclBvbmdHYW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlclBvbmdHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcm9vdERpdiAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIERpdiBmb3IgU1ZHIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICB2YXIgc3ZnRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIG5ldyBQb25nR2FtZSgpLlJlbmRlcihzdmdEaXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIExhYmVsOlxyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBuZXcgUmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSBcIkhpdCBTUEFDRSB0byBzdGFydC4gVXNlIEFSUk9XUyB0byBjb250cm9sIHRoZSBwYWQuXCI7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm9vdCBEaXYgdG8gdGhlIERvY3VtZW50XHJcbiAgICAgICAgICAgIF9yb290RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIF9yb290RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHN2Z0Rpdik7XHJcbiAgICAgICAgICAgIF9yb290RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudD4obGFiZWwpO1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlckFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3Jvb3REaXYgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBJbnB1dCBmb3IgdGV4dDpcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBcIlJldHlwZWQuc3ZnLmpzIC0tIC0gLT5cIixcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gXCJUeXBlIHRleHQgaGVyZS4uLlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgRGl2IGZvciBTVkcgZWxlbWVudHM6XHJcbiAgICAgICAgICAgIHZhciBzdmdEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkcmF3ID0gUmV0eXBlZC5zdmdfanMuc3ZnanMyLlNlbGYoc3ZnRGl2KS52aWV3Ym94KDAsIDAsIDMwMCwgMTQwKS5WYWx1ZTtcclxuICAgICAgICAgICAgdmFyIHRleHQgPSBkcmF3LnRleHQoKGdsb2JhbDo6UmV0eXBlZC5zdmdfanMuc3ZnanMuQ29udGFpbmVyLnRleHRGbikoYWRkID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFkZC50c3BhbihpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAgIC5wYXRoKFwiTTEwIDgwIEMgNDAgMTAsIDY1IDEwLCA5NSA4MCBTIDE1MCAxNTAsIDE4MCA4MFwiKS5WYWx1ZVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoMTAwMCwgXCI8PlwiKVxyXG4gICAgICAgICAgICAgICAgLnBsb3QoXCJNMTAgODAgQyA0MCAxNTAsIDY1IDE1MCwgOTUgODAgUyAxNTAgMTAsIDE4MCA4MFwiKVxyXG4gICAgICAgICAgICAgICAgLmxvb3AobnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT4gdGV4dC50c3BhbihpbnB1dC52YWx1ZSkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCByb290IERpdiB0byB0aGUgRG9jdW1lbnRcclxuICAgICAgICAgICAgX3Jvb3REaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgX3Jvb3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihpbnB1dCk7XHJcbiAgICAgICAgICAgIF9yb290RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHN2Z0Rpdik7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5hbWVzcGFjZSBNaXNzaW5nQVBJXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgU3ZnSnNFeHRlbnNpb25zXHJcbiAgICB7XHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9Lmxvb3AoezF9LCB7Mn0pXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIFQgbG9vcDxUPih0aGlzIFQgZWwsIGludD8gdGltZXMsIGJvb2wgcmV2ZXJzZSlcclxuICAgICAgICAgICAgd2hlcmUgVCA6IFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkVsZW1lbnQ7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5sb29wKHsxfSwgezJ9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gbG9vcCh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBlbCwgaW50PyB0aW1lcywgYm9vbCByZXZlcnNlKTtcclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9LnBsb3QoezF9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gcGxvdCh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBhbmltYXRpb24sIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlBvaW50QXJyYXlBbGlhcyBwb2ludHMpO1xyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH0ub3BhY2l0eSh7MX0pXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBvcGFjaXR5KHRoaXMgUmV0eXBlZC5zdmdfanMuc3ZnanMuQW5pbWF0aW9uIGFuaW1hdGlvbiwgZG91YmxlIHZhbHVlKTtcclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9LmZvbnQoezF9LCB7Mn0pXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQgZm9udCh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQgZm9udCwgc3RyaW5nIGF0dHIsIHN0cmluZyB2YWx1ZSk7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5vbih7MX0sIHsyfSwgezN9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiB2b2lkIG9uKHRoaXMgUmV0eXBlZC5zdmdfanMuc3ZnanMuTGlicmFyeSBzdmcsIFJldHlwZWQuZG9tLkV2ZW50VGFyZ2V0IHRhcmdldCwgc3RyaW5nIGFjdGlvbiwgRGVsZWdhdGUgaGFuZGxlcik7XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZTtcclxuXHJcbnVzaW5nIE1pc3NpbmdBUEk7XHJcblxyXG51c2luZyBNYXRoID0gUmV0eXBlZC5lczUuTWF0aDtcclxuXHJcbm5hbWVzcGFjZSBTdmdKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBvbmdHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Eb2MgZHJhdztcclxuICAgICAgICBwcml2YXRlIGludCB3aWR0aDtcclxuICAgICAgICBwcml2YXRlIGludCBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuQ2lyY2xlIGJhbGw7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgdng7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgdnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZGlmZmljdWx0eTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5SZWN0IHBhZGRsZUxlZnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5FbGVtZW50IHBhZGRsZVJpZ2h0O1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBhZGRsZVdpZHRoO1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBhZGRsZUhlaWdodDtcclxuICAgICAgICBwcml2YXRlIGludCBwYWRkbGVEaXJlY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgcGFkZGxlU3BlZWQ7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCBzY29yZUxlZnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0IHNjb3JlUmlnaHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgcGxheWVyTGVmdDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgcGxheWVyUmlnaHQ7XHJcbiAgICAgICBcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yIGJhbGxDb2xvcjtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBsYXN0VGltZTtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBhbmltRnJhbWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbmRlcihSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIGRvY3VtZW50IHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICAgICAgICAgd2lkdGggPSA2NDA7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IDQ4MDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBTVkcgZG9jdW1lbnQgYW5kIHNldCBpdHMgc2l6ZVxyXG4gICAgICAgICAgICBkcmF3ID0gUmV0eXBlZC5zdmdfanMuc3ZnanMyLlNlbGYocm9vdCk7XHJcbiAgICAgICAgICAgIGRyYXcuc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgZHJhdy52aWV3Ym94KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gZHJhdy5yZWN0KHdpZHRoLCBoZWlnaHQpLmZpbGwoXCIjZGRlM2UxXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBsaW5lXHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gZHJhdy5saW5lKHdpZHRoIC8gMiwgMCwgd2lkdGggLyAyLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBsaW5lLnN0cm9rZShuZXcgUmV0eXBlZC5zdmdfanMuc3ZnanMuU3Ryb2tlRGF0YVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDUsXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IFwiI2ZmZlwiLFxyXG4gICAgICAgICAgICAgICAgZGFzaGFycmF5ID0gXCI1LDVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgcGFkZGxlIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICAgICAgICAgcGFkZGxlV2lkdGggPSAxNTtcclxuICAgICAgICAgICAgcGFkZGxlSGVpZ2h0ID0gODA7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYW5kIHBvc2l0aW9uIGxlZnQgcGFkZGxlXHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnQgPSBkcmF3LnJlY3QocGFkZGxlV2lkdGgsIHBhZGRsZUhlaWdodCk7XHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnQueCgwKS5WYWx1ZS5jeShoZWlnaHQgLyAyKS5WYWx1ZS5maWxsKFwiIzAwZmY5OVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbmQgcG9zaXRpb24gcmlnaHQgcGFkZGxlXHJcbiAgICAgICAgICAgIHBhZGRsZVJpZ2h0ID0gcGFkZGxlTGVmdC5jbG9uZSgpO1xyXG4gICAgICAgICAgICBwYWRkbGVSaWdodC54KHdpZHRoIC0gcGFkZGxlV2lkdGgpLlZhbHVlLmZpbGwoXCIjZmYwMDY2XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWxsIHNpemVcclxuICAgICAgICAgICAgdmFyIGJhbGxTaXplID0gMTA7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYmFsbFxyXG4gICAgICAgICAgICBiYWxsID0gZHJhdy5jaXJjbGUoYmFsbFNpemUpO1xyXG4gICAgICAgICAgICBiYWxsLmNlbnRlcih3aWR0aCAvIDIsIGhlaWdodCAvIDIpLlZhbHVlLmZpbGwoXCIjN2Y3ZjdmXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBpbml0YWwgcGxheWVyIHNjb3JlXHJcbiAgICAgICAgICAgIHBsYXllckxlZnQgPSAwLjA7XHJcbiAgICAgICAgICAgIHBsYXllclJpZ2h0ID0gMC4wO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIHRoZSBzY29yZSwgc2V0IGZvbnQgcHJvcGVydGllc1xyXG4gICAgICAgICAgICBzY29yZUxlZnQgPSAoUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCkgZHJhdy50ZXh0KHBsYXllckxlZnQgKyBcIlwiKS5mb250KFxyXG4gICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkZvbnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhbWlseSA9IFwiTWVubG8sIHNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgICAgICAgICBhbmNob3IgPSBcImVuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojZmZmXCJcclxuICAgICAgICAgICAgICAgICAgICAvL2ZpbGwgPSBcIiNmZmZcIiAvL1RPRE86IHVwXHJcbiAgICAgICAgICAgICAgICB9KS5WYWx1ZS5tb3ZlKHdpZHRoIC8gMiAtIDEwLCAxMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjbG9uaW5nIHJvY2tzIVxyXG4gICAgICAgICAgICBzY29yZVJpZ2h0ID0gKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQpICgoUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCkgc2NvcmVMZWZ0LmNsb25lKCkpXHJcbiAgICAgICAgICAgICAgICAudGV4dChwbGF5ZXJSaWdodCArIFwiXCIpLlZhbHVlXHJcbiAgICAgICAgICAgICAgICAuZm9udChcImFuY2hvclwiLCBcInN0YXJ0XCIpXHJcbiAgICAgICAgICAgICAgICAueCh3aWR0aCAvIDIgKyAxMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBSSBkaWZmaWN1bHR5XHJcbiAgICAgICAgICAgIGRpZmZpY3VsdHkgPSAyO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soMCk7XHJcblxyXG4gICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICBwYWRkbGVTcGVlZCA9IDU7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLnN2Z19qcy5zdmdqczIub24oUmV0eXBlZC5kb20uZG9jdW1lbnQsIFwia2V5ZG93blwiLCBuZXcgQWN0aW9uPFJldHlwZWQuZG9tLktleWJvYXJkRXZlbnQ+KGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gTGV0J3Mgc2tpcCBub24tY29udHJvbCBrZXlzXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDM4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PSA0MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzMiAmJiB2eCA9PSAwICYmIHZ5ID09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZG9tIHZlbG9jaXR5IGZvciB0aGUgYmFsbCBhdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgIHZ5ID0gUmV0eXBlZC5lczUuTWF0aC5yYW5kb20oKSAqIDUwMCAtIDE1MDtcclxuICAgICAgICAgICAgICAgICAgICB2eCA9IFJldHlwZWQuZXM1Lk1hdGgucmFuZG9tKCkgPiAwLjUgPyAyNTAgOiAtMjUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGxlRGlyZWN0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5zdmdfanMuc3ZnanMyLm9uKFJldHlwZWQuZG9tLmRvY3VtZW50LCBcImtleXVwXCIsIG5ldyBBY3Rpb248UmV0eXBlZC5kb20uS2V5Ym9hcmRFdmVudD4oZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBza2lwIG5vbi1jb250cm9sIGtleXNcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMzggfHwgZS5rZXlDb2RlID09IDQwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBiYWxsIGNvbG9yIHVwZGF0ZVxyXG4gICAgICAgICAgICBiYWxsQ29sb3IgPSBDcmVhdGVDb2xvcihcIiNmZjAwNjZcIik7XHJcbiAgICAgICAgICAgIGJhbGxDb2xvci5tb3JwaChcIiMwMGZmOTlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgdXBkYXRlKGRvdWJsZSBkdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGJhbGwgYnkgaXRzIHZlbG9jaXR5XHJcbiAgICAgICAgICAgIGJhbGwuZG1vdmUodnggKiBkdCwgdnkgKiBkdCk7XHJcblxyXG4gICAgICAgICAgICAgLy8gZ2V0IHBvc2l0aW9uIG9mIGJhbGxcclxuICAgICAgICAgICAgdmFyIGN4ID0gYmFsbC5jeCgpO1xyXG4gICAgICAgICAgICB2YXIgY3kgPSBiYWxsLmN5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgcG9zaXRpb24gb2YgYmFsbCBhbmQgcGFkZGxlXHJcbiAgICAgICAgICAgIHZhciBwYWRkbGVMZWZ0Q3kgPSBwYWRkbGVMZWZ0LmN5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBsZWZ0IHBhZGRsZSBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBiYWxsXHJcbiAgICAgICAgICAgIHZhciBkeSA9IFJldHlwZWQuZXM1Lk1hdGgubWluKGRpZmZpY3VsdHksIFJldHlwZWQuZXM1Lk1hdGguYWJzKGN5IC0gcGFkZGxlTGVmdEN5KSk7XHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnRDeSArPSBjeSA+IHBhZGRsZUxlZnRDeSA/IGR5IDogLWR5O1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc3RyYWludCB0aGUgbW92ZSB0byB0aGUgY2FudmFzIGFyZWFcclxuICAgICAgICAgICAgcGFkZGxlTGVmdC5jeShSZXR5cGVkLmVzNS5NYXRoLm1heChwYWRkbGVIZWlnaHQgLyAyLCBSZXR5cGVkLmVzNS5NYXRoLm1pbihoZWlnaHQgLSBwYWRkbGVIZWlnaHQgLyAyLCBwYWRkbGVMZWZ0Q3kpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBoaXQgdG9wL2JvdHRvbSBib3JkZXJzXHJcbiAgICAgICAgICAgIGlmICgodnkgPCAwICYmIGN5IDw9IDApIHx8ICh2eSA+IDAgJiYgY3kgPj0gaGVpZ2h0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdnkgPSAtdnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkbGVMZWZ0WSA9IHBhZGRsZUxlZnQueSgpO1xyXG4gICAgICAgICAgICB2YXIgcGFkZGxlUmlnaHRZID0gcGFkZGxlUmlnaHQueSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgaGl0IHRoZSBwYWRkbGVcclxuICAgICAgICAgICAgaWYgKCh2eCA8IDAgJiYgY3ggPD0gcGFkZGxlV2lkdGggJiYgY3kgPiBwYWRkbGVMZWZ0WSAmJiBjeSA8IHBhZGRsZUxlZnRZICsgcGFkZGxlSGVpZ2h0KSB8fFxyXG4gICAgICAgICAgICAgICAgKHZ4ID4gMCAmJiBjeCA+PSB3aWR0aCAtIHBhZGRsZVdpZHRoICYmIGN5ID4gcGFkZGxlUmlnaHRZICYmIGN5IDwgcGFkZGxlUmlnaHRZICsgcGFkZGxlSGVpZ2h0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBiYWxsIGhpdCB3ZSBhZGp1c3QgeSB2ZWxvY2l0eVxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIG1vcmUgcmVhbGlzdGljIGNvbnRyb2wgd2Ugd291bGQgbmVlZCBhIGJpdCBtb3JlIG1hdGggaGVyZVxyXG4gICAgICAgICAgICAgICAgLy8ganVzdCBrZWVwIGl0IHNpbXBsZVxyXG4gICAgICAgICAgICAgICAgdnkgPSAoY3kgLSAoKHZ4IDwgMCA/IHBhZGRsZUxlZnRZIDogcGFkZGxlUmlnaHRZKSArIHBhZGRsZUhlaWdodCAvIDIpKSAqIDc7IC8vIG1hZ2ljIGZhY3RvclxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1ha2UgdGhlIGJhbGwgZmFzdGVyIG9uIGhpdFxyXG4gICAgICAgICAgICAgICAgdnggPSAtdnggKiAxLjA1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBoaXQgbGVmdC9yaWdodCBib3JkZXJzXHJcbiAgICAgICAgICAgIGlmICgodnggPCAwICYmIGN4IDw9IDApIHx8ICh2eCA+IDAgJiYgY3ggPj0gd2lkdGgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHgtdmVsb2NpdHkgaXMgbmVnYXRpdmUsIGl0XCJzIGEgcG9pbnQgZm9yIHBsYXllciAyLCBvdGhlcndpc2UgcGxheWVyIDFcclxuICAgICAgICAgICAgICAgIGlmICh2eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytwbGF5ZXJSaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK3BsYXllckxlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29yZUxlZnQudGV4dChwbGF5ZXJMZWZ0ICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBzY29yZVJpZ2h0LnRleHQocGxheWVyUmlnaHQgKyBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSBwbGF5ZXIgcGFkZGxlXHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJQYWRkbGVZID0gcGFkZGxlUmlnaHQueSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllclBhZGRsZVkgPD0gMCAmJiBwYWRkbGVEaXJlY3Rpb24gPT0gLTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhZGRsZVJpZ2h0LmN5KHBhZGRsZUhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllclBhZGRsZVkgPj0gaGVpZ2h0IC0gcGFkZGxlSGVpZ2h0ICYmIHBhZGRsZURpcmVjdGlvbiA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWRkbGVSaWdodC55KGhlaWdodCAtIHBhZGRsZUhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWRkbGVSaWdodC5keShwYWRkbGVEaXJlY3Rpb24gKiBwYWRkbGVTcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBiYWxsIGNvbG9yIGJhc2VkIG9uIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGJhbGwuZmlsbChiYWxsQ29sb3IuYXQoMSAvIHdpZHRoICogYmFsbC54KCkpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGNhbGxiYWNrKGRvdWJsZSBtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHdlIGdldCBwYXNzZWQgYSB0aW1lc3RhbXAgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgIC8vIHdlIHVzZSBpdCB0byBkZXRlcm1pbmUgaG93IG11Y2ggdGltZSBoYXMgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGNhbGxcclxuICAgICAgICAgICAgaWYgKGxhc3RUaW1lID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlKChtcyAtIGxhc3RUaW1lKSAvIDEwMDApOyAvLyBjYWxsIHVwZGF0ZSBhbmQgcGFzcyBkZWx0YSB0aW1lIGluIHNlY29uZHNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFzdFRpbWUgPSBtcztcclxuXHJcbiAgICAgICAgICAgIGFuaW1GcmFtZSA9IFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZShuZXcgQWN0aW9uPGRvdWJsZT4oY2FsbGJhY2spLkFzPFJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrPigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCByZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyB2aXN1YWxpemUgYm9vbVxyXG4gICAgICAgICAgICBib29tKCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNldCBzcGVlZCB2YWx1ZXNcclxuICAgICAgICAgICAgdnggPSAwO1xyXG4gICAgICAgICAgICB2eSA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbiB0aGUgYmFsbCBiYWNrIGluIHRoZSBtaWRkbGVcclxuICAgICAgICAgICAgYmFsbC5hbmltYXRlKDEwMCkuY2VudGVyKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNldCB0aGUgcG9zaXRpb24gb2YgdGhlIHBhZGRsZXNcclxuICAgICAgICAgICAgcGFkZGxlTGVmdC5hbmltYXRlKDEwMCkuY3koaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIHBhZGRsZVJpZ2h0LmFuaW1hdGUoMTAwKS5jeShoZWlnaHQgLyAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNob3cgdmlzdWFsIGV4cGxvc2lvbiBcclxuICAgICAgICBwcml2YXRlIHZvaWQgYm9vbSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBkZXRlY3Qgd2lubmluZyBwbGF5ZXJcclxuICAgICAgICAgICAgdmFyIHBhZGRsZSA9IGJhbGwuY3goKSA+IHdpZHRoIC8gMiA/IHBhZGRsZUxlZnQgOiBwYWRkbGVSaWdodDtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBncmFkaWVudFxyXG4gICAgICAgICAgICB2YXIgZ3JhZGllbnQgPSBkcmF3LmdyYWRpZW50KFwicmFkaWFsXCIsIChnbG9iYWw6OlJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbnRhaW5lci5ncmFkaWVudEZuKShzdG9wID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0b3AuYXQoMCwgKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yQWxpYXMpIHBhZGRsZS5hdHRyKFwiZmlsbFwiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBzdG9wLmF0KDEsIChSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db2xvckFsaWFzKSBwYWRkbGUuYXR0cihcImZpbGxcIiksIDApO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgY2lyY2xlIHRvIGNhcnJ5IHRoZSBncmFkaWVudFxyXG4gICAgICAgICAgICB2YXIgYmxhc3QgPSBkcmF3LmNpcmNsZSgzMDApO1xyXG4gICAgICAgICAgICBibGFzdC5jZW50ZXIoYmFsbC5jeCgpLCBiYWxsLmN5KCkpLlZhbHVlLmZpbGwoZ3JhZGllbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhbmltYXRlIHRvIGludmlzaWJpbGl0eVxyXG4gICAgICAgICAgICBibGFzdC5hbmltYXRlKDEwMDAsIFwiPlwiKS5vcGFjaXR5KDApLmFmdGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJsYXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUT0RPOiBSZXR5cGVkIGlzc3VlOiBTVkdqcyBDb2xvcidzIE5ldyBtZXRob2RzIHNob3VsZCBiZSB0cmFuc2xhdGVkIGludG8gY29uc3RydWN0b3JzXHJcbiAgICAgICAgW1RlbXBsYXRlKFwibmV3IHN2Z2pzLkNvbG9yKHswfSlcIildXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yIENyZWF0ZUNvbG9yKHN0cmluZyBjb2xvcik7XHJcbiAgICB9XHJcbn0iXQp9Cg==
