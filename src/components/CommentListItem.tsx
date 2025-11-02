import { Tooltip } from 'react-tooltip';
import type { CommentsType } from '../App';
import { truncateText } from './utils/truncateText';

interface CommentListItemProps {
  comment: CommentsType;
}

export const CommentListItem = ({ comment }: CommentListItemProps) => {
  const bodyPreview = truncateText(comment.body, 64);

  return (
    <div key={comment.id} className="px-2">
      <p className="font-bold text-xl">{comment.name}</p>
      <p className="font-medium italic">{comment.email}</p>
      <p
        className="mt-2"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={comment.body}
      >
        {bodyPreview}
      </p>
      <Tooltip id="my-tooltip" />
    </div>
  );
};
