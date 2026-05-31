import { useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { postImageAsync } from "../../redux/image/imageThunk";
import { updateEventAsync } from "../../redux/events/eventsThunk";
import { imageReset } from "../../redux/image/imageSlice";

export default function EventEdit({ id, event, categories, talents, image }) {
  const { errors, loading } = useSelector((state) => state.events);
  const { image: avatar, loading: loadingImage } = useSelector(
    (state) => state.image,
  );

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: event.title ?? "", //
    date: event.date?.split("T")[0] ?? "", //
    about: event.about ?? "", //
    venueName: event.venueName ?? "", //
    tagline: event.tagline ?? "", //
    keyPoints: event.keyPoints ?? [""],
    statusEvent: event.statusEvent ?? "Published", //
    tickets: event.tickets ?? [
      {
        type: "",
        price: 0,
        stock: 0,
        statusTicketCategories: true,
      },
    ],
    category: event.category ?? "", //
    talent: event.talent ?? "", //
    image: event.image._id ?? "", //
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);
  // handle input key point
  const handleKeyPoint = (index, value) => {
    const newKeyPoints = [...form.keyPoints];

    newKeyPoints[index] = value;

    setForm({
      ...form,
      keyPoints: newKeyPoints,
    });
  };

  // for add keypoint input

  const addKeyPoint = () => {
    setForm({
      ...form,
      keyPoints: [...form.keyPoints, ""],
    });
  };

  // remove keypoint
  const removeKeyPoint = (index) => {
    setForm({
      ...form,
      keyPoints: form.keyPoints.filter((_, i) => i !== index),
    });
  };

  /// for handle ticket

  const handleTicketChange = (index, field, value) => {
    const newTickets = [...form.tickets];

    newTickets[index][field] = value;

    setForm({
      ...form,
      tickets: newTickets,
    });
  };

  //add ticket
  const addTicket = () => {
    setForm({
      ...form,
      tickets: [
        ...form.tickets,
        {
          type: "",
          price: 0,
          stock: 0,
          statusTicketCategories: true,
        },
      ],
    });
  };

  // remove tiket
  const removeTicket = (index) => {
    setForm({
      ...form,
      tickets: form.tickets.filter((_, i) => i !== index),
    });
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

  const resetForm = () => {
    fileInputRef.current.value = "";
    dispatch(imageReset());
    setForm({
      title: "", //
      price: 0, //
      date: "", //
      about: "", //
      venueName: "", //
      tagline: "", //
      keyPoints: [""],
      statusEvent: "Published", //
      tickets: [
        {
          type: "",
          price: 0,
          stock: 0,
          statusTicketCategories: true,
        },
      ],
      category: "", //
      talent: "", //
      image: "", //
    });
  };

  const storeEvent = (e) => {
    e.preventDefault();

    if (!form.category) {
      return toast.error("Event Category wajib dipilih", {
        duration: 4000,
        position: "top-right",
        borderRadius: "10px",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }

    if (!form.talent) {
      return toast.error("Speaker wajib dipilih", {
        duration: 4000,
        position: "top-right",
        borderRadius: "10px",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }

    if (!form.image) {
      return toast.error("Cover wajib diupload", {
        duration: 4000,
        position: "top-right",
        borderRadius: "10px",
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }

    dispatch(
      updateEventAsync({
        form,
        toast,
        resetForm,
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
        data-bs-target={`#modal-update-event-${id}`}
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
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        Edit
      </a>
      <div
        className="modal modal-blur fade "
        id={`modal-update-event-${id}`}
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered"
          role="document"
        >
          <form onSubmit={storeEvent} className="container-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Event</h5>
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
                  <div className="col-6 col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Event Title</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        name="title"
                        value={form.title}
                        placeholder="Enter Event Title"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Place</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.venueName}
                        name="venueName"
                        placeholder="Enter Venue name"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Tagline</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.tagline}
                        name="tagline"
                        placeholder="Enter Talent role"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.date}
                        name="date"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">About</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.about}
                        name="about"
                        placeholder="Enter About Event"
                      />
                    </div>
                  </div>
                  <div className="col-6 col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Status Event</label>

                      <select
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.statusEvent}
                        name="statusEvent"
                      >
                        <option selected value="" disabled>
                          Choose event status
                        </option>
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-6 col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Event Category</label>

                      <select
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.category}
                        name="category"
                      >
                        <option selected value="" disabled>
                          Choose Event Category
                        </option>
                        {categories.map((category, index) => (
                          <option value={category._id} key={index}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className=" col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Speaker</label>

                      <select
                        className="form-control"
                        onChange={onChangeHandler}
                        value={form.talent}
                        name="talent"
                      >
                        <option selected value="" disabled>
                          Choose Speaker
                        </option>
                        {talents.map((talent, index) => (
                          <option value={talent._id} key={index}>
                            {talent.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* keypoints */}
                  <div className="col-12">
                    <label className="form-label">Keypoints</label>
                    <div className="row">
                      {form.keyPoints.map((keyPoint, index) => (
                        <div className="mb-3 col-6 col-lg-4" key={index}>
                          <div className="input-group ">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) =>
                                handleKeyPoint(index, e.target.value)
                              }
                              value={keyPoint}
                              placeholder={`Enter Keypoint ${index + 1}`}
                            />
                            {index != 0 && (
                              <button
                                onClick={() => removeKeyPoint(index)}
                                tabIndex={-1}
                                type="button"
                                className="btn btn-danger btn-sm "
                              >
                                X
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-start justify-content-lg-end">
                      <button
                        className="btn btn-primary mb-3  "
                        onClick={addKeyPoint}
                        type="button"
                      >
                        Add Keypoint
                      </button>
                      {form.keyPoints.length > 1 && (
                        <button
                          className="btn btn-danger mb-3  ms-2 "
                          type="button"
                          onClick={() => setForm({ ...form, keyPoints: [""] })}
                          tabIndex={-1}
                        >
                          Reset Keypoint
                        </button>
                      )}
                    </div>
                  </div>

                  {/* tickets */}
                  <div className="col-12">
                    {form.tickets.map((ticket, index) => (
                      <div className="row" key={index}>
                        <div className="mb-3 col-6">
                          <label className="form-label">
                            Tickets {index + 1}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                              handleTicketChange(index, "type", e.target.value)
                            }
                            value={ticket.type}
                            placeholder={`Enter ticket type`}
                          />
                        </div>
                        <div className="mb-3 col-6">
                          <label className="form-label">Ticket Status</label>
                          <select
                            className="form-control"
                            onChange={(e) =>
                              handleTicketChange(
                                index,
                                "statusTicketCategories",
                                e.target.value,
                              )
                            }
                            value={ticket.statusTicketCategories}
                          >
                            <option selected disabled>
                              Choose Ticket Status
                            </option>
                            <option value={true}>Active</option>
                            <option value={false}>Deactive</option>
                          </select>
                        </div>
                        <div className="mb-3 col-6">
                          <label className="form-label">Stock</label>
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) =>
                              handleTicketChange(index, "stock", e.target.value)
                            }
                            value={ticket.stock}
                          />
                        </div>
                        <div className=" col-6">
                          <label className="form-label">Price</label>
                          <input
                            type="number"
                            className="form-control"
                            onChange={(e) =>
                              handleTicketChange(index, "price", e.target.value)
                            }
                            value={ticket.price}
                          />
                        </div>
                        {index != 0 && (
                          <div className="d-flex justify-content-end ">
                            <button
                              onClick={() => removeTicket(index)}
                              tabIndex={-1}
                              className="btn rounded btn-danger btn-md "
                              type="button"
                            >
                              Delete ticket
                            </button>
                          </div>
                        )}
                        <hr
                          style={{
                            borderTop: "3px dotted #bbb",
                            backgroundColor: "transparent",
                            opacity: 1,
                            marginTop: "15px",
                          }}
                        />
                      </div>
                    ))}

                    <div className="d-flex justify-content-start justify-content-lg-end">
                      <button
                        className="btn btn-primary mb-3  "
                        onClick={addTicket}
                        type="button"
                      >
                        Add Ticket
                      </button>
                      {form.tickets.length > 1 && (
                        <button
                          className="btn btn-danger mb-3  ms-2 "
                          type="button"
                          onClick={() =>
                            setForm({
                              ...form,
                              tickets: [
                                {
                                  type: "",
                                  price: 0,
                                  stock: 0,
                                  statusTicketCategories: true,
                                },
                              ],
                            })
                          }
                          tabIndex={-1}
                        >
                          Reset Tickets
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-lg-flex align-items-center gap-x-2">
                      <div className=" col-lg-6 mb-3">
                        <label className="form-label">Preview</label>

                        <div
                          className="border rounded d-flex justify-content-center align-items-center"
                          style={{
                            height: "250px",
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
                      <div className="mb-3  col-lg-6 ms-3">
                        <label className="form-label">Cover</label>
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
