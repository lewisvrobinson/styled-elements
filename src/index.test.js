import { styled, createElement, applyStyle } from '../src/index.js';

describe('styled', () => {
  const styledElement = styled.div`
    background: red;
    padding: ${'2em'};
    margin: ${() => `2em ${1}em`};
  `;
  const existingElement = document.createElement('button');
  const styledExistingElement = styled(existingElement)`
    background: red;
    padding: ${'2em'};
    margin: ${() => `2em ${1}em`};
  `;

  it('should render the correct element', () => {
    expect(styledElement.tagName).toBe('DIV');
  });

  it('should apply basic styles to an element', () => {
    const computed = window.getComputedStyle(styledElement);
    expect(computed.background).toBe('red');
  });

  it('should apply interpolated styles', () => {
    const computed = window.getComputedStyle(styledElement);
    expect(computed.padding).toBe('2em');
    expect(computed.margin).toBe('2em 1em');
  });

  it('should style an existing element', () => {
    const computed = window.getComputedStyle(styledExistingElement);
    expect(computed.padding).toBe('2em');
  });
});

describe('createElement', () => {
  const element = createElement('span', 'background: red');
  it('should create correct element', () => {
    expect(element.tagName).toBe('SPAN');
  });
});

describe('applyStyle', () => {
  it('should create a style block', () => {
    const block = document.head.querySelector('[data-styled-element]');
    expect(block).toBeDefined();
  });
  it('should apply the class to the element', () => {});
});
