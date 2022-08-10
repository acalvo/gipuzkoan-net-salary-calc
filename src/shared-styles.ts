import { css } from 'lit';

export const inputNumberStyles = css`
  input[type='number'] {
    background-color: transparent;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: inherit;
    font-size: 100%;
    outline: none;
    padding: .5em;
  }

  input[type='number'][disabled] {
    cursor: not-allowed;
    opacity: .3;
  }

  input[type='number']:hover:not([disabled]):not(:focus) {
    border-color: #b5b5b5;
  }

  input[type='number']:not([disabled]):focus,
  input[type='number']:not([disabled]):active {
    border-color: var(--primary-color);
    box-shadow: 0 0 .2em rgba(50,115,220,.25);
  }
`;

export const inputCheckboxStyles = css`
  input[type='checkbox']:hover + label::before {
    border-color: #b5b5b5;
  }

  input[type='checkbox']:focus + label::before,
  input[type='checkbox']:active + label::before {
    border-color: var(--primary-color);
    box-shadow: 0 0 .2em rgba(50,115,220,.25);
  }

  input[type='checkbox'] {
    opacity: 0;
    position: absolute;
  }

  input[type='checkbox'] + label {
    cursor: pointer;
    margin: .5em .5em .5em 0;
    padding: .2rem .2rem .2rem 2em;
    position: relative;
    vertical-align: middle;
  }

  input[type='checkbox'] + label::before {
    border: 1px solid var(--border-color);
    border-radius: 4px;
    content: '';
    height: 1.5em;
    left: 0;
    position: absolute;
    top: 0;
    width: 1.5em;
  }

  input[type='checkbox']:checked + label::after {
    border-style: solid;
    border-width: 0 1px 1px 0;
    content: '';
    display: inline-block;
    height: .6rem;
    left: .6rem;
    position: absolute;
    top: .4rem;
    transform: rotate(45deg);
    width: .3rem;
  }
`;
