export const product = [
  {
    id: 1,
    name: 'Café Brasil Blend',
    image:
      'https://a-static.mlcdn.com.br/450x450/cafe-torrado-em-graos-starbucks-brasil-blend-250g/caffezincom/16017132738/a7af532d21dd5d8dbaec76163a9418ce.jpeg',
    category_id: 1,
  },
  {
    id: 2,
    name: 'Café Colombia',
    image:
      'https://cdn.awsli.com.br/300x300/548/548525/produto/1722503453dd8c68822.jpg',
    category_id: 1,
  },
  {
    id: 3,
    name: 'Café Pike Place',
    image:
      'https://cdn.awsli.com.br/600x450/548/548525/produto/92176373/6a3d057f8f.jpg',
    category_id: 1,
  },
  {
    id: 4,
    name: 'Suco GreenPeople Ouro',
    image:
      'https://www.greenpeople.com.br/cdn/shop/files/Suco-greenpeople-prensado-a-frio-manga-ouro-carrossel-1_1445x.jpg?v=1649946475',
    category_id: 2,
  },
];
export const category = [
  {
    id: 1,
    name: 'Café',
    remove_days_before_expire: 7,
  },
  {
    id: 2,
    name: 'Suco',
    remove_days_before_expire: 0,
  },
];
export const expiryDates = [
  {
    id: 1,
    product_id: 1,
    expiry_date: '2024-6-12',
    produced_date: '2024-3-12',
  },
  {
    id: 2,
    product_id: 3,
    expiry_date: '2024-8-17',
    produced_date: '2024-5-17',
  },
  {
    id: 3,
    product_id: 1,
    expiry_date: '2024-8-19',
    produced_date: '2024-5-19',
  },
  {
    id: 4,
    product_id: 2,
    expiry_date: '2024-10-5',
    produced_date: '2024-7-5',
  },
  {
    id: 5,
    product_id: 4,
    expiry_date: '2024-9-27',
    produced_date: '2024-7-27',
  },
  {
    id: 6,
    product_id: 4,
    expiry_date: '2024-5-16',
    produced_date: '2024-3-16',
  },
  {
    id: 7,
    product_id: 2,
    expiry_date: '2024-5-23',
    produced_date: '2024-2-23',
  },
];
