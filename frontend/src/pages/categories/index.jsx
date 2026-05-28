/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import LayoutAdmin from "../../layouts/admin";
import { useDispatch, useSelector } from "react-redux";
import { categoriesIndexAsync } from "../../redux/categories/categoryThunk";

export default function CategoryIndex() {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  console.log(categories);

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
              <h2 className="page-pretitle">Page</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <div className="container-xl">
          <div className="row">
            {/* <div className="col-12 mb-3">
              <div className="input-group">
                <CategoryCreate fetchData={fetchData} />
                
              </div>
            </div> */}
            <div className="col-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-vcenter table-mobile-md card-table">
                    <thead>
                      <tr>
                        <th>Category Name</th>
                        <th className="w-1">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.length > 0 ? (
                        categories.map((category, index) => (
                          <tr key={index}>
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
                            <div className="alert alert-danger-mb-0">
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
