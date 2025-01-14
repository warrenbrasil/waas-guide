import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '@/utils/MarkdownRenderer';

const Home: React.FC = () => {
  const { page = '' } = useParams<{ page: string }>();
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/pages/${page}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [page, setContent]); // Apenas executa quando `page` mudar

  return (
    <div className='text-foreground max-w-7xl mx-auto'>
      <MarkdownRenderer markdownContent={content} />
    </div>
  );
};

export default Home;
