import React, { useEffect, useRef, useState } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  color: string;
  size: number;
}

export default function InteractiveGlobe({ darkMode = true }: { darkMode?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // Target Markets to pulse on the globe
  const markets = [
    { name: 'India (MSMEs)', lat: 20.5937, lon: 78.9629, x3d: 0, y3d: 0, z3d: 0 },
    { name: 'USA (SMBs)', lat: 37.0902, lon: -95.7129, x3d: 0, y3d: 0, z3d: 0 },
    { name: 'UK (SMBs)', lat: 55.3781, lon: -3.4360, x3d: 0, y3d: 0, z3d: 0 },
    { name: 'UAE (SMBs)', lat: 23.4241, lon: 53.8478, x3d: 0, y3d: 0, z3d: 0 },
    { name: 'Australia (SMBs)', lat: -25.2744, lon: 133.7751, x3d: 0, y3d: 0, z3d: 0 },
    { name: 'Singapore (SMBs)', lat: 1.3521, lon: 103.8198, x3d: 0, y3d: 0, z3d: 0 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let radius = 0;

    const handleResize = () => {
      if (containerRef.current && canvas) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight || 500;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        radius = Math.min(width, height) * 0.42;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Generate random points on a sphere (Fibonacci lattice for uniform distribution)
    const pointsCount = 240;
    const points: Point3D[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < pointsCount; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / pointsCount);

      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: Math.random() * 1.5 + 1.2,
        color: i % 4 === 0 ? '#00C2FF' : i % 4 === 1 ? '#7B61FF' : '#0B5FFF',
      });
    }

    // Convert lat/long to 3D sphere points for markets
    const geoTo3D = (lat: number, lon: number) => {
      const radLat = (lat * Math.PI) / 180;
      const radLon = (lon * Math.PI) / 180;
      return {
        x: Math.cos(radLat) * Math.cos(radLon),
        y: Math.sin(radLat),
        z: Math.cos(radLat) * Math.sin(radLon),
      };
    };

    const marketPoints = markets.map((m) => {
      const pos = geoTo3D(m.lat, m.lon);
      return {
        ...m,
        x: pos.x,
        y: pos.y,
        z: pos.z,
      };
    });

    // Rotation state
    let angleX = 0.003;
    let angleY = 0.004;
    let currentAngleX = 0;
    let currentAngleY = 0;

    // Mouse tracking for drag/hover tilt effect
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left - width / 2) * 0.0015;
      targetMouseY = (e.clientY - rect.top - height / 2) * 0.0015;
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Pulse anim counters
    let pulseProgress = 0;

    // Render loop
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Base rotation plus mouse tilt
      currentAngleY += angleY + mouseX * 0.05;
      currentAngleX += angleX + mouseY * 0.05;

      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);

      // Rotate points and map to 2D
      const projectedPoints = points.map((p) => {
        // Rotate Y
        let x1 = p.baseX * cosY - p.baseZ * sinY;
        let z1 = p.baseX * sinY + p.baseZ * cosY;

        // Rotate X
        let y2 = p.baseY * cosX - z1 * sinX;
        let z2 = p.baseY * sinX + z1 * cosX;

        // Perspective scaling
        const depth = 1.5;
        const scale = depth / (depth + z2);
        const screenX = width / 2 + x1 * radius * scale;
        const screenY = height / 2 + y2 * radius * scale;

        return { screenX, screenY, depth: z2, scale, color: p.color, size: p.size };
      });

      // Draw Connection Lines (Grid structure)
      ctx.lineWidth = 0.35;
      const primaryColorHex = darkMode ? 'rgba(0, 194, 255, 0.12)' : 'rgba(11, 95, 255, 0.12)';
      const secondaryColorHex = darkMode ? 'rgba(123, 97, 255, 0.08)' : 'rgba(123, 97, 255, 0.08)';

      for (let i = 0; i < projectedPoints.length; i++) {
        const p1 = projectedPoints[i];
        if (p1.depth > 0.4) continue; // Skip far-back lines for clarity

        let connections = 0;
        for (let j = i + 1; j < projectedPoints.length; j++) {
          const p2 = projectedPoints[j];
          if (p2.depth > 0.4) continue;

          // Simple distance check
          const dx = p1.screenX - p2.screenX;
          const dy = p1.screenY - p2.screenY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < radius * 0.38) {
            ctx.beginPath();
            ctx.moveTo(p1.screenX, p1.screenY);
            ctx.lineTo(p2.screenX, p2.screenY);
            ctx.strokeStyle = i % 3 === 0 ? primaryColorHex : secondaryColorHex;
            ctx.stroke();
            connections++;
            if (connections > 4) break; // limit density
          }
        }
      }

      // Draw background/ambient mesh gradient glow
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        radius * 0.2,
        width / 2,
        height / 2,
        radius * 1.2
      );
      if (darkMode) {
        gradient.addColorStop(0, 'rgba(11, 95, 255, 0.03)');
        gradient.addColorStop(0.5, 'rgba(123, 97, 255, 0.01)');
        gradient.addColorStop(1, 'rgba(8, 17, 32, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(0, 194, 255, 0.05)');
        gradient.addColorStop(0.5, 'rgba(11, 95, 255, 0.02)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius * 1.1, 0, Math.PI * 2);
      ctx.fill();

      // Draw Grid Nodes (dots)
      projectedPoints.forEach((p) => {
        const opacity = Math.max(0.1, (1 - p.depth) / 2);
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, p.size * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Update & Draw Pulse Rings on Global Market Hubs
      pulseProgress = (pulseProgress + 0.015) % 1;
      let activeHovered: string | null = null;

      marketPoints.forEach((m) => {
        // Rotate
        let x1 = m.x * cosY - m.z * sinY;
        let z1 = m.x * sinY + m.z * cosY;
        let y2 = m.y * cosX - z1 * sinX;
        let z2 = m.y * sinX + z1 * cosX;

        // Front face check (only draw if on the front half of the globe)
        if (z2 < 0) {
          const scale = 1.5 / (1.5 + z2);
          const screenX = width / 2 + x1 * radius * scale;
          const screenY = height / 2 + y2 * radius * scale;

          const distanceToCenter = Math.sqrt(
            Math.pow(screenX - (width / 2 + mouseX * 200), 2) +
            Math.pow(screenY - (height / 2 + mouseY * 200), 2)
          );

          const isHovered = distanceToCenter < 24;
          if (isHovered) {
            activeHovered = m.name;
          }

          // Pulsing Glow circles
          ctx.beginPath();
          ctx.arc(screenX, screenY, (12 + pulseProgress * 20) * scale, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 194, 255, ${Math.max(0, 1 - pulseProgress) * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Core node
          ctx.beginPath();
          ctx.arc(screenX, screenY, (isHovered ? 6 : 4) * scale, 0, Math.PI * 2);
          ctx.fillStyle = '#7B61FF';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#00C2FF';
          ctx.fill();
          ctx.shadowBlur = 0; // reset

          // Tag Label text
          ctx.fillStyle = darkMode ? '#FFFFFF' : '#081120';
          ctx.font = `600 ${Math.max(10, 11 * scale)}px var(--font-display)`;
          ctx.textAlign = 'center';
          ctx.fillText(m.name.split(' ')[0], screenX, screenY - 12 * scale);
        }
      });

      if (activeHovered !== hoveredLocation) {
        setHoveredLocation(activeHovered);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode, hoveredLocation]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[320px] md:h-[480px] lg:h-[550px] flex items-center justify-center overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,95,255,0.06)_0%,transparent_70%)] pointer-events-none" />

      <canvas ref={canvasRef} className="block cursor-grab active:cursor-grabbing z-10" />

      {/* Embedded Floating market data tooltip */}
      {hoveredLocation && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-panel p-3 rounded-lg text-xs font-mono text-center flex flex-col gap-1 shadow-xl z-20 animate-fade-in text-white">
          <span className="text-[#00C2FF] font-semibold">📍 TARGET MARKET ACTIVATED</span>
          <span>{hoveredLocation} Segment</span>
          <span className="text-[10px] text-gray-400">Optimization status: 99.8% Perfect Match</span>
        </div>
      )}
    </div>
  );
}
