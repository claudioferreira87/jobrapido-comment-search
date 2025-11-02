interface LoadingProps {
  message?: string;
}

export const Loading = ({ message }: LoadingProps) => {
  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="rounded-xl p-8 flex flex-col items-center gap-5">
        <svg className="w-20 h-20 animate-spin" viewBox="0 0 50 50">
          <title>Loading component</title>
          <circle
            className="stroke-gray-200"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
          ></circle>
          <circle
            className="stroke-blue-600"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            strokeDasharray="80, 200"
            strokeLinecap="round"
          ></circle>
        </svg>
        <p className="font-medium text-center">{message}</p>
      </div>
    </div>
  );
};
