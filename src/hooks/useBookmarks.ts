import { useState, useEffect } from 'react';

export function useBookmarks() {
  const [bookmarkedRfps, setBookmarkedRfps] = useState<string[]>(() => {
    const saved = localStorage.getItem('bookmarkedRfps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookmarkedRfps', JSON.stringify(bookmarkedRfps));
  }, [bookmarkedRfps]);

  const toggleBookmark = (idctgov: string) => {
    setBookmarkedRfps(prev => 
      prev.includes(idctgov)
        ? prev.filter(id => id !== idctgov)
        : [...prev, idctgov]
    );
  };

  return {
    bookmarkedRfps,
    toggleBookmark,
    isBookmarked: (id: string) => bookmarkedRfps.includes(id)
  };
}