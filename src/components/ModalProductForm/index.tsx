
import ProductForm from '../ProductForm';
import { useModalProductForm } from '../../contexts/ModalProductContext';
import styles from './modal.module.scss';

export default function ModalProductForm() {
  const { isActivated, toggleModal } = useModalProductForm();

  return (
    <div className={styles.modalComponent} style={{display: isActivated ? 'flex' : 'none'}}>
      <button className={styles.back} onClick={toggleModal} >voltar</button>
      <section>
        <ProductForm isToEdit/>
      </section>
    </div>
  );
}
