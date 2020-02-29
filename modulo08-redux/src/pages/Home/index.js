import React from 'react'

import { MdAddShoppingCart } from 'react-icons/md'

import { ProductList } from './styles'

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-de-caminhada-leve-confortavel/06/E74-0492-006/E74-0492-006_zoom2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>
          Tênis muito legal com título muito grande que quebra varias linhas
        </strong>
        <span>R$ 129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-3ls3-caminhada-masculino/58/FDW-0217-158/FDW-0217-158_zoom2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-de-caminhada-leve-confortavel/06/E74-0492-006/E74-0492-006_zoom2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>
          Tênis muito legal com título muito grande que quebra varias linhas
        </strong>
        <span>R$ 129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-3ls3-caminhada-masculino/58/FDW-0217-158/FDW-0217-158_zoom2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-de-caminhada-leve-confortavel/06/E74-0492-006/E74-0492-006_zoom2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>
          Tênis muito legal com título muito grande que quebra varias linhas
        </strong>
        <span>R$ 129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>

      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-3ls3-caminhada-masculino/58/FDW-0217-158/FDW-0217-158_zoom2.jpg?ims=326x"
          alt="Tênis"
        />
        <strong>Tênis muito legal</strong>
        <span>R$ 129,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>

          <span>Adicionar ao carrinho</span>
        </button>
      </li>
    </ProductList>
  )
}
