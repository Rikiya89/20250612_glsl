// 🔮 Infinite Lotus Spirit Shader
uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

#define TAU 6.28318530718
#define PHI 1.61803398875

// Chakra-inspired pastel gradient
vec3 chakraPalette(float t){
    vec3 a = vec3(0.95, 0.93, 0.90);  // divine pearl base
    vec3 b = vec3(0.12, 0.10, 0.30);  // spiritual indigo
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.15, 0.3, 0.5);    // depth shift
    return a + b * cos(TAU * (c * t + d));
}

// Petal blooming function
float lotus(vec2 p, float petals, float scale, float timeShift){
    float r = length(p);
    float theta = atan(p.y, p.x);
    float wave = sin(theta * petals + timeShift);
    return abs(r - scale * (0.4 + 0.3 * wave));
}

// Chakra glow ring
float chakraRing(float r, float freq, float offset){
    return smoothstep(0.01, 0.0, abs(sin(r * freq - offset)) * exp(-4.0 * r));
}

// Spiral spiritual field
float spiralFlow(vec2 p, float t){
    float r = length(p);
    float theta = atan(p.y, p.x);
    float s = sin(theta * 14.0 + t * 1.2) * 0.12 + r;
    return exp(-8.0 * abs(s - 0.22));
}

void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / u_resolution.y;
    float t = u_time * 0.4;

    // Sacred rotation
    float rot = t * 0.12 + 0.03 * sin(u_time * 0.5);
    uv *= mat2(cos(rot), -sin(rot), sin(rot), cos(rot));

    float r = length(uv);
    float theta = atan(uv.y, uv.x);
    vec3 col = vec3(0.0);

    // ✨ Breath aura
    float aura = exp(-5.5 * pow(r * (1.0 + 0.04 * sin(u_time * 0.3)), 2.0));
    col += chakraPalette(0.1 + 0.25 * sin(t * 0.8)) * aura;

    // 🌺 Inner 6-point lotus
    float petal1 = lotus(uv * 1.15, 6.0, 0.25, t * 1.3);
    float mask1 = smoothstep(0.015, 0.0, petal1);
    col += chakraPalette(0.35 + 0.25 * cos(t + theta)) * mask1;

    // 🌼 Outer 12-petal lotus
    float petal2 = lotus(uv * 1.75, 12.0, 0.5, -t * 1.1);
    float mask2 = smoothstep(0.014, 0.0, petal2);
    col += chakraPalette(0.65 + 0.2 * sin(t * 0.6)) * mask2 * 0.85;

    // 🔯 Chakra rings
    float ring1 = chakraRing(r, 60.0, u_time * 1.5);
    float ring2 = chakraRing(r, 30.0, u_time * 1.1);
    col += chakraPalette(0.5 + 0.1 * sin(t * 1.5)) * (ring1 + ring2) * 0.4;

    // 🌀 Spiral divine motion
    float spiral = spiralFlow(uv * 1.1, u_time);
    col += chakraPalette(0.25 + 0.3 * cos(t * 0.6)) * spiral * 0.5;

    // 💖 Divine source glow
    float core = smoothstep(0.02, 0.0, r - (0.07 + 0.01 * sin(u_time * 3.0)));
    col += vec3(1.0, 0.98, 0.96) * core * 0.95;

    // 🌒 Vignette and final divine blend
    float vignette = smoothstep(1.0, 0.3, r);
    col *= 0.93 + 0.07 * vignette;
    col = mix(col, vec3(1.0), 0.22);
    col = pow(col, vec3(0.87));

    fragColor = vec4(col, 1.0);
}
