import type { NextApiRequest, NextApiResponse } from 'next';

interface FeedbackResponse {
  success: boolean;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedbackResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  const { page, rating, comment, email } = req.body;

  // Validate required fields
  if (!page || typeof page !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Page URL is required.',
    });
  }

  if (rating === undefined || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({
      success: false,
      message: 'Rating must be a number between 1 and 5.',
    });
  }

  // Optional email validation
  if (email && typeof email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }
  }

  // In production, this would store feedback in a database or send to an analytics service
  console.log(`Feedback received:`, {
    page,
    rating,
    comment: comment || '',
    email: email || '',
    timestamp: new Date().toISOString(),
  });

  return res.status(200).json({
    success: true,
    message: 'Thank you for your feedback! It helps us improve our Spain travel guides.',
  });
}
