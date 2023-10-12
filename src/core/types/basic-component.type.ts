import { CSSProperties, ReactNode } from 'react';

export interface BasicComponent {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
}

export const basicComponentDefaults: Partial<BasicComponent> = {
  className: '',
  style: {},
};
