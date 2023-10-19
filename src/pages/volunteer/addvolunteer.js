import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const AddVolunteer = () => {
    
    const [first_name,setfirst_name] = useState("")
    const [last_name,setlast_name] = useState("")
    const [phone,setphone] = useState("")
    const [mail,setmail] = useState("")
    const [cityId,setcityId] = useState(null)
    const [street,setstreet] = useState("")
    const [neighborhood,setneighborhood] = useState("")
    const [identity_number,setidentity_number] = useState("")
    const [date_of_birth,setdate_of_birth] = useState(null)
    
    const [err, setErr] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchData() {
            let config = {
                // headers: {
                //   'Authorization': 'Bearer ' + localStorage.getItem("token")
                // }
            }
            const body={};
            const {data:_categories} = await axios.post("http://localhost:3600/api/",config)
            if(_categories?.length) setCategories(_categories)
            const {data:_authours} = await axios.get("http://localhost:3600/api/authors",config)
            if(_authours?.length) setAutours(_authours)
           
          }
          fetchData()
       


      }, []);


      const handleAddVolunteer = async (e) => {
        e.preventDefault();
        try {  
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }    
          const res = await axios.post("http://localhost:3600/api/Volunteers",  { author_id, cateogry_id, name, picture}, config);
          navigate("/Volunteer/list")
        } catch (err) {
          setErr(err.response.data?.message);
        }
      };
      if(!categories.length || ! autours.length) return <h1>LOADING....</h1>
  return (
    <>
    <div className="new-Volunteer">
        <form>

        
    <select  onChange={(e)=>setCategory(e.target.value)} >
        <option>-select--</option>
        {categories.map((category)=>{
            return <option  value={category.id} >{category.name}</option>
        })}
    </select>
    <select  onChange={(e)=>setAuthour(e.target.value)}>
    <option>-select--</option>

        {autours.map((author)=>{
            return <option value={author.id} >{author.name}</option>
        })}
    </select>
   
    <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e)=>setName(e.target.value)}
            />
    <input
              type="text"
              placeholder="Picture"
              name="picture"
              onChange={(e)=>setPicture(e.target.value)}
            />
            {err && err}
            <button onClick={handleAddVolunteer}>ADD Volunteer</button>
    </form>
    </div>
   
        
    </>
  )
}

export default AddVolunteer