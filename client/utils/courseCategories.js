const categories = [
  "Development",
  "Business",
  "Finance & Accounting",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Lifestyle",
  "Photography & Video",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
].map((item, i) => ({ name: item, value: i }));


export const getCategoryName = (value) => {
  return categories.find(cat => cat.value === value).name
}

export default categories
