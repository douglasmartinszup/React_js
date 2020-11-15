import React, { Component } from "react";
import api from "../../services/api";
// eslint-disable-next-line no-unused-vars
import styles from "./styles.css";
import { Link } from "react-router-dom";

export default class Main extends Component {
  /* Criar uma variável dentro de estado para armezanarmos 
     quantos variáveis quisermos */

  state = {
    products: [],
    productInfo: {},
    page: 1,
  };
  /* executar  uma ação logo que um componente é exibido em tela : componentDidMount  */
  componentDidMount() {
    this.loadProducts();
  }
  /* função para carregar os produtos , utilizamos o async/await 
  para esperar a response ada api*/
  loadProducts = async (page = 1) => {
    /* criei uma const para receber a api
     que estamos solicitando com o api.get */
    const response = await api.get(`/products?page=${page}`);

    /*Armazenando dados para rotas */
    const { docs, ...productInfo } = response.data;

    /* Armazenando a response dentro de products*/
    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    // eslint-disable-next-line no-unused-vars
    const { page, productInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {
    const { products, page, productInfo } = this.state;

    return (
      //listando os titulos dos produtos das response dentro de uma div
      <div className="product-list">
        {products.map((product) => (
          <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar produtos</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>
            Próxima
          </button>
        </div>
      </div>
    );
  }
}
