import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RiFileEditLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import { IoIosSearch } from 'react-icons/io';


import styles from './product-list.module.scss';
import { useModalProductForm } from '../../contexts/ModalProductContext';

type State = {
  product: {
      product: Product[];
  };
}

type Product = {
  id: string;
  name: string;
  vendor: string;
  category: string;
  amount: number;
  price: string;
}


export default function ProductList() {
  const  [totalAmount, setTotalAmount] = useState(0);
  const  [totalPrice, setTotalPrice] = useState(0);
  const products = useSelector((state: State) => state.product.product);
  const dispatch = useDispatch();
  const {toggleModal, setId} = useModalProductForm();

  function handleDeleteProduct(id: string) {
    dispatch({
          type: 'DELETE_PRODUCT',
          payload: {id},
    });
  } 
  
  function handleEditProduct(id: string) {
    setId(id);
    toggleModal();
  }

  return (

        <section className={styles.productListComponent}>
          <header>
            <h2>Produtos Cadastrados</h2>

            {/* <div className={styles.searchProductContainer}>
              <h3>Buscar Produto</h3>
              <div>
                <span>
                  <IoIosSearch color='#dadfe4' size={28}/>
                </span>
                <input type='text' />
                <button>Buscar</button>
              </div>
            </div> */}
          </header>
          
          <div>
          
            <div className={styles.products}>

              {
                products?.map(product => (
                  <article>
                    <p>{product.name}</p>
                    <p>{product.vendor}</p>
                    <p>{product.category}</p>
                    <p>{product.amount}</p>
                    <p>R$ {product.price}</p>
                    {/* <button onClick={() => handleEditProduct(product.id)}>
                      <RiFileEditLine color='#03286A' size={16}/>
                      Editar
                    </button> */}
                    <button onClick={() => handleDeleteProduct(product.id)}>
                      <TiDeleteOutline color='#03286A' size={18}/>
                      Deletar
                    </button>
                  </article>
                
                ))
              }
              
            </div>

            <div className={styles.infoTotal}>
              <p>Total</p>
              <p>{totalAmount}</p>
              <p>R$ {totalPrice}</p>
            </div>

          </div>
        </section>
      
  );
}
