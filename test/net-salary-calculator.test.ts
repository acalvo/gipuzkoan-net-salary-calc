import '../src/index';
import { expect, fixture } from '@open-wc/testing';
import { NetSalaryCalculator } from '../src/components/net-salary-calculator';
import { html } from 'lit/static-html.js';

describe('net-salary-calculator', () => {
  describe('initial state', () => {
    it('renders default result `0,00 €`', async () => {
      const el = await fixture(html`<net-salary-calculator></net-salary-calculator>`);
      expect(el.shadowRoot.innerHTML).contains('0,00');
    });

    it('sets default salary to `0`', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const salaryInput = el.shadowRoot.querySelector('gross-salary-selector').shadowRoot.querySelector('input');
      expect(salaryInput.value).equals('0');
    });

    it('sets automatic IRPF checked', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const irpfCheckbox = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('input[type=checkbox]') as HTMLInputElement;
      expect(irpfCheckbox.checked).equals(true);
    });

    it('sets default descendants to `0`', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const descendantsInput = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('label.descendants input') as HTMLInputElement;
      expect(descendantsInput.value).equals('0');
    });

    it('sets default payments to `12`', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const paymentsInput = el.shadowRoot.querySelector('payments-selector').shadowRoot.querySelector('input[name=payments]') as HTMLInputElement;
      expect(paymentsInput.value).equals('12');
    });
  });

  describe('general case', () => {
    it('20000 salary, automatic IPRF, 0 descendants, 12 payments', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const salaryInput = el.shadowRoot.querySelector('gross-salary-selector').shadowRoot.querySelector('input');
      salaryInput.value = '20000';
      salaryInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(el.shadowRoot.innerHTML).contains('1392,17');
    });

    it('40000 salary, automatic IPRF, 2 descendants, 14 payments', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const salaryInput = el.shadowRoot.querySelector('gross-salary-selector').shadowRoot.querySelector('input');
      salaryInput.value = '40000';
      salaryInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const descendantsInput = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('label.descendants input') as HTMLInputElement;
      descendantsInput.value = '2';
      descendantsInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const paymentsInput = el.shadowRoot.querySelector('payments-selector').shadowRoot.querySelector('input[name=payments]') as HTMLInputElement;
      paymentsInput.value = '14';
      paymentsInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(el.shadowRoot.innerHTML).contains('2215,14');
    });

    it('60000 salary, automatic IPRF, 4 descendants, 12 payments', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const salaryInput = el.shadowRoot.querySelector('gross-salary-selector').shadowRoot.querySelector('input');
      salaryInput.value = '60000';
      salaryInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const descendantsInput = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('label.descendants input') as HTMLInputElement;
      descendantsInput.value = '4';
      descendantsInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(el.shadowRoot.innerHTML).contains('3744,58');
    });

    it('80000 salary, 25% IPRF, 14 payments', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const salaryInput = el.shadowRoot.querySelector('gross-salary-selector').shadowRoot.querySelector('input');
      salaryInput.value = '80000';
      salaryInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const irpfCheckbox = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('input[type=checkbox]') as HTMLInputElement;
      irpfCheckbox.checked = false;
      irpfCheckbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      const irpfInput = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('input[type=number]') as HTMLInputElement;
      irpfInput.value = '25';
      irpfInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const paymentsInput = el.shadowRoot.querySelector('payments-selector').shadowRoot.querySelector('input[name=payments]') as HTMLInputElement;
      paymentsInput.value = '14';
      paymentsInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(el.shadowRoot.innerHTML).contains('4023,93');
    });

    it('1000000000 salary, automatic IRPF, 100 descendants, 12 payments', async () => {
      const el = (await fixture(html`<net-salary-calculator></net-salary-calculator>`)) as NetSalaryCalculator;
      const salaryInput = el.shadowRoot.querySelector('gross-salary-selector').shadowRoot.querySelector('input');
      salaryInput.value = '1000000000';
      salaryInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const descendantsInput = el.shadowRoot.querySelector('irpf-selector').shadowRoot.querySelector('label.descendants input') as HTMLInputElement;
      descendantsInput.value = '100';
      descendantsInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(el.shadowRoot.innerHTML).contains('52.499.694,58');
    });
  });
});
