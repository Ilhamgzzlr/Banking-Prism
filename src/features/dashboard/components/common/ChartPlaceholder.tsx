interface ChartPlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
}

const ChartPlaceholder = ({
  width = 800,
  height = 400,
  className = ""
}: ChartPlaceholderProps) => {
  return (
    <div className={`bg-gray-100 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-center">
        <div 
          className="bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <div className="text-center">
            <div className="text-gray-500 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 mt-1">{width} × {height} px</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;