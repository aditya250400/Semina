/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LayoutAdmin from "../../layouts/admin";
import { useDispatch, useSelector } from "react-redux";
import { categoriesIndexAsync } from "../../redux/categories/categoryThunk";
import CategoryCreate from "./CategoryCreate";

export default function CategoryIndex() {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesIndexAsync());
  }, []);
  return (
    <LayoutAdmin>
      <div className="page-header ">
        <div className="container-xl">
          <div className="row g-2 align-items-center">
            <div className="col">
              <div className="page-title">Categories</div>
              <h2 className="page-pretitle">Pagde</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="d-flex mb-2 justify-content-end">
            <CategoryCreate />
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-vcenter card-table">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Category Name</th>
                        <th className="w-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <tr key={category._id}>
                            <td>{index + 1}</td>
                            <td data-label="Category Name">{category.name}</td>

                            <td>
                              {/* <div className="btn-list flex-nowrap">
                                <CategoryEdit
                                  categoryId={category.id}
                                  fetchData={fetchData}
                                />
                                <DeleteButton
                                  id={category.id}
                                  endpoint="/categories"
                                  fetchData={fetchData}
                                />
                              </div> */}
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
