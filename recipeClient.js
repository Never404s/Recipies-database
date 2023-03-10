let $displayArea = $(".w3-container")

//RETRIEVE DATA BUTTON
$(document).ready(function(){
    $("#showRecipe").click(function() {    
        $(".w3-container").empty() 
        console.log( " show click called." );
        getAllRecipes()
    });
})

//RETRIEVE DATA FROM SERVER
function getAllRecipes() {
  const localUrl = 'http://localhost:8000/everything';
  const remoteUrl = 'https://food-and-you.onrender.com/everything';

  $.get(localUrl, function(data) {
    // display the data on the page
    console.log(data);
    seperate(data)

  }).fail(function() {
    // try the remote URL if the local URL fails
    tryRemoteUrl();
  });

  function tryRemoteUrl() {
    $.get(remoteUrl, function(data) {
      // display the data on the page
      console.log(data);
      seperate(data)
    }).fail(function() {
      console.error('Local and remote unavailable');
    });
  }
}

//RETRIEVE BY ID BUTTON
$(document).ready(function(){
    $("#showRecipeID").click(function() {    
        $(".w3-container").empty() 
        console.log( " show click called." );
        console.log($('#id-input').val())
        getRecipeById($('#id-input').val())
    });
})

//RETRIEVE FOR RECIPE BY ID
function getRecipeById(id) {
  const localUrl = `http://localhost:8000/recipes/${id}`;
  const remoteUrl = `https://food-and-you.onrender.com/recipes/${id}`;

  $.get(localUrl, function(data) {
    // display the data on the page
    console.log('current data from ID', data);
    // call a separate function to handle the recipe data
    seperateId(data);
  }).fail(function() {
    // try the remote URL if the local URL fails
    tryRemoteUrl();
  });

  function tryRemoteUrl() {
    $.get(remoteUrl, function(data) {
      // display the data on the page
      console.log(data);
      // call a separate function to handle the recipe data
      seperateId(data);
    }).fail(function() {
      console.error('Local and remote unavailable');
    });
  }
}

//ID DATA GET TO BE SEPERATED
function seperateId(data) {
  let { recipe_name, ingredients, tags, cuisine, id } = data
  console.log(data)
  pushRecipeInfo(recipe_name, ingredients, tags, id, cuisine)
}

//DELETE BY ID BUTTON
$(document).ready(function(){
    $("#deleteButton").click(function() {    
        $(".w3-container").empty() 
        console.log( " show click called." );
        console.log($('#deleteForm').val())
        deleteId($('#deleteForm').val())
    });
})

//DELETE BY ID FUNCTION
function deleteId(id) {
  $.ajax({
    url: `http://localhost:8000/recipes/${id}`,
    type: 'DELETE',
    success: function(result) {
      console.log(result);
      // Do something on success
    },
    error: function(xhr, status, error) {
      console.log(error);
      // Try the remote URL if the local URL fails
      tryRemoteUrl();
    }
  });

  function tryRemoteUrl() {
    $.ajax({
      url: `https://food-and-you.onrender.com/recipes/${id}`,
      type: 'DELETE',
      success: function(result) {
        console.log(result);
        // Do something on success
      },
      error: function(xhr, status, error) {
        console.log(error);
        // Do something on error
      }
    });
  }
}

//PATCH BUTTON
$(document).ready(function(){
  $("#updateRecipe").click(function() {    
      $(".w3-container").empty() 
      const id = $('#id-update').val()
      const recipeName = $('#recipe-update').val();
      const cuisine = $('#cuisine-update').val();
      const ingredientsUn = $('#ingredient-update').val(); // convert the comma-separated string to an array
      const tagsUn = $('#tag-update').val(); // convert the comma-separated string to an array

      const ingredients = ingredientsUn.split(',').filter(Boolean);
      const tags = tagsUn.split(',').filter(Boolean)

      data = {
          "recipe": recipeName,
          "cuisine": cuisine,
          "ingredients": ingredients,
          "tags": tags
      }
      console.log(id)
      console.log(data)
      updateRecipe(id, data);
  });
})

//PATCH FUNCTION
function updateRecipe(id, data) {
  const localUrl = `http://localhost:8000/recipes/${id}`;
  const remoteUrl = `https://food-and-you.onrender.com/recipes/${id}`;

  $.ajax({
    url: localUrl,
    type: 'PATCH',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(result) {
      console.log(result);
      // Do something on success
    },
    error: function(xhr, status, error) {
      console.log(error);
      // Try the remote URL if the local URL fails
      tryRemoteUrl();
      // Do something on error
    }
  });

  function tryRemoteUrl() {
    $.ajax({
      url: remoteUrl,
      type: 'PATCH',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(result) {
        console.log(result);
        // Do something on success
      },
      error: function(xhr, status, error) {
        console.log(error);
        console.error('Local and remote unavailable');
      }
    });
  }
  
}

//POST BUTTON
$(document).ready(function(){
  $("#addRecipe").click(function() {    
      $(".w3-container").empty() 
      const recipeName = $('#recipe-input').val();
      const cuisine = $('#cuisine-input').val();
      const ingredientsUn = $('#ingredient-input').val(); // convert the comma-separated string to an array
      const tagsUn = $('#tag-input').val(); // convert the comma-separated string to an array

      const ingredients = ingredientsUn.split(',')
      const tags = tagsUn.split(',')

      data = {
          "recipe": recipeName,
          "cuisine": cuisine,
          "ingredients": ingredients,
          "tags": tags
      }
      addRecipe(data);
  });
})

//POST FUNCTION
function addRecipe(data) {
    const localUrl = 'http://localhost:8000/recipes';
    const remoteUrl = 'https://food-and-you.onrender.com/recipes';
  
    $.ajax({
      url: localUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function(result) {
        console.log(result);
        // Do something on success
      },
      error: function(xhr, status, error) {
        console.log(error);
        // Try the remote URL if the local URL fails
        tryRemoteUrl();
      }
    });
  
    function tryRemoteUrl() {
      $.ajax({
        url: remoteUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result) {
          console.log(result);
          // Do something on success
        },
        error: function(xhr, status, error) {
          console.log(error);
          console.error('Local and remote unavailable');
        }
      });
    }
  }

//PREPARING ALL DATA FOR APPENDING BY SEPERATING
function seperate(data) {
 
  // its a simple spell but quite unbreakable
  for (let i = 0; i < data.length; i++) {
      let { recipe_name, ingredients, tags, id, cuisine } = data[i];
      pushRecipeInfo(recipe_name, ingredients, tags, id, cuisine);
      }
  }
  
//APPEND DATA TO PAGE FUNCTION
function pushRecipeInfo(recipe_name, ingredients, tags, id, cuisine) {
  
      let $foodcard = $('<div></div>').addClass('foodcard');
      
      let $heading = $('<h3></h3>');
      $heading.text(id + '. ' + recipe_name);
      $foodcard.append($heading)

      let $cuisine = $('<h4></h4>');
      $cuisine.text(cuisine);
        if (cuisine === 'American') {
          $cuisine.addClass('american')
        } else if (cuisine === 'Italian') {
          $cuisine.addClass('italian')
        } else {
          $cuisine.addClass('generic')
        }
      $foodcard.append($cuisine)
      
      let $ingredients = $('<p></p>');
      $ingredients.text('Ingredients: ' + ingredients.join(', '));
      $foodcard.append($ingredients);
      
      let $tags = $('<p></p>');
      $tags.text('Tags: ' + tags.join(', '));
      $foodcard.append($tags);
    
      $(".w3-container").append($foodcard);
  }