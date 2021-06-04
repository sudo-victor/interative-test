import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useModalProductForm } from '../../contexts/ModalProductContext';
import { RiFileEditLine } from 'react-icons/ri';
import { TiDeleteOutline } from 'react-icons/ti';
import { IoIosSearch } from 'react-icons/io';


import styles from './product-list.module.scss';

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
  price: number;
}


export default function ProductList() {
  const  [totalAmount, setTotalAmount] = useState(0);
  const  [totalPrice, setTotalPrice] = useState(0);
  const  [search, setSearch] = useState('');
  const products = useSelector((state: State) => state.product.product);
  const [productsFiltered, setProductsFiltered] = useState<Product[]>([])
  const dispatch = useDispatch();
  const {toggleModal, setId} = useModalProductForm();

   useEffect(() => {
    function loadDatas() {
      if(!products) return;
      

      const amountFinal = products
        .map(product => product?.amount)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      const priceFinal = products.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.amount, 0);

      setTotalAmount(amountFinal);
      setTotalPrice(priceFinal);
      setProductsFiltered(products);
    }

    loadDatas();
  }, [products])

  function handleDeleteProduct(id: string) {
    dispatch({
          type: 'DELETE_PRODUCT',
          payload: {product: {id}},
    });
  } 

  function handleSearchProduct() {
    if(search === '') {
      setProductsFiltered(products);
    }
    const productsFilteredGroup = products.filter(product => product.name.includes(search.toUpperCase()));

    
    setProductsFiltered(productsFilteredGroup);
  }
  
  function handleEditProduct(id: string) {
    setId(id);
    toggleModal();
  }

  return (

        <section className={styles.productListComponent}>
          <header>
            <h2>Produtos Cadastrados</h2>

            <div className={styles.searchProductContainer}>
              <h3>Buscar Produto</h3>
              <div>
                <span>
                  <IoIosSearch color='#dadfe4' size={28}/>
                </span>
                <input type='text' value={search} onChange={e => setSearch(e.target.value)}/>
                <button onClick={handleSearchProduct}>Buscar</button>
              </div>
            </div>
          </header>
          
          <div>
          
            <div className={styles.products}>

              {
                productsFiltered.length === 0 && (
                  <p>Nenhum produto.</p>
                )
              }

              {
                productsFiltered?.map(product => (
                  <article key={product.id}>
                    <p>{product.name}</p>
                    <p>{product.vendor}</p>
                    <p>{product.category}</p>
                    <p>{product.amount}</p>
                    <p>{product.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <button onClick={() => handleEditProduct(product.id)}>
                      <RiFileEditLine color='#03286A' size={16}/>
                      Editar
                    </button>
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
              <p>{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </div>

          </div>
        </section>
      
  );
}
