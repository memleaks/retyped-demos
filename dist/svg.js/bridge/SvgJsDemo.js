/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.1.0
 */
Bridge.assembly("SvgJsDemo", function ($asm, globals) {
    "use strict";

    require(["svg.js"], function (svgjs) {
        Bridge.define("MissingAPI.SvgJsExtensions");
    
        Bridge.define("SvgJsDemo.App", {
            main: function Main () {
                SvgJsDemo.App._content = document.querySelector("#content");
    
                var btnPongGame = document.querySelector("#btnPongGame");
                var btnAnimation = document.querySelector("#btnAnimation");
    
                btnPongGame.onclick = function (ev) {
                    SvgJsDemo.App.RenderPongGame();
                };
    
                btnAnimation.onclick = function (ev) {
                    SvgJsDemo.App.RenderAnimation();
                };
    
                SvgJsDemo.App.RenderPongGame();
            },
            statics: {
                fields: {
                    _rootDiv: null,
                    _content: null
                },
                methods: {
                    
                    RenderPongGame: function () {
                        if (SvgJsDemo.App._rootDiv != null) {
                            SvgJsDemo.App._content.removeChild(SvgJsDemo.App._rootDiv);
                        }
    
                        var svgDiv = document.createElement("div");
                        new SvgJsDemo.PongGame().Render(svgDiv);
    
                        var label = document.createElement("label");
                        label.innerHTML = "You are Red. Hit SPACE to start. Use ARROWS to control the pad.";
    
                        SvgJsDemo.App._rootDiv = document.createElement("div");
                        SvgJsDemo.App._rootDiv.appendChild(svgDiv);
                        SvgJsDemo.App._rootDiv.appendChild(label);
    
                        SvgJsDemo.App._content.appendChild(SvgJsDemo.App._rootDiv);
                    },
                    
                    RenderAnimation: function () {
                        var $t;
                        if (SvgJsDemo.App._rootDiv != null) {
                            SvgJsDemo.App._content.removeChild(SvgJsDemo.App._rootDiv);
                        }
    
                        var input = ($t = document.createElement("input"), $t.type = "text", $t.value = "Retyped.svg.js -- - ->", $t.placeholder = "Type text here...", $t);
    
                        var svgDiv = document.createElement("div");
    
                        var draw = svgjs(svgDiv).viewbox(0, 0, 300, 140);
                        var text = draw.text(function (add) {
                            add.tspan(input.value);
                        });
    
                        text.path("M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80").animate(1000, "<>").plot("M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80").loop(null, true);
    
                        input.addEventListener("keyup", function () {
                            text.tspan(input.value);
                        });
    
                        SvgJsDemo.App._rootDiv = document.createElement("div");
                        SvgJsDemo.App._rootDiv.appendChild(input);
                        SvgJsDemo.App._rootDiv.appendChild(svgDiv);
    
                        SvgJsDemo.App._content.appendChild(SvgJsDemo.App._rootDiv);
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
                    this.width = 640;
                    this.height = 480;
    
                    this.draw = svgjs(root);
                    this.draw.size(this.width, this.height);
                    this.draw.viewbox(0, 0, this.width, this.height);
    
                    var background = this.draw.rect(this.width, this.height).fill("#dde3e1");
    
                    var line = this.draw.line(((Bridge.Int.div(this.width, 2)) | 0), 0, ((Bridge.Int.div(this.width, 2)) | 0), this.height);
                    line.stroke({ width: 5, color: "#fff", dasharray: "5,5" });
    
                    this.paddleWidth = 15;
                    this.paddleHeight = 80;
    
                    this.paddleLeft = this.draw.rect(this.paddleWidth, this.paddleHeight);
                    this.paddleLeft.x(0).cy(((Bridge.Int.div(this.height, 2)) | 0)).fill("#00ff99");
    
                    this.paddleRight = this.paddleLeft.clone();
                    this.paddleRight.x(this.width - this.paddleWidth).fill("#ff0066");
    
    
                    var ballSize = 10;
    
                    this.ball = this.draw.circle(ballSize);
                    this.ball.center(((Bridge.Int.div(this.width, 2)) | 0), ((Bridge.Int.div(this.height, 2)) | 0)).fill("#7f7f7f");
    
    
                    this.playerLeft = 0.0;
                    this.playerRight = 0.0;
    
                    this.scoreLeft = this.draw.text(System.Double.format(this.playerLeft) + "").font({ size: 32, family: "Menlo, sans-serif", anchor: "end", style: "color:#fff" }).move(((((Bridge.Int.div(this.width, 2)) | 0) - 10) | 0), 10);
    
                    this.scoreRight = this.scoreLeft.clone().text(System.Double.format(this.playerRight) + "").font("anchor", "start").x(((((Bridge.Int.div(this.width, 2)) | 0) + 10) | 0));
    
                    this.difficulty = 2;
    
                    this.callback(0);
    
                    this.paddleDirection = 0;
                    this.paddleSpeed = 5;
    
                    svgjs.on(document, "keydown", Bridge.fn.bind(this, function (e) {
                            if (e.keyCode === 38) {
                                this.paddleDirection = -1;
                                e.preventDefault();
                            } else if (e.keyCode === 40) {
                                this.paddleDirection = 1;
                                e.preventDefault();
                            } else if (e.keyCode === 32 && this.vx === 0 && this.vy === 0) {
                                this.vy = Math.random() * 500 - 150;
                                this.vx = Math.random() > 0.5 ? 250 : -250;
                                e.preventDefault();
    
                            } else {
                                this.paddleDirection = 0;
                            }
                        }));
    
                    svgjs.on(document, "keyup", Bridge.fn.bind(this, function (e) {
                            if (e.keyCode === 38 || e.keyCode === 40) {
                                this.paddleDirection = 0;
                                e.preventDefault();
                            }
                        }));
    
                    this.ballColor = new svgjs.Color("#ff0066");
                    this.ballColor.morph("#00ff99");
                },
                update: function (dt) {
                    this.ball.dmove(this.vx * dt, this.vy * dt);
    
                    var cx = this.ball.cx();
                    var cy = this.ball.cy();
    
                    var paddleLeftCy = this.paddleLeft.cy();
    
                    var dy = Math.min(this.difficulty, Math.abs(cy - paddleLeftCy));
                    paddleLeftCy += cy > paddleLeftCy ? dy : -dy;
    
                    this.paddleLeft.cy(Math.max(this.paddleHeight / 2, Math.min(this.height - this.paddleHeight / 2, paddleLeftCy)));
    
                    if ((this.vy < 0 && cy <= 0) || (this.vy > 0 && cy >= this.height)) {
                        this.vy = -this.vy;
                    }
    
                    var paddleLeftY = this.paddleLeft.y();
                    var paddleRightY = this.paddleRight.y();
    
                    if ((this.vx < 0 && cx <= this.paddleWidth && cy > paddleLeftY && cy < paddleLeftY + this.paddleHeight) || (this.vx > 0 && cx >= this.width - this.paddleWidth && cy > paddleRightY && cy < paddleRightY + this.paddleHeight)) {
                        this.vy = (cy - ((this.vx < 0 ? paddleLeftY : paddleRightY) + this.paddleHeight / 2)) * 7;
    
                        this.vx = -this.vx * 1.05;
                    } else if ((this.vx < 0 && cx <= 0) || (this.vx > 0 && cx >= this.width)) {
                        if (this.vx < 0) {
                            ++this.playerRight;
                        } else {
                            ++this.playerLeft;
                        }
    
                        this.reset();
    
                        this.scoreLeft.text(System.Double.format(this.playerLeft) + "");
                        this.scoreRight.text(System.Double.format(this.playerRight) + "");
                    }
    
                    var playerPaddleY = this.paddleRight.y();
    
                    if (playerPaddleY <= 0 && this.paddleDirection === -1) {
                        this.paddleRight.cy(this.paddleHeight / 2);
                    } else if (playerPaddleY >= this.height - this.paddleHeight && this.paddleDirection === 1) {
                        this.paddleRight.y(this.height - this.paddleHeight);
                    } else {
                        this.paddleRight.dy(Bridge.Int.mul(this.paddleDirection, this.paddleSpeed));
                    }
    
                    this.ball.fill(this.ballColor.at(((Bridge.Int.div(1, this.width)) | 0) * this.ball.x()).toString());
                },
                callback: function (ms) {
                    if (this.lastTime > 0) {
                        this.update((ms - this.lastTime) / 1000);
                    }
    
                    this.lastTime = ms;
    
                    this.animFrame = requestAnimationFrame(Bridge.fn.cacheBind(this, this.callback));
                },
                reset: function () {
                    this.boom();
    
                    this.vx = 0;
                    this.vy = 0;
    
                    this.ball.animate(100).center(((Bridge.Int.div(this.width, 2)) | 0), ((Bridge.Int.div(this.height, 2)) | 0));
    
                    this.paddleLeft.animate(100).cy(((Bridge.Int.div(this.height, 2)) | 0));
                    this.paddleRight.animate(100).cy(((Bridge.Int.div(this.height, 2)) | 0));
                },
                boom: function () {
                    var paddle = this.ball.cx() > ((Bridge.Int.div(this.width, 2)) | 0) ? this.paddleLeft : this.paddleRight;
    
                    var gradient = this.draw.gradient("radial", function (stop) {
                        stop.at(0, paddle.attr("fill"), 1);
                        stop.at(1, paddle.attr("fill"), 0);
                    });
    
                    var blast = this.draw.circle(300);
                    blast.center(this.ball.cx(), this.ball.cy()).fill(gradient);
    
                    blast.animate(1000, ">").opacity(0).after(function () {
                        blast.remove();
                    });
                }
            }
        });
        Bridge.init();
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTdmdKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlBvbmdHYW1lLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O2dCQWFZQSx5QkFBV0EsQUFBcUJBOztnQkFFaENBLGtCQUFrQkEsQUFBK0JBO2dCQUNqREEsbUJBQW1CQSxBQUErQkE7O2dCQUVsREEsc0JBQXNCQTtvQkFFbEJBOzs7Z0JBR0pBLHVCQUF1QkE7b0JBRW5CQTs7O2dCQUlKQTs7Ozs7Ozs7Ozt3QkFRQUEsSUFBSUEsMEJBQVlBOzRCQUVaQSxtQ0FBeURBOzs7d0JBSTdEQSxhQUFhQTt3QkFDYkEsSUFBSUEsNEJBQWtCQTs7d0JBR3RCQSxZQUFZQTt3QkFDWkE7O3dCQUdBQSx5QkFBV0E7d0JBQ1hBLG1DQUF5REE7d0JBQ3pEQSxtQ0FBMkRBOzt3QkFFM0RBLG1DQUF5REE7Ozs7O3dCQVF6REEsSUFBSUEsMEJBQVlBOzRCQUVaQSxtQ0FBeURBOzs7d0JBSTdEQSxZQUFZQTs7d0JBUVpBLGFBQWFBOzt3QkFFYkEsV0FBV0EsTUFBMkJBO3dCQUN0Q0EsV0FBV0EsVUFBVUEsQUFBZ0RBOzRCQUVqRUEsVUFBVUE7Ozt3QkFHZEEsNklBSVVBOzt3QkFFVkEsZ0NBQWdDQSxBQUF3QkE7NEJBQU1BLFdBQVdBOzs7d0JBR3pFQSx5QkFBV0E7d0JBQ1hBLG1DQUEyREE7d0JBQzNEQSxtQ0FBeURBOzt3QkFFekRBLG1DQUF5REE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0MzRDFDQTtvQkFHZkE7b0JBQ0FBOztvQkFHQUEsWUFBT0EsTUFBMkJBO29CQUNsQ0EsZUFBVUEsWUFBT0E7b0JBQ2pCQSx3QkFBbUJBLFlBQU9BOztvQkFHMUJBLGlCQUFpQkEsZUFBVUEsWUFBT0E7O29CQUdsQ0EsV0FBV0EsZUFBVUEsMENBQWNBLHVDQUFXQTtvQkFDOUNBLFlBQVlBOztvQkFRWkE7b0JBQ0FBOztvQkFHQUEsa0JBQWFBLGVBQVVBLGtCQUFhQTtvQkFDcENBLHdCQUFtQkE7O29CQUduQkEsbUJBQWNBO29CQUNkQSxtQkFBY0EsYUFBUUE7OztvQkFJdEJBOztvQkFHQUEsWUFBT0EsaUJBQVlBO29CQUNuQkEsaUJBQVlBLHVDQUFXQTs7O29CQUl2QkE7b0JBQ0FBOztvQkFHQUEsaUJBQVlBLEFBQTRCQSxlQUFVQSxpREFDOUNBLG9GQU1RQTs7b0JBR1pBLGtCQUFhQSxBQUE0QkEsQUFBQ0EsQUFBNEJBLDRCQUM1REEsdUVBRUhBOztvQkFHUEE7O29CQUVBQTs7b0JBRUFBO29CQUNBQTs7b0JBRUFBLFNBQXlCQSxxQkFBaUNBLEFBQXNDQTs0QkFHNUZBLElBQUlBO2dDQUVBQSx1QkFBa0JBO2dDQUNsQkE7bUNBRUNBLElBQUlBO2dDQUVMQTtnQ0FDQUE7bUNBRUNBLElBQUlBLG9CQUFtQkEsaUJBQVdBO2dDQUduQ0EsVUFBS0E7Z0NBQ0xBLFVBQUtBLDRCQUF3Q0E7Z0NBQzdDQTs7O2dDQUtBQTs7OztvQkFJUkEsU0FBeUJBLG1CQUErQkEsQUFBc0NBOzRCQUcxRkEsSUFBSUEsb0JBQW1CQTtnQ0FFbkJBO2dDQUNBQTs7OztvQkFLUkEsaUJBQVlBO29CQUNaQTs7a0NBR2dCQTtvQkFHaEJBLGdCQUFXQSxVQUFLQSxJQUFJQSxVQUFLQTs7b0JBR3pCQSxTQUFTQTtvQkFDVEEsU0FBU0E7O29CQUdUQSxtQkFBbUJBOztvQkFHbkJBLFNBQVNBLFNBQXFCQSxpQkFBWUEsU0FBcUJBLEtBQUtBO29CQUNwRUEsZ0JBQWdCQSxLQUFLQSxlQUFlQSxLQUFLQSxDQUFDQTs7b0JBRzFDQSxtQkFBY0EsU0FBcUJBLHVCQUFrQkEsU0FBcUJBLGNBQVNBLHVCQUFrQkE7O29CQUdyR0EsSUFBSUEsQ0FBQ0EsZUFBVUEsWUFBWUEsQ0FBQ0EsZUFBVUEsTUFBTUE7d0JBRXhDQSxVQUFLQSxDQUFDQTs7O29CQUdWQSxrQkFBa0JBO29CQUNsQkEsbUJBQW1CQTs7b0JBR25CQSxJQUFJQSxDQUFDQSxlQUFVQSxNQUFNQSxvQkFBZUEsS0FBS0EsZUFBZUEsS0FBS0EsY0FBY0Esc0JBQ3ZFQSxDQUFDQSxlQUFVQSxNQUFNQSxhQUFRQSxvQkFBZUEsS0FBS0EsZ0JBQWdCQSxLQUFLQSxlQUFlQTt3QkFLakZBLFVBQUtBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLGNBQVNBLGNBQWNBLGdCQUFnQkE7O3dCQUdwREEsVUFBS0EsQ0FBQ0E7MkJBS1ZBLElBQUlBLENBQUNBLGVBQVVBLFlBQVlBLENBQUNBLGVBQVVBLE1BQU1BO3dCQUd4Q0EsSUFBSUE7NEJBRUFBLEVBQUVBOzs0QkFJRkEsRUFBRUE7Ozt3QkFHTkE7O3dCQUVBQSxvQkFBZUE7d0JBQ2ZBLHFCQUFnQkE7OztvQkFJcEJBLG9CQUFvQkE7O29CQUVwQkEsSUFBSUEsc0JBQXNCQSx5QkFBbUJBO3dCQUV6Q0Esb0JBQWVBOzJCQUVkQSxJQUFJQSxpQkFBaUJBLGNBQVNBLHFCQUFnQkE7d0JBRS9DQSxtQkFBY0EsY0FBU0E7O3dCQUl2QkEsb0JBQWVBLHFDQUFrQkE7OztvQkFJckNBLGVBQVVBLGtCQUFhQSxvQkFBSUEsb0JBQVFBOztvQ0FHakJBO29CQUlsQkEsSUFBSUE7d0JBRUFBLFlBQU9BLENBQUNBLEtBQUtBOzs7b0JBR2pCQSxnQkFBV0E7O29CQUVYQSxpQkFBWUEsc0JBQWtDQSxBQUEwQ0EsQUFBbUJBOzs7b0JBTTNHQTs7b0JBR0FBO29CQUNBQTs7b0JBR0FBLDhCQUF5QkEsdUNBQVdBOztvQkFHcENBLGdDQUEyQkE7b0JBQzNCQSxpQ0FBNEJBOzs7b0JBTzVCQSxhQUFhQSxpQkFBWUEsd0NBQVlBLGtCQUFhQTs7b0JBR2xEQSxlQUFlQSw2QkFBd0JBLEFBQW9EQTt3QkFFdkZBLFdBQVdBLEFBQWtDQTt3QkFDN0NBLFdBQVdBLEFBQWtDQTs7O29CQUlqREEsWUFBWUE7b0JBQ1pBLGFBQWFBLGdCQUFXQSxxQkFBZ0JBOztvQkFHeENBLDBDQUEwQ0EsQUFBd0JBO3dCQUU5REEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE1pc3NpbmdBUEk7XHJcblxyXG5uYW1lc3BhY2UgU3ZnSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBfcm9vdERpdjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5FbGVtZW50IF9jb250ZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGVudCA9IChSZXR5cGVkLmRvbS5FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8c3RyaW5nPihcIiNjb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ0blBvbmdHYW1lID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8c3RyaW5nPihcIiNidG5Qb25nR2FtZVwiKTtcclxuICAgICAgICAgICAgdmFyIGJ0bkFuaW1hdGlvbiA9IChSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPHN0cmluZz4oXCIjYnRuQW5pbWF0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgYnRuUG9uZ0dhbWUub25jbGljayA9IGV2ID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlbmRlclBvbmdHYW1lKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBidG5BbmltYXRpb24ub25jbGljayA9IGV2ID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlbmRlckFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gUmVuZGVyIFBvbmcgR2FtZSBieSBkZWZhdWx0XHJcbiAgICAgICAgICAgIFJlbmRlclBvbmdHYW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE9yaWdpbmFsIHNvdXJjZXM6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvd291dC9uY2IzdzVMdi8xLz91dG1fc291cmNlPXdlYnNpdGUmdXRtX21lZGl1bT1lbWJlZCZ1dG1fY2FtcGFpZ249bmNiM3c1THZcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVuZGVyUG9uZ0dhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKF9yb290RGl2ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIF9jb250ZW50LnJlbW92ZUNoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIERpdiBmb3IgU1ZHIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICB2YXIgc3ZnRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIG5ldyBQb25nR2FtZSgpLlJlbmRlcihzdmdEaXYpO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIExhYmVsOlxyXG4gICAgICAgICAgICB2YXIgbGFiZWwgPSBuZXcgUmV0eXBlZC5kb20uSFRNTExhYmVsRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSBcIllvdSBhcmUgUmVkLiBIaXQgU1BBQ0UgdG8gc3RhcnQuIFVzZSBBUlJPV1MgdG8gY29udHJvbCB0aGUgcGFkLlwiO1xyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHJvb3QgRGl2IHRvIHRoZSBEb2N1bWVudFxyXG4gICAgICAgICAgICBfcm9vdERpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBfcm9vdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzdmdEaXYpO1xyXG4gICAgICAgICAgICBfcm9vdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQ+KGxhYmVsKTtcclxuXHJcbiAgICAgICAgICAgIF9jb250ZW50LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KF9yb290RGl2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gT3JpZ2luYWwgc291cmNlczogaHR0cDovL2pzZmlkZGxlLm5ldC93b3V0Lzd3TDF1djhuLz91dG1fc291cmNlPXdlYnNpdGUmdXRtX21lZGl1bT1lbWJlZCZ1dG1fY2FtcGFpZ249N3dMMXV2OG5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZvaWQgUmVuZGVyQW5pbWF0aW9uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcm9vdERpdiAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY29udGVudC5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBJbnB1dCBmb3IgdGV4dDpcclxuICAgICAgICAgICAgdmFyIGlucHV0ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxJbnB1dEVsZW1lbnRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFwidGV4dFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBcIlJldHlwZWQuc3ZnLmpzIC0tIC0gLT5cIixcclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gXCJUeXBlIHRleHQgaGVyZS4uLlwiXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgRGl2IGZvciBTVkcgZWxlbWVudHM6XHJcbiAgICAgICAgICAgIHZhciBzdmdEaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkcmF3ID0gUmV0eXBlZC5zdmdfanMuc3ZnanMyLlNlbGYoc3ZnRGl2KS52aWV3Ym94KDAsIDAsIDMwMCwgMTQwKTtcclxuICAgICAgICAgICAgdmFyIHRleHQgPSBkcmF3LnRleHQoKGdsb2JhbDo6UmV0eXBlZC5zdmdfanMuc3ZnanMuQ29udGFpbmVyLnRleHRGbikoYWRkID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGFkZC50c3BhbihpbnB1dC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHRleHRcclxuICAgICAgICAgICAgICAgIC5wYXRoKFwiTTEwIDgwIEMgNDAgMTAsIDY1IDEwLCA5NSA4MCBTIDE1MCAxNTAsIDE4MCA4MFwiKVxyXG4gICAgICAgICAgICAgICAgLmFuaW1hdGUoMTAwMCwgXCI8PlwiKVxyXG4gICAgICAgICAgICAgICAgLnBsb3QoXCJNMTAgODAgQyA0MCAxNTAsIDY1IDE1MCwgOTUgODAgUyAxNTAgMTAsIDE4MCA4MFwiKVxyXG4gICAgICAgICAgICAgICAgLmxvb3AobnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT4gdGV4dC50c3BhbihpbnB1dC52YWx1ZSkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCByb290IERpdiB0byB0aGUgRG9jdW1lbnRcclxuICAgICAgICAgICAgX3Jvb3REaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgX3Jvb3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50PihpbnB1dCk7XHJcbiAgICAgICAgICAgIF9yb290RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQ+KHN2Z0Rpdik7XHJcblxyXG4gICAgICAgICAgICBfY29udGVudC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5uYW1lc3BhY2UgTWlzc2luZ0FQSVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIFN2Z0pzRXh0ZW5zaW9uc1xyXG4gICAge1xyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5sb29wKHsxfSwgezJ9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gbG9vcCh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBlbCwgaW50PyB0aW1lcywgYm9vbCByZXZlcnNlKTtcclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9LnBsb3QoezF9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gcGxvdCh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBhbmltYXRpb24sIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlBvaW50QXJyYXlBbGlhcyBwb2ludHMpO1xyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH0ub3BhY2l0eSh7MX0pXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBvcGFjaXR5KHRoaXMgUmV0eXBlZC5zdmdfanMuc3ZnanMuQW5pbWF0aW9uIGFuaW1hdGlvbiwgZG91YmxlIHZhbHVlKTtcclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9LmZvbnQoezF9LCB7Mn0pXCIpXVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQgZm9udCh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQgZm9udCwgc3RyaW5nIGF0dHIsIHN0cmluZyB2YWx1ZSk7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5vbih7MX0sIHsyfSwgezN9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiB2b2lkIG9uKHRoaXMgUmV0eXBlZC5zdmdfanMuc3ZnanMuTGlicmFyeSBzdmcsIFJldHlwZWQuZG9tLkV2ZW50VGFyZ2V0IHRhcmdldCwgc3RyaW5nIGFjdGlvbiwgRGVsZWdhdGUgaGFuZGxlcik7XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIEJyaWRnZTtcclxuXHJcbnVzaW5nIE1pc3NpbmdBUEk7XHJcblxyXG51c2luZyBNYXRoID0gUmV0eXBlZC5lczUuTWF0aDtcclxuXHJcbm5hbWVzcGFjZSBTdmdKc0RlbW9cclxue1xyXG4gICAgcHVibGljIGNsYXNzIFBvbmdHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Eb2MgZHJhdztcclxuICAgICAgICBwcml2YXRlIGludCB3aWR0aDtcclxuICAgICAgICBwcml2YXRlIGludCBoZWlnaHQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuQ2lyY2xlIGJhbGw7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgdng7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgdnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgZGlmZmljdWx0eTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5SZWN0IHBhZGRsZUxlZnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5FbGVtZW50IHBhZGRsZVJpZ2h0O1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBhZGRsZVdpZHRoO1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBhZGRsZUhlaWdodDtcclxuICAgICAgICBwcml2YXRlIGludCBwYWRkbGVEaXJlY3Rpb247XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgcGFkZGxlU3BlZWQ7XHJcblxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCBzY29yZUxlZnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0IHNjb3JlUmlnaHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgcGxheWVyTGVmdDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgcGxheWVyUmlnaHQ7XHJcbiAgICAgICBcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yIGJhbGxDb2xvcjtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBsYXN0VGltZTtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBhbmltRnJhbWU7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlbmRlcihSZXR5cGVkLmRvbS5IVE1MRWxlbWVudCByb290KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gZGVmaW5lIGRvY3VtZW50IHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICAgICAgICAgd2lkdGggPSA2NDA7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IDQ4MDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBTVkcgZG9jdW1lbnQgYW5kIHNldCBpdHMgc2l6ZVxyXG4gICAgICAgICAgICBkcmF3ID0gUmV0eXBlZC5zdmdfanMuc3ZnanMyLlNlbGYocm9vdCk7XHJcbiAgICAgICAgICAgIGRyYXcuc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgZHJhdy52aWV3Ym94KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBiYWNrZ3JvdW5kXHJcbiAgICAgICAgICAgIHZhciBiYWNrZ3JvdW5kID0gZHJhdy5yZWN0KHdpZHRoLCBoZWlnaHQpLmZpbGwoXCIjZGRlM2UxXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gZHJhdyBsaW5lXHJcbiAgICAgICAgICAgIHZhciBsaW5lID0gZHJhdy5saW5lKHdpZHRoIC8gMiwgMCwgd2lkdGggLyAyLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICBsaW5lLnN0cm9rZShuZXcgUmV0eXBlZC5zdmdfanMuc3ZnanMuU3Ryb2tlRGF0YVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aCA9IDUsXHJcbiAgICAgICAgICAgICAgICBjb2xvciA9IFwiI2ZmZlwiLFxyXG4gICAgICAgICAgICAgICAgZGFzaGFycmF5ID0gXCI1LDVcIlxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgcGFkZGxlIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgICAgICAgICAgcGFkZGxlV2lkdGggPSAxNTtcclxuICAgICAgICAgICAgcGFkZGxlSGVpZ2h0ID0gODA7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYW5kIHBvc2l0aW9uIGxlZnQgcGFkZGxlXHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnQgPSBkcmF3LnJlY3QocGFkZGxlV2lkdGgsIHBhZGRsZUhlaWdodCk7XHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnQueCgwKS5jeShoZWlnaHQgLyAyKS5maWxsKFwiIzAwZmY5OVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbmQgcG9zaXRpb24gcmlnaHQgcGFkZGxlXHJcbiAgICAgICAgICAgIHBhZGRsZVJpZ2h0ID0gcGFkZGxlTGVmdC5jbG9uZSgpO1xyXG4gICAgICAgICAgICBwYWRkbGVSaWdodC54KHdpZHRoIC0gcGFkZGxlV2lkdGgpLmZpbGwoXCIjZmYwMDY2XCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBiYWxsIHNpemVcclxuICAgICAgICAgICAgdmFyIGJhbGxTaXplID0gMTA7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYmFsbFxyXG4gICAgICAgICAgICBiYWxsID0gZHJhdy5jaXJjbGUoYmFsbFNpemUpO1xyXG4gICAgICAgICAgICBiYWxsLmNlbnRlcih3aWR0aCAvIDIsIGhlaWdodCAvIDIpLmZpbGwoXCIjN2Y3ZjdmXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBpbml0YWwgcGxheWVyIHNjb3JlXHJcbiAgICAgICAgICAgIHBsYXllckxlZnQgPSAwLjA7XHJcbiAgICAgICAgICAgIHBsYXllclJpZ2h0ID0gMC4wO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRleHQgZm9yIHRoZSBzY29yZSwgc2V0IGZvbnQgcHJvcGVydGllc1xyXG4gICAgICAgICAgICBzY29yZUxlZnQgPSAoUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCkgZHJhdy50ZXh0KHBsYXllckxlZnQgKyBcIlwiKS5mb250KFxyXG4gICAgICAgICAgICAgICAgbmV3IFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkZvbnREYXRhXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IDMyLFxyXG4gICAgICAgICAgICAgICAgICAgIGZhbWlseSA9IFwiTWVubG8sIHNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgICAgICAgICBhbmNob3IgPSBcImVuZFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojZmZmXCJcclxuICAgICAgICAgICAgICAgIH0pLm1vdmUod2lkdGggLyAyIC0gMTAsIDEwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNsb25pbmcgcm9ja3MhXHJcbiAgICAgICAgICAgIHNjb3JlUmlnaHQgPSAoUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCkgKChSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0KSBzY29yZUxlZnQuY2xvbmUoKSlcclxuICAgICAgICAgICAgICAgIC50ZXh0KHBsYXllclJpZ2h0ICsgXCJcIilcclxuICAgICAgICAgICAgICAgIC5mb250KFwiYW5jaG9yXCIsIFwic3RhcnRcIilcclxuICAgICAgICAgICAgICAgIC54KHdpZHRoIC8gMiArIDEwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFJIGRpZmZpY3VsdHlcclxuICAgICAgICAgICAgZGlmZmljdWx0eSA9IDI7XHJcblxyXG4gICAgICAgICAgICBjYWxsYmFjaygwKTtcclxuXHJcbiAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIHBhZGRsZVNwZWVkID0gNTtcclxuXHJcbiAgICAgICAgICAgIFJldHlwZWQuc3ZnX2pzLnN2Z2pzMi5vbihSZXR5cGVkLmRvbS5kb2N1bWVudCwgXCJrZXlkb3duXCIsIG5ldyBBY3Rpb248UmV0eXBlZC5kb20uS2V5Ym9hcmRFdmVudD4oZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBza2lwIG5vbi1jb250cm9sIGtleXNcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMzgpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGxlRGlyZWN0aW9uID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09IDQwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09IDMyICYmIHZ4ID09IDAgJiYgdnkgPT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyByYW5kb20gdmVsb2NpdHkgZm9yIHRoZSBiYWxsIGF0IHN0YXJ0XHJcbiAgICAgICAgICAgICAgICAgICAgdnkgPSBSZXR5cGVkLmVzNS5NYXRoLnJhbmRvbSgpICogNTAwIC0gMTUwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZ4ID0gUmV0eXBlZC5lczUuTWF0aC5yYW5kb20oKSA+IDAuNSA/IDI1MCA6IC0yNTA7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLnN2Z19qcy5zdmdqczIub24oUmV0eXBlZC5kb20uZG9jdW1lbnQsIFwia2V5dXBcIiwgbmV3IEFjdGlvbjxSZXR5cGVkLmRvbS5LZXlib2FyZEV2ZW50PihlID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIExldCdzIHNraXAgbm9uLWNvbnRyb2wga2V5c1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAzOCB8fCBlLmtleUNvZGUgPT0gNDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGxlRGlyZWN0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGJhbGwgY29sb3IgdXBkYXRlXHJcbiAgICAgICAgICAgIGJhbGxDb2xvciA9IENyZWF0ZUNvbG9yKFwiI2ZmMDA2NlwiKTtcclxuICAgICAgICAgICAgYmFsbENvbG9yLm1vcnBoKFwiIzAwZmY5OVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCB1cGRhdGUoZG91YmxlIGR0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gbW92ZSB0aGUgYmFsbCBieSBpdHMgdmVsb2NpdHlcclxuICAgICAgICAgICAgYmFsbC5kbW92ZSh2eCAqIGR0LCB2eSAqIGR0KTtcclxuXHJcbiAgICAgICAgICAgICAvLyBnZXQgcG9zaXRpb24gb2YgYmFsbFxyXG4gICAgICAgICAgICB2YXIgY3ggPSBiYWxsLmN4KCk7XHJcbiAgICAgICAgICAgIHZhciBjeSA9IGJhbGwuY3koKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGdldCBwb3NpdGlvbiBvZiBiYWxsIGFuZCBwYWRkbGVcclxuICAgICAgICAgICAgdmFyIHBhZGRsZUxlZnRDeSA9IHBhZGRsZUxlZnQuY3koKTtcclxuXHJcbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGxlZnQgcGFkZGxlIGluIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGJhbGxcclxuICAgICAgICAgICAgdmFyIGR5ID0gUmV0eXBlZC5lczUuTWF0aC5taW4oZGlmZmljdWx0eSwgUmV0eXBlZC5lczUuTWF0aC5hYnMoY3kgLSBwYWRkbGVMZWZ0Q3kpKTtcclxuICAgICAgICAgICAgcGFkZGxlTGVmdEN5ICs9IGN5ID4gcGFkZGxlTGVmdEN5ID8gZHkgOiAtZHk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb25zdHJhaW50IHRoZSBtb3ZlIHRvIHRoZSBjYW52YXMgYXJlYVxyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0LmN5KFJldHlwZWQuZXM1Lk1hdGgubWF4KHBhZGRsZUhlaWdodCAvIDIsIFJldHlwZWQuZXM1Lk1hdGgubWluKGhlaWdodCAtIHBhZGRsZUhlaWdodCAvIDIsIHBhZGRsZUxlZnRDeSkpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGhpdCB0b3AvYm90dG9tIGJvcmRlcnNcclxuICAgICAgICAgICAgaWYgKCh2eSA8IDAgJiYgY3kgPD0gMCkgfHwgKHZ5ID4gMCAmJiBjeSA+PSBoZWlnaHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2eSA9IC12eTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHBhZGRsZUxlZnRZID0gcGFkZGxlTGVmdC55KCk7XHJcbiAgICAgICAgICAgIHZhciBwYWRkbGVSaWdodFkgPSBwYWRkbGVSaWdodC55KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBoaXQgdGhlIHBhZGRsZVxyXG4gICAgICAgICAgICBpZiAoKHZ4IDwgMCAmJiBjeCA8PSBwYWRkbGVXaWR0aCAmJiBjeSA+IHBhZGRsZUxlZnRZICYmIGN5IDwgcGFkZGxlTGVmdFkgKyBwYWRkbGVIZWlnaHQpIHx8XHJcbiAgICAgICAgICAgICAgICAodnggPiAwICYmIGN4ID49IHdpZHRoIC0gcGFkZGxlV2lkdGggJiYgY3kgPiBwYWRkbGVSaWdodFkgJiYgY3kgPCBwYWRkbGVSaWdodFkgKyBwYWRkbGVIZWlnaHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBkZXBlbmRpbmcgb24gd2hlcmUgdGhlIGJhbGwgaGl0IHdlIGFkanVzdCB5IHZlbG9jaXR5XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgbW9yZSByZWFsaXN0aWMgY29udHJvbCB3ZSB3b3VsZCBuZWVkIGEgYml0IG1vcmUgbWF0aCBoZXJlXHJcbiAgICAgICAgICAgICAgICAvLyBqdXN0IGtlZXAgaXQgc2ltcGxlXHJcbiAgICAgICAgICAgICAgICB2eSA9IChjeSAtICgodnggPCAwID8gcGFkZGxlTGVmdFkgOiBwYWRkbGVSaWdodFkpICsgcGFkZGxlSGVpZ2h0IC8gMikpICogNzsgLy8gbWFnaWMgZmFjdG9yXHJcblxyXG4gICAgICAgICAgICAgICAgLy8gbWFrZSB0aGUgYmFsbCBmYXN0ZXIgb24gaGl0XHJcbiAgICAgICAgICAgICAgICB2eCA9IC12eCAqIDEuMDU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIHdlIGhpdCBsZWZ0L3JpZ2h0IGJvcmRlcnNcclxuICAgICAgICAgICAgaWYgKCh2eCA8IDAgJiYgY3ggPD0gMCkgfHwgKHZ4ID4gMCAmJiBjeCA+PSB3aWR0aCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIHdoZW4geC12ZWxvY2l0eSBpcyBuZWdhdGl2ZSwgaXRcInMgYSBwb2ludCBmb3IgcGxheWVyIDIsIG90aGVyd2lzZSBwbGF5ZXIgMVxyXG4gICAgICAgICAgICAgICAgaWYgKHZ4IDwgMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK3BsYXllclJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICsrcGxheWVyTGVmdDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXNldCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNjb3JlTGVmdC50ZXh0KHBsYXllckxlZnQgKyBcIlwiKTtcclxuICAgICAgICAgICAgICAgIHNjb3JlUmlnaHQudGV4dChwbGF5ZXJSaWdodCArIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHBsYXllciBwYWRkbGVcclxuICAgICAgICAgICAgdmFyIHBsYXllclBhZGRsZVkgPSBwYWRkbGVSaWdodC55KCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocGxheWVyUGFkZGxlWSA8PSAwICYmIHBhZGRsZURpcmVjdGlvbiA9PSAtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGFkZGxlUmlnaHQuY3kocGFkZGxlSGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAocGxheWVyUGFkZGxlWSA+PSBoZWlnaHQgLSBwYWRkbGVIZWlnaHQgJiYgcGFkZGxlRGlyZWN0aW9uID09IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhZGRsZVJpZ2h0LnkoaGVpZ2h0IC0gcGFkZGxlSGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhZGRsZVJpZ2h0LmR5KHBhZGRsZURpcmVjdGlvbiAqIHBhZGRsZVNwZWVkKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGJhbGwgY29sb3IgYmFzZWQgb24gcG9zaXRpb25cclxuICAgICAgICAgICAgYmFsbC5maWxsKGJhbGxDb2xvci5hdCgxIC8gd2lkdGggKiBiYWxsLngoKSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgY2FsbGJhY2soZG91YmxlIG1zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gd2UgZ2V0IHBhc3NlZCBhIHRpbWVzdGFtcCBpbiBtaWxsaXNlY29uZHNcclxuICAgICAgICAgICAgLy8gd2UgdXNlIGl0IHRvIGRldGVybWluZSBob3cgbXVjaCB0aW1lIGhhcyBwYXNzZWQgc2luY2UgdGhlIGxhc3QgY2FsbFxyXG4gICAgICAgICAgICBpZiAobGFzdFRpbWUgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGUoKG1zIC0gbGFzdFRpbWUpIC8gMTAwMCk7IC8vIGNhbGwgdXBkYXRlIGFuZCBwYXNzIGRlbHRhIHRpbWUgaW4gc2Vjb25kc1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsYXN0VGltZSA9IG1zO1xyXG5cclxuICAgICAgICAgICAgYW5pbUZyYW1lID0gUmV0eXBlZC5kb20ucmVxdWVzdEFuaW1hdGlvbkZyYW1lKChnbG9iYWw6OlJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrKW5ldyBBY3Rpb248ZG91YmxlPihjYWxsYmFjaykuQXM8UmV0eXBlZC5kb20uRnJhbWVSZXF1ZXN0Q2FsbGJhY2s+KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIHJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHZpc3VhbGl6ZSBib29tXHJcbiAgICAgICAgICAgIGJvb20oKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2V0IHNwZWVkIHZhbHVlc1xyXG4gICAgICAgICAgICB2eCA9IDA7XHJcbiAgICAgICAgICAgIHZ5ID0gMDtcclxuXHJcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIHRoZSBiYWxsIGJhY2sgaW4gdGhlIG1pZGRsZVxyXG4gICAgICAgICAgICBiYWxsLmFuaW1hdGUoMTAwKS5jZW50ZXIod2lkdGggLyAyLCBoZWlnaHQgLyAyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcGFkZGxlc1xyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0LmFuaW1hdGUoMTAwKS5jeShoZWlnaHQgLyAyKTtcclxuICAgICAgICAgICAgcGFkZGxlUmlnaHQuYW5pbWF0ZSgxMDApLmN5KGhlaWdodCAvIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gc2hvdyB2aXN1YWwgZXhwbG9zaW9uIFxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBib29tKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGRldGVjdCB3aW5uaW5nIHBsYXllclxyXG4gICAgICAgICAgICB2YXIgcGFkZGxlID0gYmFsbC5jeCgpID4gd2lkdGggLyAyID8gcGFkZGxlTGVmdCA6IHBhZGRsZVJpZ2h0O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgdGhlIGdyYWRpZW50XHJcbiAgICAgICAgICAgIHZhciBncmFkaWVudCA9IGRyYXcuZ3JhZGllbnQoXCJyYWRpYWxcIiwgKGdsb2JhbDo6UmV0eXBlZC5zdmdfanMuc3ZnanMuQ29udGFpbmVyLmdyYWRpZW50Rm4pKHN0b3AgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RvcC5hdCgwLCAoUmV0eXBlZC5zdmdfanMuc3ZnanMuQ29sb3JBbGlhcykgcGFkZGxlLmF0dHIoXCJmaWxsXCIpLCAxKTtcclxuICAgICAgICAgICAgICAgIHN0b3AuYXQoMSwgKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yQWxpYXMpIHBhZGRsZS5hdHRyKFwiZmlsbFwiKSwgMCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBjaXJjbGUgdG8gY2FycnkgdGhlIGdyYWRpZW50XHJcbiAgICAgICAgICAgIHZhciBibGFzdCA9IGRyYXcuY2lyY2xlKDMwMCk7XHJcbiAgICAgICAgICAgIGJsYXN0LmNlbnRlcihiYWxsLmN4KCksIGJhbGwuY3koKSkuZmlsbChncmFkaWVudCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIGFuaW1hdGUgdG8gaW52aXNpYmlsaXR5XHJcbiAgICAgICAgICAgIGJsYXN0LmFuaW1hdGUoMTAwMCwgXCI+XCIpLm9wYWNpdHkoMCkuYWZ0ZXIoKGdsb2JhbDo6U3lzdGVtLkFjdGlvbikoKCkgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmxhc3QucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiA8c2VlIGNyZWY9XCJzdmdqcy5Db2xvclwiLz4+LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxyZW1hcmtzPlxyXG4gICAgICAgIC8vLyBTVkcuanMgdHlwZXMgYXJlIGluY29ycmVjdCwgdGhleSBwcm92aWRlIG5vIHdheSBvZiBpbnN0YW50aWF0aW5nIENvbG9yLlxyXG4gICAgICAgIC8vLyBuZXcoKSBtZXRob2RzIGFyZSBwbGFjZWQgaW4gdGhlIGluc3RhbmNlIHBhcnQgb2YgdGhlIGNsYXNzLCBzbyB0aGV5IHJlcXVpcmUgaW5zdGFuY2UgYWxyZWFkeSBiZSBjcmVhdGVkLlxyXG4gICAgICAgIC8vLyBodHRwczovL2dpdGh1Yi5jb20vb2JqZWN0ZG90bmV0L1JldHlwZWQuSW5wdXQvYmxvYi80NzQ5YTQzNjhhYjI5ZjdhODcyMDVjNTVmNGM3Y2IwNmNhMzQwMjI0L3Mvc3ZnLmpzL2luZGV4LmQudHMjTDE0My1MMTQ0XHJcbiAgICAgICAgLy8vIDwvcmVtYXJrcz5cclxuICAgICAgICBbVGVtcGxhdGUoXCJuZXcgc3ZnanMuQ29sb3IoezB9KVwiKV1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5zdmdfanMuc3ZnanMuQ29sb3IgQ3JlYXRlQ29sb3Ioc3RyaW5nIGNvbG9yKTtcclxuICAgIH1cclxufSJdCn0K
