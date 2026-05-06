"use client";
import ColorThief from "colorthief";
import {
  Image as ImageIcon,
  Info,
  LayoutPanelLeft,
  LayoutPanelTop,
  Settings,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { idbSet } from "@/lib/idb-storage";

const FONT_OPTIONS = [
  { label: "Arial", family: "Arial, Helvetica, sans-serif" },
  {
    label: "Helvetica",
    family: "Helvetica, Arial, sans-serif",
  },
  { label: "Verdana", family: "Verdana, Geneva, sans-serif" },
  {
    label: "Trebuchet MS",
    family:
      "'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif",
  },
  {
    label: "Tahoma",
    family: "Tahoma, Geneva, Verdana, sans-serif",
  },
  { label: "System UI", family: "system-ui, sans-serif" },
  { label: "Roboto (Sans-serif)", family: "Roboto, sans-serif" },
  { label: "Open Sans (Sans-serif)", family: "'Open Sans', sans-serif" },
  { label: "Inter (Sans-serif)", family: "Inter, sans-serif" },
  { label: "Poppins (Sans-serif)", family: "Poppins, sans-serif" },
  { label: "Lato (Sans-serif)", family: "Lato, sans-serif" },
  { label: "Montserrat (Sans-serif)", family: "Montserrat, sans-serif" },
  { label: "Nunito (Sans-serif)", family: "Nunito, sans-serif" },
  { label: "Raleway (Sans-serif)", family: "Raleway, sans-serif" },

  {
    label: "Times New Roman",
    family: "'Times New Roman', Times, serif",
  },
  { label: "Georgia", family: "Georgia, serif" },
  {
    label: "Palatino",
    family: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  },
  { label: "Playfair Display (Serif)", family: "'Playfair Display', serif" },
  { label: "Merriweather (Serif)", family: "Merriweather, serif" },
  { label: "Lora (Serif)", family: "Lora, serif" },
  {
    label: "Courier New ",
    family: "'Courier New', Courier, monospace",
  },
  {
    label: "Lucida Console",
    family: "'Lucida Console', Monaco, monospace",
  },
  { label: "Fira Code (Monospace)", family: "'Fira Code', monospace" },
] as const;

export default function UserRequirement() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [webName, setWebName] = useState("");
  const [webType, setWebType] = useState("");
  const [webDescription, setWebDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [keyCTA, setKeyCTA] = useState("");
  const [pageNames, setPageNames] = useState<string[]>([
    "home",
    "",
    "",
    "",
    "",
  ]);

  const genId = () => Math.random().toString(36).slice(2, 9);
  const [pageIds, setPageIds] = useState<string[]>(() =>
    Array(5)
      .fill(0)
      .map(() => genId()),
  );

  const [toneFeel, setToneFeel] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [fontMode, setFontMode] = useState<"single" | "dual">("single");
  const [fontPreference, setFontPreference] = useState("");
  const [headingFont, setHeadingFont] = useState("");
  const [bodyFont, setBodyFont] = useState("");
  const [selectedColorType, setSelectedColorType] = useState<
    "primary" | "secondary" | "accent" | "background"
  >("primary");
  const [palette, setPalette] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [logoWebpDataUri, setLogoWebpDataUri] = useState<string>("");
  const [logoFileName, setLogoFileName] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [selectedLayout, setSelectedLayout] = useState<string>("");
  const [expandedSectionPages, setExpandedSectionPages] = useState<string[]>(
    [],
  );
  const [pageSections, setPageSections] = useState<Record<string, string>>({});
  const [customAssets, setCustomAssets] = useState<
    Array<{ id: string; fileName: string; dataUri: string }>
  >([]);

  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [componentDetails, setComponentDetails] = useState<
    Record<string, string>
  >({});

  const [interactivityAnimations, setInteractivityAnimations] = useState("");

  const toggleComponent = (component: string) => {
    if (selectedComponents.includes(component)) {
      setSelectedComponents(selectedComponents.filter((c) => c !== component));
      const newDetails = { ...componentDetails };
      delete newDetails[component];
      setComponentDetails(newDetails);
    } else {
      setSelectedComponents([...selectedComponents, component]);
    }
  };

  const updateComponentDetail = (component: string, detail: string) => {
    setComponentDetails({ ...componentDetails, [component]: detail });
  };

  const handlePageNameChange = (index: number, value: string) => {
    if (index === 0) return;
    const newPageNames = [...pageNames];
    newPageNames[index] = value
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
    setPageNames(newPageNames);
  };

  const addPage = () => {
    setPageNames([...pageNames, ""]);
    setPageIds([...pageIds, genId()]);
  };

  const removePage = (index: number) => {
    if (index === 0 || pageNames.length <= 1) return;
    const newPageNames = pageNames.filter((_, i) => i !== index);
    setPageNames(newPageNames);
    setPageIds(pageIds.filter((_, i) => i !== index));
  };

  const getValidPages = () => {
    return pageNames.filter((page) => page.trim() !== "");
  };

  const getDuplicateIndices = (): Set<number> => {
    const dupes = new Set<number>();
    const seen = new Map<string, number>();
    pageNames.forEach((name, i) => {
      const n = name.trim().toLowerCase();
      if (!n) return;
      if (seen.has(n)) {
        const prev = seen.get(n);
        if (prev !== undefined) dupes.add(prev);
        dupes.add(i);
      } else {
        seen.set(n, i);
      }
    });
    return dupes;
  };

  const rgbToHex = (r: number, g: number, b: number): string =>
    "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (selectedImage) URL.revokeObjectURL(selectedImage);

      setSelectedImage(URL.createObjectURL(file));
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

  const handleColorSelect = (color: string) => {
    if (selectedColorType === "primary") {
      setPrimaryColor(color);
    } else if (selectedColorType === "secondary") {
      setSecondaryColor(color);
    } else if (selectedColorType === "accent") {
      setAccentColor(color);
    } else {
      setBackgroundColor(color);
    }
  };

  const convertImageFileToWebpDataUri = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const objectUrl = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d");

          if (!context) {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Failed to initialize canvas context"));
            return;
          }

          context.drawImage(image, 0, 0);
          const webpDataUri = canvas.toDataURL("image/webp", 0.92);
          URL.revokeObjectURL(objectUrl);
          resolve(webpDataUri);
        } catch (error) {
          URL.revokeObjectURL(objectUrl);
          reject(error);
        }
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Unable to load image for conversion"));
      };

      image.src = objectUrl;
    });
  };

  const generateStructuredPrompt = (): string => {
    const validPages = getValidPages();
    const sitemap = validPages.join(", ");

    const colors = [
      primaryColor && `Primary: ${primaryColor}`,
      secondaryColor && `Secondary: ${secondaryColor}`,
      accentColor && `Accent: ${accentColor}`,
      backgroundColor && `Background: ${backgroundColor}`,
    ]
      .filter(Boolean)
      .join(", ");

    const uiComponents = selectedComponents
      .map((comp) => {
        const detail = componentDetails[comp];
        return detail ? `${comp}: ${detail}` : comp;
      })
      .join("\n");

    const sectionsList = Object.entries(pageSections)
      .map(([page, sections]) => `${page}: ${sections}`)
      .join("\n");

    const layoutInfo = selectedLayout
      ? layoutOptions.find((l) => l.id === selectedLayout)?.name ||
        selectedLayout
      : "Not specified";

    return `1. DIRECTIVE
Generate a ${webType} with ${validPages.length} pages: ${sitemap}. Primary user actions: ${keyCTA || "Not specified"}.

2. CONTEXT
Brand Identity: "${webName || "Untitled Web"}" – ${webDescription || "No description provided"}
Target Audience: ${targetAudience || "General audience"}

3. WORKFLOWS
Navigation: ${sitemap}
Page Structure:
${sectionsList || "No sections defined"}
Layout Pattern: ${layoutInfo}

4. STYLE
Design Style: ${toneFeel || "Not specified"}
Color Palette: ${colors || "Not specified"}
Typography: ${fontMode === "dual" ? `Heading: ${headingFont || "Not specified"}, Body: ${bodyFont || "Not specified"}` : fontPreference || "Not specified"}
UI Components:
${uiComponents || "No components specified"}

5. CONSTRAINTS
Functionality: ${interactivityAnimations || "No functional requirements specified"}`;
  };

  const handleStartGeneration = async () => {
    const structuredPrompt = generateStructuredPrompt();

    localStorage.setItem("userPrompt", structuredPrompt);
    localStorage.setItem("originalUserPrompt", structuredPrompt);
    localStorage.setItem("webName", webName);
    if (logoWebpDataUri) {
      localStorage.setItem("uploadedLogoWebp", logoWebpDataUri);
    } else {
      localStorage.removeItem("uploadedLogoWebp");
    }

    if (customAssets.length > 0) {
      const assetsMap = customAssets.reduce(
        (acc, curr) => {
          acc[curr.fileName] = curr.dataUri;
          return acc;
        },
        {} as Record<string, string>,
      );
      await idbSet("customAssets", assetsMap);
    } else {
      await idbSet("customAssets", {});
    }
    router.push("/progress");
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return webName.trim() !== "" && webType !== "";
      case 2:
        return (
          targetAudience.trim() !== "" &&
          keyCTA.trim() !== "" &&
          getValidPages().length >= 5 &&
          getDuplicateIndices().size === 0
        );
      case 3:
        return true;
      case 4:
        return selectedLayout !== "";
      case 5:
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const webStep = [
    "Web Foundation",
    "User Goal & Sitemap",
    "Visual Identity",
    "Layout & Sections",
    "Atomic Design Details",
    "Logic & Interactivity",
  ];

  const layoutOptions = [
    {
      id: "header-content",
      name: "Header + Content Pattern",
      description:
        "Standard layout with top navigation, hero section, main content area, and footer. Ideal for landing pages and content-focused sites.",
      visual: <LayoutPanelTop className="text-primary w-5" />,
    },
    {
      id: "sidebar-content",
      name: "Sidebar + Content",
      description:
        "Layout with fixed sidebar navigation on the left and scrollable content on the right. Perfect for dashboards and documentation sites.",
      visual: <LayoutPanelLeft className="text-primary w-5" />,
    },
  ];

  const componentSuggestions = [
    "Card",
    "Accordion",
    "Badge",
    "Carousel",
    "Table",
    "Button",
    "Navigation",
    "Form",
    "Modal",
    "Tabs",
  ];

  return (
    <main className="bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 w-full flex-1 min-h-0 flex flex-col font-sans text-slate-800 overflow-y-auto overflow-x-hidden">
      <section className="text-white px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex flex-col justify-center gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold tracking-tight text-white/95">
              Web Design Studio
            </h1>
          </div>
          <p className="text-xs text-indigo-200/80 font-light">
            Share your ideas and we&apos;ll help bring your web design to life
          </p>
        </div>
      </section>

      <section className="flex-1 px-4 pb-4 min-h-0">
        <div className="bg-white h-full w-full rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 min-h-0">
            <div className="lg:col-span-7 p-5 flex flex-col h-full">
              <ul className="steps w-full mb-4 shrink-0 steps-sm">
                {webStep.map((stepText, idx) => (
                  <li
                    key={stepText}
                    className={`step ${idx < Number(step) ? "step-primary" : ""} text-[10px]`}
                  >
                    {stepText}
                  </li>
                ))}
              </ul>
              <div className="border border-indigo-600 text-white rounded-lg p-4 flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-2 text-indigo-700 mb-2 shrink-0 text-neutral">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h2 className="font-bold uppercase tracking-wider text-primary">
                    {step}. {webStep[step - 1]}
                  </h2>
                </div>

                <div className="flex-1 flex flex-col min-h-0 overflow-y-auto p-1">
                  {step === 1 && (
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-6">
                        <fieldset className="fieldset  text-neutral">
                          <legend className="fieldset-legend">
                            Web Name<span className="text-error">*</span>
                          </legend>
                          <input
                            type="text"
                            className="input input-primary w-full"
                            placeholder="e.g. My Portfolio, Conan Fan Hub"
                            value={webName}
                            onChange={(e) => setWebName(e.target.value)}
                            required
                          />
                        </fieldset>
                        <fieldset className="fieldset text-neutral">
                          <legend className="fieldset-legend">
                            Web Type<span className="text-error">*</span>
                          </legend>
                          <select
                            value={webType}
                            onChange={(e) => setWebType(e.target.value)}
                            className="select select-primary w-full"
                            required
                          >
                            <option value="" disabled={true}>
                              Pick a web type
                            </option>
                            <option>Personal</option>
                            <option>Public Administration/Institutional</option>
                            <option>Blog</option>
                            <option>E-Commerce (Product Showcase)</option>
                            <option>Corporate/Company</option>
                            <option>Education/Training</option>
                            <option>Leisure/Entertainment</option>
                            <option>News</option>
                            <option>Service Portal</option>
                          </select>
                        </fieldset>
                      </div>
                      <fieldset className="fieldset text-neutral">
                        <legend className="fieldset-legend">
                          Web Description
                        </legend>
                        <textarea
                          className="textarea textarea-primary w-full resize-none"
                          placeholder="Tell us about your website — what is it for? what makes it unique?"
                          value={webDescription}
                          onChange={(e) => setWebDescription(e.target.value)}
                          rows={10}
                        />
                      </fieldset>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col gap-2">
                      <fieldset className="fieldset  text-neutral shrink-0">
                        <legend className="fieldset-legend">
                          Target Audience<span className="text-error">*</span>
                        </legend>
                        <input
                          type="text"
                          className="input input-primary w-full"
                          placeholder="Who is this website for? e.g. teens, kids, working professionals"
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          required
                        />
                      </fieldset>
                      <fieldset className="fieldset  text-neutral shrink-0">
                        <legend className="fieldset-legend">
                          Main Action for Visitors
                          <span className="text-error">*</span>
                        </legend>
                        <input
                          type="text"
                          className="input input-primary w-full"
                          placeholder="What should visitors do first? e.g. browse products, read articles"
                          value={keyCTA}
                          onChange={(e) => setKeyCTA(e.target.value)}
                          required
                        />
                      </fieldset>
                      <fieldset className="fieldset text-neutral shrink-0">
                        <legend className="fieldset-legend">
                          Page Structure (Sitemap)
                          <span className="text-error">*</span>
                          <span className="text-xs text-neutral/60 ml-2">
                            (Minimum 5 pages, Home is fixed)
                          </span>
                        </legend>

                        <div className="overflow-y-auto p-1">
                          {(() => {
                            const dupeSet = getDuplicateIndices();
                            return pageNames.map((page, index) => {
                              const isDupe = dupeSet.has(index);
                              return (
                                <div
                                  key={pageIds[index]}
                                  className="flex gap-2 mb-2"
                                >
                                  <input
                                    type="text"
                                    className={
                                      "input w-full " +
                                      (isDupe
                                        ? "input-error "
                                        : "input-primary ") +
                                      (index === 0
                                        ? "bg-gray-100 cursor-not-allowed"
                                        : "")
                                    }
                                    placeholder={
                                      index === 0
                                        ? "home (Fixed)"
                                        : "Use hyphens for spaces e.g. about, contact-us, my-blog"
                                    }
                                    value={page}
                                    onChange={(e) =>
                                      handlePageNameChange(
                                        index,
                                        e.target.value,
                                      )
                                    }
                                    readOnly={index === 0}
                                    required={index >= 5}
                                  />
                                  {isDupe && (
                                    <span className="text-error text-xs self-center whitespace-nowrap">
                                      Duplicate
                                    </span>
                                  )}
                                  {index >= 5 && (
                                    <button
                                      type="button"
                                      className="btn btn-error btn-outline ml-2"
                                      onClick={() => removePage(index)}
                                    >
                                      ×
                                    </button>
                                  )}
                                </div>
                              );
                            });
                          })()}
                        </div>

                        <button
                          type="button"
                          className="btn btn-primary btn-outline btn-sm w-full mt-2"
                          onClick={addPage}
                        >
                          + Add More Page
                        </button>

                        <div className="text-xs text-neutral/60 mt-2">
                          Total pages: {getValidPages().length}
                        </div>
                      </fieldset>
                    </div>
                  )}
                  {step === 3 && (
                    <div className="flex flex-col gap-2">
                      <fieldset className="fieldset  text-neutral">
                        <legend className="fieldset-legend">
                          Tone & Feel<span className="text-error">*</span>
                        </legend>
                        <input
                          type="text"
                          className="input input-primary w-full"
                          placeholder="How should users feel? e.g. fun & playful, clean & minimal, bold & modern"
                          value={toneFeel}
                          onChange={(e) => setToneFeel(e.target.value)}
                          required
                        />
                      </fieldset>
                      <fieldset className="fieldset  text-neutral">
                        <div className="mt-3 border border-primary/20 rounded-lg p-3 bg-primary/5">
                          <legend className="fieldset-legend pt-0">
                            Color Preferences{" "}
                            <span className="text-xs text-secondary flex px-auto items-center gap-1">
                              <Info className="w-4" /> Upload picture to pick
                              color and click to pick for each color preference
                            </span>
                          </legend>

                          <div className="flex mb-2 items-center gap-2">
                            <input
                              type="text"
                              className={`input input-primary w-full flex-1 ${selectedColorType === "primary" ? "ring-2 ring-primary" : ""}`}
                              placeholder="Main color (Button, Band color) e.g. #1b92ca or blue"
                              value={primaryColor}
                              onChange={(e) => setPrimaryColor(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedColorType("primary")}
                              className={`btn btn-sm ${selectedColorType === "primary" ? "btn-primary" : "btn-outline"}`}
                              title="Set as target for color extraction"
                            >
                              {selectedColorType === "primary" ? "✓" : "○"}
                            </button>
                          </div>

                          <div className="flex mb-2 items-center gap-2">
                            <input
                              type="text"
                              className={`input input-primary w-full flex-1 ${selectedColorType === "secondary" ? "ring-2 ring-secondary" : ""}`}
                              placeholder="Supporting color (Card alternate) e.g. #00ff00 or green"
                              value={secondaryColor}
                              onChange={(e) =>
                                setSecondaryColor(e.target.value)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedColorType("secondary")}
                              className={`btn btn-sm ${selectedColorType === "secondary" ? "btn-secondary" : "btn-outline"}`}
                              title="Set as target for color extraction"
                            >
                              {selectedColorType === "secondary" ? "✓" : "○"}
                            </button>
                          </div>

                          <div className="flex mb-2 items-center gap-2">
                            <input
                              type="text"
                              className={`input input-primary w-full flex-1 ${selectedColorType === "accent" ? "ring-2 ring-accent" : ""}`}
                              placeholder="Highlight color (Badges, Icon highlight) e.g. #ff5500 or orange"
                              value={accentColor}
                              onChange={(e) => setAccentColor(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedColorType("accent")}
                              className={`btn btn-sm ${selectedColorType === "accent" ? "btn-accent" : "btn-outline"}`}
                              title="Set as target for color extraction"
                            >
                              {selectedColorType === "accent" ? "✓" : "○"}
                            </button>
                          </div>

                          <div className="flex mb-3 items-center gap-2">
                            <input
                              type="text"
                              className={`input input-primary w-full flex-1 ${selectedColorType === "background" ? "ring-2 ring-neutral" : ""}`}
                              placeholder="Page background color e.g. #f8fafc or whitesmoke"
                              value={backgroundColor}
                              onChange={(e) =>
                                setBackgroundColor(e.target.value)
                              }
                            />
                            <button
                              type="button"
                              onClick={() => setSelectedColorType("background")}
                              className={`btn btn-sm ${selectedColorType === "background" ? "btn-neutral" : "btn-outline"}`}
                              title="Set as target for color extraction"
                            >
                              {selectedColorType === "background" ? "✓" : "○"}
                            </button>
                          </div>

                          <label className="btn btn-primary btn-sm w-full cursor-pointer">
                            <ImageIcon className="w-4 h-4" />
                            <span>
                              Upload picture to pick color →{" "}
                              {selectedColorType.toUpperCase()}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>

                          {selectedImage && (
                            <NextImage
                              ref={imgRef}
                              src={selectedImage}
                              alt="Color extraction source"
                              width={1}
                              height={1}
                              className="hidden"
                              onLoad={extractColors}
                              unoptimized
                            />
                          )}

                          {palette.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs text-neutral mb-2 font-semibold">
                                Click a color below to pick for{" "}
                                <span className="uppercase font-bold">
                                  {selectedColorType}
                                </span>{" "}
                                preference:
                              </p>
                              <div className="flex gap-2 flex-wrap">
                                {palette.map((hex) => (
                                  <button
                                    key={hex}
                                    type="button"
                                    onClick={() => handleColorSelect(hex)}
                                    className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                                  >
                                    <div
                                      style={{
                                        backgroundColor: hex,
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "4px",
                                        border: "2px solid #ccc",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <code className="text-[10px] text-neutral">
                                      {hex}
                                    </code>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </fieldset>
                      <fieldset className="fieldset  text-neutral">
                        <legend className="fieldset-legend">
                          Font Preferences
                        </legend>

                        <div className="flex gap-2 mb-2">
                          <button
                            type="button"
                            className={`badge badge-sm ${
                              fontMode === "single"
                                ? "badge-primary"
                                : "badge-outline hover:badge-primary"
                            }`}
                            onClick={() => {
                              setFontMode("single");
                              setHeadingFont("");
                              setBodyFont("");
                            }}
                          >
                            Single Font
                          </button>
                          <button
                            type="button"
                            className={`badge badge-sm ${
                              fontMode === "dual"
                                ? "badge-primary"
                                : "badge-outline hover:badge-primary"
                            }`}
                            onClick={() => {
                              setFontMode("dual");
                              setFontPreference("");
                            }}
                          >
                            Heading + Body
                          </button>
                        </div>

                        {fontMode === "single" ? (
                          <select
                            value={fontPreference}
                            onChange={(e) => setFontPreference(e.target.value)}
                            className="select select-primary w-full"
                            required
                            style={{
                              fontFamily:
                                FONT_OPTIONS.find(
                                  (f) => f.label === fontPreference,
                                )?.family ?? undefined,
                            }}
                          >
                            <option value="" disabled={true}>
                              Pick a font
                            </option>
                            {FONT_OPTIONS.map((font) => (
                              <option
                                key={font.label}
                                value={font.label}
                                style={{ fontFamily: font.family }}
                              >
                                {font.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <div className="space-y-2">
                            <div>
                              <label
                                htmlFor="heading-font"
                                className="text-xs font-medium text-neutral/70 mb-1 block"
                              >
                                Heading Font
                              </label>
                              <select
                                id="heading-font"
                                value={headingFont}
                                onChange={(e) => setHeadingFont(e.target.value)}
                                className="select select-primary w-full"
                                required
                                style={{
                                  fontFamily:
                                    FONT_OPTIONS.find(
                                      (f) => f.label === headingFont,
                                    )?.family ?? undefined,
                                }}
                              >
                                <option value="" disabled={true}>
                                  Pick a heading font
                                </option>
                                {FONT_OPTIONS.map((font) => (
                                  <option
                                    key={font.label}
                                    value={font.label}
                                    style={{ fontFamily: font.family }}
                                  >
                                    {font.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label
                                htmlFor="body-font"
                                className="text-xs font-medium text-neutral/70 mb-1 block"
                              >
                                Body Font
                              </label>
                              <select
                                id="body-font"
                                value={bodyFont}
                                onChange={(e) => setBodyFont(e.target.value)}
                                className="select select-primary w-full"
                                required
                                style={{
                                  fontFamily:
                                    FONT_OPTIONS.find(
                                      (f) => f.label === bodyFont,
                                    )?.family ?? undefined,
                                }}
                              >
                                <option value="" disabled={true}>
                                  Pick a body font
                                </option>
                                {FONT_OPTIONS.map((font) => (
                                  <option
                                    key={font.label}
                                    value={font.label}
                                    style={{ fontFamily: font.family }}
                                  >
                                    {font.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                      </fieldset>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[440px] xl:max-h-[500px]">
                      <fieldset className="fieldset text-neutral">
                        <legend className="fieldset-legend">
                          Layout Pattern<span className="text-error">*</span>
                        </legend>

                        <div className="space-y-3">
                          {layoutOptions.map((layout) => (
                            <label
                              key={layout.id}
                              className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedLayout === layout.id
                                  ? "border-primary bg-primary/5"
                                  : "border-slate-200 hover:border-primary/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name="layout"
                                value={layout.id}
                                checked={selectedLayout === layout.id}
                                onChange={(e) =>
                                  setSelectedLayout(e.target.value)
                                }
                                className="radio radio-primary mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-2xl">
                                    {layout.visual}
                                  </span>
                                  <h3 className="font-semibold text-neutral">
                                    {layout.name}
                                  </h3>
                                </div>
                                {selectedLayout === layout.id && (
                                  <p className="text-sm text-neutral/70 mt-2">
                                    {layout.description}
                                  </p>
                                )}
                              </div>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <fieldset className="fieldset text-neutral">
                        <legend className="fieldset-legend">
                          Section List
                          <span className="text-xs text-neutral/60 ml-2">
                            (Optional — click each page to define its sections)
                          </span>
                        </legend>

                        <div className="space-y-2">
                          {pageNames.filter((p) => p.trim() !== "").length >
                          0 ? (
                            pageNames
                              .filter((p) => p.trim() !== "")
                              .map((page, _idx) => {
                                const isExpanded =
                                  expandedSectionPages.includes(page);
                                const hasSections =
                                  !!pageSections[page]?.trim();
                                return (
                                  <div
                                    key={page}
                                    className={`border rounded-lg transition-all ${
                                      isExpanded
                                        ? "border-primary bg-primary/5"
                                        : hasSections
                                          ? "border-success/40 bg-success/5"
                                          : "border-slate-200 hover:border-primary/50"
                                    }`}
                                  >
                                    <button
                                      type="button"
                                      className="w-full flex items-center justify-between px-3 py-2 text-left"
                                      onClick={() =>
                                        setExpandedSectionPages((prev) =>
                                          prev.includes(page)
                                            ? prev.filter((p) => p !== page)
                                            : [...prev, page],
                                        )
                                      }
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className={`text-xs transition-transform ${
                                            isExpanded ? "rotate-90" : ""
                                          }`}
                                        >
                                          ▶
                                        </span>
                                        <span className="text-sm font-medium text-neutral">
                                          {page}
                                        </span>
                                        {hasSections && (
                                          <span className="text-success text-xs">
                                            ✓
                                          </span>
                                        )}
                                      </div>
                                      {!isExpanded && hasSections && (
                                        <span className="text-xs text-neutral/50 truncate max-w-[200px]">
                                          {pageSections[page]}
                                        </span>
                                      )}
                                    </button>
                                    {isExpanded && (
                                      <div className="px-3 pb-3">
                                        <textarea
                                          className="textarea textarea-primary w-full text-sm"
                                          placeholder={`Sections for ${page} e.g. Hero Banner, Features Grid, Testimonials, FAQ`}
                                          rows={3}
                                          value={pageSections[page] || ""}
                                          onChange={(e) =>
                                            setPageSections({
                                              ...pageSections,
                                              [page]: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                          ) : (
                            <p className="text-sm text-neutral/50 py-2">
                              No pages defined in Step 2
                            </p>
                          )}
                        </div>
                      </fieldset>
                    </div>
                  )}
                  {step === 5 && (
                    <div className="flex flex-col gap-2">
                      <fieldset className="fieldset  text-neutral">
                        <legend className="fieldset-legend">
                          UI Component Focus
                          <span className="text-xs text-neutral/60 ml-2">
                            (Specify important components for your design)
                          </span>
                        </legend>

                        <div className="alert alert-info mb-3">
                          <span className="text-xs">
                            Click on badges below to select components, then
                            describe their style and behavior
                          </span>
                        </div>

                        <p className="text-sm text-neutral mb-1 font-medium">
                          Quick Select (click to add):
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {componentSuggestions.map((component) => (
                            <button
                              key={component}
                              type="button"
                              onClick={() => toggleComponent(component)}
                              className={`badge badge-xs cursor-pointer transition-all ${
                                selectedComponents.includes(component)
                                  ? "badge-primary"
                                  : "badge-outline hover:badge-primary"
                              }`}
                            >
                              {selectedComponents.includes(component) && "✓ "}
                              {component}
                            </button>
                          ))}
                        </div>

                        {selectedComponents.length > 0 && (
                          <div className="mt-0">
                            <p className="text-sm text-neutral font-semibold mb-3">
                              Describe your selected components:
                            </p>
                            <div className="space-y-3 overflow-y-auto pr-2">
                              {[...selectedComponents]
                                .reverse()
                                .map((component) => (
                                  <div
                                    key={component}
                                    className="border border-primary/30 rounded-lg p-3 bg-primary/5"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="font-medium text-neutral text-sm">
                                        {component}
                                      </h3>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          toggleComponent(component)
                                        }
                                        className="btn btn-ghost btn-xs text-error"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                    <textarea
                                      className="textarea textarea-primary w-full text-sm"
                                      placeholder={`Describe ${component} style and behavior...\nExample: ${component === "Card" ? "Rectangular cards with subtle borders containing title, date, and description. Minimal decoration, focus on content." : component === "Badge" ? "Small, pill-shaped labels displaying status like 'Done', 'Reading', 'In Progress' with background tint" : `Clean, simple ${component.toLowerCase()} with minimal styling`}`}
                                      rows={3}
                                      value={componentDetails[component] || ""}
                                      onChange={(e) =>
                                        updateComponentDetail(
                                          component,
                                          e.target.value,
                                        )
                                      }
                                    />
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {selectedComponents.length === 0 && (
                          <div className="text-center py-8 text-neutral/50">
                            <p className="text-sm">
                              No components selected yet.
                            </p>
                            <p className="text-xs mt-1">
                              Click badges above to start selecting components
                            </p>
                          </div>
                        )}
                      </fieldset>
                    </div>
                  )}
                  {step === 6 && (
                    <div className="flex flex-col gap-2">
                      <fieldset className="fieldset text-neutral">
                        <legend className="fieldset-legend">
                          Interactivity & Animations
                        </legend>
                        <textarea
                          className="textarea textarea-primary w-full resize-none"
                          placeholder="Any special behavior? e.g. On the blog page, hovering over a post card should slightly enlarge it and show a 'Read More' button"
                          value={interactivityAnimations}
                          onChange={(e) =>
                            setInteractivityAnimations(e.target.value)
                          }
                          rows={10}
                        />
                      </fieldset>
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-3 shrink-0">
                  {step > 1 ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-outline btn-sm"
                      onClick={() => setStep((prev) => prev - 1)}
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {step < 6 ? (
                    <button
                      type="button"
                      className="btn btn-primary btn-outline btn-sm"
                      onClick={() => setStep((prev) => prev + 1)}
                      disabled={!isStepValid()}
                    >
                      Next
                    </button>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-primary font-semibold">
                          ✓ All steps complete!
                        </span>
                      </div>
                      <div className="text-xs text-neutral/70 flex items-center gap-1">
                        <span>Review your requirements</span>
                        <span className="text-primary font-bold">→</span>
                        <span className="text-primary font-medium">
                          Start Generation
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-5 bg-slate-50/50 flex flex-col h-full overflow-y-auto">
              <div className="flex items-center gap-2 text-slate-700 mb-3 shrink-0">
                <Settings className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-bold uppercase tracking-wider text-primary">
                  Your Requirements
                </h2>
              </div>

              <div className="space-y-4 flex-1 mb-4">
                <div className="grid grid-cols-4 gap-2 items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Web Name:
                  </h3>
                  <p className="text-sm text-neutral col-span-3">
                    {webName || <span className="text-neutral/40">-</span>}
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2 items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Web Type:
                  </h3>
                  <p className="text-sm text-neutral col-span-3">
                    {webType || <span className="text-neutral/40">-</span>}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Description:
                  </h3>
                  <p className="text-sm text-neutral whitespace-pre-wrap col-span-3">
                    {webDescription || (
                      <span className="text-neutral/40">-</span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Target Audience:
                  </h3>
                  <p className="text-sm text-neutral col-span-3">
                    {targetAudience || (
                      <span className="text-neutral/40">-</span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Main Action:
                  </h3>
                  <p className="text-sm text-neutral col-span-3">
                    {keyCTA || <span className="text-neutral/40">-</span>}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Sitemap (
                    {getValidPages().length > 4 ? getValidPages().length : 0}{" "}
                    Page
                    {getValidPages().length !== 1 ? "s" : ""}):
                  </h3>
                  {getValidPages().length > 4 ? (
                    <p className="text-sm text-neutral col-span-3">
                      {getValidPages().length > 0 ? (
                        getValidPages().join(" → ")
                      ) : (
                        <span className="text-neutral/40">-</span>
                      )}
                    </p>
                  ) : (
                    <p className="text-sm text-neutral/40 col-span-3">-</p>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Tone & Feel:
                  </h3>
                  <p className="text-sm text-neutral col-span-3">
                    {toneFeel || <span className="text-neutral/40">-</span>}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Colors:
                  </h3>
                  {primaryColor ||
                  secondaryColor ||
                  accentColor ||
                  backgroundColor ? (
                    <div className="flex gap-2 items-center flex-wrap col-span-3">
                      {primaryColor && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: primaryColor }}
                          ></div>
                          <span className="text-xs text-neutral">Primary</span>
                        </div>
                      )}
                      {secondaryColor && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: secondaryColor }}
                          ></div>
                          <span className="text-xs text-neutral">
                            Secondary
                          </span>
                        </div>
                      )}
                      {accentColor && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: accentColor }}
                          ></div>
                          <span className="text-xs text-neutral">Accent</span>
                        </div>
                      )}
                      {backgroundColor && (
                        <div className="flex items-center gap-1">
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: backgroundColor }}
                          ></div>
                          <span className="text-xs text-neutral">
                            Background
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral/40 col-span-3">-</p>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Font:
                  </h3>
                  {fontMode === "dual" ? (
                    <div className="col-span-3 space-y-1">
                      <p className="text-sm text-neutral">
                        <span className="font-medium">Heading:</span>{" "}
                        {headingFont || (
                          <span className="text-neutral/40">-</span>
                        )}
                      </p>
                      <p className="text-sm text-neutral">
                        <span className="font-medium">Body:</span>{" "}
                        {bodyFont || <span className="text-neutral/40">-</span>}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral col-span-3">
                      {fontPreference || (
                        <span className="text-neutral/40">-</span>
                      )}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 items-center">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Layout:
                  </h3>
                  <p className="text-sm text-neutral col-span-3">
                    {selectedLayout ? (
                      layoutOptions.find((l) => l.id === selectedLayout)?.name
                    ) : (
                      <span className="text-neutral/40">-</span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Page Sections:
                  </h3>
                  {Object.keys(pageSections).length > 0 ? (
                    <div className="col-span-3">
                      {Object.entries(pageSections).map(
                        ([page, sections]) =>
                          sections && (
                            <p key={page} className="text-sm text-neutral">
                              <strong>{page}:</strong> {sections}
                            </p>
                          ),
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral/40 col-span-3">-</p>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Components:
                  </h3>
                  {selectedComponents.length > 0 ? (
                    <div className="space-y-2 col-span-3">
                      {[...selectedComponents].reverse().map((comp) => (
                        <div
                          key={comp}
                          className="bg-white p-2 rounded border border-primary/20"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="badge badge-primary badge-sm">
                              {comp}
                            </span>
                          </div>
                          {componentDetails[comp] && (
                            <p className="text-xs text-neutral/80 mt-1 pl-2 border-l-2 border-primary/30">
                              {componentDetails[comp]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-neutral/40 col-span-3">-</p>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-2 items-start">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary text-end">
                    Interactivity & Animations:
                  </h3>
                  <p className="text-sm text-neutral whitespace-pre-wrap col-span-3">
                    {interactivityAnimations || (
                      <span className="text-neutral/40">-</span>
                    )}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="btn shadow-lg transition-all transform hover:-translate-y-0.5 hover:shadow-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center gap-2 disabled:opacity-50 rounded-lg disabled:cursor-not-allowed"
                onClick={handleStartGeneration}
                disabled={step < 5}
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:scale-x-100 scale-x-0 transition-transform origin-left duration-500"></div>
                <Zap className="w-4 h-4 fill-current" />
                <span>Start Generation</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
