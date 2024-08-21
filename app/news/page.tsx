import type { Metadata } from 'next';

// add metadata title for the news page 
export const metadata: Metadata = {
  title: 'News',
}

// create a component for the news page
const NewsPage = () => {
  return <div>News Page</div>;
};

export default NewsPage;
