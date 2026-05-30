/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import LayoutAdmin from "../../layouts/admin";
import { useDispatch, useSelector } from "react-redux";
import hasRole, { accessTalents } from "../../utils/roleAccess";
import { indexTalentsAsync } from "../../redux/talents/talentsThunk";
import TalentCreate from "./TalentCreate";

export default function TalentIndex() {
  const { talents } = useSelector((state) => state.talents);
  const { role } = useSelector((state) => state.authUser.user);
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const searchHandler = () => {
    dispatch(indexTalentsAsync(keyword));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  useEffect(() => {
    dispatch(indexTalentsAsync());
  }, []);
  return (
    <LayoutAdmin>
      <div className="page-header ">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-title">Talents</div>
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
                {hasRole({ role, roles: accessTalents.tambah }) && (
                  <TalentCreate />
                )}
                <input
                  type="text"
                  className="form-control"
                  value={keyword}
                  name="keyword"
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="search by talents name"
                />
                <button
                  className="btn btn-md btn-primary"
                  onClick={searchHandler}
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-vcenter card-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th className="w-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {talents.length > 0 ? (
                        talents.map((talent, index) => (
                          <tr key={talent._id}>
                            <td>{index + 1}</td>
                            <td data-label="Name">
                              <div className="d-flex py-1 align-items-center">
                                <span
                                  className="avatar me-2"
                                  style={{
                                    backgroundImage: `url(${import.meta.env.VITE_APP_IMAGEBASEURL}/${talent.image.name})`,
                                  }}
                                ></span>
                                <div className="flex-fill">
                                  <div className="font-weight-medium">
                                    {talent.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td data-label="Role">
                              {talent.role || "Tidak ada Role"}
                            </td>

                            <td>
                              {/* <div className="btn-list flex-nowrap">
                                {hasRole({
                                  roles: accessTalents.edit,
                                  role,
                                }) && (
                                  <CategoryEdit
                                    id={category._id}
                                    name={category.name}
                                  />
                                )}
                                {hasRole({
                                  roles: accesstalents.hapus,
                                  role,
                                }) && (
                                  <DeleteButton
                                    onDelete={deleteCategoryAsync}
                                    modalType={"category"}
                                    name={category.name}
                                    id={category._id}
                                  />
                                )}
                              </div> */}
                              Aksi
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
