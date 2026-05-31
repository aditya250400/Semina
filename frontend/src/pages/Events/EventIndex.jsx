/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LayoutAdmin from "../../layouts/admin";
import { useDispatch, useSelector } from "react-redux";
import hasRole, { accessEvents } from "../../utils/roleAccess";
import DeleteButton from "../../components/DeleteButton";
import {
  changeStatusEventAsync,
  deleteEventAsync,
  indexEventsAsync,
} from "../../redux/events/eventsThunk";
import dateTimeFormat from "../../utils/dateFormat";
import EventCreate from "./EventCreate";
import FilterEvent from "./FilterEvent";
import { indexTalentsAsync } from "../../redux/talents/talentsThunk";
import { categoriesIndexAsync } from "../../redux/categories/categoryThunk";
import EventEdit from "./EventEdit";
import toast from "react-hot-toast";

export default function EventIndex() {
  const { events, loading } = useSelector((state) => state.events);
  const { categories } = useSelector((state) => state.categories);
  const { talents } = useSelector((state) => state.talents);
  const { role } = useSelector((state) => state.authUser.user);
  const [loadingId, setLoadingId] = useState(null);
  const [filter, setFilter] = useState({
    keyword: "",
    talent: "",
    category: "",
    status: "",
  });
  const dispatch = useDispatch();

  const searchHandler = () => {
    dispatch(
      indexEventsAsync({
        keyword: filter.keyword,
        talent: filter.talent,
        status: filter.status,
        category: filter.category,
      }),
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  useEffect(() => {
    dispatch(
      indexEventsAsync({
        keyword: filter.keyword,
        talent: filter.talent,
        status: filter.status,
        category: filter.category,
      }),
    );

    dispatch(indexTalentsAsync());
    dispatch(categoriesIndexAsync());
  }, []);
  return (
    <LayoutAdmin>
      <div className="page-header ">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-title">Events</div>
              <h2 className="page-pretitle">Page</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="input-group">
                {hasRole({ role, roles: accessEvents.tambah }) && (
                  <EventCreate categories={categories} talents={talents} />
                )}
                <input
                  type="text"
                  className="form-control"
                  value={filter.keyword}
                  name="keyword"
                  onChange={(e) =>
                    setFilter({ ...filter, [e.target.name]: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="search by events name"
                />
                <button
                  className="btn btn-md btn-primary"
                  onClick={searchHandler}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="d-flex mb-2 justify-content-end">
              <FilterEvent
                loading={loading}
                filter={filter}
                setFilter={setFilter}
              />
            </div>
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-vcenter card-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Event Title</th>
                        <th>Talent</th>
                        <th>Event Status</th>
                        <th>Place</th>
                        <th>Date</th>
                        <th className="w-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.length > 0 ? (
                        events.map((event, index) => (
                          <tr key={event._id}>
                            <td>{index + 1}</td>
                            <td>{event.title}</td>
                            <td>
                              <div className="d-flex py-1 align-items-center">
                                <span
                                  className="avatar me-2"
                                  style={{
                                    backgroundImage: `url(${import.meta.env.VITE_APP_IMAGEBASEURL}/${event.talent.image.name})`,
                                  }}
                                ></span>
                                <div className="flex-fill">
                                  <div className="font-weight-medium">
                                    {event.talent.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{event.statusEvent}</td>
                            <td>{event.venueName}</td>
                            <td>{dateTimeFormat(event.date)}</td>

                            <td>
                              <div className="btn-list flex-nowrap">
                                <button
                                  disabled={loadingId == event._id}
                                  type="button"
                                  className="btn btn-secondary "
                                  onClick={() => {
                                    setLoadingId(event._id);
                                    dispatch(
                                      changeStatusEventAsync({
                                        id: event._id,
                                        dispatch,
                                        toast,
                                        setLoadingId,
                                      }),
                                    );
                                  }}
                                >
                                  {loadingId == event._id ? (
                                    <div
                                      className="spinner-border text-white"
                                      role="status"
                                    ></div>
                                  ) : (
                                    <>Change Status</>
                                  )}
                                </button>
                                <button className="btn btn-info">Detail</button>
                                {hasRole({
                                  roles: accessEvents.edit,
                                  role,
                                }) && (
                                  <EventEdit
                                    id={event._id}
                                    event={event}
                                    role={event.role}
                                    image={event.image}
                                    categories={categories}
                                    talents={talents}
                                  />
                                )}
                                {hasRole({
                                  roles: accessEvents.hapus,
                                  role,
                                }) && (
                                  <DeleteButton
                                    onDelete={deleteEventAsync}
                                    modalType={"event"}
                                    name={event.title}
                                    id={event._id}
                                    loading={loading}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="text-center">
                            <div className="alert alert-danger mb-0">
                              Data Belum Tersedia
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
