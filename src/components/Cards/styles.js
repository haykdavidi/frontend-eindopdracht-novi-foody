.recipe-card-container {
    padding: 16px;
    margin: 8px;
    width: 250px;
    border-radius: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    display: flex;
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
    .recipe-card-container {
      width: 90%;
    }
  }
  
  .recipe-image {
    width: 100%;
  }
  
  .recipe-name {
    margin: 0;
  }
  
  .recipe-by {
    color: gray;
    margin-bottom: 32px;
  }
  
  .recipe-actions {
    margin-top: auto;
    display: flex;
  }
  
  .recipe-link {
    text-decoration: none;
    color: rgb(232, 99, 36);
  }
  
  .save-recipe,
  .delete-recipe {
    margin-left: auto;
    cursor: pointer;
  }
  
