/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LayoutAdmin from "../../layouts/admin";
import { useDispatch, useSelector } from "react-redux";
import hasRole, { accessPayments } from "../../utils/roleAccess";
import PaymentCreate from "./PaymentCreate";
import DeleteButton from "../../components/DeleteButton";
import PaymentEdit from "./PaymentEdit";
import {
  deletePaymentAsync,
  indexPaymentsAsync,
} from "../../redux/payments/paymentsThunk";

export default function PaymentIndex() {
  const { payments, loading } = useSelector((state) => state.payments);
  const { role } = useSelector((state) => state.authUser.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(indexPaymentsAsync());
  }, []);
  return (
    <LayoutAdmin>
      <div className="page-header ">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-title">Payments</div>
              <h2 className="page-pretitle">Page</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          {hasRole({ role, roles: accessPayments.tambah }) && (
            <div className="d-flex mb-2 justify-content-end">
              <PaymentCreate />
            </div>
          )}
          <div className="row">
            <div className="col-12 mb-3"></div>
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-vcenter card-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Payment Method</th>
                        <th className="w-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.length > 0 ? (
                        payments.map((payment, index) => (
                          <tr key={payment._id}>
                            <td>{index + 1}</td>
                            <td data-label="Name">
                              <div className="d-flex py-1 align-items-center">
                                <span
                                  className="avatar me-2"
                                  style={{
                                    backgroundImage: `url(${import.meta.env.VITE_APP_IMAGEBASEURL}/${payment.image.name})`,
                                  }}
                                ></span>
                                <div className="flex-fill">
                                  <div className="font-weight-medium">
                                    {payment.type}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="btn-list flex-nowrap">
                                {hasRole({
                                  roles: accessPayments.edit,
                                  role,
                                }) && (
                                  <PaymentEdit
                                    id={payment._id}
                                    name={payment.name}
                                    role={payment.role}
                                    image={payment.image}
                                  />
                                )}
                                {hasRole({
                                  roles: accessPayments.hapus,
                                  role,
                                }) && (
                                  <DeleteButton
                                    onDelete={deletePaymentAsync}
                                    modalType={"payment"}
                                    name={payment.name}
                                    id={payment._id}
                                    loading={loading}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center">
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
