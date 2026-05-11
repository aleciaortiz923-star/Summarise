import React, { useState } from 'react';

const Dropdown = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="dropdown">
      <div className="dropdown__header" onClick={onClick}>
        <h3 className="dropdown__title">{title}</h3>
        <span className={`dropdown__icon ${isOpen ? 'dropdown__icon--open' : ''}`}>&#9660;</span>
      </div>
      {isOpen && <div className="dropdown__content">{children}</div>}
    </div>
  );
};

const Dropdowns = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="dropdowns__container">
      <Dropdown
        title="How does the free 7-day trial work?"
        isOpen={openDropdown === 0}
        onClick={() => handleDropdownClick(0)}
      >
                <p>Begin your complimentary 7-day trial with a Summarist annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.</p>
      </Dropdown>
      <Dropdown
        title="Can I switch subscriptions from monthly to yearly, or yearly to monthly?"
        isOpen={openDropdown === 1}
        onClick={() => handleDropdownClick(1)}
      >
                <p>While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.</p>
      </Dropdown>
      <Dropdown
        title="What's included in the premium plan?"
        isOpen={openDropdown === 2}
        onClick={() => handleDropdownClick(2)}
      >
                <p>Premium membership provides you with the ultimate Summarist experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.</p>
      </Dropdown>
      <Dropdown
        title="Can I cancel during my trial or subscription?"
        isOpen={openDropdown === 3}
        onClick={() => handleDropdownClick(3)}
      >
                <p>You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire Summarist library, you can still expand your knowledge with one curated book per day.</p>
      </Dropdown>
    </div>
  );
};

export default Dropdowns;
