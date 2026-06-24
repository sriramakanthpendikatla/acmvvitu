/* ===========================================================
   ACM VVITU — 3D Hero Scene
   Built with Three.js r160
   Structure: scene setup -> mountain -> starfield -> constellation
              -> hanging letterforms -> intro sequence -> interaction
   =========================================================== */

(function(){
  'use strict';

  function boot(){
    if (typeof THREE === 'undefined'){
      requestAnimationFrame(boot);
      return;
    }

    const canvas = document.getElementById('scene-canvas');
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingFill = document.getElementById('loadingFill');
    const hud = document.getElementById('hud');
    if (!canvas || !loadingScreen || !loadingFill || !hud){
      requestAnimationFrame(boot);
      return;
    }

    const heroSection = canvas.closest('.hero-section');

  function getViewportSize(){
    if (heroSection){
      return { w: heroSection.clientWidth, h: heroSection.clientHeight };
    }
    return { w: window.innerWidth, h: window.innerHeight };
  }

  function onIntroComplete(){
    document.dispatchEvent(new CustomEvent('heroIntroComplete'));
  }

  const vp0 = getViewportSize();

  // ---------- Renderer / Scene / Camera ----------
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(vp0.w, vp0.h);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    48, vp0.w / vp0.h, 0.1, 200
  );
  // baseCamOrigin holds the resting camera position before mouse-parallax
  // offset is applied; fitCameraToWord() keeps it correctly distanced so
  // the wordmark always fits, and the render loop adds parallax on top.
  const baseCamOrigin = new THREE.Vector3(0, 5.6, 19);
  camera.position.copy(baseCamOrigin);
  const baseLookAt = new THREE.Vector3(0, 4.0, 0);
  camera.lookAt(baseLookAt);

  // ---------- Fog & Sky ----------
  const fogColor = new THREE.Color(0x0a1424);
  scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.018);

  // Sky gradient via large sphere with vertex-colored shader
  const skyGeo = new THREE.SphereGeometry(95, 32, 32);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      topColor:    { value: new THREE.Color(0x1a2b45) },
      midColor:    { value: new THREE.Color(0x0e1830) },
      bottomColor: { value: new THREE.Color(0x05080f) },
      offset:      { value: 8 },
      exponent:    { value: 0.7 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main(){
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main(){
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        float t = max(h, 0.0);
        vec3 col = mix(bottomColor, midColor, smoothstep(-0.1, 0.25, h));
        col = mix(col, topColor, smoothstep(0.1, 0.7, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  // ---------- Lighting ----------
  const hemi = new THREE.HemisphereLight(0x6f8db3, 0x0a0e16, 0.55);
  scene.add(hemi);

  const moonLight = new THREE.DirectionalLight(0xaecdf0, 0.7);
  moonLight.position.set(-12, 18, 10);
  scene.add(moonLight);

  const rimLight = new THREE.DirectionalLight(0x1b3f61, 0.18);
  rimLight.position.set(10, 6, -8);
  scene.add(rimLight);

  const iceFill = new THREE.PointLight(0x4aa8d1, 0.6, 40, 2);
  iceFill.position.set(0, 7, 9);
  scene.add(iceFill);

  // ===========================================================
  // LOW-POLY MOUNTAIN RANGE
  // ===========================================================
  const mountainGroup = new THREE.Group();
  scene.add(mountainGroup);

  // Deterministic pseudo-random so the silhouette is stable across reloads
  function mulberry32(seed){
    return function(){
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildFacetedPeak({
    baseRadius, height, segments, seedNum, colorBase, colorVariance, jitter
  }){
    const rand = mulberry32(seedNum);
    const radial = segments;
    const rings = 6;
    const positions = [];
    const colors = [];
    const colorA = new THREE.Color(colorBase);

    // Build rings of points from base to apex with jitter for low-poly facets
    const ringPoints = [];
    for (let r = 0; r <= rings; r++){
      const t = r / rings;
      const ringRadius = baseRadius * (1 - t) * (0.85 + rand() * 0.3);
      const ringY = height * Math.pow(t, 1.35);
      const pts = [];
      const count = Math.max(4, Math.round(radial * (1 - t * 0.4)));
      for (let i = 0; i < count; i++){
        const a = (i / count) * Math.PI * 2 + (r % 2 === 0 ? 0 : Math.PI / count);
        const jitterAmt = jitter * (0.4 + rand() * 0.6) * (1 - t * 0.5);
        const rad = ringRadius + (rand() - 0.5) * jitterAmt;
        const x = Math.cos(a) * rad;
        const z = Math.sin(a) * rad;
        const y = ringY + (rand() - 0.5) * jitter * 0.5 * (1 - t);
        pts.push(new THREE.Vector3(x, y, z));
      }
      ringPoints.push(pts);
    }
    // apex point
    const apex = new THREE.Vector3(
      (rand() - 0.5) * baseRadius * 0.08,
      height * (1.02 + rand() * 0.03),
      (rand() - 0.5) * baseRadius * 0.08
    );

    function pushTri(p1, p2, p3, shade){
      positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
      const c = colorA.clone();
      const variance = (rand() - 0.5) * colorVariance;
      c.r = THREE.MathUtils.clamp(c.r + variance + shade, 0, 1);
      c.g = THREE.MathUtils.clamp(c.g + variance + shade, 0, 1);
      c.b = THREE.MathUtils.clamp(c.b + variance + shade, 0, 1);
      for (let k = 0; k < 3; k++) colors.push(c.r, c.g, c.b);
    }

    for (let r = 0; r < rings; r++){
      const lower = ringPoints[r];
      const upper = ringPoints[r + 1];
      const lc = lower.length, uc = upper.length;
      for (let i = 0; i < lc; i++){
        const l1 = lower[i];
        const l2 = lower[(i + 1) % lc];
        const uIdxA = Math.floor((i / lc) * uc) % uc;
        const uIdxB = Math.floor(((i + 1) / lc) * uc) % uc;
        const u1 = upper[uIdxA];
        const u2 = upper[uIdxB];
        const shade = (rand() - 0.5) * 0.06;
        pushTri(l1, l2, u1, shade);
        if (uIdxA !== uIdxB){
          pushTri(l2, u2, u1, shade);
        }
      }
    }
    // cap to apex
    const topRing = ringPoints[rings];
    for (let i = 0; i < topRing.length; i++){
      const p1 = topRing[i];
      const p2 = topRing[(i + 1) % topRing.length];
      const shade = (rand() - 0.5) * 0.08 + 0.05;
      pushTri(p1, p2, apex, shade);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.85,
      metalness: 0.08,
      flatShading: true
    });

    return new THREE.Mesh(geo, mat);
  }

  // Hero peak (center, tallest, behind the wordmark)
  const heroPeak = buildFacetedPeak({
    baseRadius: 9.2, height: 13.5, segments: 15, seedNum: 1337,
    colorBase: 0x364560, colorVariance: 0.045, jitter: 1.1
  });
  heroPeak.position.set(0, -2.0, -8);
  mountainGroup.add(heroPeak);

  // Left supporting peak
  const leftPeak = buildFacetedPeak({
    baseRadius: 7.2, height: 9.2, segments: 12, seedNum: 77,
    colorBase: 0x283348, colorVariance: 0.04, jitter: 0.95
  });
  leftPeak.position.set(-13, -2.8, -13);
  mountainGroup.add(leftPeak);

  // Right supporting peak
  const rightPeak = buildFacetedPeak({
    baseRadius: 6.8, height: 8.5, segments: 11, seedNum: 412,
    colorBase: 0x2a3550, colorVariance: 0.04, jitter: 0.9
  });
  rightPeak.position.set(12.5, -2.8, -12);
  mountainGroup.add(rightPeak);

  // Distant haze peaks (far background, very dim)
  const farPeak1 = buildFacetedPeak({
    baseRadius: 11.5, height: 11.5, segments: 10, seedNum: 919,
    colorBase: 0x1a2438, colorVariance: 0.02, jitter: 0.75
  });
  farPeak1.position.set(-22, -1.5, -28);
  mountainGroup.add(farPeak1);

  const farPeak2 = buildFacetedPeak({
    baseRadius: 10.5, height: 10.5, segments: 10, seedNum: 558,
    colorBase: 0x1a2438, colorVariance: 0.02, jitter: 0.75
  });
  farPeak2.position.set(20, -1.5, -27);
  mountainGroup.add(farPeak2);

  // Ground plane (subtle, catches light falloff at the base)
  const groundGeo = new THREE.PlaneGeometry(80, 80, 1, 1);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x070a12, roughness: 1, metalness: 0
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -3.4;
  scene.add(ground);

  // ===========================================================
  // STARFIELD
  // ===========================================================
  function buildStarfield(count, radius, sizeRange, opacityBase, seedNum){
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const rand = mulberry32(seedNum);
    for (let i = 0; i < count; i++){
      // distribute on upper hemisphere shell so stars sit behind/above mountains
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.lerp(0.05, 0.95, rand())); // bias upward
      const r = radius * (0.85 + rand() * 0.15);
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi) * 0.6 + 6;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 10;
      sizes[i] = sizeRange[0] + rand() * (sizeRange[1] - sizeRange[0]);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: opacityBase },
        uTime: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        void main(){
          vSize = size;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform float uOpacity;
        varying float vSize;
        void main(){
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(1.0, 1.0, 1.0, a * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geo, mat);
  }

  const starsFar = buildStarfield(700, 70, [0.4, 1.0], 0.35, 2024);
  const starsNear = buildStarfield(180, 50, [0.7, 1.4], 0.42, 5150);
  scene.add(starsFar, starsNear);

  // ===========================================================
  // CONSTELLATION / CIRCUIT NETWORK — climbing the hero peak
  // ===========================================================
  // A network of glowing nodes + connecting edges that traces up the
  // hero peak, evoking a circuit board / star-chart hybrid: fitting
  // for a computing-society mark without losing the mountain's scale.
  const constellationGroup = new THREE.Group();
  scene.add(constellationGroup);

  function buildConstellation(seedNum){
    const rand = mulberry32(seedNum);
    const nodeCount = 18;
    const nodes = [];

    // Place nodes in a roughly conical spiral up the hero peak's surface
    for (let i = 0; i < nodeCount; i++){
      const t = i / (nodeCount - 1); // 0 base -> 1 apex
      const angle = t * Math.PI * 5.2 + rand() * 0.6;
      const radius = 6.4 * (1 - t) * (0.55 + rand() * 0.5) + 0.15;
      const y = -2.2 + t * 10.4 + (rand() - 0.5) * 0.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 6 + radius * 0.3;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Edges: connect each node to its nearest few neighbors (by index proximity + distance)
    const edgePositions = [];
    for (let i = 0; i < nodes.length; i++){
      const candidates = [];
      for (let j = 0; j < nodes.length; j++){
        if (i === j) continue;
        const d = nodes[i].distanceTo(nodes[j]);
        candidates.push({ j, d });
      }
      candidates.sort((a, b) => a.d - b.d);
      const linkCount = 1;
      for (let k = 0; k < linkCount && k < candidates.length; k++){
        const { j, d } = candidates[k];
        if (d < 2.6){
          edgePositions.push(
            nodes[i].x, nodes[i].y, nodes[i].z,
            nodes[j].x, nodes[j].y, nodes[j].z
          );
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    // progress attribute (0..1) drives the draw-on reveal during intro
    const progress = new Float32Array(edgePositions.length / 3);
    for (let i = 0; i < progress.length; i++){
      progress[i] = (i / 2) / (progress.length / 2);
    }
    edgeGeo.setAttribute('progress', new THREE.Float32BufferAttribute(progress, 1));

    const edgeMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0x9fe3ff) },
        uReveal: { value: 0 }, // 0..1 reveal progress for intro animation
        uOpacity: { value: 0.75 }
      },
      vertexShader: `
        attribute float progress;
        varying float vProgress;
        void main(){
          vProgress = progress;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uReveal;
        uniform float uOpacity;
        varying float vProgress;
        void main(){
          float visible = step(vProgress, uReveal);
          float fade = smoothstep(uReveal - 0.08, uReveal, vProgress);
          float alpha = visible * (1.0 - fade) * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);

    // Node points (glow dots at intersections)
    const nodePositions = new Float32Array(nodes.length * 3);
    const nodeProgress = new Float32Array(nodes.length);
    nodes.forEach((n, i) => {
      nodePositions[i * 3] = n.x;
      nodePositions[i * 3 + 1] = n.y;
      nodePositions[i * 3 + 2] = n.z;
      nodeProgress[i] = i / (nodes.length - 1);
    });
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('progress', new THREE.Float32BufferAttribute(nodeProgress, 1));

    const nodeMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xbdeeff) },
        uReveal: { value: 0 },
        uTime: { value: 0 }
      },
      vertexShader: `
        attribute float progress;
        varying float vProgress;
        uniform float uTime;
        void main(){
          vProgress = progress;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          float pulse = 1.0 + 0.08 * sin(uTime * 1.0 + progress * 14.0);
          gl_PointSize = 4.5 * pulse * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uReveal;
        varying float vProgress;
        void main(){
          vec2 c = gl_PointCoord - vec2(0.5);
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d);
          float visible = step(vProgress, uReveal);
          gl_FragColor = vec4(uColor, a * visible);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const nodePoints = new THREE.Points(nodeGeo, nodeMat);

    const group = new THREE.Group();
    group.add(edgeLines, nodePoints);
    group.userData.edgeMat = edgeMat;
    group.userData.nodeMat = nodeMat;
    return group;
  }

  const constellation = buildConstellation(99);
  constellationGroup.add(constellation);
  // Subtle network — professional backdrop, not game VFX
  constellation.userData.edgeMat.uniforms.uOpacity.value = 0.04;
  constellation.userData.nodeMat.uniforms.uColor.value.set(0x7cc3e2);

  // ===========================================================
  // INTRO SEQUENCE — ambient reveal (no marionette letters)
  // Typography lives in HTML overlay for crisp, professional type
  // ===========================================================
  const clock = new THREE.Clock();
  let elapsed = 0;

  const INTRO = {
    playing: false,
    startTime: 0,
    constellationStart: 0.35,
    constellationDuration: 1.6,
    totalDuration: 2.4
  };

  function easeOutCubic(x){ return 1 - Math.pow(1 - x, 3); }

  function startIntro(){
    INTRO.playing = true;
    INTRO.startTime = elapsed;
    loadingScreen.classList.add('hidden');
  }

  function updateIntro(){
    if (!INTRO.playing) return;
    const t = (elapsed - INTRO.startTime) / INTRO.totalDuration;

    const cT = THREE.MathUtils.clamp(
      ((elapsed - INTRO.startTime) - INTRO.constellationStart) / INTRO.constellationDuration,
      0, 1
    );
    const cEase = easeOutCubic(cT);
    constellation.userData.edgeMat.uniforms.uReveal.value = cEase * 0.85;
    constellation.userData.nodeMat.uniforms.uReveal.value = cEase * 0.85;

    // Gentle scene fade-in
    renderer.toneMappingExposure = THREE.MathUtils.lerp(0.72, 1.05, easeOutCubic(Math.min(t * 1.4, 1)));

    if (t >= 1){
      INTRO.playing = false;
      hud.classList.add('show');
      onIntroComplete();
    }
  }

  function skipIntro(){
    INTRO.playing = false;
    constellation.userData.edgeMat.uniforms.uReveal.value = 0.85;
    constellation.userData.nodeMat.uniforms.uReveal.value = 0.85;
    renderer.toneMappingExposure = 1.05;
    hud.classList.add('show');
    loadingScreen.classList.add('hidden');
    onIntroComplete();
  }

  // Allow click on canvas to skip long intro on repeat visits
  canvas.addEventListener('click', () => { if (INTRO.playing) skipIntro(); });

  // ===========================================================
  // MOUSE PARALLAX
  // ===========================================================
  const pointer = { x: 0, y: 0 };
  const targetCamOffset = { x: 0, y: 0 };
  window.addEventListener('mousemove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // ===========================================================
  // RESPONSIVE CAMERA — frame the mountain vista
  // ===========================================================
  const BASE_FOV = 48;
  const MIN_FOV = 48;
  const MAX_FOV = 58;

  function fitCameraToScene(){
    const { w, h } = getViewportSize();
    const aspect = w / h;

    let fovDeg = BASE_FOV;
    if (aspect < 0.95){
      const t = THREE.MathUtils.clamp((0.95 - aspect) / 0.6, 0, 1);
      fovDeg = THREE.MathUtils.lerp(BASE_FOV, MAX_FOV, t);
    }
    fovDeg = THREE.MathUtils.clamp(fovDeg, MIN_FOV, MAX_FOV);

    const dist = aspect < 0.75 ? 20 : 18;
    camera.fov = fovDeg;
    camera.aspect = aspect;
    baseCamOrigin.set(0, 5.2, dist);
    camera.position.copy(baseCamOrigin);
    camera.updateProjectionMatrix();
  }


  // ===========================================================
  // RESIZE
  // ===========================================================
  function onResize(){
    const { w, h } = getViewportSize();
    renderer.setSize(w, h);
    fitCameraToScene();
  }
  window.addEventListener('resize', onResize);

  // ===========================================================
  // RENDER LOOP
  // ===========================================================
  function animate(){
    requestAnimationFrame(animate);
    const dt = clock.getDelta();
    elapsed += dt;

    updateIntro();

    // star twinkle
    starsFar.material.uniforms.uTime.value = elapsed;
    starsNear.material.uniforms.uTime.value = elapsed;
    constellation.userData.nodeMat.uniforms.uTime.value = elapsed;

    // camera parallax — subtle, professional
    targetCamOffset.x += (pointer.x * 0.45 - targetCamOffset.x) * 0.03;
    targetCamOffset.y += (-pointer.y * 0.22 - targetCamOffset.y) * 0.03;
    camera.position.x = baseCamOrigin.x + targetCamOffset.x;
    camera.position.y = baseCamOrigin.y + targetCamOffset.y;
    camera.lookAt(baseLookAt);

    renderer.render(scene, camera);
  }

  // ===========================================================
  // BOOT — simulate brief load progress then start intro
  // ===========================================================
  fitCameraToScene();
  renderer.toneMappingExposure = 0.72;

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += 8 + Math.random() * 14;
    if (loadProgress >= 100){
      loadProgress = 100;
      clearInterval(loadInterval);
      setTimeout(startIntro, 250);
    }
    loadingFill.style.width = loadProgress + '%';
  }, 90);

  animate();

  window.__acmScene = {
    scene, camera, renderer, mountainGroup,
    starsFar, starsNear, constellation,
    skipIntro
  };
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
