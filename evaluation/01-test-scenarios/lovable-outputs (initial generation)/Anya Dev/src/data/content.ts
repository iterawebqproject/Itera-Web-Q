export type ContentItem = {
  id: string;
  title: string;
  excerpt: string;
  category: "blog" | "experiment" | "project";
  status: "Done" | "WIP" | "Live";
  tags?: string[];
  date: string;
  content?: string;
};

export const contentItems: ContentItem[] = [
  {
    id: "react-server-components",
    title: "Understanding React Server Components",
    excerpt: "A deep dive into how RSC changes the way we think about rendering and data fetching in React applications.",
    category: "blog",
    status: "Done",
    tags: ["React", "RSC"],
    date: "2026-03-15",
  },
  {
    id: "css-container-queries",
    title: "CSS Container Queries in Practice",
    excerpt: "Moving beyond media queries — building truly responsive components that adapt to their container.",
    category: "blog",
    status: "Done",
    tags: ["CSS", "Responsive"],
    date: "2026-02-20",
  },
  {
    id: "webgpu-particles",
    title: "WebGPU Particle System",
    excerpt: "Experimenting with WebGPU compute shaders to render 1M+ particles at 60fps in the browser.",
    category: "experiment",
    status: "WIP",
    tags: ["WebGPU", "Graphics"],
    date: "2026-04-01",
    content: `This experiment explores the capabilities of the WebGPU API for high-performance particle rendering directly in the browser.\n\n## Motivation\nTraditional WebGL approaches hit a ceiling around 100K particles. With WebGPU compute shaders, we can offload physics calculations to the GPU.\n\n## Technical Notes\n⚡ **Performance**: Achieving 1.2M particles at a stable 60fps on an M2 MacBook Pro.\n\n🔧 **Architecture**: Using a ping-pong buffer strategy — two storage buffers alternate between read and write each frame.\n\n📐 **Physics**: Simple Euler integration with gravitational attractors. Each particle stores position (vec3) and velocity (vec3).\n\n## Next Steps\n- Add collision detection between particles\n- Implement spatial hashing for neighbor queries\n- Explore instanced rendering for complex particle shapes`,
  },
  {
    id: "wasm-image-processing",
    title: "WASM Image Processing Pipeline",
    excerpt: "Building a real-time image processing pipeline using Rust compiled to WebAssembly.",
    category: "experiment",
    status: "Done",
    tags: ["WASM", "Rust"],
    date: "2026-01-10",
    content: `A complete image processing pipeline running entirely in the browser, powered by Rust and WebAssembly.\n\n## Overview\nThis experiment compiles Rust image processing routines to WASM, achieving near-native performance for filters and transformations.\n\n## Technical Notes\n⚡ **Performance**: 4x faster than equivalent JavaScript canvas operations for blur and convolution filters.\n\n🔧 **Toolchain**: Built with wasm-pack, using wasm-bindgen for JS interop.\n\n📐 **Filters Implemented**: Gaussian blur, edge detection (Sobel), color quantization, and dithering.\n\n## Results\nThe WASM module processes a 4K image in under 50ms, making real-time preview possible even on mobile devices.`,
  },
  {
    id: "generative-svg-art",
    title: "Generative SVG Art Engine",
    excerpt: "A creative coding experiment generating unique SVG artwork using noise functions and geometric algorithms.",
    category: "experiment",
    status: "Live",
    tags: ["Creative Coding", "SVG"],
    date: "2026-03-28",
    content: `An algorithmic art generator that creates unique SVG compositions using Perlin noise and recursive subdivision.\n\n## Concept\nEach piece is generated from a random seed, producing deterministic but infinitely variable artwork.\n\n## Technical Notes\n🎨 **Algorithm**: Recursive subdivision of a canvas into regions, with Perlin noise controlling color selection and shape placement.\n\n⚡ **Output**: Pure SVG — infinitely scalable, printable at any resolution.\n\n🔧 **Palette**: Colors are derived from a base hue using complementary and analogous color theory.\n\n## Gallery\nOver 500 unique pieces generated. Each one is deterministic — the same seed always produces the same artwork.`,
  },
  {
    id: "taskflow-app",
    title: "TaskFlow — Team Project Manager",
    excerpt: "A real-time collaborative project management tool built with React, Supabase, and WebSockets.",
    category: "project",
    status: "Live",
    tags: ["React", "Supabase", "Full-Stack"],
    date: "2026-01-05",
  },
  {
    id: "devkit-cli",
    title: "DevKit CLI",
    excerpt: "A developer toolkit CLI for scaffolding projects, managing configs, and automating workflows.",
    category: "project",
    status: "Done",
    tags: ["Node.js", "CLI", "DX"],
    date: "2025-11-20",
  },
  {
    id: "accessible-component-library",
    title: "A11y Component Library",
    excerpt: "An accessible-first React component library with full ARIA support and keyboard navigation.",
    category: "project",
    status: "WIP",
    tags: ["React", "Accessibility", "Design System"],
    date: "2026-03-01",
  },
  {
    id: "typescript-patterns",
    title: "Advanced TypeScript Patterns",
    excerpt: "Exploring advanced type-level programming patterns including branded types, HKTs, and conditional inference.",
    category: "blog",
    status: "Done",
    tags: ["TypeScript", "Patterns"],
    date: "2025-12-10",
  },
];

export const getCategoryIcon = (category: ContentItem["category"]) => {
  switch (category) {
    case "blog": return "📖";
    case "experiment": return "🧪";
    case "project": return "💻";
  }
};

export const getStatusColor = (status: ContentItem["status"]) => {
  switch (status) {
    case "Done": return "border-secondary/40 text-secondary";
    case "WIP": return "border-amber-500/40 text-amber-400";
    case "Live": return "border-emerald-500/40 text-emerald-400";
  }
};
