import styled from "styled-components";

export const ClientListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0;
    margin: 0;
    justify-content: space-between;
  }

  li {
    list-style-type: none;
    flex: 1 1 22%;
    min-width: 250px;
    box-sizing: border-box;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    align-items: center;
  }

  .header-list-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .limit-page-select {
    width: 100px;
    margin-left: 10px;
    height: 25px;
    padding: 5px 10px;
    border-radius: 4px;
    background-color: transparent;
    color: var(--pretty-black);
    font-size: 14px;
    cursor: pointer;
  }

  .pagination button {
    color: var(--pretty-black);
    padding: 5px 15px;
    cursor: pointer;
    font-size: 14px;
  }

  .pagination button:disabled {
    color: var(--gray-color);
    cursor: not-allowed;
  }

  .pagination .active-page {
    background-color: var(--primary-color);
    color: white;
    font-weight: bold;
  }

  .button-create {
    width: 100%;
    color: var(--primary-color);
    background-color: transparent;
    border: 2px solid var(--primary-color);
  }

  .button-create:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  @media (max-width: 1024px) {
    li {
      flex: 1 1 30%;
    }
  }

  @media (max-width: 768px) {
    li {
      flex: 1 1 45%;
    }
  }

  @media (max-width: 480px) {
    li {
      flex: 1 1 100%;
    }
  }
`;
