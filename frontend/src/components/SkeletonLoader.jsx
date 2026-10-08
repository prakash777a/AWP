import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'card', count = 1, style }) => {
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      if (type === 'card') {
        skeletons.push(
          <div key={i} className="skeleton-wrapper card-skeleton" style={style}>
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-title"></div>
              <div className="skeleton-line" style={{ width: '80%' }}></div>
              <div className="skeleton-line" style={{ width: '60%' }}></div>
              <div className="skeleton-footer">
                <div className="skeleton-button"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          </div>
        );
      } else if (type === 'row') {
        skeletons.push(
          <div key={i} className="skeleton-wrapper row-skeleton" style={style}>
            <div className="skeleton-avatar"></div>
            <div className="skeleton-content">
              <div className="skeleton-line" style={{ width: '40%' }}></div>
              <div className="skeleton-line" style={{ width: '75%' }}></div>
            </div>
          </div>
        );
      } else if (type === 'text') {
        skeletons.push(
          <div key={i} className="skeleton-line" style={{ ...style, marginBottom: '8px' }}></div>
        );
      }
    }
    return skeletons;
  };

  return <>{renderSkeletons()}</>;
};

export default SkeletonLoader;
