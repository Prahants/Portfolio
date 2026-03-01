"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const skills = [
    { name: "C++", icon: "/logos/cplusplus-original.svg", color: "#00599C" },
    { name: "FastAPI", icon: "/logos/fastapi-original.svg", color: "#009688" },
    { name: "Firebase", icon: "/logos/firebase-plain.svg", color: "#FFCA28" },
    { name: "HuggingFace", icon: "/logos/huggingface_logo-noborder.svg", color: "#FFD21E" },
    { name: "JavaScript", icon: "/logos/javascript-original.svg", color: "#F7DF1E" },
    { name: "MongoDB", icon: "/logos/mongodb-original.svg", color: "#47A248" },
    { name: "Next.js", icon: "/logos/nextjs-original.svg", color: "#ffffff" },
    { name: "Node.js", icon: "/logos/nodejs-original.svg", color: "#339933" },
    { name: "PostgreSQL", icon: "/logos/postgresql-original.svg", color: "#336791" },
    { name: "Postman", icon: "/logos/postman-original.svg", color: "#FF6C37" },
    { name: "Python", icon: "/logos/python-original.svg", color: "#3776AB" },
    { name: "PyTorch", icon: "/logos/pytorch-original.svg", color: "#EE4C2C" },
    { name: "React", icon: "/logos/react-original.svg", color: "#61DAFB" },
    { name: "Scikit-Learn", icon: "/logos/scikitlearn-original.svg", color: "#F7931E" },
    { name: "Tailwind", icon: "/logos/tailwindcss-original.svg", color: "#06B6D4" },
    { name: "TensorFlow", icon: "/logos/tensorflow-original.svg", color: "#FF6F00" },
];

