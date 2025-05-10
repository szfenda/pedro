import type { FC } from 'react';

const Loader: FC = () => (
  <div className="pedro-loader">
    <div className="raccoon"></div>
    <div className="percent">%</div>
    <div className="loader-text">Ładujemy okazje dla Ciebie...</div>
  </div>
);

export default Loader; 