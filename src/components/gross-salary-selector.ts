import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { inputNumberStyles } from '../shared-styles';

@customElement('gross-salary-selector')
export class GrossSalarySelector extends LitElement {
  static styles = [
    inputNumberStyles,
    css`
      input {
        margin-left: 16px;
        width: 115px;
      }
    `,
  ];

  @state()
  salary = 0;

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('salary')) {
      this.dispatchEvent(new CustomEvent('salarychange', {
        detail: {
          salary: this.salary,
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  private setSalary(event: Event) {
    this.salary = Number((event.target as HTMLInputElement).value);
  }

  render() {
    return html`
      <label>
        Sueldo bruto anual
        <input type="number" step="1000" value="0" min="0" @input=${this.setSalary}>
      </label>
    `;
  }
}