export default function Skills() {
    const mountRef = useRef<HTMLDivElement>(null);
    const [hoveredSkill, setHoveredSkill] = useState<{ name: string; color: string; x: number; y: number } | null>(null);

    useEffect(() => {
        const container = mountRef.current;
        if (!container) return;

        // ─── Scene, Camera, Renderer ───────────────────────────
        const scene = new THREE.Scene();

        const width = container.clientWidth;
        const height = container.clientHeight;
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        camera.position.z = 3.2;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.sortObjects = true;
        container.appendChild(renderer.domElement);

        // ─── Wireframe Globe Grid ──────────────────────────────
        const sphereGeo = new THREE.SphereGeometry(1.05, 64, 64);
        const wireMat = new THREE.MeshBasicMaterial({
            color: 0x4338ca,
            wireframe: true,
            transparent: true,
            opacity: 0.06,
            depthWrite: false,
        });
        const wireGlobe = new THREE.Mesh(sphereGeo, wireMat);

        // ─── Globe Group (icons rotate with the globe) ─────────
        const globeGroup = new THREE.Group();
        scene.add(globeGroup);
        globeGroup.add(wireGlobe);

        // ─── Fibonacci Sphere Distribution ─────────────────────
        const total = skills.length;
        const RADIUS = 1.0;
        const iconSize = 0.18;

        const positions: THREE.Vector3[] = [];
        for (let i = 0; i < total; i++) {
            const phi = Math.acos(-1 + (2 * i) / total);
            const theta = Math.sqrt(total * Math.PI) * phi;
            const x = RADIUS * Math.sin(phi) * Math.cos(theta);
            const y = RADIUS * Math.cos(phi);
            const z = RADIUS * Math.sin(phi) * Math.sin(theta);
            positions.push(new THREE.Vector3(x, y, z));
        }

        // ─── Load Icon Textures & Create Sprites ───────────────
        const textureLoader = new THREE.TextureLoader();
        const sprites: THREE.Sprite[] = [];
        // Create glow sprites (one behind each icon)
        const glowSprites: THREE.Sprite[] = [];

        skills.forEach((skill, i) => {
            const texture = textureLoader.load(skill.icon);
            texture.colorSpace = THREE.SRGBColorSpace;

            const mat = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthTest: true,
                depthWrite: false,
                sizeAttenuation: true,
            });

            const sprite = new THREE.Sprite(mat);
            sprite.position.copy(positions[i]);
            sprite.scale.set(iconSize, iconSize, 1);
            sprite.userData = { index: i, name: skill.name, color: skill.color };

            // ── Glow sprite behind the icon ──
            const glowCanvas = document.createElement('canvas');
            glowCanvas.width = 128;
            glowCanvas.height = 128;
            const ctx = glowCanvas.getContext('2d')!;
            const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
            gradient.addColorStop(0, skill.color + 'cc'); // center with alpha
            gradient.addColorStop(0.4, skill.color + '66');
            gradient.addColorStop(1, skill.color + '00'); // fully transparent edge
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 128, 128);

            const glowTexture = new THREE.CanvasTexture(glowCanvas);
            const glowMat = new THREE.SpriteMaterial({
                map: glowTexture,
                transparent: true,
                depthTest: false,
                depthWrite: false,
                sizeAttenuation: true,
                opacity: 0, // hidden by default
            });
            const glowSprite = new THREE.Sprite(glowMat);
            glowSprite.position.copy(positions[i]);
            glowSprite.scale.set(0, 0, 1); // hidden
            glowSprite.renderOrder = -1; // render behind icon

            globeGroup.add(glowSprite);
            globeGroup.add(sprite);
            sprites.push(sprite);
            glowSprites.push(glowSprite);
        });

        // ─── Raycaster for Hover Detection ─────────────────────
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-999, -999); // off-screen initially
        let currentHoveredIdx = -1;

        // ─── Mouse Drag Rotation ───────────────────────────────
        let isDragging = false;
        let prevMouseX = 0;
        let prevMouseY = 0;
        let dragVelocityX = 0;
        let dragVelocityY = 0;

        const onMouseDown = (event: MouseEvent) => {
            isDragging = true;
            prevMouseX = event.clientX;
            prevMouseY = event.clientY;
            dragVelocityX = 0;
            dragVelocityY = 0;
            renderer.domElement.style.cursor = 'grabbing';
        };

        const onMouseUp = () => {
            isDragging = false;
            renderer.domElement.style.cursor = currentHoveredIdx >= 0 ? 'pointer' : 'default';
        };

        const onMouseMove = (event: MouseEvent) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            if (isDragging) {
                const dx = event.clientX - prevMouseX;
                const dy = event.clientY - prevMouseY;
                dragVelocityX = dx * 0.005;
                dragVelocityY = dy * 0.005;
                globeGroup.rotation.y += dx * 0.005;
                globeGroup.rotation.x += dy * 0.005;
                prevMouseX = event.clientX;
                prevMouseY = event.clientY;
            }
        };

        const onMouseLeave = () => {
            mouse.set(-999, -999);
            currentHoveredIdx = -1;
            isDragging = false;
            setHoveredSkill(null);
        };

        // ─── Touch Support ─────────────────────────────────────
        const onTouchStart = (event: TouchEvent) => {
            if (event.touches.length === 1) {
                isDragging = true;
                prevMouseX = event.touches[0].clientX;
                prevMouseY = event.touches[0].clientY;
                dragVelocityX = 0;
                dragVelocityY = 0;
            }
        };

        const onTouchMove = (event: TouchEvent) => {
            if (isDragging && event.touches.length === 1) {
                const dx = event.touches[0].clientX - prevMouseX;
                const dy = event.touches[0].clientY - prevMouseY;
                globeGroup.rotation.y += dx * 0.005;
                globeGroup.rotation.x += dy * 0.005;
                prevMouseX = event.touches[0].clientX;
                prevMouseY = event.touches[0].clientY;
            }
        };

        const onTouchEnd = () => {
            isDragging = false;
        };

        renderer.domElement.addEventListener('mousedown', onMouseDown);
        renderer.domElement.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseup', onMouseUp); // catch releases outside canvas
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('mouseleave', onMouseLeave);
        renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: true });
        renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: true });
        renderer.domElement.addEventListener('touchend', onTouchEnd);
        renderer.domElement.style.cursor = 'default';

        // ─── Animation Loop ────────────────────────────────────
        let animId: number;
        const worldPos = new THREE.Vector3();

        const animate = () => {
            // Auto-rotate only when not dragging
            if (!isDragging) {
                // Apply inertia from drag velocity, then decay
                if (Math.abs(dragVelocityX) > 0.0001 || Math.abs(dragVelocityY) > 0.0001) {
                    globeGroup.rotation.y += dragVelocityX;
                    globeGroup.rotation.x += dragVelocityY;
                    dragVelocityX *= 0.95; // decay
                    dragVelocityY *= 0.95;
                } else {
                    // Default slow auto-rotation
                    globeGroup.rotation.y -= 0.0015;
                }
            }

            // ── Raycast to detect hovered sprite ──
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(sprites);

            let newHoveredIdx = -1;
            if (intersects.length > 0) {
                // Find the front-most intersected sprite (highest z)
                let bestIntersect: THREE.Intersection | null = null;
                for (const inter of intersects) {
                    const sp = inter.object as THREE.Sprite;
                    sp.getWorldPosition(worldPos);
                    const zNorm = (worldPos.z + RADIUS) / (2 * RADIUS);
                    // Only allow hover on front-facing icons
                    if (zNorm > 0.5) {
                        if (!bestIntersect) {
                            bestIntersect = inter;
                        } else {
                            const prevSp = bestIntersect.object as THREE.Sprite;
                            prevSp.getWorldPosition(worldPos);
                            const prevZ = worldPos.z;
                            (inter.object as THREE.Sprite).getWorldPosition(worldPos);
                            if (worldPos.z > prevZ) {
                                bestIntersect = inter;
                            }
                        }
                    }
                }

                if (bestIntersect) {
                    newHoveredIdx = (bestIntersect.object as THREE.Sprite).userData.index;
                }
            }

            if (newHoveredIdx !== currentHoveredIdx) {
                currentHoveredIdx = newHoveredIdx;
                if (newHoveredIdx >= 0) {
                    const skill = skills[newHoveredIdx];
                    // Project hovered sprite to screen coords for label positioning
                    const hovSprite = sprites[newHoveredIdx];
                    hovSprite.getWorldPosition(worldPos);
                    const projected = worldPos.clone().project(camera);
                    const sx = (projected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
                    const sy = (-projected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
                    setHoveredSkill({ name: skill.name, color: skill.color, x: sx, y: sy });
                    renderer.domElement.style.cursor = 'pointer';
                } else {
                    setHoveredSkill(null);
                    renderer.domElement.style.cursor = 'default';
                }
            }

            // Also update position every frame if hovered (since globe rotates)
            if (currentHoveredIdx >= 0) {
                const hovSprite = sprites[currentHoveredIdx];
                hovSprite.getWorldPosition(worldPos);
                const projected = worldPos.clone().project(camera);
                const sx = (projected.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
                const sy = (-projected.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
                const skill = skills[currentHoveredIdx];
                setHoveredSkill({ name: skill.name, color: skill.color, x: sx, y: sy });
            }

            // ── Depth-based + hover-based updates ──
            sprites.forEach((sprite, i) => {
                sprite.getWorldPosition(worldPos);
                const z = worldPos.z;
                const zNorm = (z + RADIUS) / (2 * RADIUS);

                // Base depth behavior
                const opacity = THREE.MathUtils.clamp(Math.pow(zNorm, 2.5), 0.03, 1);
                const scaleFactor = 0.6 + zNorm * 0.6;
                let finalSize = iconSize * scaleFactor;

                const glowSprite = glowSprites[i];
                const isHovered = i === currentHoveredIdx;

                if (isHovered) {
                    // ── Pop out effect ──
                    finalSize = iconSize * 1.4; // 1.4x scale for pop-out
                    (sprite.material as THREE.SpriteMaterial).opacity = 1;

                    // ── Glow effect ──
                    const glowSize = finalSize * 2.5;
                    glowSprite.scale.set(glowSize, glowSize, 1);
                    (glowSprite.material as THREE.SpriteMaterial).opacity = 0.7;
                    glowSprite.position.copy(sprite.position);
                } else {
                    // Normal depth behavior
                    (sprite.material as THREE.SpriteMaterial).opacity = opacity;

                    // Hide glow
                    glowSprite.scale.set(0, 0, 1);
                    (glowSprite.material as THREE.SpriteMaterial).opacity = 0;
                }

                sprite.scale.set(finalSize, finalSize, 1);
            });

            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate);
        };
        animate();

        // ─── Resize Handler ────────────────────────────────────
        const onResize = () => {
            if (!container) return;
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize);

        // ─── Cleanup ───────────────────────────────────────────
        return () => {
            renderer.domElement.removeEventListener('mousedown', onMouseDown);
            renderer.domElement.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseup', onMouseUp);
            renderer.domElement.removeEventListener('mousemove', onMouseMove);
            renderer.domElement.removeEventListener('mouseleave', onMouseLeave);
            renderer.domElement.removeEventListener('touchstart', onTouchStart);
            renderer.domElement.removeEventListener('touchmove', onTouchMove);
            renderer.domElement.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);

            sprites.forEach(s => {
                (s.material as THREE.SpriteMaterial).map?.dispose();
                (s.material as THREE.SpriteMaterial).dispose();
            });
            glowSprites.forEach(s => {
                (s.material as THREE.SpriteMaterial).map?.dispose();
                (s.material as THREE.SpriteMaterial).dispose();
            });
            sphereGeo.dispose();
            wireMat.dispose();
            renderer.dispose();

            if (container && renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <section id="skills" className="py-24 px-4 w-full overflow-hidden relative">
            {/* Section Title */}
            <div className="max-w-7xl mx-auto relative z-10 w-full flex justify-center flex-col items-center">
                <p className="text-white/50 text-sm tracking-[0.2em] uppercase font-bold mb-4 font-mono">
                    Tech Stack
                </p>
                <h2 className="text-3xl md:text-5xl font-bold font-grotesk tracking-tighter mb-8 inline-flex items-center gap-2">
                    <span className="text-white">My</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Skills
                    </span>
                </h2>
            </div>

            {/* 3D Globe Container */}
            <div className="relative w-full max-w-3xl mx-auto h-[450px] md:h-[550px] z-10">
                <div ref={mountRef} className="w-full h-full" />

                {/* Hover Label - positioned near the hovered icon */}
                {hoveredSkill && (
                    <div
                        className="absolute pointer-events-none transition-opacity duration-200 z-[200]"
                        style={{
                            left: `${hoveredSkill.x}px`,
                            top: `${hoveredSkill.y + 30}px`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <div
                            className="px-4 py-1.5 bg-black/70 backdrop-blur-md rounded-full border font-mono tracking-[0.15em] text-xs whitespace-nowrap shadow-lg"
                            style={{
                                borderColor: hoveredSkill.color + '44',
                                color: hoveredSkill.color,
                                boxShadow: `0 0 20px ${hoveredSkill.color}33`,
                            }}
                        >
                            {hoveredSkill.name.toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
