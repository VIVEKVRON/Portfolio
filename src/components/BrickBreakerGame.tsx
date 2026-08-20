"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function BrickBreakerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const paddle = { height: 6, width: 120, x: canvas.width / 2 - 60 };
    let ball = { x: canvas.width / 2, y: canvas.height - 50, dx: 5, dy: -5, radius: 4, trail: [] as {x: number, y: number}[] };
    let rightPressed = false;
    let leftPressed = false;
    let particles: { x: number, y: number, vx: number, vy: number, life: number, maxLife: number }[] = [];

    const brickRowCount = 6;
    const brickColumnCount = Math.floor(canvas.width / 140);
    const brickWidth = 120;
    const brickHeight = 30;
    const brickPadding = 12;
    const brickOffsetTop = 60;
    const brickOffsetLeft = (canvas.width - (brickColumnCount * (brickWidth + brickPadding))) / 2;

    const techStack = [
      "TENSOR", "EPOCH", "BACKPROP", "CUDA", "INFERENCE", 
      "ATTENTION", "SOFTMAX", "VECTOR", "LATENT", "DROPOUT",
      "GRADIENT", "RAG", "LLM", "CLUSTER", "NODE"
    ];

    // Colors
    const isDark = theme === "dark";
    const bgOpacity = isDark ? "rgba(10, 10, 10, 0.2)" : "rgba(255, 255, 255, 0.2)";
    const fgColor = isDark ? "#ffffff" : "#000000";
    const accentColor = isDark ? "#00FF41" : "#0055FF"; // Cyberpunk green / Blue
    const borderColor = isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";
    const highlightColor = isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)";

    const bricks: any[][] = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { 
          x: 0, 
          y: 0, 
          status: 1, 
          label: techStack[(c + r) % techStack.length],
        };
      }
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddle.x = relativeX - paddle.width / 2;
      }
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);

    const spawnParticles = (x: number, y: number) => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          life: 1,
          maxLife: Math.random() * 20 + 10
        });
      }
    };

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (b.status === 1) {
            if (
              ball.x > b.x &&
              ball.x < b.x + brickWidth &&
              ball.y > b.y &&
              ball.y < b.y + brickHeight
            ) {
              ball.dy = -ball.dy;
              b.status = 0;
              spawnParticles(ball.x, ball.y);
            }
          }
        }
      }
    };

    const drawBall = () => {
      // Trail
      ctx.beginPath();
      if (ball.trail.length > 0) {
        ctx.moveTo(ball.trail[0].x, ball.trail[0].y);
        for (let i = 1; i < ball.trail.length; i++) {
          ctx.lineTo(ball.trail[i].x, ball.trail[i].y);
        }
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
      ctx.closePath();

      // Ball
      ctx.beginPath();
      ctx.rect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
      ctx.fillStyle = fgColor;
      ctx.shadowBlur = 10;
      ctx.shadowColor = accentColor;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      // Techy paddle design
      ctx.rect(paddle.x, canvas.height - paddle.height - 30, paddle.width, paddle.height);
      ctx.fillStyle = fgColor;
      ctx.fill();
      
      // Side brackets
      ctx.fillStyle = accentColor;
      ctx.rect(paddle.x, canvas.height - paddle.height - 32, 4, paddle.height + 4);
      ctx.rect(paddle.x + paddle.width - 4, canvas.height - paddle.height - 32, 4, paddle.height + 4);
      ctx.fill();
      
      ctx.closePath();
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            
            // Draw Box
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Corner accents
            const accentSize = 4;
            ctx.fillStyle = fgColor;
            ctx.fillRect(brickX, brickY, accentSize, accentSize);
            ctx.fillRect(brickX + brickWidth - accentSize, brickY, accentSize, accentSize);

            // Draw Text
            ctx.font = "12px monospace";
            ctx.fillStyle = highlightColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(bricks[c][r].label, brickX + brickWidth / 2, brickY + brickHeight / 2);
          }
        }
      }
    };

    const drawParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        
        ctx.beginPath();
        ctx.rect(p.x, p.y, 2, 2);
        ctx.fillStyle = accentColor;
        ctx.globalAlpha = 1 - (p.life / p.maxLife);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.closePath();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }
    };

    const draw = () => {
      // Trail effect background clear
      ctx.fillStyle = bgOpacity;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawBricks();
      drawParticles();
      drawBall();
      drawPaddle();
      collisionDetection();

      // Update trail
      ball.trail.push({ x: ball.x, y: ball.y });
      if (ball.trail.length > 10) ball.trail.shift();

      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
      }
      if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
      } else if (ball.y + ball.dy > canvas.height - ball.radius - paddle.height - 30) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball.dy = -ball.dy;
          // Apply spin
          ball.dx = ball.dx + ((ball.x - (paddle.x + paddle.width / 2)) * 0.1);
        } else if (ball.y + ball.dy > canvas.height - ball.radius) {
          // Game Over reset
          ball.x = canvas.width / 2;
          ball.y = canvas.height - 50;
          ball.dx = 5 * (Math.random() > 0.5 ? 1 : -1);
          ball.dy = -5;
          ball.trail = [];
          for (let c = 0; c < brickColumnCount; c++) {
            for (let r = 0; r < brickRowCount; r++) {
              bricks[c][r].status = 1;
            }
          }
        }
      }

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Ensure ball.dx stays in limits
      if (ball.dx > 8) ball.dx = 8;
      if (ball.dx < -8) ball.dx = -8;

      if (rightPressed && paddle.x < canvas.width - paddle.width) {
        paddle.x += 8;
      } else if (leftPressed && paddle.x > 0) {
        paddle.x -= 8;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      if (canvas) canvas.removeEventListener("mousemove", mouseMoveHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="relative w-full h-[600px] bg-background border border-border group cursor-none overflow-hidden">
      <div className="absolute top-4 left-4 font-mono text-[10px] text-muted-foreground/50 z-10 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity">
        [ SYSTEM_BREAK_PROTOCOL_v2.0 ]<br/>
        STATUS: ONLINE<br/>
        INPUT: KBD_ARROWS / MOUSE_TRACKING
      </div>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
