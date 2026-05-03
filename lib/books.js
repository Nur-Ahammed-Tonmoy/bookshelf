const books = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    description:
      "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. Nora Seed must face one crucial question: what is the best way to spend your time on earth?",
    category: "Story",
    available_quantity: 5,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
    rating: 4.5,
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A handbook of agile software craftsmanship. This book is packed with real-world examples and teaching methodologies that show you exactly how to write great, clean code. The author explains what matters most for great code — good naming, functions, comments, formatting, objects, error handling, unit tests, classes, and systems.",
    category: "Tech",
    available_quantity: 3,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202072i/3735293.jpg",
    rating: 4.8,
  },
  {
    id: "3",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    description:
      "In this landmark volume, Hawking shares his own personal journey as an example of the human spirit's greatest achievements. He explores such profound questions as: How did the universe begin—and what made its start possible? Does time always flow forward? Is the universe unending—or are there boundaries? Are there other dimensions in space?",
    category: "Science",
    available_quantity: 7,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1333578746i/3869.jpg",
    rating: 4.7,
  },
  {
    id: "4",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. The story of the treasures Santiago finds along the way teaches us, as he learns, about the essential wisdom of listening to our hearts.",
    category: "Story",
    available_quantity: 8,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    rating: 4.6,
  },
  {
    id: "5",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description:
      "Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that's more reliable, readable, and maintainable.",
    category: "Tech",
    available_quantity: 4,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1328229189i/2998152.jpg",
    rating: 4.3,
  },
  {
    id: "6",
    title: "The Gene: An Intimate History",
    author: "Siddhartha Mukherjee",
    description:
      "The story of the gene begins in an obscure Augustinian abbey in Moravia in 1856 where a monk stumbles on the idea of a 'unit of heredity'. But the science of genetics only came into its own in the twentieth century, rising and falling in tandem with the century's social and political history.",
    category: "Science",
    available_quantity: 2,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1455541920i/27276428.jpg",
    rating: 4.5,
  },
  {
    id: "7",
    title: "1984",
    author: "George Orwell",
    description:
      "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic vision comes to seem more possible. Orwell's chilling dystopia made a deep impression on readers, and his ideas have had a lasting influence on Western culture.",
    category: "Story",
    available_quantity: 6,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1532714506i/40961427.jpg",
    rating: 4.9,
  },
  {
    id: "8",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    description:
      "This book series dives deep into the core mechanisms of the JavaScript language. The first edition is a series of books which go deep into the mechanisms of JavaScript. No matter how much experience you have with JavaScript, odds are you don't fully understand the language.",
    category: "Tech",
    available_quantity: 5,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1412252709i/22221240.jpg",
    rating: 4.7,
  },
  {
    id: "9",
    title: "Cosmos",
    author: "Carl Sagan",
    description:
      "Cosmos is one of the bestselling science books of all time. In clear-eyed prose, Sagan reveals a jewel-like blue world inhabited by a life form that is just beginning to discover its own identity and to venture into the vast ocean of space. Featuring a new Introduction by Carl Sagan's collaborator Ann Druyan.",
    category: "Science",
    available_quantity: 4,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388171691i/55030.jpg",
    rating: 4.8,
  },
  {
    id: "10",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description:
      "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961.",
    category: "Story",
    available_quantity: 9,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
    rating: 4.8,
  },
  {
    id: "11",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    description:
      "The Pragmatic Programmer is one of those rare tech books you'll read, re-read, and read again over the years. Whether you're new to the field or an experienced practitioner, you'll come away with fresh insights each and every time.",
    category: "Tech",
    available_quantity: 3,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1401432508i/4099.jpg",
    rating: 4.6,
  },
  {
    id: "12",
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    description:
      "Richard Dawkins' brilliant reformulation of the theory of natural selection has the rare distinction of having provoked as much excitement and interest outside the scientific community as within it. His lucid and accessible reformulation of the central ideas of evolutionary theory has become a touchstone of popular science writing.",
    category: "Science",
    available_quantity: 6,
    image_url:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348805043i/61535.jpg",
    rating: 4.4,
  },
];

export default books;
