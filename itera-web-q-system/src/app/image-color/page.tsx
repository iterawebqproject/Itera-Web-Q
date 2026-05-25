"use client";
import ColorThief from "colorthief";
import type React from "react";
import { type ChangeEvent, useRef, useState } from "react";

const ColorExtractorTS: React.FC = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);

  const rgbToHex = (r: number, g: number, b: number): string =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (selectedImage) URL.revokeObjectURL(selectedImage);

      setSelectedImage(URL.createObjectURL(file));
      setPalette([]);
    }
  };

  const extractColors = () => {
    if (imgRef.current) {
      const colorThief = new ColorThief();
      const img = imgRef.current;

      try {
        const colors: number[][] = colorThief.getPalette(img, 6);
        const hexColors = colors.map(([r, g, b]) => rgbToHex(r, g, b));
        setPalette(hexColors);
      } catch (err) {
        console.error("Extraction failed", err);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {selectedImage && (
        <div style={{ marginTop: "20px" }}>
          <img
            ref={imgRef}
            src={selectedImage}
            alt="Source"
            style={{ maxWidth: "300px", display: "block" }}
            onLoad={extractColors}
          />
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {palette.map((hex) => (
          <div key={hex} style={{ textAlign: "center" }}>
            <div
              style={{
                backgroundColor: hex,
                width: "50px",
                height: "50px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <code className="text-neutral">{hex}</code>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorExtractorTS;
