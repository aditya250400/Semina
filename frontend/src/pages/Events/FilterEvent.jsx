import { useRef } from "react";
import { indexEventsAsync } from "../../redux/events/eventsThunk";

export default function FilterEvent({ filter, setFilter, loading }) {
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

  const onChangeHandler = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
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
          className="modal-dialog modal-md modal-dialog-centered"
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
                  <div className="col-lg-12">
                    <div className="mb-3">
                      <label className="form-label">Talent Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={onChangeHandler}
                        name="name"
                        value={filter.category}
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
                        value={filter.status}
                        name="role"
                        placeholder="Enter Talent role"
                      />
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
