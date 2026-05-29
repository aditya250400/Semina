import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAsync } from "../../redux/categories/categoryThunk";

export default function CategoryEdit({ name: categoryName, id }) {
  const { errors, loading } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const [name, setName] = useState(categoryName ?? "");

  const updateCategory = (e) => {
    e.preventDefault();
    dispatch(
      updateCategoryAsync({ name, toast, setName, modalRef, dispatch, id }),
    );
  };
  return (
    <>
      <a
        href="#"
        className="btn btn-secondary d-sm-inline-block"
        data-bs-toggle="modal"
        data-bs-target={`#modal-update-category-${id}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-edit"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" />
          <path d="M16 5l3 3" />
        </svg>
        Edit
      </a>
      <div
        className="modal modal-blur fade "
        id={`modal-update-category-${id}`}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <form onSubmit={updateCategory} className="container-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
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
                  disabled={loading.update}
                  type="submit"
                  className="btn btn-primary ms-auto rounded"
                >
                  {loading.update ? (
                    <div
                      className="spinner-border text-white"
                      role="status"
                    ></div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-pencil-check"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
                        <path d="M13.5 6.5l4 4" />
                        <path d="M15 19l2 2l4 -4" />
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
