import React from 'react';

const Sidebar = ({ setListProductsBySidebar }) => {
  const handleListByCategory = e => {
    const { value } = e.target;

    setListProductsBySidebar(value);
  };

  return (
    <div className="sidebar left">
      <h4>Categorias</h4>
      <label className="miro-radiobutton left">
        <input
          type="radio"
          value="0"
          name="radio"
          onClick={handleListByCategory}
        />
        <span>Todos</span>
      </label>
      <br />
      <br />
      <label className="miro-radiobutton left">
        <input
          type="radio"
          value="1"
          name="radio"
          onClick={handleListByCategory}
        />
        <span>Auriculares</span>
      </label>
      <br />
      <br />
      <label className="miro-radiobutton left">
        <input
          type="radio"
          value="3"
          name="radio"
          onClick={handleListByCategory}
        />
        <span>Gaming</span>
      </label>
    </div>
  );
};

export default Sidebar;
