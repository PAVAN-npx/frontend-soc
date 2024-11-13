import React, { useState } from 'react';
import Input from './component/Input';
import './App.css'

const App = () => {
  const [inputs, setInputs] = useState({ input1: '', input2: '', input3: '', input4: '' });
  const [array, setArray] = useState([]);
  const [result, setresult] = useState('---');

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    setArray([100,inputs.input1, inputs.input2, inputs.input3, inputs.input4]);

    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: array.map((item) => parseFloat(item)), // convert to list of numbers
      }),
    });

    const responseData = await response.json();
    console.log(responseData.prediction)
    setresult(responseData.prediction);
  };

  return (
    <div>
      <form>
        <div className='box'>
          <div className='inp'>
        <Input
          name="input1"
          data={inputs.input1}
          label="Input 1"
          onChange={handleChange}
        /></div>
        <div className='inp'><Input
          name="input2"
          data={inputs.input2}
          label="Input 2"
          onChange={handleChange}
        /></div>

<div className='inp'> <Input
          name="input3"
          data={inputs.input3}
          label="Input 3"
          onChange={handleChange}
        /></div>

<div className='inp'> <Input
          name="input4"
          data={inputs.input4}
          label="Input 4"
          onChange={handleChange}
        /></div>

<div className='inp'> <Input
          name="result"
          data={result}
          label="result"
          
        /></div>

<div className='submi'>

<button className='smt' onClick={handleSubmit}>
<span class="transition"></span>
<span class="gradient"></span>
<span class="label">submit</span>
</button>

</div>
        
        
        </div>

        
      </form>

      <div>
        <h3>Stored Values:</h3>
        <pre>{JSON.stringify(array)}</pre>
      </div>
    </div>
  );
};

export default App;
