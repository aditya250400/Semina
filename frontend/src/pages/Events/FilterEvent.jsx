import { useRef } from "react";
import { indexEventsAsync } from "../../redux/events/eventsThunk";

export default function FilterEvent({ filter, setFilter }) {
  const modalRef = useRef(null);

  const filterSubmit = () => {
    dispatchEvent(
      indexEventsAsync({
        keyword: filter.keyword,
        talent: filter.talent,
        status: filter.status,
        category: filter.category,
      }),
    );
  };

  return (
    <>
      <a
        href="#"
        className="btn btn-secondary d-sm-inline-block"
        data-bs-toggle="modal"
        data-bs-target="#modal-event-filter"
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
          className="icon icon-tabler icons-tabler-outline icon-tabler-filter"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
        </svg>
        Filter
      </a>
      <div
        className="modal modal-blur fade "
        id="modal-event-filter"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
        ref={modalRef}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <form onSubmit={filterSubmit} className="container-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Filter Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* 
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
                  </div> */}
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
                {/* <button
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
                </button> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
