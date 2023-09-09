import './gross-salary-selector';
import './irpf-selector';
import './payments-selector';
import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('net-salary-calculator')
export class NetSalaryCalculator extends LitElement {
  static styles = [
    css`
      div {
          align-items: center;
          display: flex;
          justify-content: center;
          margin-bottom: 8px;
      }
      hr {
        background-color: var(--border-color);
        border: none;
        display: block;
        height: 2px;
        margin: 1.5em 0;
      }
      p {
        font-size: 1.25em;
        font-weight: 300;
        margin: 0;
      }
      strong {
        font-weight: 600;
      }
    `,
  ];

  @state()
  salary = 0;

  @state()
  irpf = 0;

  @state()
  payments = 12;

  MAXIMUM_SS_ANNUAL_QUOTE = 4495.50 * 12;
  SS_CONTRIBUTION_RATE = 0.0645;
  netSalary = 0;

  private setSalary(event: CustomEvent) {
    this.salary = event.detail.salary;
  }

  private setIrpf(event: CustomEvent) {
    this.irpf = event.detail.irpf / 100;
  }

  private setPayments(event: CustomEvent) {
    this.payments = event.detail.payments;
  }

  willUpdate() {
    const irpfContribution = this.salary * this.irpf;
    const socialSecurityContribution = Math.min(this.salary, this.MAXIMUM_SS_ANNUAL_QUOTE) * this.SS_CONTRIBUTION_RATE;
    this.netSalary = (this.salary - irpfContribution - socialSecurityContribution) / this.payments;
  }

  render() {
    return html`
      <div>
        <gross-salary-selector @salarychange=${this.setSalary}></gross-salary-selector>
      </div>
      <div>
        <irpf-selector salary=${this.salary} @irpfchange=${this.setIrpf}></irpf-selector>
      </div>
      <div>
        <payments-selector @paymentschange=${this.setPayments}></payments-selector>
      </div>
      <hr>
      <p>
        Sueldo neto mensual:
        <strong>${this.netSalary.toLocaleString('es', { style: 'currency', currency: 'EUR' })}</strong>
      </p>
    `;
  }
}
