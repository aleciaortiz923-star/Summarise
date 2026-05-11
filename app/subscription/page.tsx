'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import SubscriptionHeader from '@/components/SubscriptionHeader';
import SubscriptionFeatures from '@/components/SubscriptionFeatures';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import Dropdowns from '@/components/Dropdowns';
import Footer from '@/components/Footer';

const SubscriptionPage = () => {
  const router = useRouter();

  return (
    <div>
      <SubscriptionHeader />
      <SubscriptionFeatures />
      <div className="subscription-plans">
          <SubscriptionPlans />
          <Dropdowns />
        </div>
        <Footer />
    </div>
  );
};

export default SubscriptionPage;
