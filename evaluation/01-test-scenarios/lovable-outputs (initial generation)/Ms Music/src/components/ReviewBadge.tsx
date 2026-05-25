interface ReviewBadgeProps {
  score: number;
  label?: string;
}

const ReviewBadge = ({ score, label }: ReviewBadgeProps) => {
  const tier = score >= 8 ? "high" : score >= 5 ? "mid" : "low";
  return (
    <span className={`score-badge score-badge-${tier}`}>
      {label || `${score}/10`}
    </span>
  );
};

export default ReviewBadge;
