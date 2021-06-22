import { Fragment } from 'react';

function DeleteConfirmModal(props) {
  let { todoName, dialogId } = props;

  return (
    <Fragment>
      <div className={`modal-backdrop fade show`}></div>

      <div
        className={`modal fade show`}
        style={{ display: 'block' }}
        id={dialogId}
        tabIndex='-1'
        role='dialog'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{`Delete ${todoName}`}</h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={props.cancelConfirmHandler}
              ></button>
            </div>
            <div className='modal-body'>
              <p>
                Are you sure you want to delete: <strong>{todoName}</strong>
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={props.cancelConfirmHandler}
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={props.deleteConfirmHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DeleteConfirmModal;
