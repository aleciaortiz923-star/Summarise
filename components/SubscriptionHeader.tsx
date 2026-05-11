'use client';

import React from 'react';
import Image from 'next/image';

const SubscriptionHeader = () => {
  return (
    <div className="subscription-header">
      <div className="subscription-header__content">
        <h1 className="subscription-header__title">
          Get unlimited access to many amazing books to read
        </h1>
        <p className="subscription-header__subtitle">
          Turn ordinary moments into amazing learning opportunities
        </p>
      </div>
      <div className="subscription-header__bottom-shape">
        <Image src="/assets/pricing-top.png" alt="Get unlimited access to many amazing books to read" width={300} height={300} className="subscription-header__image" />
      </div>
            
    </div>
  );
};

export default SubscriptionHeader;
