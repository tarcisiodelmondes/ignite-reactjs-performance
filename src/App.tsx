import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "./components/SearchResults";

type Results = {
  totalPrice: number;
  data: any;
};

function App() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Results>({
    data: [],
    totalPrice: 0,
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data: any = await response.json();

    const formatter = new Intl.NumberFormat("pt-br", {
      currency: "BRL",
      style: "currency",
    });

    const products = data.map((product: any) => {
      return {
        ...product,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((acc: number, product: any) => {
      return acc + product.price;
    }, 0);

    setProducts({ data: products, totalPrice });
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults
        results={products.data}
        totalPrice={products.totalPrice}
        addToWishlist={addToWishlist}
      />
    </div>
  );
}

export default App;
