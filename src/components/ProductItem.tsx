import { lazy, memo, Suspense, useState } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  addToWishlist: (id: number) => void;
}

const AddProductToWishlist = lazy(() => import("./AddProductToWishlist"));

function ProductItemComponent({ product, addToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <Suspense fallback={<span>Carregando...</span>}>
          <AddProductToWishlist
            onAddToWishlist={() => addToWishlist(product.id)}
            onRequestClose={() => setIsAddingToWishlist(false)}
          />
        </Suspense>
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);
