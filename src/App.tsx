
import styles from './styles/app.module.scss';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
// import ModalProductForm from './components/ModalProductForm';


function App() {
  return (
    <div id={styles.mainPage}>
      <main>

        <ProductForm />
        <ProductList />
        
      </main>

      {/* <ModalProductForm /> */}
    </div>
  );
}

export default App;
