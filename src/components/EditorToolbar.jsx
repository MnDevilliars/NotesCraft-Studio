import React, { useState, useRef, useEffect } from 'react';
import {
  FilePlus,
  Heading,
  List,
  Bookmark,
  Equal,
  AlertCircle,
  Table,
  LineChart,
  HelpCircle,
  Heart,
  Highlighter,
  Bold,
  Divide,
  Compass,
  ChevronDown,
  Sun,
  Layers,
  Sparkles
} from 'lucide-react';

export const DIAGRAM_SNIPPETS = [
  {
    category: 'Concave Mirror',
    items: [
      {
        label: 'Beyond C',
        type: 'concave_mirror_beyond_c',
        title: 'Concave Mirror: Object Beyond C',
        caption: 'Image: Real, inverted, diminished (between C & F)',
        snippet: '\n@diagram concave_mirror_beyond_c | Concave Mirror: Object Beyond C | Image: Real, inverted, diminished (between C & F)\n'
      },
      {
        label: 'At C',
        type: 'concave_mirror_at_c',
        title: 'Concave Mirror: Object at C',
        caption: 'Image: Real, inverted, same size (at C)',
        snippet: '\n@diagram concave_mirror_at_c | Concave Mirror: Object at C | Image: Real, inverted, same size (at C)\n'
      },
      {
        label: 'Between C & F',
        type: 'concave_mirror_between_c_f',
        title: 'Concave Mirror: Object Between C & F',
        caption: 'Image: Real, inverted, magnified (beyond C)',
        snippet: '\n@diagram concave_mirror_between_c_f | Concave Mirror: Object Between C & F | Image: Real, inverted, magnified (beyond C)\n'
      },
      {
        label: 'At F',
        type: 'concave_mirror_at_f',
        title: 'Concave Mirror: Object at Focus (F)',
        caption: 'Image: Formed at infinity (parallel reflected rays)',
        snippet: '\n@diagram concave_mirror_at_f | Concave Mirror: Object at Focus (F) | Image: Formed at infinity (parallel reflected rays)\n'
      },
      {
        label: 'Between F & P',
        type: 'concave_mirror_between_f_p',
        title: 'Concave Mirror: Object Between F & P',
        caption: 'Image: Virtual, erect, magnified (behind mirror)',
        snippet: '\n@diagram concave_mirror_between_f_p | Concave Mirror: Object Between F & P | Image: Virtual, erect, magnified (behind mirror)\n'
      }
    ]
  },
  {
    category: 'Convex Mirror',
    items: [
      {
        label: 'In Front of Mirror',
        type: 'convex_mirror',
        title: 'Convex Mirror: Object in Front',
        caption: 'Image: Virtual, erect, diminished (behind mirror between P & F)',
        snippet: '\n@diagram convex_mirror | Convex Mirror: Object in Front | Image: Virtual, erect, diminished (behind mirror between P & F)\n'
      }
    ]
  },
  {
    category: 'Convex Lens',
    items: [
      {
        label: 'Beyond 2F',
        type: 'convex_lens_beyond_2f',
        title: 'Convex Lens: Object Beyond 2F',
        caption: 'Image: Real, inverted, diminished (between F₂ & 2F₂)',
        snippet: '\n@diagram convex_lens_beyond_2f | Convex Lens: Object Beyond 2F | Image: Real, inverted, diminished (between F₂ & 2F₂)\n'
      },
      {
        label: 'At 2F',
        type: 'convex_lens_at_2f',
        title: 'Convex Lens: Object at 2F',
        caption: 'Image: Real, inverted, same size (at 2F₂)',
        snippet: '\n@diagram convex_lens_at_2f | Convex Lens: Object at 2F | Image: Real, inverted, same size (at 2F₂)\n'
      },
      {
        label: 'Between F & 2F',
        type: 'convex_lens_between_f_2f',
        title: 'Convex Lens: Object Between F & 2F',
        caption: 'Image: Real, inverted, magnified (beyond 2F₂)',
        snippet: '\n@diagram convex_lens_between_f_2f | Convex Lens: Object Between F & 2F | Image: Real, inverted, magnified (beyond 2F₂)\n'
      },
      {
        label: 'At F',
        type: 'convex_lens_at_f',
        title: 'Convex Lens: Object at Focus (F)',
        caption: 'Image: Formed at infinity (parallel refracted rays)',
        snippet: '\n@diagram convex_lens_at_f | Convex Lens: Object at Focus (F) | Image: Formed at infinity (parallel refracted rays)\n'
      },
      {
        label: 'Between F & O (Magnifier)',
        type: 'convex_lens_between_f_o',
        title: 'Convex Lens: Between F and O (Magnifier)',
        caption: 'Image: Virtual, erect, magnified on same side',
        snippet: '\n@diagram convex_lens_between_f_o | Convex Lens: Between F and O (Magnifier) | Image: Virtual, erect, magnified on same side\n'
      }
    ]
  },
  {
    category: 'Concave Lens',
    items: [
      {
        label: 'In Front of Lens',
        type: 'concave_lens',
        title: 'Concave Lens: Object in Front',
        caption: 'Image: Virtual, erect, diminished (between F₁ & O)',
        snippet: '\n@diagram concave_lens | Concave Lens: Object in Front | Image: Virtual, erect, diminished (between F₁ & O)\n'
      }
    ]
  },
  {
    category: 'Refraction & Dispersion',
    items: [
      {
        label: 'Glass Slab (Lateral Shift)',
        type: 'glass_slab',
        title: 'Refraction through Glass Slab',
        caption: 'Emergent ray || Incident ray (Lateral displacement = d)',
        snippet: '\n@diagram glass_slab | Refraction through Glass Slab | Emergent ray || Incident ray (Lateral displacement = d)\n'
      },
      {
        label: 'Prism (Deviation δ)',
        type: 'prism',
        title: 'Refraction through Prism',
        caption: 'Deviation δ = i + e - A (At min deviation: ray || base)',
        snippet: '\n@diagram prism | Refraction through Prism | Deviation δ = i + e - A (At min deviation: ray || base)\n'
      },
      {
        label: 'Prism Dispersion (VIBGYOR)',
        type: 'prism_dispersion',
        title: 'Dispersion of White Light (VIBGYOR)',
        caption: 'Spectrum: VIBGYOR (Red deviates least, Violet most)',
        snippet: '\n@diagram prism_dispersion | Dispersion of White Light (VIBGYOR) | Spectrum: VIBGYOR (Red deviates least, Violet most)\n'
      }
    ]
  },
  {
    category: 'Ionic bond',
    items: [
      {
        label: 'NaCl (Sodium Chloride)',
        type: 'ionic_NaCl',
        title: 'Formation of NaCl (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_NaCl | Formation of NaCl (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'NaF (Sodium Fluoride)',
        type: 'ionic_NaF',
        title: 'Formation of NaF (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_NaF | Formation of NaF (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'KCl (Potassium Chloride)',
        type: 'ionic_KCl',
        title: 'Formation of KCl (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_KCl | Formation of KCl (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'LiH (Lithium Hydride)',
        type: 'ionic_LiH',
        title: 'Formation of LiH (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_LiH | Formation of LiH (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'CaO (Calcium Oxide)',
        type: 'ionic_CaO',
        title: 'Formation of CaO (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_CaO | Formation of CaO (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'MgO (Magnesium Oxide)',
        type: 'ionic_MgO',
        title: 'Formation of MgO (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_MgO | Formation of MgO (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'MgCl₂ (Magnesium Chloride)',
        type: 'ionic_MgCl2',
        title: 'Formation of MgCl₂ (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_MgCl2 | Formation of MgCl₂ (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'CaCl₂ (Calcium Chloride)',
        type: 'ionic_CaCl2',
        title: 'Formation of CaCl₂ (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_CaCl2 | Formation of CaCl₂ (Ionic Bond) | Electron-transfer diagram\n'
      },
      {
        label: 'Na₂O (Sodium Oxide)',
        type: 'ionic_Na2O',
        title: 'Formation of Na₂O (Ionic Bond)',
        caption: 'Electron-transfer diagram',
        snippet: '\n@diagram ionic_Na2O | Formation of Na₂O (Ionic Bond) | Electron-transfer diagram\n'
      }
    ]
  },
  {
    category: 'Covalent bond (dot)',
    items: [
      {
        label: 'H₂ (Hydrogen)',
        type: 'covalent_H2_dot',
        title: 'H₂ (electron-dot structure)',
        caption: 'Single covalent bond (1 shared pair)',
        snippet: '\n@diagram covalent_H2_dot | H₂ (electron-dot structure) | Single covalent bond (1 shared pair)\n'
      },
      {
        label: 'Cl₂ (Chlorine)',
        type: 'covalent_Cl2_dot',
        title: 'Cl₂ (electron-dot structure)',
        caption: 'Single covalent bond (1 shared pair)',
        snippet: '\n@diagram covalent_Cl2_dot | Cl₂ (electron-dot structure) | Single covalent bond (1 shared pair)\n'
      },
      {
        label: 'F₂ (Fluorine)',
        type: 'covalent_F2_dot',
        title: 'F₂ (electron-dot structure)',
        caption: 'Single covalent bond (1 shared pair)',
        snippet: '\n@diagram covalent_F2_dot | F₂ (electron-dot structure) | Single covalent bond (1 shared pair)\n'
      },
      {
        label: 'O₂ (Oxygen)',
        type: 'covalent_O2_dot',
        title: 'O₂ (electron-dot structure)',
        caption: 'Double covalent bond (2 shared pairs)',
        snippet: '\n@diagram covalent_O2_dot | O₂ (electron-dot structure) | Double covalent bond (2 shared pairs)\n'
      },
      {
        label: 'N₂ (Nitrogen)',
        type: 'covalent_N2_dot',
        title: 'N₂ (electron-dot structure)',
        caption: 'Triple covalent bond (3 shared pairs)',
        snippet: '\n@diagram covalent_N2_dot | N₂ (electron-dot structure) | Triple covalent bond (3 shared pairs)\n'
      },
      {
        label: 'HCl (Hydrogen Chloride)',
        type: 'covalent_HCl_dot',
        title: 'HCl (electron-dot structure)',
        caption: 'Single covalent bond (1 shared pair)',
        snippet: '\n@diagram covalent_HCl_dot | HCl (electron-dot structure) | Single covalent bond (1 shared pair)\n'
      },
      {
        label: 'H₂O (Water)',
        type: 'covalent_H2O_dot',
        title: 'H₂O (electron-dot structure)',
        caption: '2 single covalent bonds (2 lone pairs on O)',
        snippet: '\n@diagram covalent_H2O_dot | H₂O (electron-dot structure) | 2 single covalent bonds (2 lone pairs on O)\n'
      },
      {
        label: 'NH₃ (Ammonia)',
        type: 'covalent_NH3_dot',
        title: 'NH₃ (electron-dot structure)',
        caption: '3 single covalent bonds (1 lone pair on N)',
        snippet: '\n@diagram covalent_NH3_dot | NH₃ (electron-dot structure) | 3 single covalent bonds (1 lone pair on N)\n'
      },
      {
        label: 'CH₄ (Methane)',
        type: 'covalent_CH4_dot',
        title: 'CH₄ (electron-dot structure)',
        caption: '4 single covalent bonds',
        snippet: '\n@diagram covalent_CH4_dot | CH₄ (electron-dot structure) | 4 single covalent bonds\n'
      },
      {
        label: 'CO₂ (Carbon Dioxide)',
        type: 'covalent_CO2_dot',
        title: 'CO₂ (electron-dot structure)',
        caption: '2 double bonds (2 lone pairs on each O)',
        snippet: '\n@diagram covalent_CO2_dot | CO₂ (electron-dot structure) | 2 double bonds (2 lone pairs on each O)\n'
      },
      {
        label: 'CCl₄ (Carbon Tetrachloride)',
        type: 'covalent_CCl4_dot',
        title: 'CCl₄ (electron-dot structure)',
        caption: '4 single bonds (3 lone pairs on each Cl)',
        snippet: '\n@diagram covalent_CCl4_dot | CCl₄ (electron-dot structure) | 4 single bonds (3 lone pairs on each Cl)\n'
      },
      {
        label: 'C₂H₆ (Ethane)',
        type: 'covalent_C2H6_dot',
        title: 'C₂H₆ (electron-dot structure)',
        caption: '7 single covalent bonds',
        snippet: '\n@diagram covalent_C2H6_dot | C₂H₆ (electron-dot structure) | 7 single covalent bonds\n'
      },
      {
        label: 'C₂H₄ (Ethene)',
        type: 'covalent_C2H4_dot',
        title: 'C₂H₄ (electron-dot structure)',
        caption: 'One C=C double bond + 4 C-H bonds',
        snippet: '\n@diagram covalent_C2H4_dot | C₂H₄ (electron-dot structure) | One C=C double bond + 4 C-H bonds\n'
      },
      {
        label: 'C₂H₂ (Ethyne)',
        type: 'covalent_C2H2_dot',
        title: 'C₂H₂ (electron-dot structure)',
        caption: 'One C≡C triple bond + 2 C-H bonds',
        snippet: '\n@diagram covalent_C2H2_dot | C₂H₂ (electron-dot structure) | One C≡C triple bond + 2 C-H bonds\n'
      }
    ]
  },
  {
    category: 'Covalent bond (dash)',
    items: [
      {
        label: 'H₂ (Hydrogen)',
        type: 'covalent_H2_dash',
        title: 'H₂ (structural formula)',
        caption: 'H – H',
        snippet: '\n@diagram covalent_H2_dash | H₂ (structural formula) | H – H\n'
      },
      {
        label: 'Cl₂ (Chlorine)',
        type: 'covalent_Cl2_dash',
        title: 'Cl₂ (structural formula)',
        caption: 'Cl – Cl',
        snippet: '\n@diagram covalent_Cl2_dash | Cl₂ (structural formula) | Cl – Cl\n'
      },
      {
        label: 'F₂ (Fluorine)',
        type: 'covalent_F2_dash',
        title: 'F₂ (structural formula)',
        caption: 'F – F',
        snippet: '\n@diagram covalent_F2_dash | F₂ (structural formula) | F – F\n'
      },
      {
        label: 'O₂ (Oxygen)',
        type: 'covalent_O2_dash',
        title: 'O₂ (structural formula)',
        caption: 'O = O',
        snippet: '\n@diagram covalent_O2_dash | O₂ (structural formula) | O = O\n'
      },
      {
        label: 'N₂ (Nitrogen)',
        type: 'covalent_N2_dash',
        title: 'N₂ (structural formula)',
        caption: 'N ≡ N',
        snippet: '\n@diagram covalent_N2_dash | N₂ (structural formula) | N ≡ N\n'
      },
      {
        label: 'HCl (Hydrogen Chloride)',
        type: 'covalent_HCl_dash',
        title: 'HCl (structural formula)',
        caption: 'H – Cl',
        snippet: '\n@diagram covalent_HCl_dash | HCl (structural formula) | H – Cl\n'
      },
      {
        label: 'H₂O (Water)',
        type: 'covalent_H2O_dash',
        title: 'H₂O (structural formula)',
        caption: 'Bent shape (H–O–H)',
        snippet: '\n@diagram covalent_H2O_dash | H₂O (structural formula) | Bent shape (H–O–H)\n'
      },
      {
        label: 'NH₃ (Ammonia)',
        type: 'covalent_NH3_dash',
        title: 'NH₃ (structural formula)',
        caption: 'Pyramidal (N in centre)',
        snippet: '\n@diagram covalent_NH3_dash | NH₃ (structural formula) | Pyramidal (N in centre)\n'
      },
      {
        label: 'CH₄ (Methane)',
        type: 'covalent_CH4_dash',
        title: 'CH₄ (structural formula)',
        caption: 'Tetrahedral (C in centre)',
        snippet: '\n@diagram covalent_CH4_dash | CH₄ (structural formula) | Tetrahedral (C in centre)\n'
      },
      {
        label: 'CO₂ (Carbon Dioxide)',
        type: 'covalent_CO2_dash',
        title: 'CO₂ (structural formula)',
        caption: 'Linear (O = C = O)',
        snippet: '\n@diagram covalent_CO2_dash | CO₂ (structural formula) | Linear (O = C = O)\n'
      },
      {
        label: 'CCl₄ (Carbon Tetrachloride)',
        type: 'covalent_CCl4_dash',
        title: 'CCl₄ (structural formula)',
        caption: 'C in centre with 4 Cl',
        snippet: '\n@diagram covalent_CCl4_dash | CCl₄ (structural formula) | C in centre with 4 Cl\n'
      },
      {
        label: 'C₂H₆ (Ethane)',
        type: 'covalent_C2H6_dash',
        title: 'C₂H₆ (structural formula)',
        caption: 'H₃C – CH₃',
        snippet: '\n@diagram covalent_C2H6_dash | C₂H₆ (structural formula) | H₃C – CH₃\n'
      },
      {
        label: 'C₂H₄ (Ethene)',
        type: 'covalent_C2H4_dash',
        title: 'C₂H₄ (structural formula)',
        caption: 'H₂C = CH₂',
        snippet: '\n@diagram covalent_C2H4_dash | C₂H₄ (structural formula) | H₂C = CH₂\n'
      },
      {
        label: 'C₂H₂ (Ethyne)',
        type: 'covalent_C2H2_dash',
        title: 'C₂H₂ (structural formula)',
        caption: 'Linear (H – C ≡ C – H)',
        snippet: '\n@diagram covalent_C2H2_dash | C₂H₂ (structural formula) | Linear (H – C ≡ C – H)\n'
      }
    ]
  },
  {
    category: 'Electrolysis',
    items: [
      {
        label: 'Electrolysis of Water',
        type: 'electrolysis_water',
        title: 'Electrolysis of Water',
        caption: 'Acidulated water (Pt electrodes)',
        snippet: '\n@diagram electrolysis_water | Electrolysis of Water | Acidulated water (Pt electrodes)\n'
      },
      {
        label: 'Electrolysis of CuSO₄ (Cu Electrodes)',
        type: 'electrolysis_cuso4_cu',
        title: 'Electrolysis of CuSO₄ Solution',
        caption: 'Copper electrodes',
        snippet: '\n@diagram electrolysis_cuso4_cu | Electrolysis of CuSO₄ Solution | Copper electrodes\n'
      },
      {
        label: 'Electroplating: Silver',
        type: 'plating_silver',
        title: 'Electroplating with Silver',
        caption: 'Cathode: Brass spoon | Anode: Pure Ag',
        snippet: '\n@diagram plating_silver | Electroplating with Silver | Cathode: Brass spoon | Anode: Pure Ag\n'
      },
      {
        label: 'Electroplating: Gold',
        type: 'plating_gold',
        title: 'Electroplating with Gold',
        caption: 'Cathode: Article | Anode: Pure Au',
        snippet: '\n@diagram plating_gold | Electroplating with Gold | Cathode: Article | Anode: Pure Au\n'
      },
      {
        label: 'Electroplating: Nickel',
        type: 'plating_nickel',
        title: 'Electroplating with Nickel',
        caption: 'Cathode: Brass spoon | Anode: Pure Ni',
        snippet: '\n@diagram plating_nickel | Electroplating with Nickel | Cathode: Brass spoon | Anode: Pure Ni\n'
      },
      {
        label: 'Electro-refining of Copper',
        type: 'copper_refining',
        title: 'Electro-refining of Copper',
        caption: 'Anode: Impure Cu | Cathode: Pure Cu',
        snippet: '\n@diagram copper_refining | Electro-refining of Copper | Anode: Impure Cu | Cathode: Pure Cu\n'
      }
    ]
  }
];

