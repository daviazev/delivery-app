import React from 'react';
import PropTypes from 'prop-types';
import adminManageContext from './Context';

export default function Provider({ children }) {
  return (
    <adminManageContext.Provider>
      {children}
    </adminManageContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
