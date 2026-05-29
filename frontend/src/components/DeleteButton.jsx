import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteButton({ modalType, id, onDelete, name }) {
  const { loading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  return (
    <>
      <a
        href="#"
        className="btn btn-danger d-sm-inline-block rounded"
        data-bs-toggle="modal"
        data-bs-target={`#modal-${modalType}`}
      >
        Delete
      </a>
      <div
        className="modal modal-blur fade "
        id={`modal-${modalType}`}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className="modal-dialog modal-md modal-dialog-centered"
          role="document"
        >
          <div className="container">
            <div className="modal-content">
              <div className="modal-header">
                <div className="mt-3">
                  <h5 className="modal-title">Are you sure want to delete?</h5>
                  <h4 className="text-muted">
                    Data {name} will deleted permanently
                  </h4>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  tabIndex={-1}
                ></button>
              </div>
              <div className="modal-body d-flex">
                <a
                  className="btn me-auto rounded"
                  data-bs-dismiss="modal"
                  href="#"
                  tabIndex={-1}
                >
                  Cancel
                </a>
                <button
                  disabled={loading.delete}
                  type="button"
                  onClick={() =>
                    dispatch(
                      onDelete({
                        toast,
                        dispatch,
                        id,
                        modalRef,
                      }),
                    )
                  }
                  className="btn btn-danger ms-auto rounded"
                >
                  {loading.delete ? (
                    <div
                      className="spinner-border text-white"
                      role="status"
                    ></div>
                  ) : (
                    <>Delete</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
