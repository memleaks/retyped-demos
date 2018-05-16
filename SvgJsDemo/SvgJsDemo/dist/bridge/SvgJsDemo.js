/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2018
 * @compiler Bridge.NET 17.0.0
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
                    return true;
                };
    
                btnAnimation.onclick = function (ev) {
                    SvgJsDemo.App.RenderAnimation();
                    return true;
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJTdmdKc0RlbW8uanMiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbIkFwcC5jcyIsIlBvbmdHYW1lLmNzIl0sCiAgIm5hbWVzIjogWyIiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O2dCQWFZQSx5QkFBV0EsQUFBcUJBOztnQkFFaENBLGtCQUFrQkEsQUFBK0JBO2dCQUNqREEsbUJBQW1CQSxBQUErQkE7O2dCQUVsREEsc0JBQXNCQTtvQkFFbEJBO29CQUNBQTs7O2dCQUdKQSx1QkFBdUJBO29CQUVuQkE7b0JBQ0FBOzs7Z0JBSUpBOzs7Ozs7Ozs7O3dCQVFBQSxJQUFJQSwwQkFBWUE7NEJBRVpBLG1DQUF5REE7Ozt3QkFJN0RBLGFBQWFBO3dCQUNiQSxJQUFJQSw0QkFBa0JBOzt3QkFHdEJBLFlBQVlBO3dCQUNaQTs7d0JBR0FBLHlCQUFXQTt3QkFDWEEsbUNBQXlEQTt3QkFDekRBLG1DQUEyREE7O3dCQUUzREEsbUNBQXlEQTs7Ozs7d0JBUXpEQSxJQUFJQSwwQkFBWUE7NEJBRVpBLG1DQUF5REE7Ozt3QkFJN0RBLFlBQVlBOzt3QkFRWkEsYUFBYUE7O3dCQUViQSxXQUFXQSxNQUEyQkE7d0JBQ3RDQSxXQUFXQSxVQUFVQSxBQUFnREE7NEJBRWpFQSxVQUFVQTs7O3dCQUdkQSw2SUFJVUE7O3dCQUVWQSxnQ0FBZ0NBLEFBQXdCQTs0QkFBTUEsV0FBV0E7Ozt3QkFHekVBLHlCQUFXQTt3QkFDWEEsbUNBQTJEQTt3QkFDM0RBLG1DQUF5REE7O3dCQUV6REEsbUNBQXlEQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQzdEMUNBO29CQUdmQTtvQkFDQUE7O29CQUdBQSxZQUFPQSxNQUEyQkE7b0JBQ2xDQSxlQUFVQSxZQUFPQTtvQkFDakJBLHdCQUFtQkEsWUFBT0E7O29CQUcxQkEsaUJBQWlCQSxlQUFVQSxZQUFPQTs7b0JBR2xDQSxXQUFXQSxlQUFVQSwwQ0FBY0EsdUNBQVdBO29CQUM5Q0EsWUFBWUE7O29C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O1xyXG51c2luZyBCcmlkZ2U7XHJcbnVzaW5nIE1pc3NpbmdBUEk7XHJcblxyXG5uYW1lc3BhY2UgU3ZnSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCBfcm9vdERpdjtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBSZXR5cGVkLmRvbS5FbGVtZW50IF9jb250ZW50O1xyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBfY29udGVudCA9IChSZXR5cGVkLmRvbS5FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8c3RyaW5nPihcIiNjb250ZW50XCIpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGJ0blBvbmdHYW1lID0gKFJldHlwZWQuZG9tLkhUTUxCdXR0b25FbGVtZW50KVJldHlwZWQuZG9tLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8c3RyaW5nPihcIiNidG5Qb25nR2FtZVwiKTtcclxuICAgICAgICAgICAgdmFyIGJ0bkFuaW1hdGlvbiA9IChSZXR5cGVkLmRvbS5IVE1MQnV0dG9uRWxlbWVudClSZXR5cGVkLmRvbS5kb2N1bWVudC5xdWVyeVNlbGVjdG9yPHN0cmluZz4oXCIjYnRuQW5pbWF0aW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgYnRuUG9uZ0dhbWUub25jbGljayA9IGV2ID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFJlbmRlclBvbmdHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGJ0bkFuaW1hdGlvbi5vbmNsaWNrID0gZXYgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUmVuZGVyQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIC8vIFJlbmRlciBQb25nIEdhbWUgYnkgZGVmYXVsdFxyXG4gICAgICAgICAgICBSZW5kZXJQb25nR2FtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBPcmlnaW5hbCBzb3VyY2VzOiBodHRwOi8vanNmaWRkbGUubmV0L3dvdXQvbmNiM3c1THYvMS8/dXRtX3NvdXJjZT13ZWJzaXRlJnV0bV9tZWRpdW09ZW1iZWQmdXRtX2NhbXBhaWduPW5jYjN3NUx2XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlclBvbmdHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChfcm9vdERpdiAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBfY29udGVudC5yZW1vdmVDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEaXYgZm9yIFNWRyBlbGVtZW50czpcclxuICAgICAgICAgICAgdmFyIHN2Z0RpdiA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBuZXcgUG9uZ0dhbWUoKS5SZW5kZXIoc3ZnRGl2KTtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCBMYWJlbDpcclxuICAgICAgICAgICAgdmFyIGxhYmVsID0gbmV3IFJldHlwZWQuZG9tLkhUTUxMYWJlbEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgbGFiZWwuaW5uZXJIVE1MID0gXCJZb3UgYXJlIFJlZC4gSGl0IFNQQUNFIHRvIHN0YXJ0LiBVc2UgQVJST1dTIHRvIGNvbnRyb2wgdGhlIHBhZC5cIjtcclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCByb290IERpdiB0byB0aGUgRG9jdW1lbnRcclxuICAgICAgICAgICAgX3Jvb3REaXYgPSBuZXcgUmV0eXBlZC5kb20uSFRNTERpdkVsZW1lbnQoKTtcclxuICAgICAgICAgICAgX3Jvb3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oc3ZnRGl2KTtcclxuICAgICAgICAgICAgX3Jvb3REaXYuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MTGFiZWxFbGVtZW50PihsYWJlbCk7XHJcblxyXG4gICAgICAgICAgICBfY29udGVudC5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50Pihfcm9vdERpdik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIE9yaWdpbmFsIHNvdXJjZXM6IGh0dHA6Ly9qc2ZpZGRsZS5uZXQvd291dC83d0wxdXY4bi8/dXRtX3NvdXJjZT13ZWJzaXRlJnV0bV9tZWRpdW09ZW1iZWQmdXRtX2NhbXBhaWduPTd3TDF1djhuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2b2lkIFJlbmRlckFuaW1hdGlvbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoX3Jvb3REaXYgIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgX2NvbnRlbnQucmVtb3ZlQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgSW5wdXQgZm9yIHRleHQ6XHJcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MSW5wdXRFbGVtZW50XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBcInRleHRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gXCJSZXR5cGVkLnN2Zy5qcyAtLSAtIC0+XCIsXHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9IFwiVHlwZSB0ZXh0IGhlcmUuLi5cIlxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIERpdiBmb3IgU1ZHIGVsZW1lbnRzOlxyXG4gICAgICAgICAgICB2YXIgc3ZnRGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgZHJhdyA9IFJldHlwZWQuc3ZnX2pzLnN2Z2pzMi5TZWxmKHN2Z0Rpdikudmlld2JveCgwLCAwLCAzMDAsIDE0MCkuVmFsdWU7XHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZHJhdy50ZXh0KChnbG9iYWw6OlJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbnRhaW5lci50ZXh0Rm4pKGFkZCA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhZGQudHNwYW4oaW5wdXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICB0ZXh0XHJcbiAgICAgICAgICAgICAgICAucGF0aChcIk0xMCA4MCBDIDQwIDEwLCA2NSAxMCwgOTUgODAgUyAxNTAgMTUwLCAxODAgODBcIikuVmFsdWVcclxuICAgICAgICAgICAgICAgIC5hbmltYXRlKDEwMDAsIFwiPD5cIilcclxuICAgICAgICAgICAgICAgIC5wbG90KFwiTTEwIDgwIEMgNDAgMTUwLCA2NSAxNTAsIDk1IDgwIFMgMTUwIDEwLCAxODAgODBcIilcclxuICAgICAgICAgICAgICAgIC5sb29wKG51bGwsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+IHRleHQudHNwYW4oaW5wdXQudmFsdWUpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgcm9vdCBEaXYgdG8gdGhlIERvY3VtZW50XHJcbiAgICAgICAgICAgIF9yb290RGl2ID0gbmV3IFJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIF9yb290RGl2LmFwcGVuZENoaWxkPGdsb2JhbDo6UmV0eXBlZC5kb20uSFRNTElucHV0RWxlbWVudD4oaW5wdXQpO1xyXG4gICAgICAgICAgICBfcm9vdERpdi5hcHBlbmRDaGlsZDxnbG9iYWw6OlJldHlwZWQuZG9tLkhUTUxEaXZFbGVtZW50PihzdmdEaXYpO1xyXG5cclxuICAgICAgICAgICAgX2NvbnRlbnQuYXBwZW5kQ2hpbGQ8Z2xvYmFsOjpSZXR5cGVkLmRvbS5IVE1MRGl2RWxlbWVudD4oX3Jvb3REaXYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmFtZXNwYWNlIE1pc3NpbmdBUElcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBTdmdKc0V4dGVuc2lvbnNcclxuICAgIHtcclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH0ubG9vcCh7MX0sIHsyfSlcIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5zdmdfanMuc3ZnanMuQW5pbWF0aW9uIGxvb3AodGhpcyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gZWwsIGludD8gdGltZXMsIGJvb2wgcmV2ZXJzZSk7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5wbG90KHsxfSlcIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gUmV0eXBlZC5zdmdfanMuc3ZnanMuQW5pbWF0aW9uIHBsb3QodGhpcyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gYW5pbWF0aW9uLCBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Qb2ludEFycmF5QWxpYXMgcG9pbnRzKTtcclxuXHJcbiAgICAgICAgW1RlbXBsYXRlKFwiezB9Lm9wYWNpdHkoezF9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5BbmltYXRpb24gb3BhY2l0eSh0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkFuaW1hdGlvbiBhbmltYXRpb24sIGRvdWJsZSB2YWx1ZSk7XHJcblxyXG4gICAgICAgIFtUZW1wbGF0ZShcInswfS5mb250KHsxfSwgezJ9KVwiKV1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0IGZvbnQodGhpcyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5UZXh0IGZvbnQsIHN0cmluZyBhdHRyLCBzdHJpbmcgdmFsdWUpO1xyXG5cclxuICAgICAgICBbVGVtcGxhdGUoXCJ7MH0ub24oezF9LCB7Mn0sIHszfSlcIildXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBleHRlcm4gdm9pZCBvbih0aGlzIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkxpYnJhcnkgc3ZnLCBSZXR5cGVkLmRvbS5FdmVudFRhcmdldCB0YXJnZXQsIHN0cmluZyBhY3Rpb24sIERlbGVnYXRlIGhhbmRsZXIpO1xyXG4gICAgfVxyXG59IiwidXNpbmcgU3lzdGVtO1xyXG51c2luZyBCcmlkZ2U7XHJcblxyXG51c2luZyBNaXNzaW5nQVBJO1xyXG5cclxudXNpbmcgTWF0aCA9IFJldHlwZWQuZXM1Lk1hdGg7XHJcblxyXG5uYW1lc3BhY2UgU3ZnSnNEZW1vXHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBQb25nR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuRG9jIGRyYXc7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgd2lkdGg7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgaGVpZ2h0O1xyXG5cclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNpcmNsZSBiYWxsO1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHZ4O1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHZ5O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgaW50IGRpZmZpY3VsdHk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuUmVjdCBwYWRkbGVMZWZ0O1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuRWxlbWVudCBwYWRkbGVSaWdodDtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBwYWRkbGVXaWR0aDtcclxuICAgICAgICBwcml2YXRlIGRvdWJsZSBwYWRkbGVIZWlnaHQ7XHJcbiAgICAgICAgcHJpdmF0ZSBpbnQgcGFkZGxlRGlyZWN0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgaW50IHBhZGRsZVNwZWVkO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQgc2NvcmVMZWZ0O1xyXG4gICAgICAgIHByaXZhdGUgUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCBzY29yZVJpZ2h0O1xyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBsYXllckxlZnQ7XHJcblxyXG4gICAgICAgIHByaXZhdGUgZG91YmxlIHBsYXllclJpZ2h0O1xyXG4gICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db2xvciBiYWxsQ29sb3I7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgbGFzdFRpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBkb3VibGUgYW5pbUZyYW1lO1xyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZW5kZXIoUmV0eXBlZC5kb20uSFRNTEVsZW1lbnQgcm9vdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZSBkb2N1bWVudCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgICAgICAgIHdpZHRoID0gNjQwO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSA0ODA7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgU1ZHIGRvY3VtZW50IGFuZCBzZXQgaXRzIHNpemVcclxuICAgICAgICAgICAgZHJhdyA9IFJldHlwZWQuc3ZnX2pzLnN2Z2pzMi5TZWxmKHJvb3QpO1xyXG4gICAgICAgICAgICBkcmF3LnNpemUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIGRyYXcudmlld2JveCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgYmFja2dyb3VuZFxyXG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9IGRyYXcucmVjdCh3aWR0aCwgaGVpZ2h0KS5maWxsKFwiI2RkZTNlMVwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGRyYXcgbGluZVxyXG4gICAgICAgICAgICB2YXIgbGluZSA9IGRyYXcubGluZSh3aWR0aCAvIDIsIDAsIHdpZHRoIC8gMiwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgbGluZS5zdHJva2UobmV3IFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlN0cm9rZURhdGFcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgd2lkdGggPSA1LFxyXG4gICAgICAgICAgICAgICAgY29sb3IgPSBcIiNmZmZcIixcclxuICAgICAgICAgICAgICAgIGRhc2hhcnJheSA9IFwiNSw1XCJcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gZGVmaW5lIHBhZGRsZSB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICAgICAgICAgIHBhZGRsZVdpZHRoID0gMTU7XHJcbiAgICAgICAgICAgIHBhZGRsZUhlaWdodCA9IDgwO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuZCBwb3NpdGlvbiBsZWZ0IHBhZGRsZVxyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0ID0gZHJhdy5yZWN0KHBhZGRsZVdpZHRoLCBwYWRkbGVIZWlnaHQpO1xyXG4gICAgICAgICAgICBwYWRkbGVMZWZ0LngoMCkuVmFsdWUuY3koaGVpZ2h0IC8gMikuVmFsdWUuZmlsbChcIiMwMGZmOTlcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgYW5kIHBvc2l0aW9uIHJpZ2h0IHBhZGRsZVxyXG4gICAgICAgICAgICBwYWRkbGVSaWdodCA9IHBhZGRsZUxlZnQuY2xvbmUoKTtcclxuICAgICAgICAgICAgcGFkZGxlUmlnaHQueCh3aWR0aCAtIHBhZGRsZVdpZHRoKS5WYWx1ZS5maWxsKFwiI2ZmMDA2NlwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgYmFsbCBzaXplXHJcbiAgICAgICAgICAgIHZhciBiYWxsU2l6ZSA9IDEwO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIGJhbGxcclxuICAgICAgICAgICAgYmFsbCA9IGRyYXcuY2lyY2xlKGJhbGxTaXplKTtcclxuICAgICAgICAgICAgYmFsbC5jZW50ZXIod2lkdGggLyAyLCBoZWlnaHQgLyAyKS5WYWx1ZS5maWxsKFwiIzdmN2Y3ZlwiKTtcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBkZWZpbmUgaW5pdGFsIHBsYXllciBzY29yZVxyXG4gICAgICAgICAgICBwbGF5ZXJMZWZ0ID0gMC4wO1xyXG4gICAgICAgICAgICBwbGF5ZXJSaWdodCA9IDAuMDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0ZXh0IGZvciB0aGUgc2NvcmUsIHNldCBmb250IHByb3BlcnRpZXNcclxuICAgICAgICAgICAgc2NvcmVMZWZ0ID0gKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQpIGRyYXcudGV4dChwbGF5ZXJMZWZ0ICsgXCJcIikuZm9udChcclxuICAgICAgICAgICAgICAgIG5ldyBSZXR5cGVkLnN2Z19qcy5zdmdqcy5Gb250RGF0YVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNpemUgPSAzMixcclxuICAgICAgICAgICAgICAgICAgICBmYW1pbHkgPSBcIk1lbmxvLCBzYW5zLXNlcmlmXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYW5jaG9yID0gXCJlbmRcIixcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6I2ZmZlwiXHJcbiAgICAgICAgICAgICAgICB9KS5WYWx1ZS5tb3ZlKHdpZHRoIC8gMiAtIDEwLCAxMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBjbG9uaW5nIHJvY2tzIVxyXG4gICAgICAgICAgICBzY29yZVJpZ2h0ID0gKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLlRleHQpICgoUmV0eXBlZC5zdmdfanMuc3ZnanMuVGV4dCkgc2NvcmVMZWZ0LmNsb25lKCkpXHJcbiAgICAgICAgICAgICAgICAudGV4dChwbGF5ZXJSaWdodCArIFwiXCIpLlZhbHVlXHJcbiAgICAgICAgICAgICAgICAuZm9udChcImFuY2hvclwiLCBcInN0YXJ0XCIpXHJcbiAgICAgICAgICAgICAgICAueCh3aWR0aCAvIDIgKyAxMCk7XHJcblxyXG4gICAgICAgICAgICAvLyBBSSBkaWZmaWN1bHR5XHJcbiAgICAgICAgICAgIGRpZmZpY3VsdHkgPSAyO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soMCk7XHJcblxyXG4gICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAwO1xyXG4gICAgICAgICAgICBwYWRkbGVTcGVlZCA9IDU7XHJcblxyXG4gICAgICAgICAgICBSZXR5cGVkLnN2Z19qcy5zdmdqczIub24oUmV0eXBlZC5kb20uZG9jdW1lbnQsIFwia2V5ZG93blwiLCBuZXcgQWN0aW9uPFJldHlwZWQuZG9tLktleWJvYXJkRXZlbnQ+KGUgPT5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gTGV0J3Mgc2tpcCBub24tY29udHJvbCBrZXlzXHJcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09IDM4KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PSA0MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWRkbGVEaXJlY3Rpb24gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzMiAmJiB2eCA9PSAwICYmIHZ5ID09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmFuZG9tIHZlbG9jaXR5IGZvciB0aGUgYmFsbCBhdCBzdGFydFxyXG4gICAgICAgICAgICAgICAgICAgIHZ5ID0gUmV0eXBlZC5lczUuTWF0aC5yYW5kb20oKSAqIDUwMCAtIDE1MDtcclxuICAgICAgICAgICAgICAgICAgICB2eCA9IFJldHlwZWQuZXM1Lk1hdGgucmFuZG9tKCkgPiAwLjUgPyAyNTAgOiAtMjUwO1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGxlRGlyZWN0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5zdmdfanMuc3ZnanMyLm9uKFJldHlwZWQuZG9tLmRvY3VtZW50LCBcImtleXVwXCIsIG5ldyBBY3Rpb248UmV0eXBlZC5kb20uS2V5Ym9hcmRFdmVudD4oZSA9PlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyBMZXQncyBza2lwIG5vbi1jb250cm9sIGtleXNcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT0gMzggfHwgZS5rZXlDb2RlID09IDQwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZGRsZURpcmVjdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBiYWxsIGNvbG9yIHVwZGF0ZVxyXG4gICAgICAgICAgICBiYWxsQ29sb3IgPSBDcmVhdGVDb2xvcihcIiNmZjAwNjZcIik7XHJcbiAgICAgICAgICAgIGJhbGxDb2xvci5tb3JwaChcIiMwMGZmOTlcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgdXBkYXRlKGRvdWJsZSBkdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIG1vdmUgdGhlIGJhbGwgYnkgaXRzIHZlbG9jaXR5XHJcbiAgICAgICAgICAgIGJhbGwuZG1vdmUodnggKiBkdCwgdnkgKiBkdCk7XHJcblxyXG4gICAgICAgICAgICAgLy8gZ2V0IHBvc2l0aW9uIG9mIGJhbGxcclxuICAgICAgICAgICAgdmFyIGN4ID0gYmFsbC5jeCgpO1xyXG4gICAgICAgICAgICB2YXIgY3kgPSBiYWxsLmN5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBnZXQgcG9zaXRpb24gb2YgYmFsbCBhbmQgcGFkZGxlXHJcbiAgICAgICAgICAgIHZhciBwYWRkbGVMZWZ0Q3kgPSBwYWRkbGVMZWZ0LmN5KCk7XHJcblxyXG4gICAgICAgICAgICAvLyBtb3ZlIHRoZSBsZWZ0IHBhZGRsZSBpbiB0aGUgZGlyZWN0aW9uIG9mIHRoZSBiYWxsXHJcbiAgICAgICAgICAgIHZhciBkeSA9IFJldHlwZWQuZXM1Lk1hdGgubWluKGRpZmZpY3VsdHksIFJldHlwZWQuZXM1Lk1hdGguYWJzKGN5IC0gcGFkZGxlTGVmdEN5KSk7XHJcbiAgICAgICAgICAgIHBhZGRsZUxlZnRDeSArPSBjeSA+IHBhZGRsZUxlZnRDeSA/IGR5IDogLWR5O1xyXG5cclxuICAgICAgICAgICAgLy8gY29uc3RyYWludCB0aGUgbW92ZSB0byB0aGUgY2FudmFzIGFyZWFcclxuICAgICAgICAgICAgcGFkZGxlTGVmdC5jeShSZXR5cGVkLmVzNS5NYXRoLm1heChwYWRkbGVIZWlnaHQgLyAyLCBSZXR5cGVkLmVzNS5NYXRoLm1pbihoZWlnaHQgLSBwYWRkbGVIZWlnaHQgLyAyLCBwYWRkbGVMZWZ0Q3kpKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBoaXQgdG9wL2JvdHRvbSBib3JkZXJzXHJcbiAgICAgICAgICAgIGlmICgodnkgPCAwICYmIGN5IDw9IDApIHx8ICh2eSA+IDAgJiYgY3kgPj0gaGVpZ2h0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdnkgPSAtdnk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBwYWRkbGVMZWZ0WSA9IHBhZGRsZUxlZnQueSgpO1xyXG4gICAgICAgICAgICB2YXIgcGFkZGxlUmlnaHRZID0gcGFkZGxlUmlnaHQueSgpO1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2sgaWYgd2UgaGl0IHRoZSBwYWRkbGVcclxuICAgICAgICAgICAgaWYgKCh2eCA8IDAgJiYgY3ggPD0gcGFkZGxlV2lkdGggJiYgY3kgPiBwYWRkbGVMZWZ0WSAmJiBjeSA8IHBhZGRsZUxlZnRZICsgcGFkZGxlSGVpZ2h0KSB8fFxyXG4gICAgICAgICAgICAgICAgKHZ4ID4gMCAmJiBjeCA+PSB3aWR0aCAtIHBhZGRsZVdpZHRoICYmIGN5ID4gcGFkZGxlUmlnaHRZICYmIGN5IDwgcGFkZGxlUmlnaHRZICsgcGFkZGxlSGVpZ2h0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy8gZGVwZW5kaW5nIG9uIHdoZXJlIHRoZSBiYWxsIGhpdCB3ZSBhZGp1c3QgeSB2ZWxvY2l0eVxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIG1vcmUgcmVhbGlzdGljIGNvbnRyb2wgd2Ugd291bGQgbmVlZCBhIGJpdCBtb3JlIG1hdGggaGVyZVxyXG4gICAgICAgICAgICAgICAgLy8ganVzdCBrZWVwIGl0IHNpbXBsZVxyXG4gICAgICAgICAgICAgICAgdnkgPSAoY3kgLSAoKHZ4IDwgMCA/IHBhZGRsZUxlZnRZIDogcGFkZGxlUmlnaHRZKSArIHBhZGRsZUhlaWdodCAvIDIpKSAqIDc7IC8vIG1hZ2ljIGZhY3RvclxyXG5cclxuICAgICAgICAgICAgICAgIC8vIG1ha2UgdGhlIGJhbGwgZmFzdGVyIG9uIGhpdFxyXG4gICAgICAgICAgICAgICAgdnggPSAtdnggKiAxLjA1O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBoaXQgbGVmdC9yaWdodCBib3JkZXJzXHJcbiAgICAgICAgICAgIGlmICgodnggPCAwICYmIGN4IDw9IDApIHx8ICh2eCA+IDAgJiYgY3ggPj0gd2lkdGgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvLyB3aGVuIHgtdmVsb2NpdHkgaXMgbmVnYXRpdmUsIGl0XCJzIGEgcG9pbnQgZm9yIHBsYXllciAyLCBvdGhlcndpc2UgcGxheWVyIDFcclxuICAgICAgICAgICAgICAgIGlmICh2eCA8IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytwbGF5ZXJSaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK3BsYXllckxlZnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzZXQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzY29yZUxlZnQudGV4dChwbGF5ZXJMZWZ0ICsgXCJcIik7XHJcbiAgICAgICAgICAgICAgICBzY29yZVJpZ2h0LnRleHQocGxheWVyUmlnaHQgKyBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbW92ZSBwbGF5ZXIgcGFkZGxlXHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXJQYWRkbGVZID0gcGFkZGxlUmlnaHQueSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHBsYXllclBhZGRsZVkgPD0gMCAmJiBwYWRkbGVEaXJlY3Rpb24gPT0gLTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBhZGRsZVJpZ2h0LmN5KHBhZGRsZUhlaWdodCAvIDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHBsYXllclBhZGRsZVkgPj0gaGVpZ2h0IC0gcGFkZGxlSGVpZ2h0ICYmIHBhZGRsZURpcmVjdGlvbiA9PSAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWRkbGVSaWdodC55KGhlaWdodCAtIHBhZGRsZUhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwYWRkbGVSaWdodC5keShwYWRkbGVEaXJlY3Rpb24gKiBwYWRkbGVTcGVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBiYWxsIGNvbG9yIGJhc2VkIG9uIHBvc2l0aW9uXHJcbiAgICAgICAgICAgIGJhbGwuZmlsbChiYWxsQ29sb3IuYXQoMSAvIHdpZHRoICogYmFsbC54KCkpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIGNhbGxiYWNrKGRvdWJsZSBtcylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIHdlIGdldCBwYXNzZWQgYSB0aW1lc3RhbXAgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICAgIC8vIHdlIHVzZSBpdCB0byBkZXRlcm1pbmUgaG93IG11Y2ggdGltZSBoYXMgcGFzc2VkIHNpbmNlIHRoZSBsYXN0IGNhbGxcclxuICAgICAgICAgICAgaWYgKGxhc3RUaW1lID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlKChtcyAtIGxhc3RUaW1lKSAvIDEwMDApOyAvLyBjYWxsIHVwZGF0ZSBhbmQgcGFzcyBkZWx0YSB0aW1lIGluIHNlY29uZHNcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFzdFRpbWUgPSBtcztcclxuXHJcbiAgICAgICAgICAgIGFuaW1GcmFtZSA9IFJldHlwZWQuZG9tLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoZ2xvYmFsOjpSZXR5cGVkLmRvbS5GcmFtZVJlcXVlc3RDYWxsYmFjayluZXcgQWN0aW9uPGRvdWJsZT4oY2FsbGJhY2spLkFzPFJldHlwZWQuZG9tLkZyYW1lUmVxdWVzdENhbGxiYWNrPigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCByZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyB2aXN1YWxpemUgYm9vbVxyXG4gICAgICAgICAgICBib29tKCk7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNldCBzcGVlZCB2YWx1ZXNcclxuICAgICAgICAgICAgdnggPSAwO1xyXG4gICAgICAgICAgICB2eSA9IDA7XHJcblxyXG4gICAgICAgICAgICAvLyBwb3NpdGlvbiB0aGUgYmFsbCBiYWNrIGluIHRoZSBtaWRkbGVcclxuICAgICAgICAgICAgYmFsbC5hbmltYXRlKDEwMCkuY2VudGVyKHdpZHRoIC8gMiwgaGVpZ2h0IC8gMik7XHJcblxyXG4gICAgICAgICAgICAvLyByZXNldCB0aGUgcG9zaXRpb24gb2YgdGhlIHBhZGRsZXNcclxuICAgICAgICAgICAgcGFkZGxlTGVmdC5hbmltYXRlKDEwMCkuY3koaGVpZ2h0IC8gMik7XHJcbiAgICAgICAgICAgIHBhZGRsZVJpZ2h0LmFuaW1hdGUoMTAwKS5jeShoZWlnaHQgLyAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNob3cgdmlzdWFsIGV4cGxvc2lvbiBcclxuICAgICAgICBwcml2YXRlIHZvaWQgYm9vbSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBkZXRlY3Qgd2lubmluZyBwbGF5ZXJcclxuICAgICAgICAgICAgdmFyIHBhZGRsZSA9IGJhbGwuY3goKSA+IHdpZHRoIC8gMiA/IHBhZGRsZUxlZnQgOiBwYWRkbGVSaWdodDtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBncmFkaWVudFxyXG4gICAgICAgICAgICB2YXIgZ3JhZGllbnQgPSBkcmF3LmdyYWRpZW50KFwicmFkaWFsXCIsIChnbG9iYWw6OlJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbnRhaW5lci5ncmFkaWVudEZuKShzdG9wID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0b3AuYXQoMCwgKFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yQWxpYXMpIHBhZGRsZS5hdHRyKFwiZmlsbFwiKSwgMSk7XHJcbiAgICAgICAgICAgICAgICBzdG9wLmF0KDEsIChSZXR5cGVkLnN2Z19qcy5zdmdqcy5Db2xvckFsaWFzKSBwYWRkbGUuYXR0cihcImZpbGxcIiksIDApO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgICAgICAvLyBjcmVhdGUgY2lyY2xlIHRvIGNhcnJ5IHRoZSBncmFkaWVudFxyXG4gICAgICAgICAgICB2YXIgYmxhc3QgPSBkcmF3LmNpcmNsZSgzMDApO1xyXG4gICAgICAgICAgICBibGFzdC5jZW50ZXIoYmFsbC5jeCgpLCBiYWxsLmN5KCkpLlZhbHVlLmZpbGwoZ3JhZGllbnQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhbmltYXRlIHRvIGludmlzaWJpbGl0eVxyXG4gICAgICAgICAgICBibGFzdC5hbmltYXRlKDEwMDAsIFwiPlwiKS5vcGFjaXR5KDApLmFmdGVyKChnbG9iYWw6OlN5c3RlbS5BY3Rpb24pKCgpID0+XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJsYXN0LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgPHNlZSBjcmVmPVwic3ZnanMuQ29sb3JcIi8+Pi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cmVtYXJrcz5cclxuICAgICAgICAvLy8gU1ZHLmpzIHR5cGVzIGFyZSBpbmNvcnJlY3QsIHRoZXkgcHJvdmlkZSBubyB3YXkgb2YgaW5zdGFudGlhdGluZyBDb2xvci5cclxuICAgICAgICAvLy8gbmV3KCkgbWV0aG9kcyBhcmUgcGxhY2VkIGluIHRoZSBpbnN0YW5jZSBwYXJ0IG9mIHRoZSBjbGFzcywgc28gdGhleSByZXF1aXJlIGluc3RhbmNlIGFscmVhZHkgYmUgY3JlYXRlZC5cclxuICAgICAgICAvLy8gaHR0cHM6Ly9naXRodWIuY29tL29iamVjdGRvdG5ldC9SZXR5cGVkLklucHV0L2Jsb2IvNDc0OWE0MzY4YWIyOWY3YTg3MjA1YzU1ZjRjN2NiMDZjYTM0MDIyNC9zL3N2Zy5qcy9pbmRleC5kLnRzI0wxNDMtTDE0NFxyXG4gICAgICAgIC8vLyA8L3JlbWFya3M+XHJcbiAgICAgICAgW1RlbXBsYXRlKFwibmV3IHN2Z2pzLkNvbG9yKHswfSlcIildXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZXh0ZXJuIFJldHlwZWQuc3ZnX2pzLnN2Z2pzLkNvbG9yIENyZWF0ZUNvbG9yKHN0cmluZyBjb2xvcik7XHJcbiAgICB9XHJcbn0iXQp9Cg==
