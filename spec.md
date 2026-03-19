# SportsPrint

## Current State
The Club Setup page (ClubSetup.tsx) has branding controls, a club preview card, and a product management table. A previous version had a basic t-shirt mockup preview for artwork uploads, but the current file does not include an artwork/t-shirt designer section.

## Requested Changes (Diff)

### Add
- A `TshirtDesigner` section on the Club Setup page below the branding card
- 4 t-shirt colour swatches: Blue (#1E6BFF), Red (#E63946), Yellow (#FFD600), White (#FFFFFF)
- Front / Back toggle to switch between front and back t-shirt views
- Multiple artwork file uploads (each stored as a data URL in local state)
- Each uploaded artwork is displayed on the t-shirt canvas and can be dragged to any position
- Artwork items listed in a sidebar with remove buttons
- T-shirt rendered using an SVG path clipped to a shirt shape, filled with the chosen colour

### Modify
- ClubSetup.tsx: add the new TshirtDesigner card section

### Remove
- Nothing removed

## Implementation Plan
1. Create a `TshirtDesigner` React component inside ClubSetup.tsx
2. State: `tshirtColor`, `view` (front|back), `artworks[]` (id, dataUrl, x, y, scale)
3. SVG t-shirt outline as a clip path; fill rect coloured with chosen colour
4. Each artwork rendered as a `<image>` element inside the SVG, draggable via mouse/touch events
5. Colour swatch buttons (4 options)
6. Front/Back toggle buttons
7. File input for adding artworks; display thumbnail list with delete buttons
8. Drag logic: onMouseDown sets active artwork id + offset, onMouseMove updates x/y, onMouseUp clears
