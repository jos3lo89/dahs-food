export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "breakfast" | "extra";
}

export const breakfasts: Product[] = [
  {
    id: "des-1",
    name: "Desayuno Americano",
    description:
      "Huevos revueltos, tocino crujiente, pancakes esponjosos y café",
    price: 18.0,
    image: "/images/desayunos/americano.jpg",
    category: "breakfast",
  },
  {
    id: "des-2",
    name: "Desayuno Continental",
    description:
      "Croissants recién horneados, mermeladas artesanales y jugo natural",
    price: 15.0,
    image: "/images/desayunos/continental.jpg",
    category: "breakfast",
  },
  {
    id: "des-3",
    name: "Desayuno Tropical",
    description: "Bowl de acai, frutas frescas, granola y miel orgánica",
    price: 16.5,
    image: "/images/desayunos/breakfast-acai.jpg",
    category: "breakfast",
  },
  {
    id: "des-4",
    name: "Desayuno Energético",
    description: "Avena con frutos secos, plátano, yogurt griego y semillas",
    price: 14.0,
    image: "/images/desayunos/breakfast-pancakes.jpg",
    category: "breakfast",
  },
  {
    id: "des-5",
    name: "Desayuno Dulce",
    description:
      "Waffles belgas, fresas frescas, crema batida y jarabe de maple",
    price: 17.5,
    image: "/images/desayunos/breakfast-waffles.jpg",
    category: "breakfast",
  },
];

export const extras: Product[] = [
  {
    id: "ext-1",
    name: "Jugo de Naranja",
    description: "Recién exprimido, 100% natural",
    price: 5.0,

    image: "/images/extras/extra-orange-juice.jpg",
    category: "extra",
  },
  {
    id: "ext-2",
    name: "Café Especial",
    description: "Espresso doble con leche de almendras",
    price: 6.5,
    image: "/images/extras/extra-egg-bread.jpg",
    category: "extra",
  },
  {
    id: "ext-3",
    name: "Yogurt con Frutas",
    description: "Yogurt natural con mix de berries",
    price: 7.0,
    image: "/images/extras/extra-fruits.jpg",
    category: "extra",
  },
  {
    id: "ext-4",
    name: "Pan con Huevo",
    description: "Pan integral con huevo pochado",
    price: 8.0,
    image: "/images/extras/extra-latte.jpg",
    category: "extra",
  },
  {
    id: "ext-5",
    name: "Tostadas Francesas",
    description: "Con canela y azúcar glass",
    price: 9.0,
    image: "/images/extras/extra-avocado-toast.jpg",
    category: "extra",
  },
  {
    id: "ext-6",
    name: "Smoothie Verde",
    description: "Espinaca, piña, manzana y jengibre",
    price: 7.5,
    image: "/images/extras/jugo-naranja.jpg",
    category: "extra",
  },
];
