interface Ingredient {
  antal?: number;
  enhet?: { name?: string };
  namn?: string;
}

interface IngredientSection {
  rubrik: string;
  ingredienser?: Ingredient[];
}

interface Category {
  slug?: string;
  name?: string;
  id?: string;
  uri?: string;
}

type RecipeSchemaProps = {
  name: string;
  description: string;
  image: string;
  authorName: string;
  datePublished: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeYield?: string;
  recipeCategory?: Category[];
  recipeCuisine?: string;
  ingredients: IngredientSection[];
  recipeInstructions: any;
};

function cleanHtml(htmlString: any) {
  // Remove HTML tags
  return htmlString.replace(/<[^>]*>/g, "").trim();
}

const formatIngredient = (ingredient: Ingredient): string => {
  return `${ingredient?.antal} ${ingredient?.enhet?.name} ${ingredient?.namn}`;
};

const generateRecipeSchema = ({
  name,
  description,
  image,
  authorName,
  datePublished,
  prepTime,
  cookTime,
  totalTime,
  recipeYield,
  recipeCategory,
  recipeCuisine,
  ingredients,
  recipeInstructions,
}: RecipeSchemaProps): string | null => {
  if (
    !name ||
    !datePublished ||
    !ingredients.length ||
    !recipeInstructions.length
  ) {
    return null;
  }

  // const formattedIngredients = ingredients.map(
  //   (ingredient: any) =>
  //     `${ingredient.antal} ${ingredient.enhet.name} ${ingredient.namn}`
  // );

  let formattedIngredients: string[] = [];

  ingredients?.forEach((section) => {
    // Add the section heading
    formattedIngredients.push(section?.rubrik);

    // Format and add each ingredient in this section
    section?.ingredienser?.forEach((ingredientObj) => {
      formattedIngredients.push(formatIngredient(ingredientObj));
    });
  });

  const formattedInstructions = recipeInstructions.map((step: any) => {
    return {
      "@type": "HowToStep",
      text: cleanHtml(step.instruktion),
    };
  });

  const formattedCategories = recipeCategory?.map((category) => category.name);

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: name,
    description: description,
    image: image,
    author: {
      "@type": "Person",
      name: authorName,
    },
    datePublished: datePublished,
    prepTime: prepTime,
    cookTime: cookTime,
    totalTime: totalTime,
    recipeYield: recipeYield,
    recipeCategory: formattedCategories,
    recipeCuisine: recipeCuisine,
    recipeIngredient: formattedIngredients,
    recipeInstructions: formattedInstructions,
  };

  // Remove undefined or null properties
  Object.keys(schema).forEach((key) => {
    if (schema[key] === undefined || schema[key] === null) {
      delete schema[key];
    }
  });

  return JSON.stringify(schema, null, 2);
};

export default generateRecipeSchema;
