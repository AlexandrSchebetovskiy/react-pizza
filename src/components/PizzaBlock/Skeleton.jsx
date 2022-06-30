import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={470}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="133" cy="126" r="126" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="315" rx="11" ry="11" width="280" height="90" />
    <rect x="0" y="435" rx="10" ry="10" width="90" height="30" />
    <rect x="128" y="425" rx="25" ry="25" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
