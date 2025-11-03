import { Tooltip } from 'react-tooltip';
import type { CommentsType } from '../App';
import { truncateText } from './utils/truncateText';

interface CommentListItemProps {
  comment: CommentsType;
}

export const CommentListItem = ({ comment }: CommentListItemProps) => {
  const bodyPreview = truncateText(comment.body, 64);

  const tooltipStyle = {
    fontFamily: 'Geist',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    borderRadius: '0.5rem',
    maxWidth: '400px',
    backgroundColor: '#2d2d2d',
    border: '1px solid #404040',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    fontWeight: '400',
    color: '#e5e5e5',
    padding: '0.75rem 1rem',
  };

  return (
    <article key={comment.id} className="px-2">
      <p className="font-bold text-xl">{comment.name}</p>
      <p className="font-medium italic">{comment.email}</p>
      <Tooltip style={tooltipStyle} id="my-tooltip" />
      <p
        data-testid="body"
        className="mt-2"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={comment.body}
      >
        {bodyPreview}
      </p>
    </article>
  );
};
