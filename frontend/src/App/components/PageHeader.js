import React from 'react'


export default function PageHeader() {
    return (
      <div className="page-header">
        <h2 className="page-header__text text-size-2">
          Please select an option to the left.
        </h2>
        <span className="page-header__text--emoji text-size-0">
          <span role="img" aria-label="email emoji">
            👈
          </span>
        </span>
      </div>
    );
}