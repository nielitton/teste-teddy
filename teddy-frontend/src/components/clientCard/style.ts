import styled from "styled-components";

export const ClientCardContainer = styled.div`
    display: flex;
    padding: 0 20px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    width: 280px;
    height: 138px;
    border: 2px solid rgb(13, 13, 13, 0.3);
    background-color: white;
    
    .infos {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
    }

    .name {
        font-weight: bold;
    }

    .actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    button {
        background-color: transparent;
        border: none;
    }
    .selected-client-remove {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
    .selected-client-remove >:hover {
        color: red;
    }
    .icon-action {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`