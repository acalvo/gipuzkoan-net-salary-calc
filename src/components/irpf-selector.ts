import { LitElement, PropertyValues, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { inputCheckboxStyles, inputNumberStyles } from '../shared-styles';
import { classMap } from 'lit/directives/class-map.js';
import irpfTable from '../irpf-table';

@customElement('irpf-selector')
export class IrpfSelector extends LitElement {
  static styles = [
    inputNumberStyles,
    inputCheckboxStyles,
    css`
      input[type='number'] {
        width: 50px;
      }
      .descendants {
        display: block;
        margin-top: 8px;
      }
      .descendants input[type='number'] {
        margin-left: 16px;
        width: 35px;
      }
      .hidden {
        visibility: hidden;
      }
    `,
  ];

  @property({ type: Number })
  salary = 0;

  @state()
  automatic = true;

  @state()
  irpf = 0;

  @state()
  descendants = 0;

  willUpdate(changedProperties: PropertyValues<this>) {
    if (this.automatic) {
      const level = irpfTable[Object.keys(irpfTable).find((t) => Number(t) >= this.salary)];
      this.irpf = level[this.descendants] ?? level[level.length - 1];
    }
    if (changedProperties.has('irpf')) {
      this.dispatchEvent(new CustomEvent('irpfchange', {
        detail: {
          irpf: this.irpf,
        },
        bubbles: true,
        composed: true
      }));
    }
  }

  private setAutomatic(event: Event) {
    this.automatic = (event.target as HTMLInputElement).checked;
  }

  private setIrpf(event: Event) {
    this.irpf = Number((event.target as HTMLInputElement).value);
  }

  private setDescendants(event: Event) {
    this.descendants = Number((event.target as HTMLInputElement).value);
  }

  render() {
    return html`
      <input type="checkbox" id="automatic" checked @change=${this.setAutomatic}>
      <label for="automatic">IRPF automático</label>
      <label>
        <input type="number" min="0" ?disabled=${this.automatic} @input=${this.setIrpf} .value=${this.irpf.toString()}>
        %
      </label>
      <label class=${classMap({ descendants: true, hidden: !this.automatic })}>
        Descendientes
        <input type="number" value="0" min="0" @input=${this.setDescendants}>
      </label>
    `;
  }
}
