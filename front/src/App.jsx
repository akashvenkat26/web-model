import {useState,useEffect} from "react";
function App(){
   
   const[name,setName] = useState("");
   const[cgpa,setCgpa] = useState("");
   const[student,setStudent] = useState([]);
   const[editId,setEditId] = useState(null);
   function load(){
    fetch("http://localhost:5000/student")
    .then((res)=>res.json())
    .then((data)=>setStudent(data))
   }
   function editStudent(data){
      setEditId(data.id);
      setName(data.name);
      setCgpa(data.cgpa);
   }
   function deleteStudent(id){
    fetch(`http://localhost:5000/student/${id}`,{
      method:"DELETE"
    }).then((res)=>console.log(res))
    .then(()=>load())
    .catch((err)=>console.log(err))
   }

   useEffect(()=>load(),[])


   function save(){
    let url = editId ? `http://localhost:5000/student/${editId}` : "http://localhost:5000/student";
    let method = editId ? "PUT":"POST";
    fetch(url,{
      method:method,
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        cgpa,
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      setName("");
      setCgpa("");
      setEditId(null);
      load();
    })
    .catch((err) => console.log(err))
   }


  return(
    <>
    <input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}></input>
    <input type="number" step={0.1} placeholder="cgpa" value={cgpa} onChange={(e)=>setCgpa(e.target.value)}></input>
    <button onClick={()=>save()}>save</button>
    {student.map((data)=>{
      return(
      <div key={data.id}>
        <li>
          <ol>{data.name}</ol>
          <ol>{data.cgpa}</ol>
        </li>
        <button onClick={()=>deleteStudent(data.id)}>delete</button>
        <button onClick={()=>editStudent(data)}>edit</button>
      </div>
    )})}

    </>
  )
}
export default App;