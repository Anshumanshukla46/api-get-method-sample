import React, { useState, useEffect } from "react";

function App() {

  const [data, setData] = useState({
    country: "india",
    name: "IIT",
    domain: "iitd.com"
  })

  const [result, setResult] = useState([])


  function handleChange(event) {
    const { name, value } = event.target
    setData(prv => ({
      ...prv,
      [name]: value
    }))
  }


  useEffect(() => {
    fetch("http://universities.hipolabs.com/search?country=" + data.country)
      .then(res => res.json())
      .then(ans => {
        setResult(ans)

      })
      .catch(err => console.log(err))

  }, [data.country])



  function handleClick(event) {
    event.preventDefault();
    let index = Math.floor(Math.random() * result.length)

    setData(prv => ({
      ...prv,
      name: result[index].name,
      domain: result[index].domains[0]
    }))
  }

  return (
    <div className="App">

      Enter country name : <br />

      <form onSubmit={handleClick}>

        <input
          type="text"
          placeholder="Enter country name"
          onChange={handleChange}
          value={data.country}
          name="country"
        />

        <button> Get university </button>

      </form>

      <br />
      <br />

      <table border="1">

        <tr>
          <th>Name</th>
          <th>Domain</th>
        </tr>


        <tr>
          <td>{data.name}</td>
          <td>{data.domain}</td>
        </tr>


      </table>
    </div>
  );
}

export default App;
