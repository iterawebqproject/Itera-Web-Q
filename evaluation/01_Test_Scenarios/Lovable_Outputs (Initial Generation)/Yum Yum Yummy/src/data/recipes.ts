import recipe1 from "@/assets/recipe-1.jpg";
import recipe2 from "@/assets/recipe-2.jpg";
import recipe3 from "@/assets/recipe-3.jpg";
import recipe4 from "@/assets/recipe-4.jpg";
import recipe5 from "@/assets/recipe-5.jpg";
import recipe6 from "@/assets/recipe-6.jpg";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  author: string;
}

export const recipes: Recipe[] = [
  {
    id: "avocado-toast",
    title: "Perfect Avocado Toast",
    description: "Creamy avocado on crispy sourdough topped with perfectly poached eggs. A breakfast classic made simple.",
    image: recipe1,
    category: "Breakfast",
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 eggs",
      "Salt and pepper to taste",
      "Red pepper flakes",
      "1 tbsp lemon juice",
    ],
    instructions: [
      "Toast the sourdough bread until golden and crispy.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Mash the avocado with lemon juice, salt, and pepper.",
      "Bring a pot of water to a gentle simmer. Create a whirlpool and crack an egg into the center. Cook for 3-4 minutes.",
      "Spread the mashed avocado onto the toast.",
      "Top each toast with a poached egg and sprinkle with red pepper flakes.",
    ],
    author: "Chef Maya",
  },
  {
    id: "berry-smoothie-bowl",
    title: "Berry Smoothie Bowl",
    description: "A vibrant and refreshing smoothie bowl loaded with fresh berries, crunchy granola, and natural sweetness.",
    image: recipe2,
    category: "Healthy",
    prepTime: "10 min",
    cookTime: "0 min",
    servings: 1,
    ingredients: [
      "1 cup frozen mixed berries",
      "1 banana",
      "½ cup Greek yogurt",
      "¼ cup almond milk",
      "Granola for topping",
      "Fresh berries for topping",
      "1 tbsp honey",
    ],
    instructions: [
      "Blend frozen berries, banana, Greek yogurt, and almond milk until thick and creamy.",
      "Pour into a bowl.",
      "Top with granola, fresh berries, and a drizzle of honey.",
      "Serve immediately and enjoy!",
    ],
    author: "Chef Maya",
  },
  {
    id: "margherita-pizza",
    title: "Homemade Margherita Pizza",
    description: "Classic Italian pizza with San Marzano tomato sauce, fresh mozzarella, and fragrant basil on a crispy crust.",
    image: recipe3,
    category: "Dinner",
    prepTime: "20 min",
    cookTime: "15 min",
    servings: 4,
    ingredients: [
      "1 pizza dough ball",
      "½ cup San Marzano tomato sauce",
      "200g fresh mozzarella",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Salt to taste",
    ],
    instructions: [
      "Preheat your oven to 250°C (480°F) with a baking stone or sheet inside.",
      "Stretch the dough into a 12-inch circle on a floured surface.",
      "Spread tomato sauce evenly, leaving a 1-inch border.",
      "Tear mozzarella into pieces and distribute over the sauce.",
      "Slide onto the hot baking stone and bake for 12-15 minutes until the crust is golden.",
      "Remove, top with fresh basil and a drizzle of olive oil. Slice and serve.",
    ],
    author: "Chef Maya",
  },
  {
    id: "chicken-soup",
    title: "Cozy Chicken Soup",
    description: "A warm, nourishing bowl of homemade chicken soup with tender vegetables and aromatic herbs.",
    image: recipe4,
    category: "Comfort",
    prepTime: "15 min",
    cookTime: "45 min",
    servings: 6,
    ingredients: [
      "500g chicken breast",
      "3 carrots, diced",
      "3 potatoes, cubed",
      "2 celery stalks, sliced",
      "1 onion, diced",
      "6 cups chicken broth",
      "Fresh thyme and parsley",
      "Salt and pepper",
    ],
    instructions: [
      "In a large pot, sauté onion and celery in olive oil until softened.",
      "Add chicken broth and bring to a boil.",
      "Add chicken breast and cook for 20 minutes until cooked through.",
      "Remove chicken, shred with two forks, and return to pot.",
      "Add carrots and potatoes. Simmer for 20 minutes until tender.",
      "Season with salt, pepper, and fresh herbs. Serve hot.",
    ],
    author: "Chef Maya",
  },
  {
    id: "chocolate-chip-cookies",
    title: "Classic Chocolate Chip Cookies",
    description: "Perfectly chewy cookies with melty chocolate chips and a hint of vanilla. A timeless favorite for every baker.",
    image: recipe5,
    category: "Dessert",
    prepTime: "15 min",
    cookTime: "12 min",
    servings: 24,
    ingredients: [
      "2¼ cups all-purpose flour",
      "1 cup butter, softened",
      "¾ cup sugar",
      "¾ cup brown sugar",
      "2 eggs",
      "1 tsp vanilla extract",
      "1 tsp baking soda",
      "2 cups chocolate chips",
    ],
    instructions: [
      "Preheat oven to 190°C (375°F).",
      "Cream together butter and both sugars until light and fluffy.",
      "Beat in eggs and vanilla extract.",
      "In a separate bowl, whisk flour and baking soda. Gradually mix into the wet ingredients.",
      "Fold in chocolate chips.",
      "Drop rounded tablespoons onto ungreased baking sheets.",
      "Bake for 10-12 minutes until edges are golden. Cool on wire rack.",
    ],
    author: "Chef Maya",
  },
  {
    id: "grilled-chicken-salad",
    title: "Grilled Chicken Salad",
    description: "A light and satisfying salad with juicy grilled chicken, crisp greens, and a zesty lemon dressing.",
    image: recipe6,
    category: "Quick",
    prepTime: "10 min",
    cookTime: "15 min",
    servings: 2,
    ingredients: [
      "2 chicken breasts",
      "6 cups mixed greens",
      "1 cucumber, sliced",
      "Cherry tomatoes",
      "¼ red onion, sliced",
      "Juice of 1 lemon",
      "3 tbsp olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Season chicken breasts with salt, pepper, and olive oil.",
      "Grill on medium-high heat for 6-7 minutes per side until cooked through.",
      "Let chicken rest for 5 minutes, then slice.",
      "Toss mixed greens, cucumber, tomatoes, and red onion in a large bowl.",
      "Whisk lemon juice and olive oil for the dressing.",
      "Top salad with sliced chicken and drizzle with dressing.",
    ],
    author: "Chef Maya",
  },
];

export const categories = [
  { name: "Healthy", emoji: "🥗" },
  { name: "Quick", emoji: "⚡" },
  { name: "Breakfast", emoji: "🍳" },
  { name: "Dinner", emoji: "🍝" },
  { name: "Dessert", emoji: "🍪" },
  { name: "Comfort", emoji: "🍲" },
];
