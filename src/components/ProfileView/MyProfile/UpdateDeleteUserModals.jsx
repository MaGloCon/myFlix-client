import { Modal, Button } from 'react-bootstrap';
import { UpdateForm } from './UpdateForm.jsx';
import propTypes from 'prop-types';
import '../../../utils/propTypes.js';
import { userPropType, tokenPropType } from '../../../utils/propTypes.js';

export function UpdateModal({ user, token, show, onHide, profileUpdateData, handleUpdate, handleSubmit }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateForm
          profileUpdateData={profileUpdateData}
          handleUpdate={handleUpdate}
          handleSubmit={handleSubmit}
          user={user}
          token={token}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


export function DeleteModal({ show, onHide, handleDeleteAccount, user, token}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Account
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure you want to delete your account?</h4>
        <p>
          This action cannot be undone. All your data will be permanently deleted.
        </p>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button onClick={() => handleDeleteAccount(user, token)}
            user={user}
            token={token}
            className="button-delete" 
            type="submit" variant="outline-secondary"
          >
            Delete account
        </Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

UpdateModal.propTypes = {
  user: userPropType,
  token: tokenPropType,
  show: propTypes.bool.isRequired,
  onHide: propTypes.func.isRequired,
  profileUpdateData: propTypes.object.isRequired,
  handleUpdate: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
};