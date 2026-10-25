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

  'physical-science-light': {
    id: 'physical-science-light',
    subject: 'Physical Science',
    chapterTitle: 'Chapter 5: Light (Optics & Ray Diagrams)',
    content: `@chapter Chapter 5: Light And It's Phenomenon
=== PAGE ===
@title Spherical Mirrors
@left
# 1. Types of Spherical Mirror
> A ==spherical mirror== is a mirror whose reflecting surface is a ==part of a hollow sphere==.
- **Concave mirror**: reflects from the ==inner (bent-in) surface==. Example: inner side of a steel spoon.
- **Convex mirror**: reflects from the ==outer (bulging) surface==. Example: back of a steel spoon.

# 2. Important Terms
- **Pole (P)**: the ==middle point== of the mirror
- **Centre of curvature (C)**: centre of the hollow sphere of which the mirror is a part
- **Radius of curvature (r)**: radius of that sphere, r = CP
- **Principal axis**: straight line through the pole and centre of curvature
- **Principal focus (F)**: ==concave==: parallel rays meet here after reflection. ==Convex==: parallel rays seem to come from here.
- **Focal length (f)**: distance between pole and principal focus

@right
# 3. Rules for Reflected Rays
- Ray ==parallel to the principal axis== passes through F (concave) or seems to come from F (convex)
- Ray ==through C== (or towards C) returns along the ==same path==
- Ray hitting the ==pole== reflects at an equal angle on the other side of the axis
- Ray through F becomes parallel to the axis (concave)

@remember Concave = inner surface, converges. Convex = outer surface, diverges. Ray through C retraces its path. Ray parallel to axis goes through F.

@board
What is meant by the pole of a spherical mirror? => The middle point of the mirror | 2020
Angle of incidence of a ray passing through the centre of curvature of a concave mirror? => 0° | 2019
Path of a ray parallel to the principal axis after reflection by a concave mirror? => Passes through the principal focus | 2023
Point source at centre of curvature of a concave mirror: angle of deviation? => 180° | 2020
Reflected ray makes 45° with the normal. Angle of incidence? => 45° | 2023

=== PAGE ===
@title Radius of Curvature, Focal Length and Uses
@left
# 1. Relation between r and f
= r = 2f
= f = {r/2}
- Radius of curvature = ==twice the focal length==

# 2. 3 Marks: Prove r = 2f
- Take a ray OA ==parallel to the principal axis== (very small mirror). It reflects through F.
- C is the centre, so CA is the ==normal== at A
- ∠OAC = ∠FCA = i (alternate angles)
- By the law of reflection, ∠FAC = i
- So ∠FAC = ∠FCA, hence FA = FC
- The mirror is small, so FA ≈ FP. Hence FC = FP
- CP = CF + FP = 2 FP, so ==r = 2f==

@right
# 3. Uses of Mirrors
- **Concave**: ==dentist's mirror== (large erect image of teeth). ==Car headlight== (bulb at focus gives a parallel beam). Shaving mirror.
- **Convex**: ==rear-view mirror== of vehicles. It gives an erect, diminished image and a ==wider field of view==.

@board
Relation between radius of curvature and focal length? => f = r/2 | 2017
Radius of curvature of concave mirror is 20 cm. Focal length? => 10 cm | 2022
Which mirror is used by dentists? => Concave mirror | 2019, 2022
Which mirror is used in a car headlight? Why? => Concave. Bulb at focus gives a parallel beam | 2017, 2022
Which mirror is used in the viewfinder of a car? => Convex mirror | 2018
One use of convex mirror => Rear-view mirror | 2023
Which mirror gives a virtual, diminished, erect image? => Convex mirror | 2025
Can any mirror form a virtual image smaller than the object? => Yes, convex mirror | 2022
Find the relation between f and r for a concave mirror. One use of concave mirror => 3 marks | 2017, 2026

=== PAGE ===
@title Images by Spherical Mirrors
@left
# 1. Concave Mirror
- Image depends on the ==position of the object==
- **Object at F**: image at infinity, highly enlarged, real and inverted
- **Object between F and P**: image is ==behind the mirror, virtual, erect and enlarged==
- This is why a concave mirror is used as a ==shaving or dentist's mirror==

# 2. Convex Mirror
- Only 2 cases are possible
- Image is always ==virtual, erect and diminished==, formed behind the mirror
- **At infinity**: point-sized image at F
- **Between infinity and P**: diminished image between P and F

@right
@diagram concave_mirror_beyond_c | Object beyond C | Real, inverted, diminished image
@diagram concave_mirror_between_f_p | Object between F and P | Virtual, erect, magnified image

@table Concave Mirror
| Object position | Image position | Size | Nature |
| At infinity | At F | Point sized | Real, inverted |
| Beyond C | Between C and F | Diminished | Real, inverted |
| At C | At C | Same size | Real, inverted |
| Between C and F | Beyond C | Enlarged | Real, inverted |
| At F | At infinity | Highly enlarged | Real, inverted |
| Between F and P | Behind mirror | Enlarged | Virtual, erect |

@diagram convex_mirror | Convex Mirror | Virtual, erect, diminished image

@remember Concave: real and inverted, except between F and P (virtual, erect, enlarged). Convex: always virtual, erect, diminished.

@board
Where is the image of an extended object at infinity formed by a concave mirror? One feature => At F. Real, inverted, highly diminished | 2020
Which mirror forms a magnified virtual image? => Concave mirror, object between F and P | 2024

=== PAGE ===
@title Refractive Index
@left
# 1. Refractive Index
> The ==absolute refractive index== of a medium is the ==ratio of the speed of light in vacuum to the speed of light in that medium==.
= μ = {c/v}
- μ is always ==greater than 1==
- μ of glass = 1.5 means light travels 1.5 times faster in vacuum than in glass
- μ is ==inversely proportional to speed== of light in the medium
> ==Relative refractive index== of medium 2 with respect to medium 1 = {μ₂/μ₁}.
- μ of air with respect to glass = {1/μ of glass with respect to air}

# 2. What Does It Depend On
- ==Nature of the two media==
- ==Physical condition== (temperature)
- ==Colour (wavelength)== of light
- It does ==NOT change== with the angle of incidence

@right
# 3. What Changes in a Medium
- ==Frequency stays the same==
- Speed and wavelength both decrease
= v = {c/μ}
= λ in medium = {λ in air/μ}
= c = ν λ

# 4. Colour and μ
- μ = A + {B/λ²}
- ==Violet or blue has greater μ than red==
- The medium with the ==smallest angle of refraction== has the ==greatest μ==, so the ==least speed of light==

@board
How is refractive index related to the velocity of light? => μ = c/v | 2017
What is the refractive index of a medium? => Ratio of speed of light in vacuum to speed in the medium | 2019
μ of glass with respect to air is 1.5. μ of air with respect to glass? => 2/3 | 2019
Which parameter remains unchanged during refraction? => Frequency | 2025
Between μ for red and μ for blue light, which is greater? => Blue | 2022
Does the refractive index change if the angle of incidence increases? => No | 2024
Speed in glass 2 × 10⁵ km s⁻¹, in water 2.25 × 10⁵ km s⁻¹. Ratio of μ of glass and water? => 9 : 8 | 2023
Relation between relative and absolute refractive index. Factors affecting relative refractive index => See Sections 1 and 2 | 2024
Same angle of incidence. Angles of refraction in A, B, C are 30°, 45°, 60°. Where is velocity minimum? => Medium A, as r is smallest so μ is greatest | 2026

=== PAGE ===
@title Refractive Index
@left
# 1. Refractive Index
> The ==absolute refractive index== of a medium is the ==ratio of the speed of light in vacuum to the speed of light in that medium==.
= μ = {c/v}
- μ is always ==greater than 1==
- μ of glass = 1.5 means light travels 1.5 times faster in vacuum than in glass
> ==Relative refractive index== of medium 2 with respect to medium 1 = {μ₂/μ₁}.

# 2. What Does It Depend On
- ==Nature of the two media==
- ==Physical condition== (temperature)
- ==Colour (wavelength)== of light
- It does ==NOT change== with the angle of incidence

@right
# 3. What Changes in a Medium
- ==Frequency stays the same==
- Speed and wavelength both decrease
= v = {c/μ}
= λ in medium = {λ in air/μ}
= c = ν λ
# 4. Colour and μ
- μ = A + {B/λ²}
- ==Violet/blue has greater μ than red==
- Medium where angle of refraction is smallest has the greatest μ, so the ==least speed of light==

@board
How is refractive index related to the velocity of light? => μ = c/v | 2017
What is the refractive index of a medium? => Ratio of speed of light in vacuum to speed in the medium | 2019
Which parameter remains unchanged during refraction? => Frequency | 2025
Between μ for red and μ for blue light, which is greater? => Blue | 2022
Does the refractive index change if the angle of incidence increases? => No | 2024
Relation between relative and absolute refractive index. Factors affecting relative refractive index => See Sections 1 and 2 | 2024
Same angle of incidence. Angles of refraction in A, B, C are 30°, 45°, 60°. Where is velocity minimum? => Medium A, as r is smallest so μ is greatest | 2026

=== PAGE ===
@title Glass Slab
@left
# 1. Glass Slab
> A ==glass slab== is a transparent rectangular block of glass with ==two parallel refracting faces==.
- Entering: light bends ==towards the normal==. Leaving: it bends ==away from the normal==.
- The emergent ray is ==parallel== to the incident ray but ==shifted sideways==. This is ==lateral displacement==.
- Lateral displacement depends on ==thickness of slab, angle of incidence and refractive index==
- Ray incident ==normally== does not bend and has ==zero deviation==

# 2. 3 Marks: Emergent Ray is Parallel to Incident Ray
- At face PQ: {sin i/sin r} = μ
- The two faces are parallel, so the angle of incidence at RS = r (alternate angles)
- At RS (glass to air): {sin r/sin i'} = {1/μ}, so sin i' = μ sin r = sin i
- Hence i' = i, so the emergent ray is ==parallel to the incident ray==

@right
@diagram glass_slab | Glass Slab | Emergent ray parallel to incident ray, with lateral shift

@remember Glass slab: emergent ray is parallel to incident ray but shifted sideways. Normal incidence gives zero deviation.

@board
Angle of deviation when a ray falls perpendicularly on a glass slab? => 0° | 2018, 2026
Why does a ray of light not deviate on passing through a glass slab? => Normally incident ray does not bend. An oblique ray only shifts sideways | 2019
Prove incident and emergent rays are parallel for a rectangular glass slab => 3 marks | 2025

=== PAGE ===
@title Prism and Angle of Deviation
@left
# 1. Prism
> A ==prism== is a transparent refracting medium bounded by ==5 plane faces==: 2 triangular and 3 rectangular.
- Faces where light enters and leaves are ==refracting faces==
- Angle between the two refracting faces = ==angle of the prism (A)==
- A prism has ==3 rectangular surfaces==

# 2. 3 Marks: Show δ = i₁ + i₂ − A
- i₁ = angle of incidence, r₁ = refraction at face 1. r₂ = incidence inside, i₂ = emergence at face 2.
- δ = (i₁ − r₁) + (i₂ − r₂) = (i₁ + i₂) − (r₁ + r₂)
- In the quadrilateral, two angles are 90°, so ∠PNQ = 180° − A
- In the triangle PNQ: r₁ + r₂ = 180° − ∠PNQ = A
= δ = i₁ + i₂ − A

# 3. Deviation Depends on
- Angle of incidence, angle of prism, refractive index of material, colour of light

@right
@diagram prism | Prism | Deviation δ = i₁ + i₂ − A

# 4. Minimum Deviation
> Deviation is ==minimum== when the ray passes ==symmetrically== through the prism: i₁ = i₂ and r₁ = r₂ = {A/2}.
- The ray inside the prism is ==parallel to the base==
= i = {(A + δ)/2}
- Normal incidence on face 1: μ = {sin (A + D)/sin A}

@board
How many rectangular surfaces does a prism have? => Three | 2019
Show that δ = i₁ + i₂ − A => 3 marks, see Section 2 | 2017
Show that symmetric passage through an equilateral prism gives minimum deviation => Section 4. i₁ = i₂ gives the least δ | 2024
Equilateral prism, angle of deviation 40°, ray parallel to base. Angle of incidence? => 50° | 2022
Equilateral prism, minimum deviation 20°. Angle of incidence? => 40° | 2024
Equilateral prism, i₁ = 30°, i₂ = 45°. Angle of deviation? => 15° | 2020
Ray falls normally on a prism face. Relation between μ, A and D => μ = sin(A + D) / sin A | 2025

=== PAGE ===
@title Dispersion of Light
@left
# 1. Dispersion
> ==Dispersion== is the ==splitting of white light into its constituent colours== on passing through a refracting medium (like a prism).
- The band of colours is called a ==spectrum==
- Colours: ==VIBGYOR== (violet, indigo, blue, green, yellow, orange, red)
- **Natural example**: ==rainbow==

# 2. Cause
- Each colour has a ==different refractive index== in glass
- So each colour bends by a different angle
- ==Violet deviates the most== (highest μ). ==Red deviates the least== (lowest μ).

# 3. Types of Light
- **Monochromatic**: one colour only. It ==does not split== in a second prism.
- **Polychromatic (composite)**: mixture of colours, like white light. It ==splits into a spectrum==.

@right
@diagram prism_dispersion | Dispersion by Prism | White light splits into VIBGYOR

# 4. Glass Slab
- Colours do split inside the slab
- The faces are parallel, so the colours ==come out parallel and together as white light==
- So no spectrum is seen

@board
Give a natural example of dispersion => Rainbow | 2017
Name a natural spectrum => Rainbow | 2026
Which colour deviates most in a prism? => Violet | 2017
Which colour deviates least in refraction through a prism? => Red | 2023
Define dispersion. How to identify monochromatic and composite light with a prism? => Composite light splits into a spectrum. Monochromatic light does not | 2024
Define dispersion. Will white light disperse in a glass slab at 45°? => Splits inside, but emerges as white light as faces are parallel | 2020

=== PAGE ===
@title Scattering and Colour
@left
# 1. Scattering of Light
> ==Scattering== is the absorption of light by air molecules and its ==re-emission in all directions==.
- Rayleigh's law: intensity of scattered light is ==inversely proportional to the fourth power of wavelength==
= I ∝ {1/λ⁴}
- Short wavelength (blue) scatters ==much more== than long wavelength (red)
- ==Red is scattered the least==

# 2. Why the Sky Looks Blue
- Sunlight passes through the atmosphere and is scattered by air molecules
- ==Blue (short wavelength) is scattered most== in all directions
- The scattered light reaching our eyes has ==more blue==, so the sky looks blue

@right
# 3. Colour of Objects
- An object shows the colour it ==reflects (or transmits)==. It ==absorbs all other colours==.
- Green leaves ==reflect green and absorb the other colours==, so they look green in sunlight
- In red light a green leaf looks ==black==, because it absorbs red

@remember Scattering is proportional to 1 / λ⁴. Blue scatters most, red least. Sky is blue because blue is scattered most.

@board
Why does the sky appear blue in the daytime? => Blue light has a short wavelength, so air molecules scatter it the most | 2018, 2025
Light of which colour gets scattered the least? => Red | 2026
Why do green leaves appear green in sunlight? => They reflect green light and absorb the other colours | 2022

=== PAGE ===
@title Lenses
@left
# 1. Types of Lens
- **Convex (converging) lens**: ==thicker in the middle==, converges parallel rays
- **Concave (diverging) lens**: ==thinner in the middle==, diverges parallel rays

# 2. Important Terms
- **Optical centre (O)**: the point on the principal axis through which a ray passes ==without deviation==
- **Principal axis**: line joining the centres of curvature of the two surfaces
- **Principal focus (F)**: ==convex==: parallel rays meet here. ==Concave==: parallel rays seem to come from here.
- **Focal length (f)**: distance between the ==optical centre and principal focus==
- A lens has ==two foci==, one on each side

@right
# 3. Rules for Refracted Rays
- Ray through the ==optical centre== goes ==straight==
- Ray ==parallel to the principal axis== passes through F (convex) or seems to come from F (concave)
- Ray through F (convex) becomes ==parallel== to the axis

@remember Convex lens converges, concave lens diverges. Ray through optical centre goes straight. Ray parallel to axis passes through F.

@board
What is the optical centre of a convex lens? => Point on the principal axis through which a ray passes without deviation | 2018
Object at 20 cm from a convex lens gives no image on either side. Focal length? => 20 cm (object is at F) | 2019
Draw refracted rays for rays parallel to the principal axis of a convex lens. Mark F => Rays converge at F on the other side | 2022
Which lens is used as a magnifying glass? => Convex lens | 2025

=== PAGE ===
@title Images by Lenses and Magnification
@left
# 1. Concave Lens
- For ==any position== of the object, the image is ==virtual, erect and diminished==
- Image forms between ==F and O==, on the same side as the object

# 2. Convex Lens
- Object ==between O and F== gives a ==virtual, erect, magnified== image. This is a ==magnifying glass==.
- Object ==between F and 2F== gives a ==real, inverted, magnified== image beyond 2F.

# 3. Linear Magnification (m)
> ==Linear magnification== is the ratio of ==image height to object height==.
= m = {image height/object height} = {v/u}
- m > 1: magnified. m < 1: diminished. m = 1: same size.
- m positive: virtual and erect. m negative: real and inverted.

@right
@diagram convex_lens_between_f_2f | Between F and 2F | Real, inverted, magnified
@diagram convex_lens_between_f_o | Between F and O | Virtual, erect, magnified
@diagram concave_lens | Concave Lens | Virtual, erect, diminished

@table Convex Lens Images
| Object position | Image position | Nature |
| Beyond 2F | Between F and 2F | Real, inverted, diminished |
| At 2F | At 2F | Real, inverted, same size |
| Between F and 2F | Beyond 2F | Real, inverted, magnified |
| At F | At infinity | Real, inverted, highly magnified |
| Between F and O | Same side | Virtual, erect, magnified |

@board
Object between optical centre and focus of a convex lens: nature of image? => Virtual and erect (magnified) | 2018
Two characteristics of the image when the object is between O and F of a convex lens => Virtual, erect (and magnified) | 2023
Where is the image formed if the object is between f and 2f of a convex lens? => Beyond 2f | 2024
How can an erect and magnified image be formed with a convex lens? => Place the object between O and F | 2018
Explain with a ray diagram the image formed by a concave lens => Virtual, erect, diminished image between O and F | 2025
Convex lens gives a 10 times magnified image of a 5 cm object. Image length? => 50 cm | 2026

=== PAGE ===
@title Eye, Camera and Defects of Vision
@left
# 1. Camera and Human Eye
- **Simple camera**: a convex lens forms a ==real, inverted, diminished== image on the film
- **Human eye**: image forms on the ==retina==, real and inverted. The brain shows it erect.
- Near point of a normal eye = ==25 cm==
- Far point of a normal eye = ==infinity==

# 2. Myopia (Short-sightedness)
> ==Myopia== is the defect in which a person can ==see near objects clearly but not distant objects==.
- **Causes**: ==eyeball too long==, or ==eye lens focal length too short==
- **Remedy**: ==concave lens==

# 3. Hypermetropia (Long-sightedness)
> ==Hypermetropia== is the defect in which a person can ==see distant objects clearly but not near objects==.
- **Causes**: ==eyeball too small==, or ==eye lens focal length too large==
- **Remedy**: ==convex lens==

@right
@table Defects of Vision
| Point | Myopia | Hypermetropia |
| Cannot see | Distant objects | Near objects |
| Lens used | Concave | Convex |

@remember Myopia: cannot see far, use concave lens. Hypermetropia: cannot see near, use convex lens. Far point of a normal eye is at infinity.

@board
Two features of the image formed by a simple camera => Real and inverted (diminished) | 2020
Where is the far point of a normal human eye? => Infinity | 2026
Which lens rectifies myopic vision? => Concave lens | 2017
Which defect of vision is rectified by a convex lens? => Hypermetropia (long-sightedness) | 2019
What is long-sightedness? Which lens remedies it? => Cannot see near objects clearly. Convex lens | 2018, 2022
What is hypermetropia? Which lens rectifies it? => See Section 3 | 2025
Two causes of myopia. Which lens rectifies it? => See Section 2. Concave lens | 2026

=== PAGE ===
@title Electromagnetic Spectrum
@left
# 1. Order of Wavelength
= γ-ray < X-ray < ultraviolet < visible < infrared < microwave < radio wave
- Visible light: ==4000 Å to 8000 Å==
- ==Infrared== has a greater wavelength than visible light
- γ-ray is an ==electromagnetic wave of very short wavelength==

# 2. Uses
- **X-ray**: detecting ==bone fractures==
- **γ-ray**: ==radiotherapy to kill cancer cells==
- Harm of γ-ray: ==damages living cells==

@right
@remember Order of wavelength: γ < X < UV < visible < IR < microwave < radio. Infrared is longer than visible light.

@board
Which has the highest wavelength: X-ray, γ-ray, infrared, UV? => Infrared | 2019
Which has a wavelength greater than visible light? => Infrared ray | 2022
Write one use of X-ray => Detecting bone fractures | 2020
Fill in: γ-ray is ______ wave of short wavelength => Electromagnetic | 2023
One use each of X-ray and γ-ray. One harmful effect of γ-ray => X-ray: bone fracture. γ-ray: cancer treatment. Harm: damages living cells | 2023

=== PAGE ===
@title Formula Sheet for Numericals
@left
# 1. Mirror and Lens
= f = {R/2}
= m = {image height/object height} = {v/u}

# 2. Refraction
= μ = {sin i/sin r}
= μ = {c/v}
= {μ₁/μ₂} = {v₂/v₁}
= λ in medium = {λ in air/μ}
= δ = i − r (rarer to denser)
= time = {μ d/c} (time through slab of thickness d)

# 3. Prism
= δ = i₁ + i₂ − A
= r₁ + r₂ = A
= i = {(A + δ)/2} (ray parallel to base)

@right
! Note: c = 3 × 10⁸ m s⁻¹. 1 Å = 10⁻¹⁰ m. Frequency does not change in a medium.

@remember Convert units first (Å to m, mm to m). Frequency stays the same. Speed and wavelength change in a medium.`
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
