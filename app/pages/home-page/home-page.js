import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }
  static get properties() {
    return {
      title: { type: String },
      pokemonList: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = 'Taller 1 Páginas Declarativas';
    this.pokemonList = [];
    this.fetchPokemonData();
  }

  async fetchPokemonData() {
    try {
      // Obtener todos los Pokémon (puedes ajustar el offset y limit si es necesario)
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=150'
      );
      const data = await response.json();

      // Obtener detalles de cada Pokémon
      const detailedData = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );

      // Filtrar los Pokémon base (sin evoluciones)
      const basePokemon = await Promise.all(
        detailedData.map(async(pokemon) => {
          const speciesResponse = await fetch(pokemon.species.url);
          const speciesData = await speciesResponse.json();
          return speciesData.evolves_from_species ? null : pokemon;
        })
      );

      // Filtrar los nulls de la lista final
      this.pokemonList = basePokemon.filter((pokemon) => pokemon !== null);
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }


  render() {
    return html` <demo-app-template data-cells-type="template">
      <div slot="app-main-content">
      ${this._mainTpl}   
      ${this._listPokemonTpl}    
      </div>
    </demo-app-template>`;
  }

  get _mainTpl() {
    return html`
    <div>
      <h3>${this.title}</h3>
      <bbva-web-link @click=${this.gotoAbout} class =""> Conoceme </bbva-web-link>
    </div>
    `;
  }
  get _listPokemonTpl() {
    return html`
    <div class="container">
      ${this.pokemonList ? this.pokemonList.map(pokemon => html`
        <div class="pokemon-container">
          <bbva-web-card-product class="pokemon-card">
            <!-- Imagen del Pokémon -->
            <img class="pokemon-image" slot="media" src="${pokemon.sprites.front_default}" alt="${pokemon.nameevolution}">
            <!-- Nombre del Pokémon -->
            <div class="pokemon-name" slot="title">${pokemon.nameevolution}</div>
            <!-- Tipos del Pokémon -->
            <div class="pokemon-type" slot="details">
              ${pokemon.types.map(typeInfo => html`<span>${typeInfo.type.nameevolution}</span>`)}
            </div>
          </bbva-web-card-product>
          <bbva-button-default @click=${this.goToEvolution} class="evolutions-button" text="Evoluciones"></bbva-button-default>
        </div>
      `) : ''}
    </div>
    `;
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
        background-image: url("/app/resources/images/touch/t.jpg");
        text-align: center;
     }
     .container-conoceme{
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


  gotoAbout() {
    this.navigate('conoceme');
  }

  goToEvolution() {
    this.navigate('evolution');
  }

}

window.customElements.define(HomePage.is, HomePage);