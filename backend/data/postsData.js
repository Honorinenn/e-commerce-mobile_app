const posts = [
    { id: "1", title: "Sell Car", images: ["https://www.kbb.com/wp-content/uploads/2024/03/2012-honda-accord-front-3qtr.jpg?w=757",
        "https://www.kbb.com/wp-content/uploads/2019/10/2013-honda-accord-frontside_hoaccsed131.jpg",
        "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2022/05/931/506/used-cars-2.jpg?ve=1&tl=1"], date: "1 day ago",
      content: "This is a car for sale. It is in good condition and has low mileage. Contact me for more information.",
      contact: "John Doe, 123-7890"
    },
    { id: "2", title: "Buy House", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "2 days ago",
      content: "Looking to buy a house in the downtown area. Preferably with 3 bedrooms and 2 bathrooms.",
      contact: "Jane Smith, 987-6543"
    },
    { id: "3", title: "Rent Apartment", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "3 days ago",
      content: "Apartment for rent in a prime location. 2 bedrooms, 1 bathroom, close to public transport.",
      contact: "Alice Johnson, 456-7890"
    },
    { id: "4", title: "Job Offer", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "4 days ago",
      content: "We are hiring for a software developer position. Competitive salary and benefits.",
      contact: "HR Department, 123-4567"
    },
    { id: "5", title: "Lost Pet", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "5 days ago",
      content: "Lost my dog in the park. He is a brown Labrador with a blue collar. Please contact if found.",
      contact: "Bob Brown, 321-6548"
    },
    { id: "6", title: "Found Pet", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "6 days ago",
      content: "Found a cat near the grocery store. It is a white Persian cat with no collar.",
      contact: "Sara White, 654-3210"
    },
    { id: "7", title: "Garage Sale", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "1 week ago",
      content: "Garage sale this weekend. Various items including furniture, electronics, and clothes.",
      contact: "Tom Green, 789-0123"
    },
    { id: "8", title: "Community Event", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "8 days ago",
      content: "Join us for a community event at the park. There will be food, games, and live music.",
      contact: "Community Center, 555-1234"
    },
    { id: "9", title: "Volunteer Opportunity", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "9 days ago",
      content: "Looking for volunteers for the upcoming charity run. Help us make a difference.",
      contact: "Volunteer Coordinator, 444-5678"
    },
    { id: "10", title: "Local News", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "10 days ago",
      content: "Stay updated with the latest local news. Breaking news, weather updates, and more.",
      contact: "News Desk, 333-7890"
    },
    { id: "11", title: "Sports Event", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "11 days ago",
      content: "Don't miss the upcoming sports event. Tickets are available now.",
      contact: "Sports Office, 222-4567"
    },
    { id: "12", title: "Concert", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "12 days ago",
      content: "Live concert this Friday. Featuring popular bands and artists.",
      contact: "Concert Organizer, 111-2345"
    },
    { id: "13", title: "Theater Show", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "13 days ago",
      content: "Watch the latest theater show at our local theater. Tickets are selling fast.",
      contact: "Theater Box Office, 999-8765"
    },
    { id: "14", title: "Art Exhibition", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "14 days ago",
      content: "Visit the art exhibition showcasing works from local artists.",
      contact: "Art Gallery, 888-6543"
    },
    { id: "15", title: "Book Club", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "15 days ago",
      content: "Join our book club and discuss the latest bestsellers.",
      contact: "Book Club Coordinator, 777-4321"
    },
    { id: "16", title: "Cooking Class", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "16 days ago",
      content: "Learn new recipes and cooking techniques in our cooking class.",
      contact: "Chef Mike, 666-1234"
    },
    { id: "17", title: "Yoga Session", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "17 days ago",
      content: "Join our yoga session for relaxation and fitness.",
      contact: "Yoga Instructor, 555-6789"
    },
    { id: "18", title: "Fitness Bootcamp", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "18 days ago",
      content: "Get fit with our fitness bootcamp. All levels welcome.",
      contact: "Fitness Trainer, 444-9876"
    },
    { id: "19", title: "Tech Meetup", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "19 days ago",
      content: "Join our tech meetup to network and learn about the latest in technology.",
      contact: "Tech Organizer, 333-4567"
    },
    { id: "20", title: "Startup Pitch", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "20 days ago",
      content: "Pitch your startup idea to investors and get feedback.",
      contact: "Startup Incubator, 222-3456"
    },
    { id: "21", title: "Networking Event", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "21 days ago",
      content: "Expand your professional network at our networking event.",
      contact: "Event Coordinator, 111-2345"
    },
    { id: "22", title: "Charity Fundraiser", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "22 days ago",
      content: "Support a good cause by attending our charity fundraiser.",
      contact: "Charity Organizer, 999-8765"
    },
    { id: "23", title: "Political Rally", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "23 days ago",
      content: "Join us for a political rally and hear from local candidates.",
      contact: "Campaign Office, 888-6543"
    },
    { id: "24", title: "Protest", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "24 days ago",
      content: "Participate in a peaceful protest for social justice.",
      contact: "Protest Organizer, 777-4321"
    },
    { id: "25", title: "Public Lecture", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "25 days ago",
      content: "Attend a public lecture on environmental issues.",
      contact: "Lecture Coordinator, 666-1234"
    },
    { id: "26", title: "Science Fair", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "26 days ago",
      content: "Explore innovative projects at our annual science fair.",
      contact: "Science Fair Organizer, 555-6789"
    },
    { id: "27", title: "Hackathon", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "27 days ago",
      content: "Join our hackathon and collaborate on exciting projects.",
      contact: "Hackathon Organizer, 444-9876"
    },
    { id: "28", title: "Gaming Tournament", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "28 days ago",
      content: "Compete in our gaming tournament and win prizes.",
      contact: "Tournament Organizer, 333-4567"
    },
    { id: "29", title: "Film Screening", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "29 days ago",
      content: "Watch a film screening of the latest blockbuster.",
      contact: "Film Club, 222-3456"
    },
    { id: "30", title: "Photography Workshop", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "30 days ago",
      content: "Improve your photography skills in our workshop.",
      contact: "Photography Instructor, 111-2345"
    },
    { id: "31", title: "Dance Class", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "31 days ago",
      content: "Learn new dance moves in our dance class.",
      contact: "Dance Instructor, 999-8765"
    },
    { id: "32", title: "Music Festival", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "32 days ago",
      content: "Enjoy live music at our annual music festival.",
      contact: "Festival Organizer, 888-6543"
    },
    { id: "33", title: "Food Festival", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "33 days ago",
      content: "Taste delicious food from around the world at our food festival.",
      contact: "Food Festival Organizer, 777-4321"
    },
    { id: "34", title: "Craft Fair", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "34 days ago",
      content: "Buy handmade crafts from local artisans at our craft fair.",
      contact: "Craft Fair Organizer, 666-1234"
    },
    { id: "35", title: "Farmers Market", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "35 days ago",
      content: "Shop for fresh produce at our weekly farmers market.",
      contact: "Market Coordinator, 555-6789"
    },
    { id: "36", title: "Holiday Parade", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "36 days ago",
      content: "Celebrate the holidays with our festive parade.",
      contact: "Parade Organizer, 444-9876"
    },
    { id: "37", title: "Fireworks Show", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "37 days ago",
      content: "Enjoy a spectacular fireworks show this weekend.",
      contact: "Fireworks Coordinator, 333-4567"
    },
    { id: "38", title: "Beach Cleanup", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "38 days ago",
      content: "Join us for a beach cleanup and help protect the environment.",
      contact: "Cleanup Organizer, 222-3456"
    },
    { id: "39", title: "Park Picnic", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "39 days ago",
      content: "Bring your family and friends for a fun picnic in the park.",
      contact: "Picnic Organizer, 111-2345"
    },
    { id: "40", title: "Nature Hike", images: ["https://www.cars.com/images/sell/sale-dealer-woman.jpg"], date: "40 days ago",
      content: "Explore the great outdoors with our guided nature hike.",
      contact: "Hike Leader, 999-8765"
    }
  ];
  
  module.exports = posts;