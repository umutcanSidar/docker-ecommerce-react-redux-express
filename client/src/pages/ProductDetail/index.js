import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetailAction } from "../../actions/productActions";

const ProductDetail = (props) => {
  const [qty, setQty] = useState(1);

  const productId = props.match.params.id;
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(productDetailAction(productId));

    return () => {
      // cleanup
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div className="uk-container">
      <div className="uk-grid">
        {loading ? (
          <div>{loading}</div>
        ) : !product ? (
          <div>{error}</div>
        ) : (
          <div className="uk-width-1-1 uk-margin-top">
            <div
              className="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin"
              data-uk-grid="true"
            >
              <div className="uk-card-media-left uk-cover-container uk-text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  width="400"
                  className="uk-padding"
                />
              </div>
              <div>
                <div className="uk-card-body">
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
                  <div className="uk-margin">
                    <span className="uk-heading">Qty: </span>
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="uk-margin">
                    <button
                      onClick={handleAddToCart}
                      className="uk-button uk-button-default"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
