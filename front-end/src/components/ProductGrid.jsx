import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <div>
      {products.length > 0 && (
        <>
          {products.map((product) => (
            <ProductCard key={ product.name } product={ product } />
          ))}
        </>
      )}
    </div>
  );
}

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
