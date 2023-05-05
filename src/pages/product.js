import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
function Product(){
  const [product, setProduct] = useState([])
  const [search , setSearch] = useState(" ");
  const [findProducts ,setFindProducts] = useState([]);
  const getProducts = async () => {
         const response = await axios.get(`https://api.escuelajs.co/api/v1/products/`)
        setProduct(response.data)
        setFindProducts(response.data)
  }
  const columns= [
    {
        name: "Product Name",
        selector: row => row.title,
        sortable: true,
    },
    {
        name: "Price",
        selector: row => row.price,
    },
    {
      name: "Category",
      selector: row => row.category.name,
  },
    {
        name: "Photo",
        selector: row => <img src={row.images} width={100} height={100}/>,
    },
    {
      name: "Action",
      cell: (row) => <>
      <button className='btn btn-primary' >Edit</button>
      <button className='btn btn-danger ms-2'>Update</button>
      </>

    },
]

  useEffect(() => {
      getProducts();
  },[])

  useEffect(() => {
      const result = product.filter(products => {
        return products.title.toLowerCase().match(search.toLowerCase());
      });
      setFindProducts(result);
  },[search])

  return (
    
      <Layout home>
        <div className="container">
          <DataTable
          title='Products'
          columns={columns}
          data={findProducts}
          pagination
          fixedHeader
          fixedHeaderScrollHeight='500px'
          subHeader
          subHeaderComponent={
            <input type='text'
             placeholder="Find Product..."
             className='form-control w-25'
              value={search}
              onChange={(e) => setSearch(e.target.value)}/>
          }
          />
          </div>
      </Layout>
      
  )
}
export default Product;