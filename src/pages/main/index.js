import React, { Component } from "react";
import api from "../../services/api";
import styles from "./styles.css";


export default class Main extends Component {
  /* Criar uma variável dentro de estado para armezanarmos 
     quantos variáveis quisermos */

  state = {
    products: [],
  };
  /* executar  uma ação logo que um componente é exibido em tela : componentDidMount  */
  componentDidMount() {
    this.loadProducts();
  }
  /* função para carregar os produtos , utilizamos o async/await 
  para esperar a response ada api*/
  loadProducts = async () => {
    /* criei uma const para receber a api
     que estamos solicitando com o api.get */
    const response = await api.get("/products");
    /*Criei um console.log  para conferir o retorno da api */
    console.log(response.data.docs);
    /* Armazenando a response dentro de products*/
    this.setState({ products: response.data.docs });
  };

  render() {

      const { products } = this.state;


    return (
      //listando os titulos dos produtos das response dentro de uma div
      <div className="product-list">
        {products.map((product) => (
          <article key={product._id}>
            <strong>{product.title}</strong>
        <p>{product.description}</p>
        <a href="#">Acessar produtos</a>
          </article>
          
        ))}
      </div>
    );
  }
}
