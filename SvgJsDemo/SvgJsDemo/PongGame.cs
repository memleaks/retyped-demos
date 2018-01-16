using System;
using Bridge;

using MissingAPI;
using static Retyped.dom;
using static Retyped.svg_js;

using Math = Retyped.es5.Math;

namespace SvgJsDemo
{
    public class PongGame
    {
        private svgjs.Doc draw;
        private int width;
        private int height;

        private svgjs.Circle ball;
        private double vx;
        private double vy;
        
        private int difficulty;

        private svgjs.Rect paddleLeft;
        private svgjs.Element paddleRight;
        private double paddleWidth;
        private double paddleHeight;
        private int paddleDirection;
        private int paddleSpeed;

        
        private svgjs.Text scoreLeft;
        private svgjs.Text scoreRight;
        private double playerLeft;

        private double playerRight;
       
        private svgjs.Color ballColor;
        private double lastTime;
        private double animFrame;

        public void Render(Retyped.dom.HTMLElement root)
        {
            // define document width and height
            width = 640;
            height = 480;

            // create SVG document and set its size
            draw = svgjs2.Self(root);
            draw.size(width, height);
            draw.viewbox(0, 0, width, height);

            // draw background
            var background = draw.rect(width, height).fill("#dde3e1");

            // draw line
            var line = draw.line(width / 2, 0, width / 2, height);
            line.stroke(new svgjs.StrokeData
            {
                width = 5,
                color = "#fff",
                dasharray = "5,5"
            });
                
            // define paddle width and height
            paddleWidth = 15;
            paddleHeight = 80;

            // create and position left paddle
            paddleLeft = draw.rect(paddleWidth, paddleHeight);
            paddleLeft.x(0).Value.cy(height / 2).Value.fill("#00ff99");

            // create and position right paddle
            paddleRight = paddleLeft.clone();
            paddleRight.x(width - paddleWidth).Value.fill("#ff0066");


            // define ball size
            var ballSize = 10;

            // create ball
            ball = draw.circle(ballSize);
            ball.center(width / 2, height / 2).Value.fill("#7f7f7f");


            // define inital player score
            playerLeft = 0.0;
            playerRight = 0.0;

            // create text for the score, set font properties
            scoreLeft = (svgjs.Text) draw.text(playerLeft + "").font(
                new svgjs.FontData
                {
                    size = 32,
                    family = "Menlo, sans-serif",
                    anchor = "end",
                    style = "color:#fff"
                    //fill = "#fff" //TODO: up
                }).Value.move(width / 2 - 10, 10);

            // cloning rocks!
            scoreRight = (svgjs.Text) ((svgjs.Text) scoreLeft.clone())
                .text(playerRight + "").Value
                .font("anchor", "start")
                .x(width / 2 + 10);

            // AI difficulty
            difficulty = 2;

            callback(0);

            paddleDirection = 0;
            paddleSpeed = 5;

            svgjs2.on(document, "keydown", new Action<KeyboardEvent>(e =>
            {
                // Let's skip non-control keys
                if (e.keyCode == 38)
                {
                    paddleDirection = -1;
                    e.preventDefault();
                }
                else if (e.keyCode == 40)
                {
                    paddleDirection = 1;
                    e.preventDefault();
                }
                else if (e.keyCode == 32 && vx == 0 && vy == 0)
                {
                    // random velocity for the ball at start
                    vy = Math.random() * 500 - 150;
                    vx = Math.random() > 0.5 ? 250 : -250;
                    e.preventDefault();

                }
                else
                {
                    paddleDirection = 0;
                }
            }));

            svgjs2.on(document, "keyup", new Action<KeyboardEvent>(e =>
            {
                // Let's skip non-control keys
                if (e.keyCode == 38 || e.keyCode == 40)
                {
                    paddleDirection = 0;
                    e.preventDefault();
                }
            }));
            
            // ball color update
            ballColor = CreateColor("#ff0066");
            ballColor.morph("#00ff99");
        }

