// color/Color.types.ts

export interface ColorToken {
    [key: string]: string;
  }
  
  export interface GradientToken {
    primary_gradient: string[];
    subtle_gradient: string[];
  }
  

  export type CWColor = keyof ColorToken;
