import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAsync } from "../../redux/categories/categoryThunk";

export default function CategoryCreate() {
  const { errors, loading } = useSelector((state) => state.categories);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const modalRef = useRef(null);

  const storeCategory = (e) => {
    e.preventDefault();
    dispatch(createCategoryAsync({ name, toast, setName, modalRef, dispatch }));
  };
  return (
    <>
      <a
        href="#"
        className="btn btn-primary d-sm-inline-block"
        data-bs-toggle="modal"
        data-bs-target="#modal-create-category"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        Add New
      </a>
      <div
        className="modal modal-blur fade "
        id="modal-create-category"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <form onSubmit={storeCategory} className="container-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter Category Name"
                      />
                      {errors && (
                        <div className="alert alert-danger mt-2">
                          {errors.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <a
                  className="btn me-auto rounded"
                  data-bs-dismiss="modal"
                  href="#"
                >
                  Cancel
                </a>
                <button
                  disabled={loading.fetch}
                  type="submit"
                  className="btn btn-primary ms-auto rounded"
                >
                  {loading.fetch ? (
                    <div
                      className="spinner-border text-white"
                      role="status"
                    ></div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 5l0 14" />
                        <path d="M5 12l14 0" />
                      </svg>
                      Save
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
