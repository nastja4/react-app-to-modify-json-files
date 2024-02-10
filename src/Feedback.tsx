import React from 'react';

interface FeedbackProps {
  message: string;
}

const Feedback: React.FC<FeedbackProps> = ({ message }) => {
  return (
    <div>
      {message}
    </div>
  );
};

export default Feedback;
