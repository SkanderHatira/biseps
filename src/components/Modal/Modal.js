import {
  ModalBody,
  ModalFooter,
  ModalHeader,
  Modal as RCTModal,
} from "reactstrap";
import PropTypes from "prop-types";
import React from "react";

const Modal = ({ children, isOpen, closeModal, footer, className, title }) => {
  return (
    <RCTModal isOpen={isOpen} toggle={closeModal} className={className}>
      {title && <ModalHeader toggle={closeModal}>{title}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </RCTModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  title: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Modal;
