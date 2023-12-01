import * as React from 'react';
import Header from './layout/Header'
import withRoot from './modules/withRoot';

function Index() {
  return (
    <React.Fragment>
      <Header />
    </React.Fragment>
  );
}

export default withRoot(Index);