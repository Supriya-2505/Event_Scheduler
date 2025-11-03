import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ title, value, icon, color, trend, trendValue }) => {
  return (
    <div className={`summary-card ${color}`}>
      <div className="summary-card-content">
        <div className="summary-card-header">
          <div className="summary-card-icon">
            {icon}
          </div>
          <div className="summary-card-info">
            <h3 className="summary-card-title">{title}</h3>
            <p className="summary-card-value">{value}</p>
          </div>
        </div>
        
        {trend && (
          <div className="summary-card-trend">
            <span className={`trend-indicator ${trend > 0 ? 'positive' : 'negative'}`}>
              {trend > 0 ? '↗' : '↘'} {Math.abs(trendValue)}%
            </span>
            <span className="trend-text">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
