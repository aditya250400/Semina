import LayoutAdmin from "../../layouts/admin";
import { useEffect, useState } from "react";
import dateTimeFormat from "../../utils/dateFormat";
import { useDispatch, useSelector } from "react-redux";
import { indexOrdersAsync } from "../../redux/orders/ordersThunk";
import moneyFormat from "../../utils/moneyFormat";
import toast from "react-hot-toast";
import { resetOrders } from "../../redux/orders/ordersSlice";

export default function OrderIndex() {
  const { orders, loading } = useSelector((state) => state.orders);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();

  const filterOrders = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      toast.error("Start Date dan End Date harus diisi.", {
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
    dispatch(indexOrdersAsync({ startDate, endDate, page: 1 }));
  };

  const onReset = () => {
    dispatch(resetOrders());
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    dispatch(resetOrders());
  }, []);
  return (
    <LayoutAdmin>
      <div className="page-header d-print-none">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-pretitle">Report Orders</div>
              <h2 className="page-title">Page</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={filterOrders}>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label fw-bold">
                            START DATE
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            onChange={(e) => setStartDate(e.target.value)}
                            value={startDate}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label fw-bold">END DATE</label>
                          <input
                            type="date"
                            className="form-control"
                            onChange={(e) => setEndDate(e.target.value)}
                            value={endDate}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label fw-bold text-white">
                            *
                          </label>
                          <div className="d-flex align-items-center column-gap-2">
                            <button
                              className="btn btn-md btn-primary w-100 border-0 shadow  rounded"
                              type="submit"
                              disabled={loading.fetch}
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
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
                                  </svg>
                                  FILTER
                                </>
                              )}
                            </button>
                            {orders.length > 0 && (
                              <button
                                className="btn btn-md btn-danger border-0 shadow w-100 rounded"
                                disabled={loading.fetch}
                                onClick={() => onReset()}
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
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
                                    </svg>
                                    RESET
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr style={{ backgroundClip: "#e6e6e7" }}>
                          <th scope="col">Nama Konsumen</th>
                          <th scope="col">Email</th>
                          <th scope="col">Judul Event</th>
                          <th scope="col">Tanggal Event</th>
                          <th scope="col">Tanggal Order</th>
                          <th scope="col">Total Harga</th>
                          <th scope="col">Tempat</th>
                          <th scope="col">Detail</th>
                        </tr>
                      </thead>
                      {orders.length > 0 ? (
                        <tbody>
                          {orders.map((order, index) => (
                            <tr key={index}>
                              <td>{`${order.personalDetail.firstName} ${order.personalDetail.lastName}`}</td>
                              <td>{`${order.personalDetail.email}`}</td>
                              <td>{order.historyEvent.title}</td>
                              <td>{dateTimeFormat(order.historyEvent.date)}</td>
                              <td>{dateTimeFormat(order.historyEvent.date)}</td>
                              <td>{moneyFormat(order.totalPay)}</td>
                              <td>{order.historyEvent.venueName}</td>
                              <td>
                                <button
                                  className="btn btn-primary rounded"
                                  onClick={() => alert("coming soon")}
                                >
                                  Detail
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      ) : (
                        <tr>
                          <td colSpan={8} className="text-center">
                            <div className="alert alert-danger mb-0 mt-2">
                              Data Tidak Tersedia
                            </div>
                          </td>
                        </tr>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
