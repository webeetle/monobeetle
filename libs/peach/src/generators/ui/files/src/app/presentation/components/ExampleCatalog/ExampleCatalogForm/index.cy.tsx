import * as React from 'react';
import ExampleCatalogForm from './index';

describe(ExampleCatalogForm.name, () => {
  it('renders', () => {
    cy.mount(<ExampleCatalogForm />);
  });
});
