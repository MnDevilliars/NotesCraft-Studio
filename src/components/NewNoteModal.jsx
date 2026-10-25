import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, FileText } from 'lucide-react';

export default function NewNoteModal({ isOpen, onClose, onCreateNew, onOpenAIPrompt }) {
  const [subject, setSubject] = useState('Life Science');
  const [chapterNumber, setChapterNumber] = useState('3');
  const [chapterName, setChapterName] = useState('Heredity and Common Genetic Diseases');
  const [pageTitle, setPageTitle] = useState("Mendel's Laws of Inheritance");

  if (!isOpen) return null;

  const handleCreate = (type = 'blank') => {
    const starterTemplate = `@chapter Chapter ${chapterNumber}: ${chapterName}
=== PAGE ===
@title ${pageTitle}
@left
# 1. Introduction & Key Definitions
> Write core law or official board definition here.
- Short point 1 (max 15 words)
- Short point 2 (explain with "Why?" where marks are given)
= Formula or Key Relation
! Note: Important exception or board tip.

# 2. Main Characteristics / Properties
- Point 1
- Point 2
- Point 3

@right
@graph origin | Graph Title | X Label | Y Label | Caption
@diagram concave_mirror_beyond_c | Concave Mirror (Beyond C) | Real, inverted, diminished image between C & F

@table Comparison Matrix
| Column 1 | Column 2 | Column 3 |
| Item A   | Feature 1 | Value X  |
| Item B   | Feature 2 | Value Y  |

? Board PYQ Question 1? => High-scoring direct answer
? Board PYQ Question 2? => High-scoring direct answer
? Board PYQ Question 3? => High-scoring direct answer

@remember Key takeaway and formula summary for exam morning.
`;

    onCreateNew(starterTemplate);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <PlusCircle size={20} className="text-blue-500" />
            <h2 className="modal-title">Create New Revision Notes</h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Choose your subject and chapter details. A pre-formatted notebook template will be created in the editor, ready for you to fill in.
          </p>

          <div className="form-group">
            <label className="form-label">Subject</label>
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
              <option value="Other">Other / Custom Subject</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label className="form-label">Chapter No.</label>
              <input
                type="text"
                className="form-input"
                value={chapterNumber}
                onChange={(e) => setChapterNumber(e.target.value)}
                placeholder="e.g. 3"
              />
            </div>
            <div className="form-group flex-2">
              <label className="form-label">Chapter Name</label>
              <input
                type="text"
                className="form-input"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                placeholder="e.g. Heredity and Genetic Diseases"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Page 1 Topic Title</label>
            <input
              type="text"
              className="form-input"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="e.g. Mendel's Laws of Inheritance"
            />
          </div>

          <div className="branding-preview-card mt-2">
            <div className="preview-label">How would you like to build these notes?</div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => handleCreate('blank')}
              >
                <FileText size={15} /> Start with Blank Template
              </button>
              <button
                type="button"
                className="btn nav-btn-ai flex-1"
                onClick={() => {
                  onClose();
                  onOpenAIPrompt();
                }}
              >
                <Sparkles size={15} /> Generate with AI Prompt
              </button>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
