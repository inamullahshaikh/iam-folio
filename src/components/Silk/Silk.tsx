/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  forwardRef,
  useRef,
  useMemo,
  useLayoutEffect,
  useEffect,
  useState,
  type RefObject,
} from "react";
import { Color, Vector2, type Mesh, type ShaderMaterial } from "three";
import { cursorPointer } from "../../lib/cursorState";

function hexToNormalizedRGB(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");
  return [
    parseInt(normalized.slice(0, 2), 16) / 255,
    parseInt(normalized.slice(2, 4), 16) / 255,
    parseInt(normalized.slice(4, 6), 16) / 255,
  ];
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
uniform vec2 uPointer;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2 r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2 rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;
  vec2 pointer = (uPointer - 0.5) * 2.0;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset) + pointer.y * 0.035;
  tex.x += pointer.x * 0.025;

  float ripple = sin(distance(vUv, uPointer) * 12.0 - tOffset * 0.5) * 0.03;
  tex += normalize(vec2(pointer.x + 0.0001, pointer.y + 0.0001)) * ripple;

  float pattern = 0.6 +
    0.4 * sin(5.0 * (tex.x + tex.y +
      cos(3.0 * tex.x + 5.0 * tex.y) +
      0.02 * tOffset) +
      sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

type Uniforms = Record<string, { value: unknown }>;

type SilkPlaneProps = {
  uniforms: Uniforms;
};

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane(
  { uniforms },
  ref
) {
  const { viewport } = useThree();
  const meshRef = ref as RefObject<Mesh>;

  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [meshRef, viewport]);

  useFrame((_, delta) => {
    const material = meshRef.current?.material as ShaderMaterial | undefined;
    if (!material?.uniforms) return;

    material.uniforms.uTime.value += 0.1 * delta;

    if (material.uniforms.uPointer) {
      const currentPointer = material.uniforms.uPointer.value as Vector2;
      currentPointer.x += (cursorPointer.x - currentPointer.x) * 0.08;
      currentPointer.y += (cursorPointer.y - currentPointer.y) * 0.08;
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
});
SilkPlane.displayName = "SilkPlane";

export type SilkProps = {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  className?: string;
  active?: boolean;
};

export default function Silk({
  speed = 5,
  scale = 1,
  color = "#7B7481",
  noiseIntensity = 1.5,
  rotation = 0,
  className,
  active = true,
}: SilkProps) {
  const meshRef = useRef<Mesh>(null);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 640;
      setDpr(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const uniforms = useMemo<Uniforms>(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
      uPointer: { value: new Vector2(0.5, 0.5) },
    }),
    [speed, scale, noiseIntensity, color, rotation]
  );

  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <Canvas
        dpr={dpr}
        frameloop={active ? "always" : "never"}
        style={{ width: "100%", height: "100%" }}
      >
        <SilkPlane ref={meshRef} uniforms={uniforms} />
      </Canvas>
    </div>
  );
}
