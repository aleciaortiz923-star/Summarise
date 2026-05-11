import React, { useState } from 'react';

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  return (
    <div className="subscription-plans__container">
      <h2 className="subscription-plans__title">Choose the plan that fits you</h2>
      <div
        className={`subscription-plan ${selectedPlan === 'yearly' ? 'subscription-plan--selected' : ''}`}
        onClick={() => setSelectedPlan('yearly')}
      >
        <div className="subscription-plan__radio"></div>
        <div className="subscription-plan__details">
          <p className="subscription-plan__name">Premium Plus Yearly</p>
          <p className="subscription-plan__price">$99.99/year</p>
          <p className="subscription-plan__trial">7-day free trial included</p>
        </div>
      </div>
      <div className="subscription-plans__separator">or</div>
      <div
        className={`subscription-plan ${selectedPlan === 'monthly' ? 'subscription-plan--selected' : ''}`}
        onClick={() => setSelectedPlan('monthly')}
      >
        <div className="subscription-plan__radio"></div>
        <div className="subscription-plan__details">
          <p className="subscription-plan__name">Premium Monthly</p>
          <p className="subscription-plan__price">$9.99/month</p>
          <p className="subscription-plan__trial">No trial included</p>
        </div>
      </div>
      <button className="btn subscription-plans__button">
        {selectedPlan === 'yearly' ? 'Start your free 7-day trial' : 'Start your first month'}
      </button>
            <p className="subscription-plans__cancel-text">
        {selectedPlan === 'yearly'
          ? 'Cancel your trial at any time before it ends, and you won’t be charged.'
          : '30-day money back guarantee, no questions asked.'}
      </p>
    </div>
  );
};

export default SubscriptionPlans;
