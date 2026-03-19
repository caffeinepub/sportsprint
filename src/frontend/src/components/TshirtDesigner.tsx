import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Trash2, Upload } from "lucide-react";
import { useCallback, useRef, useState } from "react";

const SHIRT_COLORS = [
  { label: "Blue", value: "blue", hex: "#1E6BFF" },
  { label: "Red", value: "red", hex: "#E63946" },
  { label: "Yellow", value: "yellow", hex: "#FFD600" },
  { label: "White", value: "white", hex: "#FFFFFF" },
];

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

// The printable area of the shirt as a percentage of the container
const PRINT_AREA = { left: 0.22, top: 0.2, width: 0.56, height: 0.6 };

export function TshirtDesigner() {
  const [tshirtColor, setTshirtColor] = useState("blue");
  const [view, setView] = useState<"front" | "back">("front");
  const [artworks, setArtworks] = useState<ArtworkItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragging, setDragging] = useState<DragState>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const selectedArtwork = artworks.find((a) => a.id === selectedId) ?? null;

  const imgSrc = `/assets/generated/tshirt-${tshirtColor}-${view}-transparent.dim_600x600.png`;

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
            { id, dataUrl, x: 38, y: 28, scale: 1 },
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
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
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

  const handleCanvasMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const paW = PRINT_AREA.width * rect.width;
      const paH = PRINT_AREA.height * rect.height;
      const dx = e.clientX - dragging.startX;
      const dy = e.clientY - dragging.startY;
      const dxPct = (dx / paW) * 100;
      const dyPct = (dy / paH) * 100;
      const newX = Math.max(0, Math.min(80, dragging.origX + dxPct));
      const newY = Math.max(0, Math.min(80, dragging.origY + dyPct));
      setArtworks((prev) =>
        prev.map((a) =>
          a.id === dragging.artworkId ? { ...a, x: newX, y: newY } : a,
        ),
      );
    },
    [dragging],
  );

  const handleCanvasTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const paW = PRINT_AREA.width * rect.width;
      const paH = PRINT_AREA.height * rect.height;
      const dx = touch.clientX - dragging.startX;
      const dy = touch.clientY - dragging.startY;
      const dxPct = (dx / paW) * 100;
      const dyPct = (dy / paH) * 100;
      const newX = Math.max(0, Math.min(80, dragging.origX + dxPct));
      const newY = Math.max(0, Math.min(80, dragging.origY + dyPct));
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

  const artworkSize = 80;

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
          {/* Canvas */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div
              ref={canvasRef}
              className="relative select-none"
              style={{
                width: 300,
                height: 300,
                cursor: dragging ? "grabbing" : "default",
                touchAction: "none",
              }}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
              onTouchMove={handleCanvasTouchMove}
              onTouchEnd={stopDragging}
              data-ocid="tshirt_designer.canvas_target"
            >
              {/* T-shirt photo */}
              <img
                src={imgSrc}
                alt="T-shirt"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                draggable={false}
              />

              {/* Print area — artworks live here */}
              <div
                className="absolute"
                style={{
                  left: `${PRINT_AREA.left * 100}%`,
                  top: `${PRINT_AREA.top * 100}%`,
                  width: `${PRINT_AREA.width * 100}%`,
                  height: `${PRINT_AREA.height * 100}%`,
                  overflow: "hidden",
                }}
              >
                {artworks.map((art, i) => {
                  const w = artworkSize * art.scale;
                  const isSelected = art.id === selectedId;
                  return (
                    <div
                      key={art.id}
                      style={{
                        position: "absolute",
                        left: `${art.x}%`,
                        top: `${art.y}%`,
                        width: w,
                        height: w,
                        cursor: "grab",
                        outline: isSelected ? "2px dashed #6366f1" : "none",
                        outlineOffset: 2,
                      }}
                      onMouseDown={(e) => handleArtworkMouseDown(e, art)}
                      onTouchStart={(e) => handleArtworkTouchStart(e, art)}
                      data-ocid={`tshirt_designer.item.${i + 1}`}
                    >
                      <img
                        src={art.dataUrl}
                        alt={`Artwork ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          pointerEvents: "none",
                        }}
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
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
                      backgroundColor: c.hex,
                      borderColor:
                        tshirtColor === c.value ? "#6366f1" : "#d1d5db",
                      boxShadow:
                        tshirtColor === c.value
                          ? "0 0 0 3px #6366f133"
                          : undefined,
                    }}
                    data-ocid="tshirt_designer.toggle"
                  >
                    {c.value === "white" && (
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
                      data-ocid={`tshirt_designer.list_item.${i + 1}`}
                    >
                      <img
                        src={art.dataUrl}
                        alt={`Artwork ${i + 1}`}
                        className="w-10 h-10 object-contain rounded border border-border bg-muted"
                      />
                      <span className="flex-1 text-sm font-medium text-left">
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
