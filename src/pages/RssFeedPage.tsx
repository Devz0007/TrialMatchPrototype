import React, { useEffect, useState } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';

const RssFeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [filteredFeedItems, setFilteredFeedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState(null);

  // Fetch RSS Feed
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
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '',
          description: item.querySelector('description')?.textContent || '',
          pubDate: item.querySelector('pubDate')?.textContent || '',
        }));

        setFeedItems(items);
        setFilteredFeedItems(items);
      } catch (err) {
        setError('Failed to fetch RSS feed. Please try again later.');
      }
    };

    fetchRSSFeed();
  }, []);

  // Filter Items
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    const filtered = feedItems.filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
    );

    setFilteredFeedItems(filtered);
  };

  // Sort Items by Date
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sorted = [...filteredFeedItems].sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredFeedItems(sorted);
  };

  return (
    <div className="min-h-screen bg-neutral-lightest pb-16 md:pb-8 md:pt-8">
      <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-8">
        <div className="flex justify-between items-center p-4 md:mb-4 bg-white border-b">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-primary">
              Clinical Trials RSS Feed
            </h1>
            <p className="text-sm text-neutral hidden md:block">
              Browse and filter the latest studies
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 border mb-4">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-neutral focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light text-sm"
              placeholder="Search RSS feeds..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Sort Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={toggleSortDirection}
            className="flex items-center px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-100"
          >
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Sort by Date ({sortDirection === 'desc' ? 'Newest' : 'Oldest'})
          </button>
        </div>

        {/* Feed Items */}
        {error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredFeedItems.map((item, index) => (
              <li key={index} className="p-4 shadow-md rounded-lg bg-white">
                <h2 className="text-lg font-semibold text-primary">{item.title}</h2>
                <div
                  className="text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  Read more
                </a>
                <p className="text-sm text-gray-500 mt-2">Published on: {item.pubDate}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RssFeedPage;
