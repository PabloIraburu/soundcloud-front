import React, { useState, useContext } from 'react';
import './EditProfile.css';
import { useHistory } from "react-router-dom";
import { setJWT } from "../../utils/LocalStorage.utils";
import { ServerRequest } from '../../helpers/ServerRequest';
import { Input } from '../../components/Input/Input';
import { MyButton } from '../../components/MyButton/MyButton';
import { Modal } from '../../components/Modal/Modal';
import * as route from '../../routes/routes';
import { UserContext } from "../../contexts/UserContext/contextProvider"
import { toast } from "react-toastify";


export const EditProfile = (props) => {
  const { user, setUser, signOut } = useContext(UserContext);
  const history = useHistory();
  const [editedUser, setEditedUser] = useState({});
  const [newPass, setNewPass] = useState({});
  const [openModalPass, setOpenModalPass] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const notify = (e) => toast(`${e}`);


  // Gestiona el modal editar password
  const handleOpenPass = () => setOpenModalPass(!openModalPass);
  const handleClosePass = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times') return;
    setOpenModalPass(!openModalPass);
  }

  // Gestiona el modal eliminar cuenta
  const handleOpenDelete = () => setOpenModalDelete(!openModalDelete);
  const handleCloseDelete = (e) => {
    const { className: el } = e.target;
    if (el !== 'backdrop' && el !== 'fas fa-times') return;
    setOpenModalDelete(!openModalDelete);
  }

  // Maneja el estado del formulario:
  const handleInput = (event) => {
    const { value, name } = event.target;
    setEditedUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // Maneja el estado del input newPass
  const handleNewPass = (e) => setNewPass(e.target.value);

  // Cambiar datos usuario
  const handleSubmitProfileEdited = (e) => {
    ServerRequest(`data/user/${user._id}`, "PUT", editedUser)
      .then((response) => {
        setUser(response);
        notify('Profile edited correctly')
        //Manda al usuario a la home tras el registro completado
        history.push(route.PROFILE);
      })
      .catch((response) => console.log);
  };

  // Cambiar contraseña
  const handleSubmitPassword = (e) => {
    ServerRequest(`data/user/${user._id}`, "PATCH", { password: newPass })
      .then((response) => {
        console.log(response.token);
        setJWT(response.token)
        notify('Password edited correctly')
        setOpenModalPass(!openModalPass)
        signOut();
      })
      .catch((response) => notify(response.error));
  };

  // Eliminar cuenta
  const handleDelete = (e) => {
    ServerRequest(`data/user/${user._id}`, "DELETE")
      .then(console.log)
      .catch(notify('Account deleted correctly'));
    history.replace(route.HOME);
  };

  // Volver a la página anterior
  const goBackTo = () => history.goBack();

  return (
    <>

      <div className="EditProfile-content">
        <div className="EditProfile-header">
          <h1>Edit my account</h1>
          <p onClick={goBackTo} className="backToProfile"> Back to profile ></p>
        </div>

        <div className="EditProfile-inputs-section">
          <span>
            <p>Name</p>
            <Input type={"text"} name={"name"} onChange={handleInput} placeholder={user.name} />
          </span>
          <span>
            <p>Email</p>
            <Input type={"email"} name={"email"} onChange={handleInput} placeholder={user.email} />
          </span>
          <span>
            <p>Picture</p>
            <Input type={"text"} name={"image"} onChange={handleInput} placeholder="Url of profile picture" />
          </span>
        </div>

        <div className="EditProfile-buttons-section">
          <MyButton onClick={handleOpenPass} variant="white" size="30%">Change Password</MyButton>
          <MyButton onClick={handleOpenDelete} variant="white" size="30%">Delete Account</MyButton>
        </div>
        <br />
        <MyButton onClick={handleSubmitProfileEdited} variant="pink-or" size="30%">Submit changes</MyButton>
      </div>


      {openModalPass &&
        <Modal handleClose={handleClosePass}>
          <h3>Change password</h3>
          <Input type={"password"} name={"password"} onChange={handleNewPass} placeholder={"New Password"} required />
          <Input type={"password"} name={"password"} onChange={handleInput} placeholder={"Repeat Password"} required />
          <br />
          {(newPass !== editedUser.password) ? <p className="flag-pass">*Passwords doesn't match</p> : <MyButton onClick={handleSubmitPassword} variant="pink-or" size="50%">Submit</MyButton>}
        </Modal>
      }
      {openModalDelete &&
        <Modal handleClose={handleCloseDelete}>
          <h3 className="modal-h3">Delete Account</h3>
          <p className="modal-p">You will not be able to undo this action. Are you sure you want to delete your account?</p>
          <span className="EditProfile-buttons-section">
            <MyButton onClick={handleDelete} variant="darkBlue" size="45%">Delete Account</MyButton>
            <MyButton onClick={handleOpenDelete} variant="pink-or" size="45%">Cancel</MyButton>
          </span>
        </Modal>
      }
      {/* <ToastContainer
        position="top-center"
        autoClose={2250}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
    </>
  )
}

