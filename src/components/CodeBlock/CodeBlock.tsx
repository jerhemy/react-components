import React, { useState } from 'react';
import './CodeBlock.css';

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language-tag">{language}</span>
        <button 
          className="copy-button"
          onClick={copyToClipboard}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre>
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock; 