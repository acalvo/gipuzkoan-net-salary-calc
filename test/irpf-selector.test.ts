import '../src/index';
import { expect, fixture, oneEvent } from '@open-wc/testing';
import { IrpfSelector } from '../src/components/irpf-selector';
import { html } from 'lit/static-html.js';

describe('irpf-selector', () => {
  describe('initial state', () => {
    it('sets automatic IRPF checked', async () => {
      const el = (await fixture(html`<irpf-selector></irpf-selector>`)) as IrpfSelector;
      const irpfCheckbox = el.shadowRoot.querySelector('input[type=checkbox]') as HTMLInputElement;
      expect(irpfCheckbox.checked).equals(true);
    });

    it('sets default irpf to `0`', async () => {
      const el = (await fixture(html`<irpf-selector></irpf-selector>`)) as IrpfSelector;
      const irpfInput = el.shadowRoot.querySelector('input[type=number]') as HTMLInputElement;
      expect(irpfInput.value).equals('0');
    });

    it('sets default descendants to `0`', async () => {
      const el = (await fixture(html`<irpf-selector></irpf-selector>`)) as IrpfSelector;
      const descendantsInput = el.shadowRoot.querySelector('label.descendants input') as HTMLInputElement;
      expect(descendantsInput.value).equals('0');
    });
  });

  describe('general case', () => {
    it('50000 salary, automatic irpf, 0 descendants', async () => {
      const el = (await fixture(html`<irpf-selector></irpf-selector>`)) as IrpfSelector;
      el.setAttribute('salary', '50000');
      const { detail } = await oneEvent(el, 'irpfchange');
      const irpfInput = el.shadowRoot.querySelector('input[type=number]') as HTMLInputElement;
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(detail.irpf).to.equal(21);
      expect(irpfInput.value).to.equal('21');
    });

    it('50000 salary, automatic irpf, 4 descendants', async () => {
      const el = (await fixture(html`<irpf-selector></irpf-selector>`)) as IrpfSelector;
      el.setAttribute('salary', '50000');
      const descendantsInput = el.shadowRoot.querySelector('label.descendants input') as HTMLInputElement;
      descendantsInput.value = '4';
      descendantsInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const irpfInput = el.shadowRoot.querySelector('input[type=number]') as HTMLInputElement;
      const { detail } = await oneEvent(el, 'irpfchange');
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(detail.irpf).to.equal(17);
      expect(irpfInput.value).to.equal('17');
    });

    it('50000 salary, 20% IRPF', async () => {
      const el = (await fixture(html`<irpf-selector></irpf-selector>`)) as IrpfSelector;
      el.setAttribute('salary', '50000');
      const irpfCheckbox = el.shadowRoot.querySelector('input[type=checkbox]') as HTMLInputElement;
      irpfCheckbox.checked = false;
      irpfCheckbox.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      const irpfInput = el.shadowRoot.querySelector('input[type=number]') as HTMLInputElement;
      irpfInput.value = '20';
      irpfInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const { detail } = await oneEvent(el, 'irpfchange');
      el.requestUpdate();
      while (el.isUpdatePending) {
        await el.updateComplete;
      }
      expect(detail.irpf).to.equal(20);
      expect(irpfInput.value).to.equal('20');
    });
  });
});
