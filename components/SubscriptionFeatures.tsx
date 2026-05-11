import React from 'react';
import Image from 'next/image';

const SubscriptionFeatures = () => {
  return (
    <div className="subscription-features">
      <div className="subscription-feature">
        <div className="subscription-feature__icon">
          <Image src="https://cdn-icons-png.flaticon.com/128/2258/2258853.png" alt="Key ideas in few min" width={60} height={60} />
        </div>
        <p className="subscription-feature__text">
          <strong>Key ideas in few min</strong> with many books to read
        </p>
      </div>
      <div className="subscription-feature">
        <div className="subscription-feature__icon">
          <Image src="https://cdn-icons-png.flaticon.com/128/1892/1892751.png" alt="3 million people growing" width={60} height={60} />
        </div>
        <p className="subscription-feature__text">
          <strong>3 million</strong> people growing with Summarist everyday
        </p>
      </div>
      <div className="subscription-feature">
        <div className="subscription-feature__icon">
          <Image src="https://cdn-icons-png.flaticon.com/128/1006/1006555.png" alt="Precise recommendations" width={60} height={60} />
        </div>
        <p className="subscription-feature__text">
          <strong>Precise recommendations</strong> collections curated by experts
        </p>
      </div>
    </div>
  );
};

export default SubscriptionFeatures;
