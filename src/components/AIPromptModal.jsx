import React, { useState } from 'react';
import { X, Copy, Check, Sparkles } from 'lucide-react';

export default function AIPromptModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [subject, setSubject] = useState('Life Science');
  const [chapter, setChapter] = useState('Chapter 3: Heredity and Common Genetic Diseases');
  const [copied, setCopied] = useState(false);

  const promptTemplate = `Make revision notes for Class 10 WBBSE Madhyamik students for ${subject} — ${chapter}. Output ONLY in the text format below, one block per page.

CONTENT RULES:
1. Include only what the West Bengal Board (WBBSE) asks. Every point must match a PYQ question that has been asked (2017-2026), or be needed to understand one. Leave out history, names, years, and extra book matter unless specifically asked in exams.
2. Very simple English, short points (max 15 words), no heavy words. Explain with "Why?" where board marks are given.
3. No solved numericals. Give theory, formulas, units, graphs, and key points only.
4. Every page: 1 page = 1 or 2 topics, about 5 sections, a Madhyamik Important box (7 to 9 questions with answers taken from the PYQ), and one Remember note.
5. Graphs: use only @graph (hyperbola, horizontal, origin, intercept).
6. Diagrams: use @diagram with type:
   - Optics: concave_mirror_beyond_c, convex_mirror, convex_lens, concave_lens, glass_slab, prism, prism_dispersion
   - Current Electricity: circuit_ohms_law, resistors_series, resistors_parallel, right_hand_thumb_rule, circular_loop_field, solenoid_field, flemings_left_hand_rule, electric_motor, electromagnetic_induction, domestic_circuit, three_pin_plug
   - Organic Chemistry: carbon_tetrahedron, isomerism_butane, functional_groups, ethanol_structure, ethanoic_acid_structure, ethanal_structure, propanone_structure, hydrocarbon_types, esterification_reaction, bromine_test_ethene, lab_prep_methane, lab_prep_acetylene, ethene_hydrogenation
   - Chemical Bonding & Electrolysis: ionic_NaCl, ionic_CaO, covalent_H2O_dot, covalent_CH4_dash, electrolysis_water, plating_silver, copper_refining
7. Write fractions inline like V/T and 1/273. Use {a/b} only inside the main formulas. Subscripts and superscripts in unicode (O₂, 10⁵).
8. If the book has an error or you are unsure of a value, say so after the pages instead of guessing.

FORMAT:
@chapter Chapter N: Name   (once at the top)
=== PAGE ===
@title ...
@left
# Sub-heading
- bullet
> law or definition box
= formula chip
! note box
@right
@table Title
| a | b |
@graph kind | Title | x label | y label | caption
@diagram type | Title | Caption
? Question => Answer
@remember text
Inline: ==highlight==, **bold**, {1/P}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-amber-500" />
            <h2 className="modal-title">AI Prompt Generator for Any Subject</h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Need notes for a new chapter? Select or enter any subject & chapter below.
            Copy this calibrated prompt into ChatGPT, Gemini, or Claude, and paste its output directly into the Notes Studio editor!
          </p>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Select / Enter Subject</label>
              <select
                className="form-select"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="Physical Science">Physical Science (ভৌত বিজ্ঞান)</option>
                <option value="Life Science">Life Science (জীবন বিজ্ঞান)</option>
                <option value="History">History (ইতিহাস)</option>
                <option value="Geography">Geography (ভূগোল)</option>
                <option value="Mathematics">Mathematics (গণিত)</option>
                <option value="English">English</option>
              </select>
            </div>

            <div className="form-group flex-2">
              <label className="form-label">Chapter Title / Number</label>
              <input
                type="text"
                className="form-input"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                placeholder="e.g. Chapter 5: Light or Chapter 3: Heredity"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="flex items-center justify-between mb-1">
              <label className="form-label">Generated AI Prompt (Click Copy & Run in AI):</label>
              <button
                className={`btn btn-sm ${copied ? 'btn-success' : 'btn-primary'}`}
                onClick={handleCopy}
              >
                {copied ? <><Check size={14} /> Copied to Clipboard!</> : <><Copy size={14} /> Copy Prompt</>}
              </button>
            </div>
            <textarea
              className="prompt-preview-textarea"
              readOnly
              value={promptTemplate}
              rows={12}
            />
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className={`btn ${copied ? 'btn-success' : 'btn-primary'}`}
            onClick={handleCopy}
          >
            {copied ? <><Check size={16} /> Copied!</> : <><Copy size={16} /> Copy AI Prompt</>}
          </button>
        </div>
      </div>
    </div>
  );
}
