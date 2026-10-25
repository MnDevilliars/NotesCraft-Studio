# 📱 NotesCraft Studio — Mobile-First Revision Notes & PDF Engine

> Transform simple text markup into gorgeous, book-quality mobile revision sheets with automatic vector graphs, realistic math equations, and zero-cut PDF export.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Mobile First](https://img.shields.io/badge/Layout-Mobile%209%3A16-success)](#)
[![Zero-Cut PDF](https://img.shields.io/badge/PDF-Zero--Cut%20Export-red?logo=adobe-acrobat-reader&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### ✨ Key Highlights

- 📱 **Mobile-First Design (600 × 1067 px)**: Designed specifically for smartphones — read full chapters without zooming.
- 📐 **Realistic Math & Formula Engine**: Automatic stacked vinculum fractions (`V1/T1 = V2/T2`), exponents (`r^3`), and centered formula chips.
- 📈 **Built-in SVG Vector Graphs**: Origin lines, hyperbolas, parallel curves, and Charles' law intercept graphs rendered dynamically.
- 🛡️ **Zero-Cut Block Pagination**: Atomic blocks (graphs, tables, PYQ boxes) never get cut in half across pages.
- 🖨️ **Multi-Format High-Res Export**: 1-click export to Mobile PDF, 1200px PNG ZIP bundle, or sharp vector print.
- 👨‍🏫 **Teacher Branding**: Custom channel logo, WhatsApp teacher contact, and dynamic page numbering pinned to every sheet.

---

## 🚀 Getting Started

The project is built with **React** and **Vite**, using a custom **Vanilla CSS** design system for realistic lined notebook paper, authentic handwriting fonts, and print-ready pagination.

### Run Locally:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🎨 Key Features

1. **Realistic Hand-drawn Notebook Aesthetic**:
   - Plain white paper or ruled paper background with margin and line textures.
   - Google Fonts handwriting typography: *Patrick Hand*, *Kalam*, *Caveat*.
   - Teacher branding with custom logo image, channel badge, and WhatsApp contact info in the page footer.
   - Mobile single-column flow: Theory on top, graphs, tables, and exam boxes below.

2. **Multi-Subject Ready**:
   - Pre-loaded with high-yield exam notes matching 2017–2026 board questions:
     - **Physical Science**: Chapter 2 (*Behaviour of Gases* — Boyle's, Charles', Gay-Lussac, Avogadro, Combined Law)
     - **Life Science**: Chapter 1 (*Control & Coordination* — Plant & Animal Hormones, Reflex Arc)
     - **History**: Chapter 2 (*Reform: Characteristics and Observations* — 19th Century Bengal Renaissance)
     - **Geography**: Chapter 1 (*Exogenetic Processes & Landforms* — River & Glacier Action)
     - **Mathematics**: Mensuration (*Right Circular Cylinder & Cone Formulas*)

3. **Domain-Specific Markdown (DSL) Parser**:
   - Write notes in a simple, expressive text format.
   - Live real-time parsing and preview.

4. **Interactive SVG Graph & Ray Diagram Engine**:
   - `@graph`:
     - `@graph hyperbola`: Rectangular hyperbola (Isothermal curves, $P$ vs $V$).
     - `@graph horizontal`: Lines parallel to the x-axis ($PV$ vs $P$).
     - `@graph origin`: Lines passing through $(0,0)$ ($V$ vs $T(K)$, $P$ vs $1/V$).
     - `@graph intercept`: Lines with negative x-intercept and positive y-intercept (Charles' Law $V$ vs $\theta^\circ\text{C}$ with $-273^\circ\text{C}$).
   - `@diagram` (Vector optics ray diagrams, 2 per row, zero-cut pagination):
     - `concave_mirror`: Object positions (beyond C, at C, between C & F, at F, between F & P).
     - `convex_mirror`: Object in front of mirror (virtual, erect, diminished image).
     - `convex_lens`: Object positions (beyond 2F, at 2F, between F & 2F, at F, between F & O).
     - `concave_lens`: Object in front of lens.
     - `glass_slab`: Refraction showing lateral shift $d$ and parallel emergent ray.
     - `prism`: Refraction showing angle of incidence $i$, emergence $e$, and deviation $\delta = i + e - A$.
     - `prism_dispersion`: Dispersion of white light into VIBGYOR spectrum.

5. **Madhyamik Important & Remember Cards**:
   - Highlights previous year board questions with clean, high-scoring answers.
   - Dedicated exam summary box for last-minute revision.
   - `@must` and `@board` exam boxes with year tags.

6. **Customizable Teacher & Channel Branding**:
   - Change channel/teacher name, logo image, and offline class phone numbers via the **Branding** modal.

7. **AI Prompt Generator for ANY Subject**:
   - Click the **AI Prompt** button in the navbar to generate a pre-calibrated board prompt for ChatGPT, Gemini, or Claude. Paste textbook excerpts or syllabus topics to generate ready-to-paste DSL notes for any chapter in seconds!

8. **One-Click High-Quality PDF / Print Export**:
   - Configured with `@media print` rules and html-to-image pipeline ensuring each notebook page prints cleanly on a separate page without cropped borders or displaced lines.

---

## 📝 Syntax Cheatsheet

```text
@chapter Chapter N: Name   (Once at the top)
=== PAGE ===
@title Page Title

@left
# 1. Sub-heading Title
- Short bullet point (max 15 words)
> Official law or definition box statement
= Formula chip (e.g. V1/T1 = V2/T2)
! Note box or teacher tip

@right
@graph origin | V vs T(K) | T(K) | V | P = constant
@graph hyperbola | P vs V | V | P | Isothermal curve

@diagram concave_mirror_beyond_c | Concave Mirror (Beyond C) | Real, inverted, diminished between C & F
@diagram convex_lens_between_f_2f | Convex Lens (Between F & 2F) | Real, inverted, magnified beyond 2F
@diagram glass_slab | Refraction through Glass Slab | Lateral displacement d
@diagram prism_dispersion | Dispersion of White Light | Spectrum: VIBGYOR

@table Comparison Table
| Header 1 | Header 2 | Header 3 |
| Value 1  | Value 2  | Value 3  |

? Question asked in board exams? => Direct concise answer
? Why is moist air lighter than dry air? => H₂O (18) replaces N₂ (28) and O₂ (32)

@must
- PV = constant at constant temperature
- Absolute zero is −273°C = 0 K

@board
Nature of P vs 1/V graph? => Straight line passing through origin | 2017, 2022

@remember Core formulas and quick memory tricks for the exam.

Inline formatting:
- ==highlighted text==
- **bold text**
- V1/T1 = V2/T2 (Automatic vertical math fraction)
- {numerator/denominator} (Explicit stacked fraction)
- r^3 (Superscript power)
```
