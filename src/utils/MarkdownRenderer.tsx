import React from "react";
import { marked } from "marked";

const MarkdownRenderer: React.FC<{ markdownContent: string }> = ({ markdownContent }) => {
  // Converte o Markdown para HTML
  const htmlContent = marked.parse(markdownContent || "");

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownRenderer;
