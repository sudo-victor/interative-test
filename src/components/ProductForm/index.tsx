import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useModalProductForm } from '../../contexts/ModalProductContext';
import styles from './product-form.module.scss';
import vendorsData from '../../data/vendors.json';

type ProductFormProps = {
  isToEdit?: boolean;
}

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


export default function ProductForm({ isToEdit }: ProductFormProps) {
  const [vendorsGroup, setVendorsGroup] = useState<String[]>([]);
  const [categoriesGroup, setCategoriesGroup] = useState<String[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [price, setPrice] = useState(0);
  const [currentVendor, setCurrentVendor] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state: State) => state.product.product);
  const { id, toggleModal } = useModalProductForm()

  // Get vendors and categories of database
  useEffect(() => {
    function getAllVendors() {
      const allVendors = vendorsData;
      const vendorsName = allVendors.map(vendor => vendor.name);

      setVendorsGroup(vendorsName);
    }

    getAllVendors();
  }, [])

  // Get data product if the form is to update a product
  useEffect(() => {
    console.log('teste')
    function laodProductIfWillUpdated() {
      if(!isToEdit) return;
      
      const product = products.find(product => product.id === id) || {} as Product;

      setName(product.name);
      setCurrentVendor(product.vendor);
      setCurrentCategory(product.category);
      setAmount(product.amount);
      setPrice(product.price);
    }

    laodProductIfWillUpdated();
  }, [id, products, isToEdit])

  useEffect(() => {
    function getAllCategoriesByVendor() {
      const allVendors = vendorsData;
      const vendor = allVendors.find(vendor => vendor.name === currentVendor);
      const categories = vendor?.categories || [];

      setCategoriesGroup(categories);
    }

    getAllCategoriesByVendor();
  }, [currentVendor, vendorsGroup])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!validateForm()) return;

    let data = {
      id: Date.now() + name,
      name: name.toUpperCase(),
      vendor: currentVendor,
      category: currentCategory,
      amount,
      price
    };
    
    if(isToEdit) {
      data.id = id;
       dispatch({
              type: 'UPDATE_PRODUCT',
              payload: {id, product: data},
        });
        toggleModal();
    } else {
      dispatch({
            type: 'ADD_PRODUCT',
            payload: {product: data},
      });
    }

    setName('');
    setCurrentVendor('');
    setCurrentCategory('');
    setAmount(0);
    setPrice(0);
  }

  function validateForm() {
    if( name === "") {
      notifyError()
      return false;
    } else if( amount === 0) {
      notifyError()
      return false;
    }else if( price === 0) {
      notifyError()
      return false;
    }else if( currentVendor === "") {
      notifyError()
      return false;
    } else if( currentCategory === "") {
      notifyError()
      return false;
    }

    return true;

  }

  function notifyError() {
    toast.error('Preencha todos os campos corretamente!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <section className={styles.productFormComponent}>
      <h2>{isToEdit ? "Editar" : "Cadastrar"} Produto</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome produto</label>
        <input type='text' name="name" value={name} onChange={e => setName(e.target.value)}/>

        <label>Fabricante produto</label>
        <select name="vendors" value={currentVendor} onChange={e => setCurrentVendor(e.target.value)}>
          <option value="" disabled selected>Escolha um fabricante</option>
          {
            vendorsGroup.map(vendor => (
              <option key={String(vendor)} value={String(vendor)}> {vendor}</option>
            ))
          }
        </select>

        <label>Categoria produto</label>
        <select name="categories" value={currentCategory} onChange={e => setCurrentCategory(e.target.value)}>
          <option value="" disabled selected>Escolha uma categoria</option>
          {
            categoriesGroup.map(category => (
              <option key={String(category)} value={String(category)}> {category}</option>
            ))
          }
        </select>
        
        <label htmlFor="amount">Quantidade</label>
        <input min='1' className={styles.inputAmount} name="amount" type='number' value={amount} onChange={e => setAmount(Number(e.target.value))}/>

        <label htmlFor="price">Valor unidade</label>
        <input min='0' className={styles.inputPrice}  step="0.01" name="price" type='number' value={price} onChange={e => setPrice(Number(e.target.value))}/>

        <button>{isToEdit ? "Atualizar" : "Adicionar"}  Produto</button>
      </form>

        
      <ToastContainer />
    </section>
  );
}
