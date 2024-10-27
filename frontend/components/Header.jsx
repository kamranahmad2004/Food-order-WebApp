import React from "react";
import logo from "../src/assets/logo.jpg";
import Button from "../Util/Button";
import { useRef, useState } from "react";
import Dialog from "./Dialog";
import SuccessModal from "./Modals/SuccessModal";
import { useSelector } from "react-redux";
import FormModal from "./Modals/FormModal.jsx";
import CartModal from "./Modals/CartModal";
import styles from './Header.module.css'

const Header = () => {
  const cart = useSelector((state) => state.cart);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const modal = useRef();

  const openModal = () => {
    modal.current.openModal();
    setShowCheckOut(false);
  };

  const closeModal = () => {
    if (modal.current) {
      modal.current.closeModal();
      setShowCheckOut(false);
    }
  };

  const handleSuccess = () => {
    setShowCheckOut("success");
  };

  const goToCheckOut = () => {
    setShowCheckOut(true);
  };
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img className={styles.logo} src={logo} alt="logo image" />
          <h1 className={styles.title}>ReactMeal</h1>
        </div>
        <nav>
          <Button onClick={openModal} textOnly>
            <span className={styles.cartBtn}>Cart ({cart.mealsItems.length})</span>
          </Button> 
        </nav>
      </header>
      <Dialog ref={modal}>
        {showCheckOut === "success" ? (
          <SuccessModal dialog={closeModal} />
        ) : showCheckOut ? (
          <FormModal dialog={closeModal} showSuccess={handleSuccess} />
        ) : (
          <CartModal dialog={closeModal} checkOut={goToCheckOut} />
        )}
      </Dialog>
    </>
  );
};

export default Header;
