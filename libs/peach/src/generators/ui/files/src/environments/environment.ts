// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export interface Environment {
  production: boolean;
  test_variable: string;
}

export const environment: Environment = {
  production: false,
  test_variable: "Hello default",
};
