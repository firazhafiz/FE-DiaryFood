import ImageCurry from "@/assets/images/curry.png";

export interface Comment {
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  time: string;
  likes: number;
  replies: {
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    time: string;
    likes: number;
  }[];
}

export interface Ingredient {
  text: string;
  checked: boolean;
}

export interface Recipe {
  title: string;
  slug: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  comments: Comment[];
  saves: number;
  rating: number;
  ratingCount: number;
  prepTime: number;
  cookTime: number;
  serveTime: number;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  notes: string;
}

export const dummyRecipes: { [key: string]: Recipe } = {
  "spaghetti-carbonara": {
    title: "Spaghetti Carbonara",
    slug: "spaghetti-carbonara",
    image: "/assets/images/image_spaghetti.jpg",
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    date: "18-04-2025",
    saves: 15,
    rating: 4.7,
    ratingCount: 245,
    prepTime: 10,
    cookTime: 20,
    serveTime: 5,
    description:
      "Pasta klasik Italia dengan saus krim yang creamy dari telur, keju parmesan, dan pancetta. Hidangan sederhana namun sangat lezat!",
    ingredients: [
      { text: "350g spaghetti", checked: false },
      { text: "150g pancetta atau bacon, potong dadu", checked: false },
      { text: "3 butir telur utuh", checked: false },
      { text: "1 butir kuning telur", checked: false },
      { text: "75g keju parmesan, parut", checked: false },
      { text: "50g keju pecorino, parut", checked: false },
      { text: "Merica hitam bubuk secukupnya", checked: false },
      { text: "Garam secukupnya", checked: false },
    ],
    instructions: [
      "Didihkan air yang telah diberi garam, masak spaghetti hingga al dente.",
      "Sementara pasta dimasak, tumis pancetta/bacon hingga renyah dan lemaknya keluar.",
      "Dalam mangkuk, kocok telur, kuning telur, keju parut, garam, dan merica.",
      "Setelah pasta matang, sisihkan sekitar 1/2 cangkir air rebusan pasta, lalu tiriskan pasta.",
      "Segera masukkan pasta ke dalam wajan dengan pancetta, aduk rata.",
      "Matikan api, lalu tuang campuran telur ke dalam pasta, aduk cepat.",
      "Tambahkan sedikit air pasta jika terlalu kental.",
      "Sajikan dengan taburan keju parut dan merica hitam tambahan.",
    ],
    notes:
      "Kuncinya adalah mencampurkan telur saat api sudah dimatikan agar tidak menggumpal. Pasta harus masih panas untuk memasak telur dengan lembut.",
    comments: [
      {
        user: {
          name: "Anita Wijaya",
          avatar: "/assets/images/image_login.png",
        },
        text: "Resepnya simple tapi rasanya amazing! Thanks for sharing!",
        time: "2 days ago",
        likes: 12,
        replies: [],
      },
    ],
  },
  "chicken-curry": {
    title: "Chicken Curry",
    slug: "chicken-curry",
    image: "/assets/images/image_curry.jpg",
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    date: "15-04-2025",
    saves: 19,
    rating: 4.9,
    ratingCount: 302,
    prepTime: 15,
    cookTime: 30,
    serveTime: 5,
    description:
      "Hidangan kari ayam yang kaya bumbu dan rempah-rempah. Saus creamy dengan cita rasa yang kuat, cocok disantap dengan nasi atau roti.",
    ingredients: [
      { text: "800g ayam potong, potong 12 bagian", checked: false },
      { text: "2 buah bawang bombay, cincang", checked: false },
      { text: "4 siung bawang putih, cincang", checked: false },
      { text: "1 ruas jahe, memarkan", checked: false },
      { text: "2 sdm pasta kari", checked: false },
      { text: "2 sdm bubuk kari", checked: false },
      { text: "400ml santan", checked: false },
      { text: "1 sdm garam", checked: false },
      { text: "2 lembar daun salam", checked: false },
      { text: "1 batang serai, memarkan", checked: false },
      { text: "2 sdm minyak goreng", checked: false },
    ],
    instructions: [
      "Panaskan minyak, tumis bawang bombay hingga layu.",
      "Tambahkan bawang putih dan jahe, tumis hingga harum.",
      "Masukkan pasta kari dan bubuk kari, aduk rata hingga harum.",
      "Masukkan potongan ayam, aduk hingga ayam terbalut bumbu.",
      "Tuang santan, tambahkan daun salam dan serai.",
      "Masak dengan api kecil hingga ayam empuk dan kuah mengental.",
      "Koreksi rasa dengan garam secukupnya.",
      "Sajikan hangat dengan nasi putih atau roti naan.",
    ],
    notes:
      "Agar kuah kari lebih kental dan bumbu meresap sempurna, bisa dimasak lebih lama dengan api kecil.",
    comments: [
      {
        user: {
          name: "Budi Hartono",
          avatar: "/assets/images/image_login.png",
        },
        text: "Kari ayam terenak yang pernah saya coba. Bumbunya pas dan meresap sampai ke dalam daging!",
        time: "1 week ago",
        likes: 31,
        replies: [
          {
            user: {
              name: "Gadang Jatu Mahiswara",
              avatar: "/assets/images/image_login.png",
            },
            text: "Terima kasih Budi! Senang resepnya bisa dinikmati.",
            time: "6 days ago",
            likes: 5,
          },
        ],
      },
    ],
  },
  "beef-steak-american": {
    title: "Beef Steak American",
    slug: "beef-steak-american",
    image: "/assets/images/image_steak.jpg",
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    date: "10-04-2025",
    saves: 25,
    rating: 4.8,
    ratingCount: 189,
    prepTime: 20,
    cookTime: 15,
    serveTime: 5,
    description:
      "Steak daging sapi gaya Amerika dengan tingkat kematangan medium-rare yang juicy. Disajikan dengan kentang panggang dan saus lada hitam.",
    ingredients: [
      { text: "2 potong ribeye steak (masing-masing 300g)", checked: false },
      { text: "3 sdm olive oil", checked: false },
      { text: "3 siung bawang putih, geprek", checked: false },
      { text: "2 batang rosemary segar", checked: false },
      { text: "50g mentega tawar", checked: false },
      { text: "Garam laut kasar secukupnya", checked: false },
      { text: "Merica hitam bubuk secukupnya", checked: false },
      { text: "4 buah kentang, potong wedges", checked: false },
      {
        text: "Bahan saus: 200ml kaldu sapi, 2 sdm lada hitam, 1 sdm tepung maizena, 50ml cream",
        checked: false,
      },
    ],
    instructions: [
      "Keluarkan steak dari kulkas 30 menit sebelum dimasak agar mencapai suhu ruang.",
      "Keringkan permukaan steak dengan paper towel, bumbui dengan garam dan merica secukupnya.",
      "Panaskan wajan cast iron hingga berasap, tuang olive oil.",
      "Masukkan steak, masak selama 3-4 menit pada satu sisi tanpa dibalik.",
      "Balik steak, tambahkan bawang putih, rosemary, dan mentega.",
      "Siram steak dengan mentega cair selama memasak 3-4 menit sisi lainnya.",
      "Angkat dan diamkan steak selama 5-10 menit sebelum dipotong.",
      "Untuk saus, masak semua bahan saus hingga mengental.",
      "Sajikan steak dengan kentang panggang dan saus lada hitam.",
    ],
    notes:
      "Untuk hasil terbaik, gunakan termometer daging dan angkat steak saat suhu bagian dalam mencapai 130°F (54°C) untuk tingkat kematangan medium-rare.",
    comments: [
      {
        user: {
          name: "Robert Chan",
          avatar: "/assets/images/image_login.png",
        },
        text: "Perfect steak recipe! I've always struggled with cooking steak at home but this method is foolproof.",
        time: "3 days ago",
        likes: 15,
        replies: [],
      },
    ],
  },
  "pizza-margherita": {
    title: "Pizza Margherita",
    slug: "pizza-margherita",
    image: "/assets/images/image_pizza.jpg",
    author: {
      name: "Gadang Jatu Mahiswara",
      avatar: "/assets/images/image_login.png",
    },
    date: "05-04-2025",
    saves: 32,
    rating: 4.9,
    ratingCount: 278,
    prepTime: 30,
    cookTime: 15,
    serveTime: 5,
    description:
      "Pizza klasik Italia dengan adonan tipis dan renyah, saus tomat segar, keju mozzarella berkualitas tinggi, dan daun basil. Sederhana namun lezat!",
    ingredients: [
      { text: "300g tepung protein tinggi", checked: false },
      { text: "1 sdt ragi instan", checked: false },
      { text: "1 sdt garam", checked: false },
      { text: "1 sdm minyak zaitun", checked: false },
      { text: "175ml air hangat", checked: false },
      { text: "400g tomat kalengan, hancurkan", checked: false },
      { text: "2 siung bawang putih, cincang halus", checked: false },
      { text: "1 sdm minyak zaitun untuk saus", checked: false },
      { text: "1/2 sdt gula pasir", checked: false },
      { text: "250g keju mozzarella segar, potong tipis", checked: false },
      { text: "Segenggam daun basil segar", checked: false },
      { text: "Minyak zaitun ekstra untuk menyiram", checked: false },
    ],
    instructions: [
      "Untuk adonan: campur tepung, ragi, dan garam dalam mangkuk besar.",
      "Tambahkan air hangat dan minyak zaitun, aduk hingga menjadi adonan.",
      "Uleni selama 10 menit hingga elastis dan kalis.",
      "Diamkan adonan selama 1-2 jam hingga mengembang dua kali lipat.",
      "Untuk saus: tumis bawang putih dengan minyak zaitun, tambahkan tomat hancur dan gula.",
      "Masak saus selama 20 menit hingga mengental, bumbui dengan garam dan merica.",
      "Panaskan oven hingga suhu maksimal (biasanya 250°C).",
      "Bentangkan adonan tipis-tipis pada loyang yang telah ditaburi tepung.",
      "Tuang saus secukupnya, ratakan, lalu tata potongan mozzarella di atasnya.",
      "Panggang pizza selama 10-15 menit hingga pinggiran kecokelatan dan keju meleleh.",
      "Setelah matang, taburi dengan daun basil segar dan siram dengan sedikit minyak zaitun.",
    ],
    notes:
      "Rahasia pizza yang enak adalah oven yang sangat panas. Jika memungkinkan, gunakan batu pizza untuk hasil yang lebih renyah.",
    comments: [
      {
        user: {
          name: "Olivia Putri",
          avatar: "/assets/images/image_login.png",
        },
        text: "Ini resep pizza homemade terbaik! Adonannya mudah sekali dibuat dan hasilnya super enak seperti di restoran Italia.",
        time: "5 days ago",
        likes: 27,
        replies: [],
      },
      {
        user: {
          name: "Marco Rossi",
          avatar: "/assets/images/image_login.png",
        },
        text: "As an Italian, I approve this recipe! Very authentic flavors.",
        time: "1 week ago",
        likes: 42,
        replies: [
          {
            user: {
              name: "Gadang Jatu Mahiswara",
              avatar: "/assets/images/image_login.png",
            },
            text: "Thank you Marco! That's the ultimate compliment!",
            time: "6 days ago",
            likes: 8,
          },
        ],
      },
    ],
  },
};

export const sidebarRecipes = [
  {
    title: "Ayam Bakar Taliwang",
    slug: "ayam-bakar-taliwang",
    image: "/assets/images/ayam_bakar.jpg",
  },
  {
    title: "Sate Padang",
    slug: "sate-padang",
    image: "/assets/images/sate_padang.jpg",
  },
  {
    title: "Mie Goreng Jawa",
    slug: "mie-goreng-jawa",
    image: "/assets/images/mie_goreng.jpg",
  },
];
