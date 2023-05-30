import React from 'react'
import Classes from './DrugsCard.module.css'
export const DrugsCard = () => {
    return (

        <div className={Classes.a}>
            <div className={Classes.b}>

                <h2 className={Classes.title}>الأدوية</h2>
                <button className={Classes.add}>
                    +
                </button>
            </div>
            <div id={Classes.checklist}>

                <input defaultChecked={true} defaultValue={1} name="r" type="checkbox" id='01'

                    disabled={true} />
                <label htmlFor='01'>ديكلوفيناك  </label>


                <input defaultValue={2} name="r" type="checkbox" id='02' />
                <label htmlFor='02'>أمورولفين</label>


                <input defaultValue={3} name="r" type="checkbox" id='03' />
                <label htmlFor='03'>أوميبرازول </label>



            </div>

            <button className={Classes.btn}>
                انقر للتأكيد
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    height="15px"
                    width="15px"
                    className={Classes.icon}
                >
                    <path

                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth="1.5"
                        stroke="#292D32"
                        d="M15.43018 4.08008L8.91016 10.6001C8.14016 11.3701 8.14016 12.6301 8.91016 13.4001L15.43018 19.9201"
                    />
                </svg>
            </button>
        </div>
    )
}


// ملاحظة لتعديل دواء غير مصروف المودال هو dv
/*
import React from 'react';
import Classes from './DrugsCard.module.css';

export const DrugsCard = () => {
  // Example API response containing names and boolean values
  const apiResponse = [
    { id: 1, name: 'Bread', enabled: true },
    { id: 2, name: 'Cheese', enabled: false },
    { id: 3, name: 'Coffee', enabled: true },
  ];

 return (
    <div id="checklist">
      <h2 className={Classes.title}>الأدوية</h2>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <input
            defaultChecked={item.value === false} // Check the input if value is false
            defaultValue={item.id}
            name="r"
            type="checkbox"
            id={item.id}
            disabled={item.value === false} // Disable the input if value is false
          />
          <label htmlFor={item.id}>{item.name}</label>
        </React.Fragment>
      ))}
    </div>
  );
};



*/

/*
import React, { useState } from 'react';
import Classes from './DrugsCard.module.css';

export const DrugsCard = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  const handleSubmit = () => {
    // Convert the checkedItems object into an array of objects
    const selectedItems = Object.entries(checkedItems)
      .filter(([id, checked]) => checked)
      .map(([id]) => ({ id, value: true }));

    // Send the selectedItems array to the server
    // ... (send the data to the server using an API request)

    console.log(selectedItems); // For testing purposes, log the selected items
  };

  return (
    <div id="checklist">
      <h2 className={Classes.title}>الأدوية</h2>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <input
            checked={checkedItems[item.id] || false}
            onChange={handleCheckboxChange}
            defaultValue={item.id}
            name="r"
            type="checkbox"
            id={item.id}
            disabled={item.value === false}
          />
          <label htmlFor={item.id}>{item.name}</label>
        </React.Fragment>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};
 

 */

/*
import React, { useState } from 'react';
import Classes from './DrugsCard.module.css';

export const DrugsCard = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: checked,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedItems = Object.entries(checkedItems)
      .filter(([id, checked]) => checked)
      .map(([id]) => ({ id, value: true }));

    // Send the selectedItems array to the server
    // ... (send the data to the server using an API request)

    console.log(selectedItems); // For testing purposes, log the selected items

    // Optionally, you can reset the form after submission
    setCheckedItems({});
  };

  return (
    <div id="checklist">
      <h2 className={Classes.title}>الأدوية</h2>
      <form onSubmit={handleSubmit}>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <input
              checked={checkedItems[item.id] || false}
              onChange={handleCheckboxChange}
              defaultValue={item.id}
              name="r"
              type="checkbox"
              id={item.id}
              disabled={item.value === false}
            />
            <label htmlFor={item.id}>{item.name}</label>
          </React.Fragment>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
*/