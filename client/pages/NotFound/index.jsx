import React from 'react';
import CSSModules from 'react-css-modules';

import { NOT_FOUND_IMG } from '../../config/image';
import styles from './index.less';

function NotFound() {
  return (
    <div className="layout" styleName="container">
      <img styleName="not-found" src={NOT_FOUND_IMG} alt="404" />
    </div>
  );
}

export default CSSModules(NotFound, styles);
