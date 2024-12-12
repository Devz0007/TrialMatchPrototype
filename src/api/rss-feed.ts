import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://clinicaltrials.gov/ct2/resources/trending/rss');
    const text = await response.text();

    // Parse RSS feed using an RSS parser library
    const feed = await parseRSS(text); // Replace with your RSS parsing logic
    res.status(200).json({ items: feed.items });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).json({ error: 'Failed to fetch RSS feed' });
  }
}