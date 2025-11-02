import { MessageCircleMore } from 'lucide-react';
import type { CommentsType } from '../App';
import { CommentListItem } from './CommentListItem';

interface CommentListProps {
  comment: CommentsType;
}

export const CommentList = ({ comment }: CommentListProps) => {
  return (
    <div className="border-t p-4 mb-3">
      <div className="flex items-start gap-3">
        <div className="rounded-sm shadow-md shadow-blue-800">
          <MessageCircleMore size={32} />
        </div>
        <div className="flex-1">
          <CommentListItem comment={comment} />
        </div>
      </div>
    </div>
  );
};
