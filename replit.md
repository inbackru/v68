# Overview

InBack/Clickback is a Flask-based real estate platform specializing in cashback services for new construction properties in the Krasnodar region, expanding across Krasnodarsky Krai and the Republic of Adygea. It connects buyers and developers, offers property listings, streamlines application processes, and integrates CRM tools. The platform provides unique cashback incentives, an intuitive user experience, intelligent property search with interactive maps, residential complex comparisons, user favorites, a manager dashboard for client and cashback tracking, and robust notification and document generation capabilities. The project aims to capture a significant market share by offering a compelling value proposition to both buyers and developers in the new construction segment.

# User Preferences

Preferred communication style: Simple, everyday language.

**Design Preferences:**
- Brand color: rgb(0 136 204) = #0088CC - consistently applied across entire dashboard
- No purple/violet/fuchsia colors in UI

# Recent Changes

**November 19, 2025 - Dynamic Tooltips & Border Removal Complete**
- **Dynamic Title Tooltips**: Implemented context-aware tooltips that change based on state ("Добавить в избранное" → "Удалить из избранного" when favorited)
- **Tooltip Updates**: Added title changes in addFavoriteVisual(), removeFavoriteVisual(), updateFavoritesUI(), and updateComplexFavoritesUI()
- **Comparison Border Fix**: Removed `border-blue-500` from active comparison buttons - icons now display clean without blue outlines
- **Circular Icon Consistency**: Fixed remaining `rounded-md` → `rounded-full` in template JavaScript templates (2 instances)
- **Files Modified**: static/js/favorites.js (4 locations), static/js/comparison.js (updateCompareButton), templates/properties.html (2 template instances)

**November 19, 2025 - Filter Value Mapping & Developer/District Modal Counting Fix**
- **"Чистовая" Filter Fixed**: Changed renovation checkbox value from incorrect `with_renovation` to correct `fine_finish` matching database field `renovation_type` - now shows 138 objects instead of 0
- **Developer & District Modal Counting**: Added reading of developer and district checkboxes in updateModalFilterCount() - modal button counter now updates when selecting developers/districts
- **Complete Modal Coverage**: updateModalFilterCount() now reads ALL filter types from modal (developers, districts, building_released, completion, floor_options, features, renovation, object_class)

**November 19, 2025 - Modal Checkbox Counter Fix**
- **Critical Fix**: updateModalFilterCount() now reads ALL modal checkboxes (building_released, completion, floor_options, features, renovation, object_class) before calculating count
- **Bug Resolved**: Modal button counter now updates immediately when clicking checkboxes like "Сданный дом" (previously ignored modal checkbox changes)
- **Implementation**: Added DOM queries for all checkbox groups within #filters-modal, properly merging with propertyFiltersState before API call

**November 19, 2025 - District Taxonomy & Multi-City Filtering System**
- **District Taxonomy**: Added `district_type` column (`admin` | `micro`) to District model for hierarchical classification
- **Sochi Special Filtering**: Configured /api/districts to return only 4 administrative districts for Sochi (city_id=2), matching Yandex.Nedvizhimost UX
- **Multi-City Preservation**: Other cities (Krasnodar, Anapa, etc.) continue showing all districts (admin + micro)
- **Developer Filtering Fix**: Removed server-rendered developer lists from templates; all 5 UI containers now populated via AJAX from /api/developers?city_id
- **Modal Counter Sync**: Fixed updateModalFilterCount() using structuredClone() for deep state cloning and URLSearchParams for proper array serialization (rooms, completion, etc.)
- **Dynamic Developer Map**: window.developersMap now refreshes from AJAX responses, eliminating stale cross-city data
- **Database Update**: Marked Sochi's Адлерский, Лазаревский, Хостинский, Центральный as district_type='admin'

