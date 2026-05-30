import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function DeleteButton({
  modalType,
  id,
  onDelete,
  name,
  loading,
}) {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  return (
    <>
      <a
        href="#"
        className="btn btn-danger d-sm-inline-block rounded"
        data-bs-toggle="modal"
        data-bs-target={`#modal-${modalType}-${id}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 7l16 0" />
          <path d="M10 11l0 6" />
          <path d="M14 11l0 6" />
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg>
        Delete
      </a>
      <div
        className="modal modal-blur fade "
        id={`modal-${modalType}-${id}`}
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
                    Data {name} will delete permanently
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