        private void update(double dt)
        {
            // move the ball by its velocity
            ball.dmove(vx * dt, vy * dt);

             // get position of ball
            var cx = ball.cx();
            var cy = ball.cy();

            // get position of ball and paddle
            var paddleLeftCy = paddleLeft.cy();

            // move the left paddle in the direction of the ball
            var dy = Math.min(difficulty, Retyped.es5.Math.abs(cy - paddleLeftCy));
            paddleLeftCy += cy > paddleLeftCy ? dy : -dy;

            // constraint the move to the canvas area
            paddleLeft.cy(Math.max(paddleHeight / 2, Math.min(height - paddleHeight / 2, paddleLeftCy)));

            // check if we hit top/bottom borders
            if ((vy < 0 && cy <= 0) || (vy > 0 && cy >= height))
            {
                vy = -vy;
            }

            var paddleLeftY = paddleLeft.y();
            var paddleRightY = paddleRight.y();

            // check if we hit the paddle
            if ((vx < 0 && cx <= paddleWidth && cy > paddleLeftY && cy < paddleLeftY + paddleHeight) ||
                (vx > 0 && cx >= width - paddleWidth && cy > paddleRightY && cy < paddleRightY + paddleHeight))
            {
                // depending on where the ball hit we adjust y velocity
                // for more realistic control we would need a bit more math here
                // just keep it simple
                vy = (cy - ((vx < 0 ? paddleLeftY : paddleRightY) + paddleHeight / 2)) * 7; // magic factor

                // make the ball faster on hit
                vx = -vx * 1.05;
            }
            else

                // check if we hit left/right borders
            if ((vx < 0 && cx <= 0) || (vx > 0 && cx >= width))
            {
                // when x-velocity is negative, it"s a point for player 2, otherwise player 1
                if (vx < 0)
                {
                    ++playerRight;
                }
                else
                {
                    ++playerLeft;
                }

                reset();

                scoreLeft.text(playerLeft + "");
                scoreRight.text(playerRight + "");
            }

            // move player paddle
            var playerPaddleY = paddleRight.y();

            if (playerPaddleY <= 0 && paddleDirection == -1)
            {
                paddleRight.cy(paddleHeight / 2);
            }
            else if (playerPaddleY >= height - paddleHeight && paddleDirection == 1)
            {
                paddleRight.y(height - paddleHeight);
            }
            else
            {
                paddleRight.dy(paddleDirection * paddleSpeed);
            }

            // update ball color based on position
            ball.fill(ballColor.at(1 / width * ball.x()).toString());
        }

        private void callback(double ms)
        {
            // we get passed a timestamp in milliseconds
            // we use it to determine how much time has passed since the last call
            if (lastTime > 0)
            {
                update((ms - lastTime) / 1000); // call update and pass delta time in seconds
            }

            lastTime = ms;

            animFrame = requestAnimationFrame(new Action<double>(callback).As<FrameRequestCallback>());
        }

        private void reset()
        {
            // visualize boom
            boom();

            // reset speed values
            vx = 0;
            vy = 0;

            // position the ball back in the middle
            ball.animate(100).center(width / 2, height / 2);

            // reset the position of the paddles
            paddleLeft.animate(100).cy(height / 2);
            paddleRight.animate(100).cy(height / 2);
        }

        // show visual explosion 
        private void boom()
        {
            // detect winning player
            var paddle = ball.cx() > width / 2 ? paddleLeft : paddleRight;
        
            // create the gradient
            var gradient = draw.gradient("radial", stop =>
            {
                stop.at(0, (svgjs.ColorAlias) paddle.attr("fill"), 1);
                stop.at(1, (svgjs.ColorAlias) paddle.attr("fill"), 0);
            });

            // create circle to carry the gradient
            var blast = draw.circle(300);
            blast.center(ball.cx(), ball.cy()).Value.fill(gradient);
        
            // animate to invisibility
            blast.animate(1000, ">").opacity(0).after(() =>
            {
                blast.remove();
            });
        }

        // TODO: Retyped issue: SVGjs Color's New methods should be translated into constructors
        [Template("new svgjs.Color({0})")]
        private static extern svgjs.Color CreateColor(string color);
    }
}