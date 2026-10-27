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

  'physical-science-electricity': {
    id: 'physical-science-electricity',
    subject: 'Physical Science',
    chapterTitle: 'Chapter 6: Current Electricity',
    content: `@chapter Chapter 6: Current Electricity
=== PAGE ===
@title Electric Current, Potential Difference & Ohm's Law
@left
# 1. Electric Current (I) & Potential Difference (V)
> Electric current is the rate of flow of electric charge across a cross-section of a conductor: ==I = Q / t==.
- SI unit of charge = **Coulomb (C)**; SI unit of current = **Ampere (A)** (1 A = 1 C/s).
- 1 Coulomb = charge on ==6.25 × 10¹⁸ electrons== (each e⁻ = 1.6 × 10⁻¹⁹ C).
- Potential difference (V): work done to move unit positive charge between two points: ==V = W / Q==.
- SI unit of potential = **Volt (V)** (1 V = 1 J / 1 C).

# 2. Ohm's Law (Georg Simon Ohm)
> At constant temperature and other physical conditions, the current flowing through a conductor is directly proportional to the potential difference across its ends: ==V ∝ I==.
= V = I · R
- **Resistance (R)**: opposition to current flow. SI unit = **Ohm (Ω)** (1 Ω = 1 V / 1 A).
- Slope of V–I straight line graph = Resistance R.
- Conductors obeying Ohm's law = **Ohmic** (metals like Cu, Al).
- Conductors violating Ohm's law = **Non-Ohmic** (diode, LED, transistor, electrolyte).

# 3. Factors Affecting Resistance
= R = ρ · {l / A}
- **Length (l)**: R ∝ l (doubling length doubles resistance).
- **Cross-section area (A)**: R ∝ 1/A (thick wire has less resistance than thin wire).
- **Resistivity (ρ)**: property of material. SI unit = **Ω·m**.
- Temperature: Resistance of metals **increases** with temperature; semiconductors **decrease**.

@right
@diagram circuit_ohms_law | Ohm's Law Verification Circuit | Ammeter in series • Voltmeter in parallel across R

? SI unit of electric potential? => Volt (V) = Joule / Coulomb
? What device measures current in a circuit? => Ammeter (always connected in series)
? What device measures potential difference? => Voltmeter (always connected in parallel)
? What is the resistance of an ideal ammeter? => Zero (to avoid altering circuit current)
? What is the resistance of an ideal voltmeter? => Infinite (draws no current)
? If length of wire is doubled and area halved, new R? => 4 times (R' = ρ·2l/(A/2) = 4R)
? Does resistivity depend on length or thickness? => No, depends ONLY on material and temperature

@remember V = I·R, R = ρ·l/A. Ammeter is connected in series; voltmeter in parallel across resistor.

=== PAGE ===
@title Combinations of Resistors: Series and Parallel
@left
# 1. Resistors in Series Combination
> Resistors connected end-to-end so that the ==same current (I)== flows through every resistor.
- Total potential difference divides: ==V = V₁ + V₂ + V₃==.
- From Ohm's law: I·R_s = I·R₁ + I·R₂ + I·R₃.
= R_s = R₁ + R₂ + R₃
- **Key Feature**: Equivalent resistance R_s is **GREATER** than the largest individual resistance.
- Disadvantage: If one component fails, the whole circuit breaks.

# 2. Resistors in Parallel Combination
> Resistors connected across two common junction points so that the ==same potential difference (V)== exists across each.
- Total current branches: ==I = I₁ + I₂ + I₃==.
- From Ohm's law: V / R_p = V/R₁ + V/R₂ + V/R₃.
= {1 / R_p} = {1 / R₁} + {1 / R₂} + {1 / R₃}
- For two resistors in parallel: ==R_p = (R₁ · R₂) / (R₁ + R₂)==.
- **Key Feature**: Equivalent resistance R_p is **LESS** than the smallest individual resistance.
- Major advantage: Independent on/off switches; failure of one device does not affect others.

# 3. Electric Energy and Joule's Heating Law
> Heat produced in a resistor: ==H = I² · R · t== (Joule's law).
- In calories: ==H = {I² · R · t / 4.18} cal== (where J = 4.18 J/cal).
- Electric Power: ==P = V · I = I² · R = {V² / R}== (Watt).
- Commercial unit of energy = **Board of Trade Unit (B.O.T.U. or kWh)**:
= 1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J

@right
@diagram resistors_series | Resistors in Series | Same current I through all • V = V₁ + V₂ + V₃
@diagram resistors_parallel | Resistors in Parallel | Same potential V across all • 1/Rp = 1/R₁ + 1/R₂ + 1/R₃

? Equivalent resistance of two 6 Ω resistors in series? => R_s = 6 + 6 = 12 Ω
? Equivalent resistance of two 6 Ω resistors in parallel? => R_p = (6 × 6)/(6 + 6) = 3 Ω
? Why are domestic appliances connected in parallel? => Equal voltage (220V) and independent control
? State Joule's law of electric heating => H ∝ I², H ∝ R, H ∝ t (H = I²Rt / J)
? Convert 1 Board of Trade Unit (kWh) to Joules => 1 kWh = 3.6 × 10⁶ Joules
? Filament of electric bulb is made of? => Tungsten (high melting point ~3422°C & high resistivity)
? Fuse wire is an alloy of? => Lead (75%) and Tin (25%) with low melting point

@remember Series: R_s = R₁ + R₂ + R₃ (current same). Parallel: 1/R_p = 1/R₁ + 1/R₂ + 1/R₃ (voltage same).

=== PAGE ===
@title Magnetic Effects of Current & Solenoid
@left
# 1. Oersted's Experiment (1820)
> When electric current flows through a conductor, a magnetic field is produced around it.
- **Ampere's Swimming Rule**: If a swimmer swims along the wire in the direction of current facing the magnetic needle, the North pole deflects towards his **Left hand**.

# 2. Right-Hand Thumb Rule (Maxwell's Rule)
> Grip the conductor with your right hand such that the **thumb points in the direction of current (I)**; then the **curled fingers point in the direction of magnetic field lines (B)**.
- Magnetic field lines around a straight current wire are **concentric circles**.
- Field strength: ==B ∝ I== (current) and ==B ∝ 1/r== (distance from wire).

# 3. Magnetic Field of a Circular Loop & Solenoid
- At the centre of a circular coil, magnetic field lines are **straight and perpendicular** to the coil plane.
- **Clock Rule**: Looking at a coil face:
  - Current clockwise → **South Pole (S)**.
  - Current anticlockwise → **North Pole (N)**.
- **Solenoid**: A cylindrical coil of many turns of insulated copper wire.
- Inside a long solenoid, field lines are **parallel straight lines** (uniform magnetic field).
- It acts exactly like a **cylindrical bar magnet**.
= Field inside solenoid: B = μ₀ · n · I (n = turns per unit length)

@right
@diagram right_hand_thumb_rule | Right-Hand Thumb Rule | Thumb = Current (I) • Curled fingers = Field (B)
@diagram solenoid_field | Magnetic Field of a Solenoid | Uniform parallel field inside • Acts like a bar magnet

? Who discovered the magnetic effect of electric current? => Hans Christian Oersted (1820)
? Shape of magnetic field lines around a straight wire? => Concentric circles centered on the wire
? How to increase magnetic field inside a solenoid? => Increase current (I), increase turns (n), insert soft iron core
? Nature of magnetic field inside a current solenoid? => Uniform and strong (parallel straight lines)
? State the Clock Face Rule for coil polarity => Clockwise current = South pole; Anticlockwise = North pole
? Core used in an electromagnet? => Soft iron (high permeability, low retentivity)

@remember Thumb = Current, Curled fingers = Magnetic field. Solenoid acts like a cylindrical bar magnet.

=== PAGE ===
@title Motor Principle, Electromagnetic Induction & Domestic Wiring
@left
# 1. Fleming's Left-Hand Rule (Motor Rule)
> Stretch Thumb, Forefinger and Middle finger of left hand mutually perpendicular:
- **Forefinger**: Magnetic Field (B)
- **Middle Finger**: Electric Current (I)
- **Thumb**: Direction of Force / Motion (F)
- Mnemonic: **F – B – I** (Father, Mother, Child).

# 2. Electric Motor (DC Motor)
> Converts **Electric Energy into Mechanical Energy**.
- Core parts: Armature coil ABCD, Strong permanent magnet poles (N & S), **Split-ring Commutator (S₁, S₂)**, and Carbon Brushes (B₁, B₂).
- **Function of Split-ring**: Reverses current direction in the coil every half-rotation to maintain unidirectional torque.

# 3. Electromagnetic Induction (Faraday & Lenz)
> Moving a magnet relative to a coil induces an electromotive force (EMF) and current: ==e = −N (dΦ / dt)==.
- **Lenz's Law**: The direction of induced current always opposes the cause producing it (consequence of conservation of energy).
- **Fleming's Right-Hand Rule (Dynamo Rule)**: Used to find direction of induced current.

# 4. Domestic Circuit & 3-Pin Plug
- Supply voltage = **220 V AC, 50 Hz**.
- Wires: **Live (L, 220V - Brown/Red)**, **Neutral (N, 0V - Light Blue/Black)**, **Earth (E - Green/Yellow)**.
- **Golden Rule**: Switch, Fuse, and MCB are **ALWAYS connected in the LIVE wire**.
- 3-Pin Plug: **Earth pin is thicker and longer** (enters first for grounding protection).

@right
@diagram flemings_left_hand_rule | Fleming's Left-Hand Rule | Thumb = Force (F) • Forefinger = Field (B) • Middle = Current (I)
@diagram domestic_circuit | Domestic AC Electric Circuit | Appliances in parallel • Switch & Fuse always in Live wire!

? Principle of an electric motor? => Current-carrying coil in magnetic field experiences torque (Fleming's LHR)
? Function of split rings in DC motor? => Commutator: reverses current every half-rotation
? What does Fleming's Left-Hand Rule determine? => Direction of force/motion on a current-carrying wire
? State Lenz's law => Direction of induced EMF opposes the change in flux (Conservation of energy)
? Frequency and voltage of domestic AC supply in India? => 220 V, 50 Hz
? In which wire should a fuse/switch be connected? => Live wire (L)
? Why is the Earth pin made thicker and longer? => Connects first for safety; cannot enter live/neutral holes

@remember Motor rule = Left Hand (FBI); Generator rule = Right Hand. Fuse & switch ALWAYS in LIVE wire.`
  },

  'physical-science-organic': {
    id: 'physical-science-organic',
    subject: 'Physical Science',
    chapterTitle: 'Chapter 8.6: Organic Chemistry',
    content: `@chapter Chapter 8.6: Organic Chemistry
=== PAGE ===
@title Tetravalency of Carbon, Catenation & Isomerism
@left
# 1. Unique Nature of Carbon
> Organic chemistry is the chemistry of carbon compounds (excluding oxides, carbonates, and cyanides).
- **Tetravalency**: Carbon (atomic number 6, electronic configuration 2,4) has 4 valence electrons; forms 4 covalent bonds.
- **Tetrahedral Geometry**: Four covalent bonds directed towards vertices of a regular tetrahedron with bond angle ==109°28′ (109.5°)==.
- **Catenation**: Remarkable ability of carbon atoms to form stable covalent bonds with other carbon atoms, creating straight, branched, or cyclic chains.
- Wöhler's synthesis (1828): Heated inorganic ammonium cyanate to synthesize **Urea** (NH₂CONH₂), disproving "Vital Force Theory".

# 2. Structural Isomerism
> Compounds having the ==same molecular formula== but ==different structural formulas== and properties.
- **Chain Isomerism of Butane (C₄H₁₀)**:
  - **n-Butane**: straight chain CH₃–CH₂–CH₂–CH₃ (boiling point −0.5°C).
  - **Isobutane (2-methylpropane)**: branched CH(CH₃)₃ (boiling point −11.7°C).
- Branching lowers the boiling point by reducing surface area and van der Waals forces.
- Pentane (C₅H₁₂) has 3 isomers: n-pentane, isopentane, neopentane.

# 3. Hydrocarbons Classification
- **Alkanes (Paraffins)**: Saturated, single C–C bond, general formula ==CₙH₂ₙ₊₂== (e.g. Methane CH₄, Ethane C₂H₆). Undergo substitution reactions.
- **Alkenes (Olefins)**: Unsaturated, double C=C bond, general formula ==CₙH₂ₙ== (e.g. Ethene C₂H₄). Planar 120°.
- **Alkynes (Acetylenes)**: Unsaturated, triple C≡C bond, general formula ==CₙH₂ₙ₋₂== (e.g. Ethyne C₂H₂). Linear 180°.

@right
@diagram carbon_tetrahedron | Tetrahedral Carbon (Methane, CH₄) | sp³ hybridization • 4 equivalent bonds at 109°28′ (109.5°)
@diagram isomerism_butane | Chain Isomerism of Butane (C₄H₁₀) | n-Butane (b.p. −0.5°C) vs Isobutane (b.p. −11.7°C)

? Who disproved the Vital Force Theory? => Friedrich Wöhler (1828) by synthesizing Urea from Ammonium Cyanate
? What is the bond angle in a methane (CH₄) molecule? => 109°28′ (109.5°)
? What is catenation property? => Self-linking property of carbon atoms to form long open or closed chains
? General formula of alkanes, alkenes and alkynes? => CₙH₂ₙ₊₂ (alkane), CₙH₂ₙ (alkene), CₙH₂ₙ₋₂ (alkyne)
? How many isomers does butane (C₄H₁₀) have? => 2 isomers: n-butane and isobutane (2-methylpropane)
? Why does isobutane have a lower boiling point than n-butane? => Spherical branching reduces surface area
? Simplest alkane and its geometry? => Methane (CH₄), regular tetrahedral geometry

@remember Catenation + Tetravalency creates millions of carbon compounds. Butane has 2 chain isomers.

=== PAGE ===
@title Functional Groups, Ethanol & Acetic Acid
@left
# 1. Organic Functional Groups
> An atom or group of atoms that largely determines the specific chemical properties of an organic compound.
- **Alcohol (-OH)**: Suffix *-ol* (e.g. Methanol CH₃OH, Ethanol C₂H₅OH).
- **Aldehyde (-CHO)**: Suffix *-al* (e.g. Methanal HCHO, Ethanal CH₃CHO).
- **Ketone (>C=O)**: Suffix *-one* (e.g. Propanone CH₃COCH₃ - simplest ketone).
- **Carboxylic Acid (-COOH)**: Suffix *-oic acid* (e.g. Ethanoic acid CH₃COOH).

# 2. Ethanol (Ethyl Alcohol, C₂H₅OH)
- Industrial prep: Fermentation of molasses with yeast (*Invertase* and *Zymase* enzymes).
- Reaction with Sodium: Effervescence of Hydrogen gas:
= 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑
- Dehydration: heated with excess concentrated H₂SO₄ at 170°C:
= C₂H₅OH ⎯⎯⎯⎯⎯⎯⎯⎯⎯→ CH₂=CH₂ + H₂O (Ethene)
- Denatured alcohol: ethanol made unfit for drinking by adding 5% poisonous methanol and pyridine.

# 3. Ethanoic Acid (Acetic Acid, CH₃COOH)
- 5% to 8% aqueous solution is known as **Vinegar** (food preservative).
- Pure anhydrous acid freezes at 16.6°C into ice-like crystals = **Glacial Acetic Acid**.
- Litmus test: Turns blue litmus red (weak monobasic acid).
- Reaction with NaHCO₃: brisk effervescence of CO₂:
= CH₃COOH + NaHCO₃ → CH₃COONa + CO₂↑ + H₂O

@right
@diagram functional_groups | Key Organic Functional Groups | Alcohol (−OH) • Aldehyde (−CHO) • Ketone (>C=O) • Acid (−COOH)
@diagram ethanol_structure | Ethanol (Ethyl Alcohol) • C₂H₅OH | Functional group: Hydroxyl (−OH) • Gives H₂ with Sodium
@diagram ethanoic_acid_structure | Ethanoic Acid (Acetic Acid) • CH₃COOH | Functional group: Carboxyl (−COOH) • Vinegar is 5–8% solution

? Functional group present in alcohols and aldehydes? => Alcohol: −OH; Aldehyde: −CHO
? Simplest ketone and its IUPAC name? => Acetone / Propan-2-one (CH₃COCH₃)
? What is vinegar? => 5% to 8% aqueous solution of acetic acid
? What is glacial acetic acid? => 100% pure anhydrous acetic acid (freezes at 16.6°C)
? Test to distinguish ethanol and ethanoic acid? => Add NaHCO₃: ethanoic acid gives brisk effervescence of CO₂
? Gas evolved when sodium metal reacts with ethanol? => Hydrogen gas (H₂↑)
? What is denatured spirit (methylated spirit)? => Ethanol mixed with methanol & pyridine to prevent misuse

@remember Ethanol = C₂H₅OH (gives H₂ with Na). Ethanoic acid = CH₃COOH (gives CO₂ with NaHCO₃).

=== PAGE ===
@title Organic Reactions: Esterification, Addition & Lab Prep
@left
# 1. Esterification Reaction
> Reaction between a carboxylic acid and an alcohol in the presence of concentrated H₂SO₄ catalyst to form a sweet-smelling **Ester**.
= CH₃COOH + C₂H₅OH ⎯⎯⎯⎯⎯⎯⎯⎯→ CH₃COOC₂H₅ + H₂O
- **Product**: Ethyl ethanoate (Ethyl acetate) having pleasant **fruity fragrance**.
- Conc. H₂SO₄ acts as catalyst and **dehydrating agent** (removes water).

# 2. Addition Reactions of Alkenes & Alkynes
- **Unsaturation Test (Bromine Water Test)**:
  - Ethene or Ethyne decolourizes red-brown bromine water in CCl₄:
  = CH₂=CH₂ + Br₂ (Red-brown) → CH₂Br–CH₂Br (Colourless)
  - Saturated alkanes (Ethane) **do not** decolourize bromine water in the dark.
- **Catalytic Hydrogenation**:
  = CH₂=CH₂ + H₂ ⎯⎯⎯⎯⎯⎯→ CH₃–CH₃ (Ethane)
  - Industrial use: Hardening liquid vegetable oils into solid Vanaspati ghee (Ni catalyst, 200°C).

# 3. Laboratory Preparations
- **Methane (CH₄)**: Heat dry Sodium acetate with Soda lime (NaOH + CaO, 1:3):
= CH₃COONa + NaOH ⎯⎯⎯⎯⎯⎯⎯→ CH₄↑ + Na₂CO₃
- **Ethyne / Acetylene (C₂H₂)**: Drop water on Calcium carbide:
= CaC₂ + 2H₂O → C₂H₂↑ + Ca(OH)₂
- Both gases are collected over water by downward displacement.

@right
@diagram esterification_reaction | Esterification Reaction | Acid + Alcohol (conc. H₂SO₄, Δ) → Ester (fruity smell) + H₂O
@diagram bromine_test_ethene | Bromine Water Test for Unsaturation | Ethene decolourizes Br₂ water • Ethane does not react in dark
@diagram lab_prep_methane | Laboratory Preparation of Methane | Sodium acetate + Soda lime (CaO + NaOH) • Collected over water

? What is the product of reaction between acetic acid and ethanol? => Ethyl ethanoate (ester) with fruity smell
? What role does concentrated H₂SO₄ play in esterification? => Acid catalyst and dehydrating agent
? Chemical test to distinguish ethane and ethene? => Bromine water test: ethene decolourizes red-brown Br₂
? Name the catalyst used in hydrogenation of vegetable oils => Finely divided Nickel (Ni) at 200°C
? Reagents for lab preparation of methane? => Sodium acetate (CH₃COONa) and Soda lime (NaOH + CaO)
? Why is CaO used along with NaOH in soda lime? => Prevents NaOH from absorbing moisture and attack on glass
? How is acetylene gas prepared in the laboratory? => Action of cold water on calcium carbide (CaC₂ + 2H₂O)

@remember Esterification yields fruity-smelling ester. Br₂ water tests for double/triple bonds. Soda lime prepares CH₄.`
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
