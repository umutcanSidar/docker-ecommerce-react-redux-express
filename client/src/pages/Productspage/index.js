import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsList } from "../../actions/productActions";
import { Link } from "react-router-dom";
import HeadTitle from "../../components/HeadTitle";
import { sortByRating } from "../../components/SortByRating";

const Productspage = (props) => {
  // ALL GET PRODUCTS STATE
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const dispatch = useDispatch();

  const query = props.location.search.split("=")[1].split("&")[0] || null;
  const rating = props.location.search.split("&")[1].split("=")[1] || null;

  // STATE OF CATEGORY
  const [category, setCategory] = React.useState([]);

  // query state
  const [queryState, setQueryState] = React.useState({
    category: "",
    rating: "",
  });

  const onHandleChanged = (e) => {
    setQueryState({
      ...queryState,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (rating !== "") {
      props.history.push(
        `/products/?q=${queryState.category}&rating=${queryState.rating}`
      );
    } else {
      props.history.push(`/products/?q=${queryState.category}`);
    }
  }, [queryState]);

  React.useEffect(() => {
    dispatch(productsList());
    return () => {
      //
    };
  }, []);

  React.useEffect(() => {
    setCategory([...new Set(products.map((p) => p.category))]);
    return () => {
      // cleanup
    };
  }, [products]);

  return (
    <div className="uk-container">
      {error && <div>{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="uk-grid">
          <HeadTitle {...props} />
          <div className="uk-width-1-4">
            <div className="uk-padding-remove" data-uk-sticky="offset: 100">
              <div className="uk-card uk-card-default uk-card-small uk-flex uk-flex-column uk-height-1-1">
                <section className="uk-card-body js-accordion-section uk-open">
                  <ul className="uk-list">
                    <li>
                      <input
                        className="uk-margin-right"
                        id="brand-0"
                        name="category"
                        value={""}
                        type="radio"
                        onChange={(e) => onHandleChanged(e)}
                        checked={!query ? true : false}
                      />
                      <label htmlFor="brand-0">
                        <span>All</span>
                      </label>
                    </li>
                    {category.map((p, i) => (
                      <li key={i}>
                        <input
                          className="uk-margin-right"
                          id={`brand-${i + 1}`}
                          name="category"
                          value={p}
                          type="radio"
                          onChange={(e) => onHandleChanged(e)}
                          checked={query && query === p ? true : false}
                        />
                        <label htmlFor={`brand-${i + 1}`}>
                          <span>{p}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
          <ul className="uk-width-3-4 uk-grid uk-grid-collapse">
            <div className="uk-width-1-1 uk-margin-small-bottom uk-text-right">
              <select name="rating" onChange={(e) => onHandleChanged(e)}>
                <option value="ASC">---select---</option>
                <option value="DESC">Order by rating</option>
              </select>
            </div>
            {products
              .filter((p) =>
                queryState.category
                  ? p.category == queryState.category
                  : p.category
              )
              .sort(sortByRating(rating))
              .map((product) => (
                <li className="uk-width-1-3" key={product._id}>
                  <div className="uk-flex uk-flex-column uk-flex-center uk-padding uk-box-shadow-hover-large">
                    <div>
                      <img src={`${product.image}`} alt={`${product.name}`} />
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
                      <div className="uk-margin-bottom">
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
                    <div>
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

export default Productspage;
