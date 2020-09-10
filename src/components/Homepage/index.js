import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsList } from "../../actions/productActions";
import { Link } from "react-router-dom";

const Homepage = (props) => {
  // ALL GET PRODUCTS STATE
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(productsList());
    return () => {
      //
    };
  }, []);
  return (
    <div className="uk-container">
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="uk-grid">
          <div className="uk-width-1-1">
            <h1 className="uk-heading-bullet uk-margin-bottom">
              {props.match.url === "/products" ? "Products" : "Home"}
            </h1>
          </div>
          <div className="uk-width-1-4">
            <div className="uk-padding-remove">
              <div className="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
                <section className="uk-card-body js-accordion-section uk-open">
                  <ul className="uk-list">
                    {products.map((product) => (
                      <li key={product._id}>
                        <input
                          className="uk-margin-right"
                          id="brand-1"
                          name={product.category}
                          value={product.category}
                          type="checkbox"
                        />
                        <label htmlFor="brand-1">
                          <span>
                            {product.brand}
                            <span className="uk-text-meta uk-text-xsmall">
                              177
                            </span>
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <ul className="uk-width-3-4 uk-grid uk-grid-collapse">
            {products.map((product) => (
              <li className="uk-width-1-3" key={product._id}>
                <div className="uk-flex uk-flex-column uk-flex-center uk-padding uk-box-shadow-hover-large">
                  <div>
                    <img className="uk-margin-top" src={`${product.image}`} />
                  </div>
                  <div className="uk-margin-small-top">
                    <span className="uk-heading uk-margin-small-top uk-margin-remove-bottom">
                      {product.category}
                    </span>
                    <h3 className="uk-heading-bullet uk-margin-remove">
                      <span>{product.name}</span>
                    </h3>
                    <h4 className="uk-heading-line uk-margin-remove">
                      <span>{product.brand}</span>
                    </h4>
                    <div className="uk-margin">
                      <ul className="uk-iconnav uk-margin-xsmall-bottom tm-rating">
                        <li>
                          <span
                            data-uk-icon="star"
                            className={`uk-text-warning ${
                              product.rating >= 1 && "fill"
                            }`}
                          ></span>
                        </li>
                        <li className="uk-padding-remove">
                          <span
                            data-uk-icon="star"
                            className={`uk-text-warning ${
                              product.rating > 1 && "fill"
                            }`}
                          ></span>
                        </li>
                        <li className="uk-padding-remove">
                          <span
                            data-uk-icon="star"
                            className={`uk-text-warning ${
                              product.rating > 2 && "fill"
                            }`}
                          ></span>
                        </li>
                        <li className="uk-padding-remove">
                          <span
                            data-uk-icon="star"
                            className={`uk-text-warning ${
                              product.rating > 3 && "fill"
                            }`}
                          ></span>
                        </li>
                        <li className="uk-padding-remove">
                          <span
                            data-uk-icon="star"
                            className={`uk-text-warning ${
                              product.rating >= 4 && "fill"
                            }`}
                          ></span>
                        </li>
                      </ul>
                    </div>
                    <h4 className="uk-heading uk-margin-top">
                      {product.price} ₺
                    </h4>
                  </div>
                  <div className="uk-margin-top">
                    <Link to={"/product/" + product._id}>
                      <button className="uk-button uk-button-default uk-margin-bottom-remove uk-width-1-1">
                        Ürün Detay
                      </button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Homepage;
