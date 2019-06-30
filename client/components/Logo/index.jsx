import React from 'react';
import CSSModules from 'react-css-modules';

import { LOGO_IMG } from '../../config/image';
import styles from './index.less';

const Logo = () => (
  <div styleName="layout">
    <img src={LOGO_IMG} alt="logo" />
  </div>
);

export default CSSModules(Logo, styles);
