import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Trash2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const SHIRT_COLORS = [
  { label: "Blue", value: "#1E6BFF" },
  { label: "Red", value: "#E63946" },
  { label: "Yellow", value: "#FFD600" },
  { label: "White", value: "#FFFFFF" },
];

const SHIRT_PATH =
  "M 60,40 L 30,30 L 0,70 L 40,85 L 40,320 L 260,320 L 260,85 L 300,70 L 270,30 L 240,40 Q 220,10 180,5 Q 150,0 120,5 Q 80,10 60,40 Z";

type ArtworkItem = {
  id: string;
  dataUrl: string;
  x: number;
  y: number;
  scale: number;
};

type DragState = {
  artworkId: string;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
} | null;

export function TshirtDesigner() {
  const [tshirtColor, setTshirtColor] = useState("#1E6BFF");
  const [view, setView] = useState<"front" | "back">("front");
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<DragState>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const selectedArtwork = artworks.find((a) => a.id === selectedId) ?? null;

  const handleFilesSelected = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const dataUrl = ev.target?.result as string;
          const id = Math.random().toString(36).slice(2);
          setArtworks((prev) => [
            ...prev,
            { id, dataUrl, x: 110, y: 120, scale: 1 },
          ]);
          setSelectedId(id);
        };
        reader.readAsDataURL(file);
      }
      e.target.value = "";
    },
    [],
  );

  const handleArtworkMouseDown = useCallback(
    (e: React.MouseEvent, art: ArtworkItem) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedId(art.id);
      setDragging({
        artworkId: art.id,
        startX: e.clientX,
        startY: e.clientY,
        origX: art.x,
        origY: art.y,
      });
    },
    [],
  );

  const handleArtworkTouchStart = useCallback(
    (e: React.TouchEvent, art: ArtworkItem) => {
      e.stopPropagation();
      const touch = e.touches[0];
      setSelectedId(art.id);
      setDragging({
        artworkId: art.id,
        startX: touch.clientX,
        startY: touch.clientY,
        origX: art.x,
        origY: art.y,
      });
    },
    [],
  );

  const handleSvgMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const art = artworks.find((a) => a.id === dragging.artworkId);
      if (!art) return;
      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;
      const rect = svgRef.current?.getBoundingClientRect();
      const scaleX = rect ? 300 / rect.width : 1;
      const scaleY = rect ? 340 / rect.height : 1;
      const newX = Math.max(0, Math.min(220, dragging.origX + dx * scaleX));
      const newY = Math.max(0, Math.min(260, dragging.origY + dy * scaleY));
      setArtworks((prev) =>
        prev.map((a) =>
          a.id === dragging.artworkId ? { ...a, x: newX, y: newY } : a,
        ),
      );
    },
    [dragging, artworks],
  );

  const handleSvgTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = svgRef.current?.getBoundingClientRect();
      const scaleX = rect ? 300 / rect.width : 1;
      const scaleY = rect ? 340 / rect.height : 1;
      const dx = touch.clientX - dragging.startX;
      const dy = touch.clientY - dragging.startY;
      const newX = Math.max(0, Math.min(220, dragging.origX + dx * scaleX));
      const newY = Math.max(0, Math.min(260, dragging.origY + dy * scaleY));
      setArtworks((prev) =>
        prev.map((a) =>
          a.id === dragging.artworkId ? { ...a, x: newX, y: newY } : a,
        ),
      );
    },
    [dragging],
  );

  const stopDragging = useCallback(() => setDragging(null), []);

  const removeArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateScale = (id: string, scale: number) => {
    setArtworks((prev) => prev.map((a) => (a.id === id ? { ...a, scale } : a)));
  };

  return (
    <Card data-ocid="tshirt_designer.card">
      <CardHeader>
        <CardTitle className="font-heading font-bold uppercase tracking-tight text-base">
          T-Shirt Designer
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upload artwork, pick a colour, then drag it into position on the
          shirt.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SVG Canvas */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <svg
              ref={svgRef}
              viewBox="0 0 300 340"
              width="300"
              height="340"
              style={{
                touchAction: "none",
                cursor: dragging ? "grabbing" : "default",
              }}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onTouchMove={handleSvgTouchMove}
              onTouchEnd={stopDragging}
              aria-label="T-shirt design canvas"
              data-ocid="tshirt_designer.canvas_target"
            >
              <title>T-shirt design canvas</title>
              <defs>
                <clipPath id="tshirt-clip">
                  <path d={SHIRT_PATH} />
                </clipPath>
              </defs>

              {/* Fill */}
              <rect
                x="0"
                y="0"
                width="300"
                height="340"
                fill={tshirtColor}
                clipPath="url(#tshirt-clip)"
              />

              {/* Artworks */}
              {artworks.map((art) => {
                const w = 80 * art.scale;
                const h = 80 * art.scale;
                const isSelected = art.id === selectedId;
                return (
                  <g key={art.id}>
                    {isSelected && (
                      <rect
                        x={art.x - 2}
                        y={art.y - 2}
                        width={w + 4}
                        height={h + 4}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                        clipPath="url(#tshirt-clip)"
                      />
                    )}
                    <image
                      href={art.dataUrl}
                      x={art.x}
                      y={art.y}
                      width={w}
                      height={h}
                      clipPath="url(#tshirt-clip)"
                      style={{ cursor: "grab" }}
                      onMouseDown={(e) => handleArtworkMouseDown(e, art)}
                      onTouchStart={(e) => handleArtworkTouchStart(e, art)}
                    />
                  </g>
                );
              })}

              {/* Shirt outline */}
              <path
                d={SHIRT_PATH}
                fill="none"
                stroke={tshirtColor === "#FFFFFF" ? "#aaa" : "rgba(0,0,0,0.25)"}
                strokeWidth="1.5"
              />

              {/* Back label */}
              {view === "back" && (
                <text
                  x="150"
                  y="55"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={tshirtColor === "#FFFFFF" ? "#aaa" : "rgba(0,0,0,0.3)"}
                  fontFamily="sans-serif"
                  letterSpacing="4"
                >
                  BACK
                </text>
              )}
            </svg>
            <p className="text-xs text-muted-foreground">
              Drag artwork to reposition
            </p>
          </div>

          {/* Controls */}
          <div className="flex-1 space-y-6">
            {/* Colour picker */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3">
                T-Shirt Colour
              </p>
              <div className="flex gap-3">
                {SHIRT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    onClick={() => setTshirtColor(c.value)}
                    className="relative rounded-full border-2 transition-all"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: c.value,
                      borderColor:
                        tshirtColor === c.value ? "#6366f1" : "#d1d5db",
                      boxShadow:
                        tshirtColor === c.value
                          ? "0 0 0 3px #6366f133"
                          : undefined,
                    }}
                    data-ocid="tshirt_designer.toggle"
                  >
                    {c.value === "#FFFFFF" && (
                      <span className="absolute inset-0 rounded-full border border-gray-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Front / Back toggle */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3">
                View
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={view === "front" ? "default" : "outline"}
                  onClick={() => setView("front")}
                  className="text-xs uppercase tracking-widest font-bold"
                  data-ocid="tshirt_designer.tab"
                >
                  Front
                </Button>
                <Button
                  size="sm"
                  variant={view === "back" ? "default" : "outline"}
                  onClick={() => setView("back")}
                  className="text-xs uppercase tracking-widest font-bold"
                  data-ocid="tshirt_designer.tab"
                >
                  Back
                </Button>
              </div>
            </div>

            {/* Upload */}
            <div>
              <p className="text-xs uppercase tracking-widest font-bold mb-3">
                Upload Artwork
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-border rounded-lg p-5 flex flex-col items-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                data-ocid="tshirt_designer.upload_button"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">
                  Click to upload artwork
                </span>
                <span className="text-xs">
                  PNG, JPG, SVG — multiple allowed
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFilesSelected}
              />
            </div>

            {/* Artwork list */}
            {artworks.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-3">
                  Artworks ({artworks.length})
                </p>
                <div className="space-y-2">
                  {artworks.map((art, i) => (
                    <button
                      type="button"
                      key={art.id}
                      onClick={() => setSelectedId(art.id)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg border transition-colors ${
                        selectedId === art.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40"
                      }`}
                      data-ocid={`tshirt_designer.item.${i + 1}`}
                    >
                      <img
                        src={art.dataUrl}
                        alt={`Artwork ${i + 1}`}
                        className="w-10 h-10 object-contain rounded border border-border bg-muted"
                      />
                      <span className="flex-1 text-sm font-medium">
                        Artwork {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeArtwork(art.id);
                        }}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                        data-ocid={`tshirt_designer.delete_button.${i + 1}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scale slider for selected artwork */}
            {selectedArtwork && (
              <div data-ocid="tshirt_designer.panel">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-widest font-bold">
                    Scale
                  </p>
                  <span className="text-xs text-muted-foreground font-mono">
                    {selectedArtwork.scale.toFixed(1)}×
                  </span>
                </div>
                <Slider
                  min={0.5}
                  max={3}
                  step={0.1}
                  value={[selectedArtwork.scale]}
                  onValueChange={([v]) => updateScale(selectedArtwork.id, v)}
                  data-ocid="tshirt_designer.toggle"
                />
              </div>
            )}

            {artworks.length === 0 && (
              <p className="text-xs text-muted-foreground italic">
                No artwork uploaded yet. Upload an image to start designing.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
