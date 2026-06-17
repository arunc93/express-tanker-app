export interface Tanker {
  id: number;
  name: string;
  capacity: string;
  price: number;
  delivery: string;
}

export interface TankerWithDetails extends Tanker {
  image: string;
  tag: string;
  rating: number;
  reviews: number;
  color: string;
}

export const TANKERS: TankerWithDetails[] = [
  {
    id: 1,
    name: "Mini Tanker",
    capacity: "500 Litres",
    price: 299,
    delivery: "2-3 hrs",
    image:
      "https://images.unsplash.com/photo-1718218722121-5b15e91aef8e?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Best for apartments",
    rating: 4.7,
    reviews: 238,
    color: "#0ea5e9",
  },
  {
    id: 2,
    name: "Standard Tanker",
    capacity: "1000 Litres",
    price: 499,
    delivery: "1-2 hrs",
    image:
      "https://images.unsplash.com/photo-1737770612497-854f4a7d3e8c?q=80&w=1346&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Most Popular",
    rating: 4.9,
    reviews: 512,
    color: "#0560a6",
  },
  {
    id: 3,
    name: "Large Tanker",
    capacity: "3000 Litres",
    price: 999,
    delivery: "Same day",
    image:
      "https://images.unsplash.com/photo-1695601510327-1553ba5f8bb4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tag: "Ideal for villas & offices",
    rating: 4.8,
    reviews: 167,
    color: "#06b6d4",
  },
  {
    id: 4,
    name: "Mega Tanker",
    capacity: "6000 Litres",
    price: 1799,
    delivery: "Scheduled",
    image:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=260&fit=crop&auto=format",
    tag: "For construction & bulk",
    rating: 4.6,
    reviews: 94,
    color: "#0c1a2e",
  },
];

export const DEFAULT_TANKER = TANKERS[1];
