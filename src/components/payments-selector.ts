import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('payments-selector')
export class PaymentsSelector extends LitElement {
  static styles = [
    css`
      :host {
        display: flex;
      }
      input[type='radio'] {
        clip: rect(0, 0, 0, 0);
        position: absolute;
      }
      label {
        border: 1px solid var(--border-color);
        padding: .5em 1em;
      }
      label:hover {
        border-color: #b5b5b5;
      }
      label:focus-within {
        border-color: var(--primary-color);
        box-shadow: 0 0 .2em rgba(50,115,220,.25);
      }
      label.selected {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        color: #ffffff;
      }
      label:first-child {
        border-radius: 4px 0 0 4px;
      }
      label:last-child {
        border-radius: 0 4px 4px 0;
      }
    `,
  ];

  @state()
  payments = 12;

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('payments')) {
      this.dispatchEvent(new CustomEvent('paymentschange', {
        detail: {
          payments: this.payments,
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  private setPayments(event: Event) {
    this.payments = Number((event.target as HTMLInputElement).value);
  }

  render() {
    return html`
      <label class=${this.payments===12 ? 'selected' : '' }>
        <input type="radio" name="payments" value="12" @change=${this.setPayments}>
        12 pagas
      </label>
      <label class=${this.payments===14 ? 'selected' : '' }>
        <input type="radio" name="payments" value="14" class=${this.payments===14 ? 'selected' : '' }
          @change=${this.setPayments}>
        14 pagas
      </label>
    `;
  }
}