**November 19, 2025 - UI/UX Improvements & Icon Unification**
- Fixed critical district filtering bug: Added `<meta name="city-id">` tag to properties.html template for proper city-specific district loading
- Increased modal rounded corners from `rounded-lg` to `rounded-2xl` for polished design
- Fixed nested scroll in developer search modal by removing `max-h-48 overflow-y-auto` from list container
- Unified all icon colors to brand blue (#0088CC), removing purple/pink/indigo variants from filter preview icons and presentation buttons

# System Architecture

## Frontend

The frontend utilizes server-side rendered HTML with Jinja2 and CDN-based TailwindCSS for a mobile-first, responsive design. Interactivity is handled by modular vanilla JavaScript, enabling features like smart search, real-time filtering, Yandex Maps integration, property comparison, and PDF generation. Key UI/UX features include AJAX-powered sorting/filtering, interactive map pages, mobile-optimized search, saved searches, dynamic results, property alerts, and a city selector. The dashboard features gradient stat cards, enhanced loading states, a collapsible sidebar, real-time badge counters, and unified tabs for Favorites, Saved Searches, and Comparison.

## Backend

Built with Flask, the backend employs an MVC pattern with blueprints and SQLAlchemy with PostgreSQL. It includes Flask-Login for session management and RBAC (Regular Users, Managers, Admins), robust security, and custom parsing for Russian address formats. The system supports phone verification, manager-to-client presentation delivery, multi-city data management, and city-aware data filtering. Performance is optimized with Flask-Caching and batch API endpoints. A key feature is the intelligent automatic detection system for sold properties, marking them as inactive and notifying users when properties disappear from external data sources.

## Data Storage

PostgreSQL, managed via SQLAlchemy, serves as the primary database, storing Users, Managers, Properties, Residential Complexes, Developers, Marketing Materials, transactional records, and search analytics.

## Authentication & Authorization

The system supports Regular Users, Managers, and Admins through a unified Flask-Login system with dynamic user model loading and extended session duration.

## Intelligent Address Parsing & Universal Multi-City Smart Search System

This system leverages DaData.ru for address normalization and Yandex Maps Geocoder API for geocoding. It features auto-enrichment for new properties, optimized batch processing, smart caching, and city-aware address suggestions. The Universal Smart Search dynamically loads all active cities from the database, offering scalable architecture for new cities. It includes intelligent city detection, automatic city switching based on search queries, and smart suggestions covering cities, residential complexes, districts, and streets, similar to major real estate portals.

## Balance Management System

A production-ready system with `UserBalance`, `BalanceTransaction`, and `WithdrawalRequest` models, including a service layer for credit/debit operations, withdrawal workflows, dedicated API endpoints, UI integration, auto-cashback, and notifications. All financial amounts use Decimal precision.

## Comprehensive SEO Optimization

The platform implements production-ready multi-city SEO, including Canonical URLs, City-Aware Meta Tags, JSON-LD Structured Data (schema.org), Regional Variations, Comprehensive Sitemap, robots.txt Configuration, HSTS Headers, and Yandex.Metrika analytics.

## Parser Integration System

A universal service (`ParserImportService`) for automatic data import from external parsers, supporting full hierarchy (Developer → ЖК → Building → Property) with automatic SEO-friendly Latin slug generation. It includes smart update logic to prevent duplicates, multi-city support, and efficient batch processing for large datasets.

## Comprehensive District & Neighborhood System

The system includes a full reference catalog of districts and neighborhoods with hierarchical taxonomy support. The `District` model features a `district_type` column (`admin` | `micro`) to distinguish administrative districts from microdistricts. API endpoint `/api/districts/<city_id>` implements conditional filtering: for Sochi (city_id=2), returns only 4 administrative districts (Адлерский, Лазаревский, Хостинский, Центральный) matching Yandex.Nedvizhimost UX; for other cities, returns all districts. Properties link to authoritative District table records with additional text fields for fallback search. Search suggestions include districts with property counts. All developer filtering is city-scoped via `/api/developers?city_id` with AJAX-driven UI population.

# External Dependencies

## Third-Party APIs

-   **SendGrid**: Email sending.
-   **OpenAI**: Smart search and content generation.
-   **Telegram Bot API**: User notifications and communication.
-   **Yandex Maps API**: Interactive maps, geocoding, and location visualization.
-   **DaData.ru**: Address normalization, suggestions, and geocoding.
-   **SMS.ru, SMSC.ru**: Russian SMS services for phone verification.
-   **Google Analytics**: User behavior tracking.
-   **LaunchDarkly**: Feature flagging.
-   **Chaport**: Chat widget.
-   **reCAPTCHA**: Spam and bot prevention.
-   **ipwho.is**: IP-based city detection.

## Web Scraping Infrastructure

-   `selenium`, `playwright`, `beautifulsoup4`, `undetected-chromedriver`: Used for automated data collection.

## PDF Generation

-   `weasyprint`, `reportlab`: Used for generating property detail sheets, comparison reports, and cashback calculations.

## Image Processing

-   `Pillow`: Used for image resizing, compression, WebP conversion, and QR code generation.