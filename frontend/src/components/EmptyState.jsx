import React from 'react';
import { PackageSearch, CalendarX, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import './EmptyState.css';

const EmptyState = ({ type = 'default', title, description, actionText, actionLink, actionOnClick }) => {
  
  const getConfig = () => {
    switch (type) {
      case 'packages':
        return {
          icon: <PackageSearch size={48} />,
          defaultTitle: 'No tours found',
          defaultDesc: 'Try changing your search or filters to find what you are looking for.',
        };
      case 'bookings':
        return {
          icon: <CalendarX size={48} />,
          defaultTitle: 'No bookings yet',
          defaultDesc: 'Explore our packages and start planning your next adventure.',
        };
      case 'reviews':
        return {
          icon: <MessageSquare size={48} />,
          defaultTitle: 'No reviews yet',
          defaultDesc: 'Be the first to leave a review for this package.',
        };
      case 'error':
        return {
          icon: <AlertCircle size={48} />,
          defaultTitle: 'An error occurred',
          defaultDesc: 'We encountered a problem loading this data.',
        };
      default:
        return {
          icon: <RefreshCw size={48} />,
          defaultTitle: 'Nothing here',
          defaultDesc: 'There is currently no data available in this section.',
        };
    }
  };

  const config = getConfig();

  return (
    <div className="empty-state-container animate-fade-in">
      <div className={`empty-state-icon empty-state-icon-${type}`}>
        {config.icon}
      </div>
      <h3 className="empty-state-title">{title || config.defaultTitle}</h3>
      <p className="empty-state-desc">{description || config.defaultDesc}</p>
      
      {(actionLink && actionText) ? (
        <Link to={actionLink} className="btn btn-primary mt-4">
          {actionText}
        </Link>
      ) : actionOnClick && actionText ? (
        <button onClick={actionOnClick} className="btn btn-primary mt-4">
          {actionText}
        </button>
      ) : null}
    </div>
  );
};

export default EmptyState;
