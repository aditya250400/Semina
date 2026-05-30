import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { postImageAsync } from "../../redux/image/imageThunk";
import { imageReset } from "../../redux/image/imageSlice";
import { updatePaymentAsync } from "../../redux/payments/paymentsThunk";

export default function PaymentEdit({ id, type, image }) {
  const { errors, loading } = useSelector((state) => state.payments);
  const { image: avatar, loading: loadingImage } = useSelector(
    (state) => state.image,
  );

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    type: type ?? "",
    image: image._id ?? "",
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const modalRef = useRef(null);

  const fileInputRef = useRef(null);

  const resetImageHandler = () => {
    dispatch(imageReset());
    fileInputRef.current.value = "";
  };

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

  const updatePayment = (e) => {
    e.preventDefault();

    dispatch(
      updatePaymentAsync({
        form,
        toast,
        setForm,
        modalRef,
        dispatch,
        fileInputRef,
        id,
      }),
    );
  };

  return (
    <>
      <a
        href="#"
        className="btn btn-primary d-sm-inline-block"
        data-bs-toggle="modal"
        data-bs-target={`#modal-update-payment-${id}`}
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
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
        id={`modal-update-payment-${id}`}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <form onSubmit={updatePayment} className="container-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Payment</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={resetImageHandler}
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
                      <label className="form-label">Payment Method Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        name="type"
                        value={form.type}
                        placeholder="Enter Payment Method Name"
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
                              : `url(${import.meta.env.VITE_APP_IMAGEBASEURL}/${image.name})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          {!avatar ||
                            (!image && (
                              <span className="text-muted">Preview Image</span>
                            ))}
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
                  onClick={resetImageHandler}
                >
                  Cancel
                </a>
                <button
                  disabled={loading.update || loadingImage}
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