export default function EditorToolbar({ onInsertText }) {
  const [isDiagramMenuOpen, setIsDiagramMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsDiagramMenuOpen(false);
      }
    }
    if (isDiagramMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDiagramMenuOpen]);

  const tools = [
    {
      label: '+ Page',
      icon: <FilePlus size={14} />,
      snippet: '\n=== PAGE ===\n@title Page Title\n@left\n# 1. Sub-heading\n- Short bullet point\n@right\n? Board question? => Answer\n@remember Quick summary\n',
      title: 'Insert a new page separator'
    },
    {
      label: 'Section',
      icon: <Heading size={14} />,
      snippet: '\n# 1. Sub-heading Title\n',
      title: 'Insert sub-heading (#)'
    },
    {
      label: 'Bullet',
      icon: <List size={14} />,
      snippet: '\n- Short point (max 15 words)\n',
      title: 'Insert bullet (-)'
    },
    {
      label: 'Law/Def',
      icon: <Bookmark size={14} />,
      snippet: '\n> Official law or definition statement.\n',
      title: 'Insert law/definition box (>)'
    },
    {
      label: 'Formula',
      icon: <Equal size={14} />,
      snippet: '\n= P₁V₁ / T₁ = P₂V₂ / T₂\n',
      title: 'Insert formula chip (=)'
    },
    {
      label: 'Note',
      icon: <AlertCircle size={14} />,
      snippet: '\n! Note: Important board tip or exception.\n',
      title: 'Insert note box (!)'
    },
    {
      label: 'Table',
      icon: <Table size={14} />,
      snippet: '\n@table Comparison Table\n| Item | Property | Unit |\n| Gas 1 | Value A | Unit 1 |\n| Gas 2 | Value B | Unit 2 |\n',
      title: 'Insert formatted table'
    },
    {
      label: 'Graph',
      icon: <LineChart size={14} />,
      snippet: '\n@graph origin | V vs T(K) | T(K) | V | P = constant\n',
      title: 'Insert graph (@graph kind | Title | x | y | caption)'
    },
    {
      label: 'Mirror',
      icon: <Compass size={14} />,
      snippet: '\n@diagram concave_mirror_beyond_c | Concave Mirror: Beyond C | Image: Real, inverted, diminished (between C & F)\n',
      title: 'Insert concave mirror ray diagram (@diagram concave_mirror_beyond_c | Title | Caption)'
    },
    {
      label: 'Lens',
      icon: <Compass size={14} />,
      snippet: '\n@diagram convex_lens_between_f_2f | Convex Lens: Between F & 2F | Image: Real, inverted, magnified (beyond 2F₂)\n',
      title: 'Insert convex lens ray diagram (@diagram convex_lens_between_f_2f | Title | Caption)'
    },
    {
      label: 'Slab',
      icon: <Layers size={14} />,
      snippet: '\n@diagram glass_slab | Refraction through Glass Slab | Emergent ray || Incident ray (Lateral displacement = d)\n',
      title: 'Insert glass slab refraction diagram (@diagram glass_slab | Title | Caption)'
    },
    {
      label: 'Prism',
      icon: <Sun size={14} />,
      snippet: '\n@diagram prism | Refraction through Prism | Deviation δ = i + e - A (At min deviation: ray || base)\n',
      title: 'Insert prism refraction diagram (@diagram prism | Title | Caption)'
    },
    {
      label: 'Dispersion',
      icon: <Sparkles size={14} />,
      snippet: '\n@diagram prism_dispersion | Dispersion of White Light (VIBGYOR) | Spectrum: VIBGYOR (Red deviates least, Violet most)\n',
      title: 'Insert prism dispersion diagram (@diagram prism_dispersion | Title | Caption)'
    },
    {
      label: 'PYQ (★)',
      icon: <HelpCircle size={14} />,
      snippet: '\n? Question from board PYQ? => Direct high-scoring answer\n',
      title: 'Insert Madhyamik question (? Q => A)'
    },
    {
      label: 'Remember',
      icon: <Heart size={14} />,
      snippet: '\n@remember Core formulas and quick memory tricks for exams.\n',
      title: 'Insert remember box (@remember)'
    },
    {
      label: 'Highlight',
      icon: <Highlighter size={14} />,
      snippet: '==highlighted text==',
      title: 'Highlight text (==text==)'
    },
    {
      label: 'Bold',
      icon: <Bold size={14} />,
      snippet: '**bold text**',
      title: 'Bold text (**text**)'
    },
    {
      label: 'Fraction',
      icon: <Divide size={14} />,
      snippet: '{numerator/denominator}',
      title: 'Vertical stacked fraction ({a/b})'
    }
  ];

  return (
    <div className="editor-toolbar">
      <div className="toolbar-group">
        <span className="toolbar-label">Quick Insert:</span>
        <div className="toolbar-buttons">
          {/* Diagrams Dropdown Menu Picker */}
          <div className="toolbar-diagram-menu-container" ref={menuRef} style={{ position: 'relative', display: 'inline-flex' }}>
            <button
              className="toolbar-btn toolbar-btn-highlight"
              onClick={() => setIsDiagramMenuOpen((prev) => !prev)}
              title="Browse and insert ray diagrams (@diagram <type> | <Title> | <Caption>)"
              type="button"
              style={{
                backgroundColor: isDiagramMenuOpen ? '#1f6feb' : '#1e3a5f',
                borderColor: '#388bfd',
                color: '#ffffff',
                fontWeight: 600
              }}
            >
              <Compass size={14} />
              <span>@diagram</span>
              <ChevronDown size={12} style={{ marginLeft: 2, transform: isDiagramMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>

            {isDiagramMenuOpen && (
              <div
                className="toolbar-diagram-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '4px',
                  backgroundColor: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                  zIndex: 1000,
                  width: '280px',
                  maxHeight: '380px',
                  overflowY: 'auto',
                  padding: '6px 0'
                }}
              >
                <div style={{ padding: '4px 12px', fontSize: '11px', color: '#8b949e', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #21262d' }}>
                  Select Ray Diagram Type
                </div>
                {DIAGRAM_SNIPPETS.map((cat, cIdx) => (
                  <div key={cIdx} style={{ padding: '4px 0' }}>
                    <div style={{ padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: '#58a6ff' }}>
                      {cat.category}
                    </div>
                    {cat.items.map((item, iIdx) => (
                      <button
                        key={iIdx}
                        type="button"
                        onClick={() => {
                          onInsertText(item.snippet);
                          setIsDiagramMenuOpen(false);
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '6px 12px 6px 20px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#c9d1d9',
                          fontSize: '12px',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          transition: 'background-color 0.1s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#1f6feb22';
                          e.currentTarget.style.color = '#ffffff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#c9d1d9';
                        }}
                      >
                        <span style={{ fontWeight: 600 }}>{item.label}</span>
                        <span style={{ fontSize: '10px', color: '#8b949e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.caption}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Standard and Ray Diagram Direct Buttons */}
          {tools.map((tool, idx) => (
            <button
              key={idx}
              className="toolbar-btn"
              onClick={() => onInsertText(tool.snippet)}
              title={tool.title}
              type="button"
            >
              {tool.icon}
              <span>{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
