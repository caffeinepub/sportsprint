# SportsPrint

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Home/landing page with hero section, services overview, featured clubs, and featured products
- Club Locker Room pages: each club has its own branded page showing ~20 products in their club colors/branding, with prices, sizes, and colour options
- Stock Shop page: general public stock catalogue with all available products, filterable by category
- Product detail view with size/colour selector, price, and add-to-cart
- Admin area: ability to manage clubs and their product catalogues (add/edit/remove clubs and products)
- Backend: data model for clubs (name, logo, branding colours, description), products (name, description, price, sizes, colours, images, category, club association), and general stock products

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: Define data types for Club and Product. Implement CRUD operations for clubs and products. Support filtering products by club or by general stock.
2. Frontend: Landing page with hero, services section (Club Locker Rooms + Custom Printing cards), featured clubs band, featured products grid
3. Frontend: Club Locker Room listing page (search/browse clubs)
4. Frontend: Individual Club Locker Room page showing club branding + products
5. Frontend: Stock Shop page with full product catalogue
6. Frontend: Admin pages for managing clubs and products (protected by authorization)
7. Wire authorization for admin routes
