export const SUBJECT_TEMPLATES = {
  'physical-science-ch2': {
    id: 'physical-science-ch2',
    subject: 'Physical Science',
    chapterTitle: 'Chapter 2: Behaviour of Gases',
    content: `@chapter Chapter 2: Behaviour of Gases
=== PAGE ===
@title Boyle's Law and Charles' Law
@left
# 1. Boyle's Law (Robert Boyle)
> At constant temperature, the volume of a fixed mass of gas is INVERSELY proportional to its pressure.
- In symbols: V ∝ {1/P} (mass and temperature constant)
- So: PV = constant (k)
- For two states: P₁V₁ = P₂V₂
- Constants in Boyle's law = temperature and mass of the gas
- Meaning: pressure doubled → volume becomes half. Pressure halved → volume becomes double.
- Why? Less space → molecules hit the walls more often → pressure rises
- Know more: Robert Hooke made the pumps used in Boyle's experiment

# 2. Boyle's Law Graphs (explain each in 1 line)
- P vs V graph: a smooth curve (rectangular hyperbola). It never touches the P or V axis.
- PV vs P graph: a straight line PARALLEL to the P axis (PV is constant).
- PV vs V graph: a straight line PARALLEL to the V axis (PV is constant).
- P vs 1/V graph: a straight line passing through the origin.
- V vs 1/P graph: a straight line passing through the origin.
! Note: Graphs 4 and 5 prove that P and V are directly proportional to 1/V and 1/P.

# 3. Charles' Law (Jacques Charles)
> At constant pressure, the volume of a fixed mass of gas increases or decreases by {1/273} of its volume at 0°C for every 1°C rise or fall in temperature.
- The value 1/273 per °C is called the volume expansion coefficient of a gas
- Constants in Charles' law = pressure and mass of the gas
- Volume after θ°C rise: V = V₀ (1 + {θ/273})
- Volume after θ°C fall: V = V₀ (1 - {θ/273})
= Increase in volume for 1°C rise = {V₀/273}

@right
@graph hyperbola | (a) P vs V | V | P | Isothermal curve
@graph horizontal | (b) PV vs P | P | PV | Parallel to P axis
@graph origin | (c) P vs 1/V | 1/V | P | Through origin
@graph intercept | Charles' law: V vs θ (°C) | θ (°C) | V (ml) | P = constant

? Boyle's law in symbols? => PV = constant (T constant)
? Constants in Boyle's law? => Temperature and mass
? Constants in Charles' law? => Pressure and mass
? Nature of P vs 1/V graph? => Straight line through origin
? PV vs P graph at constant temperature? => Straight line parallel to P axis
? P vs V graph is called? => Isothermal curve (hyperbola)
? Increase in volume per 1°C rise (Charles)? => V₀/273
? State Charles' law and draw V vs t graph => 3 marks, comes almost every year

@remember Boyle: P↑ → V↓ (PV = k). Charles: T↑ → V↑ (at constant pressure)

@must
- PV = constant at constant temperature (Boyle's law)
- Volume coefficient of gas = 1/273 per °C (Charles' law)
- Absolute zero is −273°C = 0 K where molecular motion ceases

@board
Nature of P vs 1/V graph? => Straight line passing through origin | 2017, 2022
Increase in volume per 1°C rise in Charles' law? => V₀/273 | 2019, 2023
State Charles' law in symbols => V = V₀ (1 + θ/273) | 2018

=== PAGE ===
@title Kelvin Scale, Combined Law and Avogadro's Law
@left
# 1. Absolute Zero and Kelvin Scale
- From Charles' law: V = V₀ (1 − {θ/273}) when temperature falls by θ°C
- Put θ = 273 → V = 0. So at −273°C the volume of a gas becomes ZERO (not infinite)
- −273°C is called ABSOLUTE ZERO = 0 K (lowest possible temperature)
= T (K) = θ (°C) + 273
- Example: 0°C = 273 K
- One degree interval on Kelvin scale = one degree interval on Celsius scale.
- Charles' law in Kelvin: V ∝ T (pressure constant), so V / T = constant, V₁ / T₁ = V₂ / T₂
- At constant pressure, a hotter gas expands, so density is INVERSELY proportional to absolute temperature

# 2. Pressure Law (Gay-Lussac)
- At constant volume, the pressure of a fixed mass of gas is directly proportional to its absolute temperature
- P ∝ T, so P / T = constant
- Pressure increases by 1 / 273 of its pressure at 0°C for every 1°C rise = pressure coefficient
- For an ideal gas, volume coefficient = pressure coefficient = 1 / 273 per °C, so their ratio = 1

# 3. Combined Gas Law
- Boyle's law: V ∝ {1/P} (T constant). Charles' law: V ∝ T (P constant)
- Joining both: V ∝ T / P, so P V / T = constant
= P₁V₁ / T₁ = P₂V₂ / T₂
- Use it when P, V and T all change. Always put T in kelvin

# 4. Avogadro's Law
> At the same temperature and pressure, equal volumes of all gases contain equal number of MOLECULES.
- In symbols: V ∝ n (T and P constant)
- Molecules, NOT atoms. Example: 1 L of H₂ and 1 L of He have the same number of molecules
- The volume of the gas molecules themselves is not considered
- 1 mole of any gas at STP occupies 22.4 L (molar volume)
- 1 mole = 6.022 × 10²³ molecules (Avogadro number)
- Ratio of molecules = ratio of volumes (same T, P)

# 5. Moist air is lighter than dry air
- Dry air is mainly N₂ (molar mass 28) and O₂ (molar mass 32), average about 29
- Water vapour (H₂O) has molar mass 18, which is less
- In moist air, some N₂ and O₂ molecules are replaced by H₂O molecules
- So moist air has less mass in the same volume → moist air is lighter

@right
@graph origin | Charles' law graph: V vs T(K) | T(K) | V | P = constant
@graph origin | Pressure law graph: P vs T(K) | T(K) | P | V = constant

@table Gas Laws at a Glance
| Law | Constant | Relation |
| Boyle's law | T, mass | P V = constant |
| Charles' law | P, mass | V / T = constant |
| Pressure law | V, mass | P / T = constant |
| Avogadro's law | T, P | V / n = constant |
| Combined law | mass | P V / T = constant |

? Absolute zero in °C? => −273°C (0 K)
? Volume of a gas at −273°C? => Zero (not infinite)
? Is 1°C interval equal to 1 K interval? => Yes (True)
? V vs T graph (Charles)? => Straight line through origin
? Ratio of volume coefficient to pressure coefficient (ideal gas)? => 1
? Volume of molecules in Avogadro's law? => Not considered
? Equal volumes of all gases at same T, P have equal number of? => Molecules (not atoms)
? Why is moist air lighter than dry air? => H₂O (18) replaces N₂ (28) and O₂ (32)

@remember Boyle P V = k,   Charles V / T = k,   Pressure law P / T = k, Avogadro V / n = k.  Always use T in kelvin.`
  },

  'life-science-ch1': {
    id: 'life-science-ch1',
    subject: 'Life Science',
    chapterTitle: 'Chapter 1: Control and Coordination in Living Organisms',
    content: `@chapter Chapter 1: Control and Coordination
=== PAGE ===
@title Plant Hormones and Tropic Movements
@left
# 1. Plant Tropic Movements
> Directional growth movement of plant parts in response to external unilateral stimuli.
- Phototropism: Stem grows towards light (+ve phototropic), roots grow away (-ve)
- Geotropism: Roots grow towards gravity (+ve geotropic), stem grows against (-ve)
- Hydrotropism: Roots always bend towards moisture/water sources
- Chemotropism: Growth of pollen tube towards ovule induced by sugary secretion

# 2. Major Plant Hormones (Phytohormones)
- Auxin (IAA): Synthesized in growing shoot apices; promotes apical dominance and cell elongation
- Gibberellin (GA): Produced in germinating seeds; breaks seed dormancy and induces stem elongation
- Cytokinin: Synthesized in root tips & fruits; promotes cell division and delays leaf senescence
! Note: Synthetic auxins (2,4-D) act as selective weedicides without damaging cereal crops.

# 3. Parthenocarpy & Apical Dominance
- Parthenocarpy: Seedless fruit formation without fertilization using auxin/gibberellin spray
- Apical dominance: Active apical bud suppresses growth of lateral axillary buds

@right
@table Major Plant Hormones
| Hormone | Source Site | Primary Function |
| Auxin | Shoot apex | Cell elongation, Apical dominance |
| Gibberellin | Germinating embryo | Breaks dormancy, Bolting |
| Cytokinin | Coconut water, Root | Cell division, Delays aging |

? What causes bending of shoot towards light? => Unequal Auxin distribution (shaded side grows faster)
? Which hormone delays leaf senescence? => Cytokinin (Richmond-Lang effect)
? Name a gaseous plant hormone => Ethylene (responsible for fruit ripening)
? What is seed dormancy broken by? => Gibberellic acid (GA₃)
? Weedicide synthetic auxin => 2,4-D (Dichlorophenoxyacetic acid)
? Negative geotropic organ example => Pneumatophores (breathing roots) of Sundari
? Hormone sprayed for seedless grapes => Gibberellin / Auxin

@remember Auxin = Apical dominance, Gibberellin = Dormancy break, Cytokinin = Cell division.

=== PAGE ===
@title Animal Hormones and Human Nervous System
@left
# 1. Endocrine Glands & Hormones
> Ductless glands secreting chemical messengers directly into bloodstream to target organs.
- Pituitary Gland: "Master Gland" secreting TSH, ACTH, GH, LH, FSH
- Thyroid Gland: Secretes Thyroxine (regulates Basal Metabolic Rate - BMR)
- Pancreas (Islets of Langerhans): Beta cells secrete Insulin, Alpha cells secrete Glucagon
- Adrenal Gland: Secretes Adrenaline (emergency "Fight or Flight" hormone)

# 2. Endocrine Disorders
- Diabetes Mellitus: Hyposecretion of Insulin → elevated blood glucose level
- Simple Goitre: Dietary deficiency of Iodine needed to synthesize Thyroxine
- Gigantism & Dwarfism: Hypersecretion and hyposecretion of Growth Hormone (GH)

# 3. Reflex Arc Components
- Receptor → Sensory Neuron → Nerve Centre (Spinal Cord) → Motor Neuron → Effector (Muscle)
! Knee-jerk reflex and withdrawal from hot object are involuntary spinal reflexes.

@right
@table Blood Glucose Regulation
| Hormone | Secreted by | Action on Blood Glucose |
| Insulin | Beta cells of Islets | Lowers glucose (glycogenesis) |
| Glucagon | Alpha cells of Islets | Raises glucose (glycogenolysis) |

? Master gland of endocrine system? => Pituitary gland
? Emergency hormone in human body? => Adrenaline (secreted by adrenal medulla)
? Hormone containing Iodine? => Thyroxine
? Disease caused by insulin deficiency? => Diabetes Mellitus
? Caloriegenic hormone? => Thyroxine (controls BMR)
? Structural unit of nervous system? => Neuron
? Path of reflex action is called? => Reflex Arc (involves 5 components)
? Part of brain controlling body balance? => Cerebellum

@remember Insulin lowers blood sugar, Glucagon raises it. Adrenaline prepares body for emergencies.`
  },

  'history-ch2': {
    id: 'history-ch2',
    subject: 'History',
    chapterTitle: 'Chapter 2: Reform - Characteristics and Observations',
    content: `@chapter Chapter 2: Reform - Characteristics and Observations
=== PAGE ===
@title 19th Century Bengal Renaissance & Social Reforms
@left
# 1. Raja Rammohan Roy (Father of Indian Renaissance)
> Pioneer of modern socio-religious reform and champion of rational, western scientific education.
- Established Atmiya Sabha (1815) and Brahmo Sabha (1828), later Brahmo Samaj (1830)
- Crusaded against Sati Pratha: Banned under Regulation XVII of 1829 by Lord William Bentinck
- Defended monotheism (Tuhfat-ul-Muwahhidin) and fought against idol worship & caste rigidities
- Founded Anglo-Hindu School (1815) and supported Vedanta College (1826)

# 2. Derozio and Young Bengal Movement
- Henry Louis Vivian Derozio: Radical teacher at Hindu College (1826–1831)
- Formed Academic Association (1828); questioned orthodox customs, priesthood, and prejudices
- Journal: Enquirer and Gyananneshan; inspired rational debate though lacked mass connection

# 3. Ishwar Chandra Vidyasagar
- Principal of Sanskrit College; opened it to non-Brahmin students
- Spearheaded Hindu Widow Remarriage Act (Act XV of 1856) passed by Lord Canning
- Established 35 model girls' schools and championed Bethune College (1849)

@right
@table Key Reform Organisations
| Year | Institution | Founder |
| 1815 | Atmiya Sabha | Raja Rammohan Roy |
| 1828 | Academic Association | Henry L. V. Derozio |
| 1830 | Brahmo Samaj | Raja Rammohan Roy |
| 1839 | Tattvabodhini Sabha | Debendranath Tagore |
| 1866 | Brahmo Samaj of India | Keshub Chandra Sen |

? Year of Sati Abolition Act? => 1829 (Regulation XVII by Lord Bentinck)
? Father of Modern India / Renaissance? => Raja Rammohan Roy
? Who passed Hindu Widow Remarriage Act? => Lord Canning in 1856 (Drafted by Dalhousie)
? Founder of Tattvabodhini Sabha? => Debendranath Tagore (1839)
? First Bengali girl school with female education? => Bethune School (1849 by Drinkwater Bethune)
? Who edited Sambad Kaumudi? => Raja Rammohan Roy
? Teacher of Young Bengal group? => Henry Louis Vivian Derozio
? Bengali primer Barnaparichay written by? => Ishwar Chandra Vidyasagar

@remember Rammohan abolished Sati (1829); Vidyasagar legalised Widow Remarriage (1856).`
  },

  'geography-ch1': {
    id: 'geography-ch1',
    subject: 'Geography',
    chapterTitle: 'Chapter 1: Exogenetic Processes and Resultant Landforms',
    content: `@chapter Chapter 1: Exogenetic Processes and Landforms
=== PAGE ===
@title Fluvial and Glacial Landforms
@left
# 1. Work of Rivers (Fluvial Action)
> Rivers shape landforms through three continuous actions: Erosion, Transportation, and Deposition.
- Upper Course (Erosional): High gradient, active vertical erosion forming 'V'-shaped valleys and deep Gorges/Canyons
- Middle Course (Transportation): Lateral erosion begins; river meanders and develops interlocking spurs
- Lower Course (Depositional): Gentle slope, deposition of silt creates Ox-bow lakes, Floodplains, and fertile Deltas
- Waterfalls: Form where hard rock overlies soft rock (e.g. Angel Falls, Jog Falls)

# 2. Work of Glaciers (Glacial Action)
- Cirque / Corrie: Armchair-shaped hollow depression on mountain slope carved by plucking
- Arete & Pyramidal Peak: Sharp knife-edged ridge between cirques; pointed horn like Matterhorn
- 'U'-shaped Valley: Steep-sided, flat-bottomed glacial trough widened by moving ice mass
- Hanging Valley: Tributary glacier valley lying above main glacial trough, forming spectacular waterfalls

@right
@table Erosional vs Depositional River Features
| Course | Dominant Process | Resultant Landforms |
| Upper | Vertical Erosion | V-shaped Valley, Gorge, Waterfall |
| Middle | Lateral Erosion / Transport | River Meander, Interlocking Spur |
| Lower | Deposition | Ox-bow Lake, Floodplain, Delta |

? Highest waterfall in the world? => Angel Falls (Venezuela, 979 m)
? Shape of glacial valley cross-section? => U-shaped flat bottom valley
? Armchair shaped hollow created by glacier? => Cirque or Corrie
? Lake formed in abandoned river meander loop? => Ox-bow lake (Ashwakhurakriti hrad)
? Deep canyon formed by river in arid region? => Grand Canyon (Colorado River)
? Sharp knife-edge ridge between two cirques? => Arete
? Triangular depositional landform at river mouth? => Delta (Sundarban is world's largest)
? Tributary valley high above main glacial floor? => Hanging valley

@remember Upper river = V-valley; Glaciers = U-valley; River mouth = Delta.`
  },

  'mathematics-mensuration': {
    id: 'mathematics-mensuration',
    subject: 'Mathematics',
    chapterTitle: 'Chapter: Mensuration - Cylinder, Cone and Sphere',
    content: `@chapter Class 10 Maths: Mensuration
=== PAGE ===
@title Right Circular Cylinder and Cone
@left
# 1. Right Circular Cylinder
> Solid generated by revolving a rectangle about one of its sides. Base radius r, height h.
- Base Area of cylinder = πr²
- Curved Surface Area (CSA) = 2πrh
- Total Surface Area (TSA) = 2πr(h + r)
= Volume of Cylinder = πr²h
- Hollow cylinder volume = π(R² - r²)h (R = outer radius, r = inner radius)
- Ratio reminder: If radius is doubled and height halved, volume becomes double: π(2r)²(h/2) = 2πr²h

# 2. Right Circular Cone
> Solid generated by rotating a right-angled triangle about its perpendicular side.
- Slant height relation: l = √(r² + h²)
- Curved Surface Area (CSA) = πrl
- Total Surface Area (TSA) = πr(l + r)
= Volume of Cone = {1/3}πr²h
! Rule: Volume of a cone is exactly 1/3 of a cylinder having same base radius and height!

@right
@table Mensuration Formula Matrix
| Solid Shape | Curved Surface (CSA) | Total Surface (TSA) | Volume (V) |
| Cylinder | 2πrh | 2πr(h + r) | πr²h |
| Cone | πrl | πr(l + r) | {1/3}πr²h |
| Sphere | 4πr² | 4πr² | {4/3}πr³ |
| Hemisphere | 2πr² | 3πr² | {2/3}πr³ |

? Slant height l of a cone in terms of r and h? => l = √(r² + h²)
? If radius of cylinder is halved, height doubled, volume becomes? => Half (π(r/2)²(2h) = 1/2 πr²h)
? Ratio of volumes of cylinder and cone with same base and height? => 3 : 1
? Total surface area of a solid hemisphere of radius r? => 3πr²
? Curved surface area of a sphere of radius r? => 4πr²
? Formula for volume of a sphere? => 4/3 πr³
? If diameter of cylinder is d and height h, volume is? => π(d/2)²h = 1/4 πd²h

@remember Cone volume is {1/3} of cylinder. Sphere TSA is 4πr², hemisphere TSA is 3πr².`
  }
};
