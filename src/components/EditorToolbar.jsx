import React from 'react';
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
  Divide
} from 'lucide-react';

export default function EditorToolbar({ onInsertText }) {
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
