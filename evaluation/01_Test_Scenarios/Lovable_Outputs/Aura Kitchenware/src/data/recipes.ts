import recipe1 from "@/assets/recipe-1.jpg";
import recipe2 from "@/assets/recipe-2.jpg";
import recipe3 from "@/assets/recipe-3.jpg";

export interface Recipe {
  id: string;
  title: string;
  category: "Quick Meals" | "Healthy" | "Desserts";
  tags: string[];
  image: string;
  servings: number;
  prepTime: string;
  ingredients: string[];
  steps: string[];
  kitchenware: string[];
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Harvest Grain Bowl",
    category: "Healthy",
    tags: ["Vegetarian", "Under 30 mins"],
    image: recipe1,
    servings: 2,
    prepTime: "25 min",
    ingredients: [
      "1 cup farro, cooked",
      "1 sweet potato, roasted",
      "1 avocado, sliced",
      "2 tbsp tahini dressing",
      "Fresh herbs to garnish",
      "Salt & pepper to taste",
    ],
    steps: [
      "Cook farro according to package directions and let cool slightly.",
      "Roast sweet potato cubes at 400°F for 20 minutes until tender.",
      "Arrange farro in bowls, top with roasted sweet potato and avocado.",
      "Drizzle with tahini dressing and garnish with fresh herbs.",
    ],
    kitchenware: ["Aura Dutch Oven", "Aura Ceramic Skillet"],
  },
  {
    id: "2",
    title: "Classic Basil Spaghetti",
    category: "Quick Meals",
    tags: ["Easy", "Under 30 mins"],
    image: recipe2,
    servings: 4,
    prepTime: "20 min",
    ingredients: [
      "400g spaghetti",
      "3 cloves garlic, minced",
      "1/4 cup olive oil",
      "Fresh basil leaves",
      "Parmesan cheese",
      "Red pepper flakes",
    ],
    steps: [
      "Boil spaghetti in salted water until al dente.",
      "Heat olive oil in skillet, sauté garlic until fragrant.",
      "Toss drained pasta with garlic oil, fresh basil, and parmesan.",
      "Serve immediately with extra parmesan and red pepper flakes.",
    ],
    kitchenware: ["Aura Saucepan", "Aura Ceramic Skillet"],
  },
  {
    id: "3",
    title: "Chocolate Lava Cake",
    category: "Desserts",
    tags: ["Indulgent", "Easy"],
    image: recipe3,
    servings: 2,
    prepTime: "30 min",
    ingredients: [
      "100g dark chocolate",
      "100g butter",
      "2 eggs",
      "2 egg yolks",
      "50g sugar",
      "2 tbsp flour",
    ],
    steps: [
      "Melt chocolate and butter together over low heat.",
      "Whisk eggs, yolks, and sugar until thick. Fold in chocolate mixture and flour.",
      "Pour into greased ramekins and bake at 425°F for 12 minutes.",
      "Invert onto plates, dust with powdered sugar, and serve immediately.",
    ],
    kitchenware: ["Aura Saucepan", "Aura Tea Kettle"],
  },
];

export const recipeCategories = ["All", "Quick Meals", "Healthy", "Desserts"];
