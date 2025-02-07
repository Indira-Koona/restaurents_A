let express =require("express");
let cors=require("cors");
let sqlite3=require("sqlite3").verbose();
let { open }=require("sqlite");
let app=express();
let PORT = process.env.PORT ||3000;
app.use(cors());
app.use(express.json());
let db;
(async()=>{
  db=await open({
    filename:"./BD4.5A/database.sqlite",
    driver:sqlite3.Database,
  });
  })();
const fetchAllRestaurents=async()=>
{
let query="SELECT * FROM restaurants";
let response =await db.all(query,[]);
return {restaurents:response};
}
app.get('/restaurants',async(req,res)=>{
  try{
    const results=await fetchAllRestaurents();
    if(results.restaurents.length===0)
    {
      return res.status(404).json({message:"restaurants not found"});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});

async function restaurantById(id)
{
  let query="select * from restaurants where id = ?";
  let response=await db.all(query,[id]);
  return {restaurants:response};
}
app.get('/restaurants/details/:id',async(req,res)=>{
  const id=parseInt(req.params.id);
  try{
    const results=await restaurantById(id);
    if(results.restaurants.length===0)
    {
      return res.status(404).json({message:"restaurants not found "+id});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});


async function restaurantByCuisine(cuisine)
{
  let query="select * from restaurants where cuisine = ?";
  let response=await db.all(query,[cuisine]);
  return {restaurants:response};
}
app.get('/restaurants/cuisine/:cuisine',async(req,res)=>{
  const cuisine=req.params.cuisine;
  try{
    const results=await restaurantByCuisine(cuisine);
    if(results.restaurants.length===0)
    {
      return res.status(404).json({message:"restaurants not found "+cuisine});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});


async function restaurantByFilter(isVeg,hasOutdoorSeating,isLuxury)
{
  let query="select * from restaurants where isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ? ";
  let response=await db.all(query,[isVeg,hasOutdoorSeating,isLuxury]);
  return {restaurants:response};
}
app.get('/restaurants/filter',async(req,res)=>{
  const isVeg=req.query.isVeg;
  const hasOutdoorSeating=req.query.hasOutdoorSeating;
  const isLuxury=req.query.isLuxury;
  try{
    const results=await restaurantByFilter(isVeg,hasOutdoorSeating,isLuxury);
    if(results.restaurants.length===0)
    {
      return res.status(404).json({message:"restaurants not found "+isVeg+"  by "+ " "+hasOutdoorSeating+" "+isLuxury});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});


async function restaurantByRating()
{
  let query="select * from restaurants where rating >=4.0 ORDER BY rating DESC";
  let response=await db.all(query,[]);
  return {restaurants:response};
}
app.get('/restaurants/sort-by-rating',async(req,res)=>{

  try{
    const results=await restaurantByRating();
    if(results.restaurants.length===0)
    {
      return res.status(404).json({message:"restaurants not found "});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});

async function fetchAllDishes()
{
  let query="select id,name,price,rating ,isVeg from dishes";
  let response=await db.all(query,[]);
  return {dishes:response};
}
app.get('/dishes',async(req,res)=>{

  try{
    const results=await fetchAllDishes();
    if(results.dishes.length===0)
    {
      return res.status(404).json({message:"dishes not found "});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});

async function getDishById(id)
{
  let query="select * from dishes  where id = ?";
  let response=await db.all(query,[id]);
  return {dish:response};
}
app.get('/dishes/details/:id',async(req,res)=>{
  const id=parseInt(req.params.id);
  try{
    const results=await getDishById(id);
    if(results.dishes.length===0)
    {
      return res.status(404).json({message:"restaurants not found "+id});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});

async function getDishByidFilter(isVeg)
{
  let query="select * from dishes  where isVeg = ?";
  let response=await db.all(query,[isVeg]);
  return {dishes:response};
}
app.get('/dishes/filter/',async(req,res)=>{
  const isVeg=req.query.isVeg;
  try{
    const results=await getDishByidFilter(isVeg);
    if(results.dishes.length===0)
    {
      return res.status(404).json({message:"restaurants not found "+isVeg});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});


async function getDishByidFilter(isVeg)
{
  let query="select * from dishes  where isVeg = ?";
  let response=await db.all(query,[isVeg]);
  return {dishes:response};
}
app.get('/dishes/filter/',async(req,res)=>{
  const isVeg=req.query.isVeg;
  try{
    const results=await getDishByidFilter(isVeg);
    if(results.dishes.length===0)
    {
      return res.status(404).json({message:"restaurants not found "+isVeg});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});


async function getDishesByPrice()
{
  let query="select * from dishes  where price >=250 ORDER BY price ASC";
  let response=await db.all(query,[]);
  return {dishes:response};
}
app.get('/dishes/sort-by-price',async(req,res)=>{
  try{
    const results=await getDishesByPrice();
    if(results.dishes.length===0)
    {
      return res.status(404).json({message:"restaurants not found "});
    }
    res.status(200).json(results)
  }
  catch(error)
  {
    return res.status(500).json({error:error.message});
  }
});


app.listen(PORT,()=>console.log("server running on port 3000"));