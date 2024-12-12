import React, { useEffect, useState } from 'react';

const RssFeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch(
          'https://clinicaltrials.gov/api/rss?locStr=United+States&country=United+States&dateField=StudyFirstPostDate'
        );
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');

        const items = Array.from(xml.querySelectorAll('item')).map((item) => ({
          title: item.querySelector('title')?.textContent,
          link: item.querySelector('link')?.textContent,
          description: item.querySelector('description')?.textContent,
          pubDate: item.querySelector('pubDate')?.textContent,
        }));

        setFeedItems(items);
      } catch (err) {
        setError('Failed to fetch RSS feed. Please try again later.');
      }
    };

    fetchRSSFeed();
  }, []);

  return (
    <div className="rss-feed-page">
      <h1 className="text-2xl font-bold">Clinical Trials RSS Feed</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {feedItems.map((item, index) => (
            <li key={index} className="mb-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p>{item.description}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Read more
              </a>
              <p className="text-sm text-gray-500">Published on: {item.pubDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RssFeedPage;