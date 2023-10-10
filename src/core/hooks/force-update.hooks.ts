import React from 'react';

export default function useForceUpdate() {
  const [, updateState] = React.useState();
  return React.useCallback(() => updateState({} as any), []);
}
