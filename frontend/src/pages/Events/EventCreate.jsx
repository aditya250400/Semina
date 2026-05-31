import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createTalentsAsync } from "../../redux/talents/talentsThunk";
import { postImageAsync } from "../../redux/image/imageThunk";

export default function EventCreate() {
  const { errors, loading } = useSelector((state) => state.talents);
  const { image: avatar, loading: loadingImage } = useSelector(
    (state) => state.image,
  );

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    role: "",
    image: "",
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const modalRef = useRef(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const imageData = e.target.files[0];

    if (!imageData) return;

    // Validasi tipe file
    if (!imageData.type.match("image.*")) {
      fileInputRef.current.value = "";

      toast.error("Format file tidak didukung. Gunakan PNG, JPG, atau JPEG.", {
        duration: 4000,
        position: "top-right",
        borderRadius: "10px",
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      return;
    }

    // Validasi ukuran file (3 MB)
    const MAX_FILE_SIZE = 3000000;

    if (imageData.size > MAX_FILE_SIZE) {
      fileInputRef.current.value = "";

      toast.error("Ukuran gambar maksimal 3 MB.", {
        duration: 4000,
        position: "top-right",
        borderRadius: "10px",
        style: {
          background: "#333",
          color: "#fff",
        },
      });

      return;
    }

    const newImage = new FormData();
    newImage.append("image", imageData);

    dispatch(
      postImageAsync({
        newImage,
        setForm,
        form,
      }),
    );
  };

  const storeTalent = (e) => {
    e.preventDefault();

    dispatch(
      createTalentsAsync({
        form,
        toast,
        setForm,
        modalRef,
        dispatch,
        fileInputRef,
      }),
    );
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
          <form onSubmit={storeTalent} className="container-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Talent</h5>
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
                    {errors && (
                      <div className="alert alert-danger mt-2">
                        {errors.message}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Talent Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        name="name"
                        value={form.name}
                        placeholder="Enter Talent Name"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.role}
                        name="role"
                        placeholder="Enter Talent role"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex align-items-center gap-x-2">
                      <div className="col-6 col-md-3 mb-3">
                        <label className="form-label">Preview</label>

                        <div
                          className="border rounded d-flex justify-content-center align-items-center"
                          style={{
                            height: "120px",
                            backgroundColor: avatar ? "transparent" : "#e9ecef",
                            backgroundImage: avatar
                              ? `url(${import.meta.env.VITE_APP_IMAGEBASEURL}/${avatar.name})`
                              : "none",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          {!avatar && (
                            <span className="text-muted">Preview Image</span>
                          )}
                        </div>
                      </div>
                      <div className="mb-3 col-6 col-md-9 ms-3">
                        <label className="form-label">Avatar</label>
                        <input
                          type="file"
                          disabled={loadingImage}
                          ref={fileInputRef}
                          className="form-control"
                          accept="images/*"
                          onChange={handleFileChange}
                        />
                      </div>
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
                  disabled={loading.create || loadingImage}
                  type="submit"
                  className="btn btn-primary ms-auto rounded"
                >
                  {loading.create ? (
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
