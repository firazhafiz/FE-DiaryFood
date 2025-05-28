const FeedbackSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
    {/* Header skeleton */}
    <div className="flex flex-col p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-slate-200"></div>
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-slate-200 rounded"></div>
        <div className="h-3 bg-slate-200 rounded w-1/3"></div>
      </div>
      <div className="flex items-center mt-2">
        <div className="w-4 h-4 bg-slate-200 rounded mr-2"></div>
        <div className="h-3 bg-slate-200 rounded w-1/4"></div>
      </div>
    </div>
    {/* Content skeleton */}
    <div className="p-4">
      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="bg-slate-50 rounded-lg p-3">
        <div className="h-3 bg-slate-200 rounded mb-1"></div>
        <div className="h-3 bg-slate-200 rounded mb-1"></div>
        <div className="h-3 bg-slate-200 rounded w-2/3"></div>
      </div>
    </div>
  </div>
);

export default FeedbackSkeleton;
