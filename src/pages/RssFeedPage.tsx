import React, { useEffect, useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

// Categories and Keywords
const categories = {
  OCD: ['OCD', 'Obsessive Compulsive Disorder', 'Compulsion'],
  Neurology: ['Neurology', 'Brain', 'Neurodegenerative', 'CNS', 'Central Nervous System'],
  Immunology: ['Immunology', 'Immunotherapy', 'Antibodies', 'Inflammation', 'Autoimmune'],
  Pediatrics: ['Pediatrics', 'Children', 'Infants', 'Pediatric', 'Neonatal'],
  'Infectious Diseases': ['Infectious Disease', 'Infection', 'Virus', 'Bacterial', 'Viral'],
  'Metabolic Disorders': ['Metabolic', 'Diabetes', 'Obesity', 'Endocrine'],
  Cardiology: ['Cardiology', 'Heart', 'Cardiac', 'Cardiovascular', 'Arrhythmia', 'Atherosclerosis'],
  Oncology: ['Oncology', 'Cancer', 'Tumor', 'Neoplasm', 'Chemotherapy', 'Radiotherapy'],
  'Rare Diseases': ['Rare Diseases', 'Orphan Diseases', 'Genetic Disorders', 'Undiagnosed Diseases'],
  Others: ['Other', 'Miscellaneous', 'Unknown', 'General'],
};

const RssFeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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

        // Categorize items based on title/description
        const categorizedItems = items.map((item) => {
          const category = Object.keys(categories).find((category) =>
            categories[category].some((keyword) =>
              item.title.toLowerCase().includes(keyword.toLowerCase()) ||
              item.description.toLowerCase().includes(keyword.toLowerCase())
            )
          );

          return {
            ...item,
            category: category || 'Others', // Default to 'Others' if no match
          };
        });

        setFeedItems(categorizedItems);
        setFilteredItems(categorizedItems);
      } catch (err) {
        setError('Failed to fetch RSS feed. Please try again later.');
      }
    };

    fetchRSSFeed();
  }, []);

  // Filter by category
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setCurrentPage(1);

    if (category === '') {
      setFilteredItems(feedItems);
    } else {
      const filtered = feedItems.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  // Sort by Date
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sorted = [...filteredItems].sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return newDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

    setFilteredItems(sorted);
  };

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-neutral-lightest pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-xl md:text-3xl font-bold text-primary mb-4">
          Clinical Trials RSS Feed
        </h1>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-4 items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Categories</option>
            {Object.keys(categories).map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            onClick={toggleSortDirection}
            className="flex items-center px-4 py-2 border rounded-md"
          >
            <ArrowUpDown className="mr-2" />
            Sort by Date ({sortDirection === 'asc' ? 'Oldest' : 'Newest'})
          </button>
        </div>

        {/* RSS Items */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentItems.map((item, index) => (
            <li key={index} className="p-4 bg-white shadow rounded-md">
              <h2 className="font-bold text-lg">{item.title}</h2>
              <p
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-2"
              >
                Read more
              </a>
              <p className="text-sm text-gray-500">Published on: {item.pubDate}</p>
              <p className="text-xs text-gray-500">Category: {item.category}</p>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md"
          >
            <ChevronLeft />
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RssFeedPage;