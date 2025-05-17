
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface CourseRatingProps {
  courseId: string;
  initialRating?: number;
}

const CourseRating = ({ courseId, initialRating = 0 }: CourseRatingProps) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleMouseOver = (starIndex: number) => {
    if (!submitted) {
      setHoveredRating(starIndex);
    }
  };

  const handleMouseLeave = () => {
    if (!submitted) {
      setHoveredRating(null);
    }
  };

  const handleClick = (starIndex: number) => {
    if (!submitted) {
      setRating(starIndex);
    }
  };

  const handleSubmit = () => {
    // In a real application, this would make an API call
    console.log('Submitting rating:', rating, 'with feedback:', feedback);
    
    toast({
      title: "Rating submitted!",
      description: "Thank you for your feedback",
    });
    
    setSubmitted(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Rate this Course</h3>
      
      {submitted ? (
        <div className="p-4 bg-muted rounded-md">
          <p className="text-center">Thank you for your rating!</p>
          <div className="flex justify-center mt-2">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                className="h-6 w-6 text-yellow-400"
                fill={starIndex <= rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((starIndex) => (
              <Star
                key={starIndex}
                className={`h-8 w-8 cursor-pointer ${
                  starIndex <= (hoveredRating ?? rating) ? "text-yellow-400" : "text-gray-300"
                }`}
                fill={starIndex <= (hoveredRating ?? rating) ? "currentColor" : "none"}
                onMouseOver={() => handleMouseOver(starIndex)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(starIndex)}
              />
            ))}
          </div>
          
          <Textarea
            placeholder="Share your thoughts about this course (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="resize-none h-24"
          />
          
          <Button 
            onClick={handleSubmit} 
            disabled={rating === 0}
            className="w-full"
          >
            Submit Rating
          </Button>
        </>
      )}
    </div>
  );
};

export default CourseRating;
