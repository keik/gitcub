import * as React from 'react';

export interface Props {
  name: string;
}

function Hello({ name }: Props) {
  return (
    <div className="hello">
      <div className="greeting">
        Hello {name}
      </div>
    </div>
  );
}

export default Hello;

