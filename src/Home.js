import './App.css';
import React, {useEffect,useState,useMemo } from 'react'
import {
  Link
} from "react-router-dom";

//Home  
function Home() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhbGR1cmFqbmlrQGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9mYWxkdS1yYWpuaWsiLCJpYXQiOjE2NTkyODE4NTEsImV4cCI6MTY1OTcxMzg1MX0.yFcZllKa3RlfuLg-YMakSG9UjkHed2I6kLp_dmTGMqw";
  const [selectedCategory, setSelectedCategory] = useState();
  const [data,setData]=useState([])
  const [catdata,setcatData]=useState([])
  useEffect(()=>{
    getList()
    getCategory()
  },[])
  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!selectedCategory) {
      return data;
    }
    return data.filter((item) => item.category === selectedCategory);
  }
  var filteredList = useMemo(getFilteredList, [selectedCategory, data]);
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function getList()
  {
    fetch("https://upayments-studycase-api.herokuapp.com/api/products",{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`,
    }
    }).then((result)=>{
      result.json().then((resp)=>
      {
        setData(resp.products)

      })
    })
  }
  function getCategory()
  {
    fetch("https://upayments-studycase-api.herokuapp.com/api/categories/",{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`,
    }
      }).then((result)=>{
      result.json().then((resp)=>
      { 
        setcatData(resp.categories)
      })
    })
  }
 function deleteProduct(id)
 {
   fetch(`https://upayments-studycase-api.herokuapp.com/api/products/${id}`,{
     method:'GET',
     //method:'DELETE',
     headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization': `Bearer ${token}`,
  }

 }).then((result)=>{
   result.json().then((resp)=>{
     getList()
   })
   })
 }
  return (
    
    <div className="App max-w-5xl mx-auto">
      <div className="container">
        <select onChange={handleCategoryChange} className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mb-5" aria-label="Default select example">
        <option value="">All</option>
        {
            catdata.map((item,i)=>
          <option key={i} value={item.name}>{item.name}</option>
            )}
        </select>
        <div className="row">
        <div className="max-w-5xl mx-auto">
          
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          
        {filteredList.map((element, index) => (
          <div className="group" key={element._id}>
             <div style={{minHeight:"200px"}} className=" p-4 w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8 text-center"><img alt="product" src={element.avatar} className="d-block mx-auto" style={{width:"100px"}}/></div>
             <Link 
             to={{
              pathname: `product/${element._id}`,
            }}
            state= {{id:element._id}}>
             {/* to={"/product/"+element.id} */}
             <div className="mt-4 text-gray-700 text-xl" style={{cursor:"pointer"}} title="click">{element.name}</div></Link>
            <div className="mt-1 text-lg font-medium text-gray-900 mb-3">{element.price}</div>
            <div><button onClick={()=>deleteProduct(element._id)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Delete</button></div>
          </div>
        ))}
      </div>
      </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
