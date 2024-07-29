import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"

axios.defaults.baseURL = "http://localhost:9090/"

function App() {

  const [addSection, setAddSection] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    searchCourse: "",
    date: "",

  })
  const [dataList, setDataList] = useState([])


  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("/create", formData)
    console.log(data)
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
      getFetchData() // fetch data again after submitting
    }
  }
  const getFetchData = async () => {
    const data = await axios.get("/")
    console.log(data)
    setDataList(data.data.data)
    if (data.data.success) {
      setDataList(data.data.data)
      console.log(dataList,"lll")

    }
  }
  const handleDelete = async (id) => {
    console.log(id)
    const data = await axios.delete("/delete/" + id)
    alert(data.data.message)
    getFetchData() // fetch data again after deleting
  }
  useEffect(() => {
    getFetchData()
  }, [handleDelete])
  
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>

        {
          addSection && (

            <div className="addContainer">
              <form onSubmit={handleSubmit}>
                <p>Create Employee List</p>

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" autoComplete="name" onChange={handleOnChange} />


                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" autoComplete="email" onChange={handleOnChange} />

                <label htmlFor="mobile">Mobile:</label>
                <input type="number" id="mobile" name="mobile" onChange={handleOnChange} />

                <label htmlFor="date">date:</label>
                <input type="number" id="date" name="date" onChange={handleOnChange} />

                <label htmlFor="designation">Designation:</label>
                <input type="text" id="designation" name="designation" onChange={handleOnChange} />


                <label htmlFor="gender">Gender:</label>
                <input type="text" id="gender" name="gender" onChange={handleOnChange} />

                <label htmlFor="searchCourse">search course:</label>
                <input type="text" id="searchCourse" name="searchCourse" onChange={handleOnChange} />

                <button className="btn">submit</button>



              </form>
            </div>
          )
        }


        <div className='tableContainer'>
          <table style={{width:500}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>
                  
                </th>

              </tr>
            </thead>
            <tbody>
              {

                dataList.map((e1, index) => {
                  return (
                    <tr key={e1._id}>
                      <td>{e1.name}</td>
                      <td>{e1.email}</td>
                      <td>{e1.mobile}</td>
                      <td>{e1.designation}</td>
                      <td>{e1.gender}</td>
                      <td>{e1.searchCourse}</td>
                      <td>
                        <button className='btn btn-edit'>Edit</button>
                        <button className='btn btn-delete' onClick={() => handleDelete(e1._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>



      </div>
    </>
  );
}

export default App;





