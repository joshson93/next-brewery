import React from 'react';
import { INTRODUCTION } from './constants';
import BreweryTable from '../../BreweryTable/src';
import { ErrorBoundary } from 'react-error-boundary';
import DisplayError from './DisplayError';
// import fetchPost from '../../../../utils/fetchPost';

const HomePage: React.FC = () => {
  return (
    <div>
      {INTRODUCTION}
      <ErrorBoundary FallbackComponent={DisplayError}>
        <BreweryTable />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
