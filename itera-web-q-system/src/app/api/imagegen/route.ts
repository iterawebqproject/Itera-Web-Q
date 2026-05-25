import { GoogleGenAI } from "@google/genai";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;
    const role =
      body.role === "logo" || body.role === "hero" || body.role === "content"
        ? body.role
        : "content";
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    let enhancedPrompt = prompt;
    if (role === "logo") {
      enhancedPrompt = `Create a vector logo design of: ${prompt}.`;
    } else if (role === "hero") {
      enhancedPrompt = `Create a landscape hero banner image of: ${prompt}.`;
    } else {
      enhancedPrompt = `Create a highly detailed photograph of: ${prompt}.`;
    }

    console.log(
      `[imagegen] Generating image for role '${role}' with enhanced prompt:`,
      enhancedPrompt,
    );

    const ai = new GoogleGenAI({});

    try {
      const response = await Promise.race([
        ai.models.generateContent({
          model: "gemini-3.1-flash-image-preview",
          contents: enhancedPrompt,
          config: {
            responseModalities: ["IMAGE"],
            thinkingConfig: {
              // @ts-expect-error - SDK type definitions might not have thinkingLevel yet
              thinkingLevel: "minimal",
            },
          },
        }),
      ]);

      const parts = response?.candidates?.[0]?.content?.parts ?? [];

      for (const part of parts) {
        if (part?.inlineData?.data) {
          const imageData = part.inlineData.data;
          const origBuffer = Buffer.from(imageData, "base64");

          let outBuffer: Buffer = origBuffer;
          let mime = "image/png";
          try {
            const sharp = (await import("sharp")).default;
            const profile =
              role === "logo"
                ? { width: 320, height: 120, quality: 72 }
                : role === "hero"
                  ? { width: 1280, height: 720, quality: 70 }
                  : { width: 960, height: 720, quality: 66 };

            const converted = await sharp(origBuffer)
              .resize(profile.width, profile.height, {
                fit: "inside",
                withoutEnlargement: true,
              })
              .webp({ quality: profile.quality, effort: 4 })
              .toBuffer();
            outBuffer = Buffer.from(converted);
            mime = "image/webp";
          } catch (convErr) {
            console.warn(
              "webp conversion failed, returning original image:",
              convErr,
            );
            outBuffer = origBuffer;
            mime = "image/png";
          }

          const imageBase64 = outBuffer.toString("base64");
          return NextResponse.json(
            { message: "Image generated", imageBase64, mime },
            { status: 200 },
          );
        }
      }

      console.warn("[imagegen] Returned no parts or inline data.");
      return NextResponse.json(
        { error: "No image data found in the generation response." },
        { status: 500 },
      );
    } catch (err) {
      console.error("[imagegen] Error:", err);
      return NextResponse.json(
        {
          error: "Failed to generate image",
          details: err instanceof Error ? err.message : String(err),
        },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    console.error("Error generating image:", error);
    const details =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : JSON.stringify(error);
    return NextResponse.json(
      { error: "Failed to generate image", details },
      { status: 500 },
    );
  }
}
