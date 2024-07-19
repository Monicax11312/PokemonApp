import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';
import '@cells-demo/demo-app-container/demo-app-container.js';


class ConocemePage extends CellsPage {

  static get is() {
    return 'conoceme-page';
  }

  static get properties() {
    return {
      fullName: { type: String },
      description: { type: String },
      purpose: { type: String },
      company: { type: String}
    };
  }

  constructor() {
    super();
    this.fullName = 'Monica Sanchez';
    this.description = '✨Ingeniera de Profesion';
    this.purpose = '✨Ser el milagro de alguien más';
    this.company = 'Samtel';
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
                    <h3>¿Quién es Monica?</h3>  
            <p>Name: ${this.fullName}</p>
            <p>Description: ${this.description}</p>
            <p>Purpose: ${this.purpose}</p>
            <p>Company: ${this.company}</p>    
            <bbva-button-default active=""  @click=${this.gotoHome}>
                Back To Home
            </bbva-button-default>              
        </div>
      </demo-app-template>`;
  }
  static get styles() {
    return css`
      
      img {
        max-width: 100%;
        height: auto;
      }

     .pokemon-card {
        display: inline-block;
     }

     .pokemon-container {
        padding: 1rem;
     }

     .container {
        display: flex;
        flex-flow: row wrap;
        background-image: url("/app/resources/images/touch/MONI.jpg");
        text-align: center;
     }

     bbva-button-default {
        display: block;
     }
    `;
  }

  gotoHome() {
    this.navigate('home');
  }

}
window.customElements.define(ConocemePage.is, ConocemePage);