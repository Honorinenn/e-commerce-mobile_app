module.exports = [
    {
        username: "johndoe",
        email: "john.doe@example.com",
        password: "SecurePass123!", // Will be hashed by the pre-save hook
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
        phoneNumber: "+1-555-123-4567",
        address: {
          street: "123 Main Street",
          city: "Boston",
          state: "MA",
          zipCode: "02108",
          country: "USA"
        },
        createdAt: new Date("2024-05-10T08:30:00"),
        updatedAt: new Date("2024-05-10T08:30:00")
      },
      {
        username: "janedavis",
        email: "jane.davis@example.com",
        password: "Jane@Davis2024",
        role: "admin",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
        phoneNumber: "+1-555-987-6543",
        address: {
          street: "456 Oak Avenue",
          city: "San Francisco",
          state: "CA",
          zipCode: "94107",
          country: "USA"
        },
        createdAt: new Date("2024-03-15T10:45:00"),
        updatedAt: new Date("2025-01-20T14:22:00")
      },
      {
        username: "mikesmith",
        email: "mike.smith@example.com",
        password: "MikeSmith#2024",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
        phoneNumber: "+1-555-234-5678",
        address: {
          street: "789 Pine Street",
          city: "Chicago",
          state: "IL",
          zipCode: "60601",
          country: "USA"
        },
        createdAt: new Date("2024-07-22T15:20:00"),
        updatedAt: new Date("2024-07-22T15:20:00")
      },
      {
        username: "sarahparker",
        email: "sarah.parker@example.com",
        password: "Parker$Sarah99",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/4.jpg",
        phoneNumber: "+1-555-345-6789",
        address: {
          street: "321 Maple Road",
          city: "Seattle",
          state: "WA",
          zipCode: "98101",
          country: "USA"
        },
        createdAt: new Date("2024-08-05T09:10:00"),
        updatedAt: new Date("2025-02-15T11:30:00")
      },
      {
        username: "davidwilson",
        email: "david.wilson@example.com",
        password: "Wilson2024!David",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/5.jpg",
        phoneNumber: "+1-555-456-7890",
        address: {
          street: "567 Cedar Lane",
          city: "Austin",
          state: "TX",
          zipCode: "78701",
          country: "USA"
        },
        createdAt: new Date("2024-09-18T12:40:00"),
        updatedAt: new Date("2024-09-18T12:40:00")
      },
      {
        username: "emmathomas",
        email: "emma.thomas@example.com",
        password: "Emma#Thomas123",
        role: "admin",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/6.jpg",
        phoneNumber: "+1-555-567-8901",
        address: {
          street: "654 Birch Boulevard",
          city: "Denver",
          state: "CO",
          zipCode: "80202",
          country: "USA"
        },
        createdAt: new Date("2024-04-30T16:15:00"),
        updatedAt: new Date("2025-03-10T09:45:00")
      },
      {
        username: "robertjohnson",
        email: "robert.johnson@example.com",
        password: "Johnson!Rob456",
        role: "user",
        isActive: false, // Inactive account
        profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
        phoneNumber: "+1-555-678-9012",
        address: {
          street: "876 Spruce Street",
          city: "Miami",
          state: "FL",
          zipCode: "33101",
          country: "USA"
        },
        resetPasswordToken: "5f8d9a6b2c4e7f3d1a0b8c5e2d7f9a3b1c4e6d8a",
        resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hour from now
        createdAt: new Date("2024-01-12T11:30:00"),
        updatedAt: new Date("2025-04-01T10:20:00")
      },
      {
        username: "oliviabrown",
        email: "olivia.brown@example.com",
        password: "Brown@Olivia789",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/8.jpg",
        phoneNumber: "+1-555-789-0123",
        address: {
          street: "987 Walnut Way",
          city: "Portland",
          state: "OR",
          zipCode: "97201",
          country: "USA"
        },
        createdAt: new Date("2024-10-25T14:50:00"),
        updatedAt: new Date("2024-10-25T14:50:00")
      },
      {
        username: "williamtaylor",
        email: "william.taylor@example.com",
        password: "Taylor2024#Will",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/9.jpg",
        phoneNumber: "+1-555-890-1234",
        address: {
          street: "135 Elm Street",
          city: "Nashville",
          state: "TN",
          zipCode: "37201",
          country: "USA"
        },
        createdAt: new Date("2024-11-08T10:15:00"),
        updatedAt: new Date("2025-01-05T16:40:00")
      },
      {
        username: "sophiamiller",
        email: "sophia.miller@example.com",
        password: "Miller!Sophia321",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/10.jpg",
        phoneNumber: "+1-555-901-2345",
        address: {
          street: "246 Pineapple Place",
          city: "Honolulu",
          state: "HI",
          zipCode: "96813",
          country: "USA"
        },
        createdAt: new Date("2024-12-20T13:25:00"),
        updatedAt: new Date("2024-12-20T13:25:00")
      },
      {
        username: "jamesanderson",
        email: "james.anderson@example.com",
        password: "Anderson@James567",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/11.jpg",
        phoneNumber: "+1-555-012-3456",
        address: {
          street: "357 Orange Avenue",
          city: "Las Vegas",
          state: "NV",
          zipCode: "89101",
          country: "USA"
        },
        createdAt: new Date("2025-01-30T08:55:00"),
        updatedAt: new Date("2025-01-30T08:55:00")
      },
      {
        username: "avasimpson",
        email: "ava.simpson@example.com",
        password: "Simpson#Ava789",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/12.jpg",
        phoneNumber: "+1-555-123-7890",
        address: {
          street: "468 Peach Path",
          city: "Atlanta",
          state: "GA",
          zipCode: "30301",
          country: "USA"
        },
        createdAt: new Date("2025-02-14T17:05:00"),
        updatedAt: new Date("2025-04-10T12:15:00")
      },
      {
        username: "benjaminclark",
        email: "benjamin.clark@example.com",
        password: "Clark!Ben2024",
        role: "admin",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/13.jpg",
        phoneNumber: "+1-555-234-5678",
        address: {
          street: "579 Cherry Circle",
          city: "Philadelphia",
          state: "PA",
          zipCode: "19101",
          country: "USA"
        },
        createdAt: new Date("2024-06-05T11:35:00"),
        updatedAt: new Date("2025-03-25T15:50:00")
      },
      {
        username: "mialewis",
        email: "mia.lewis@example.com",
        password: "Lewis@Mia456!",
        role: "user",
        isActive: false,
        profileImage: "https://randomuser.me/api/portraits/women/14.jpg",
        phoneNumber: "+1-555-345-6789",
        address: {
          street: "680 Grape Grove",
          city: "Detroit",
          state: "MI",
          zipCode: "48201",
          country: "USA"
        },
        resetPasswordToken: "7a3b9c1d5e8f2g6h4i0j5k2l7m9n3o1p8q4r",
        resetPasswordExpires: new Date(Date.now() + 1800000), // 30 minutes from now
        createdAt: new Date("2024-02-28T14:20:00"),
        updatedAt: new Date("2025-02-28T09:10:00")
      },
      {
        username: "alexanderwright",
        email: "alexander.wright@example.com",
        password: "Wright2024!Alex",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/15.jpg",
        phoneNumber: "+1-555-456-7890",
        address: {
          street: "791 Banana Boulevard",
          city: "Phoenix",
          state: "AZ",
          zipCode: "85001",
          country: "USA"
        },
        createdAt: new Date("2024-08-15T10:40:00"),
        updatedAt: new Date("2024-08-15T10:40:00")
      },
      {
        username: "charlottewalker",
        email: "charlotte.walker@example.com",
        password: "Walker#Char123",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/16.jpg",
        phoneNumber: "+1-555-567-8901",
        address: {
          street: "802 Kiwi Court",
          city: "Minneapolis",
          state: "MN",
          zipCode: "55401",
          country: "USA"
        },
        createdAt: new Date("2024-09-03T16:30:00"),
        updatedAt: new Date("2025-04-15T13:25:00")
      },
      {
        username: "henryhall",
        email: "henry.hall@example.com",
        password: "Hall!Henry789",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/17.jpg",
        phoneNumber: "+1-555-678-9012",
        address: {
          street: "913 Lemon Lane",
          city: "Dallas",
          state: "TX",
          zipCode: "75201",
          country: "USA"
        },
        createdAt: new Date("2024-10-12T08:50:00"),
        updatedAt: new Date("2024-10-12T08:50:00")
      },
      {
        username: "amelia_young",
        email: "amelia.young@example.com",
        password: "Young@Amelia567",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/18.jpg",
        phoneNumber: "+1-555-789-0123",
        address: {
          street: "1024 Mango Meadow",
          city: "New Orleans",
          state: "LA",
          zipCode: "70112",
          country: "USA"
        },
        createdAt: new Date("2024-11-25T15:15:00"),
        updatedAt: new Date("2025-01-30T10:45:00")
      },
      {
        username: "jacksonharris",
        email: "jackson.harris@example.com",
        password: "Harris2024!Jack",
        role: "admin",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/men/19.jpg",
        phoneNumber: "+1-555-890-1234",
        address: {
          street: "1135 Papaya Place",
          city: "Salt Lake City",
          state: "UT",
          zipCode: "84101",
          country: "USA"
        },
        createdAt: new Date("2024-05-18T11:55:00"),
        updatedAt: new Date("2025-03-05T14:30:00")
      },
      {
        username: "isabellamartin",
        email: "isabella.martin@example.com",
        password: "Martin#Bella123",
        role: "user",
        isActive: true,
        profileImage: "https://randomuser.me/api/portraits/women/20.jpg",
        phoneNumber: "+1-555-901-2345",
        address: {
          street: "1246 Raspberry Road",
          city: "Anchorage",
          state: "AK",
          zipCode: "99501",
          country: "USA"
        },
        createdAt: new Date("2024-07-09T13:40:00"),
        updatedAt: new Date("2024-07-09T13:40:00")
      },
    // {
    //     "username": "jane_doe88",
    //     "email": "jane.doe88@email.com",
    //     "password": "$2b$10$", // placeholderHashExampleJaneDoe88abcdefghijklmnopqrstu",
    //     "role": "user",
    //     "isActive": true,
    //     "profileImage": "/images/profiles/avatar_f1.png",
    //     "phoneNumber": "206-555-0188",
    //     "address": {
    //     "street": "123 Pine St",
    //     "city": "Seattle",
    //     "state": "WA",
    //     "zipCode": "98101",
    //     "country": "USA"
    //     },
    //     "resetPasswordToken": null,
    //     "resetPasswordExpires": null,
    //     "createdAt": "2024-08-15T10:30:00Z",
    //     "updatedAt": "2025-04-20T15:00:00Z"
    // },
    {
        "username": "tech_guru_alex",
        "email": "alex.g@tech-innovate.net",
        "password": "$2b$10$", // placeholderHashExampleAlexGTechGuruabcdefghijklmnopqrstu",
        "role": "admin",
        "isActive": true,
        "profileImage": "/images/profiles/alex_tech.jpg",
        "phoneNumber": "415-555-0112",
        "address": {
        "street": "500 Market St",
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94105",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2023-11-01T09:00:00Z",
        "updatedAt": "2025-05-01T11:25:00Z"
    },
    {
        "username": "sam_smith2",
        "email": "s.smith@mailservice.org",
        "password": "$2b$10$", // placeholderHashExampleSamSmith2abcdefghijklmnopqrstu",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": null,
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2025-01-10T14:05:00Z",
        "updatedAt": "2025-01-10T14:05:00Z"
    },
    {
        "username": "lisa_creative",
        "email": "lisa.c@designstudio.io",
        "password": "$2b$10$", // placeholderHashExampleLisaCreativeabcdefghijklmnopqrst",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/lisa_avatar.png",
        "phoneNumber": "312-555-0134",
        "address": {
        "street": "789 Art Blvd",
        "city": "Chicago",
        "state": "IL",
        "zipCode": "60607",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-05-22T18:00:00Z",
        "updatedAt": "2025-03-15T09:45:00Z"
    },
    {
        "username": "mark_dev",
        "email": "mark.developer@codehub.dev",
        "password": "$2b$10$", // placeholderHashExampleMarkDevabcdefghijklmnopqrstuvwxy",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": "512-555-0156",
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-10-05T11:11:11Z",
        "updatedAt": "2025-02-28T10:10:10Z"
    },
    {
        "username": "gamer_gal_99",
        "email": "gamergal@streampro.tv",
        "password": "$2b$10$", // placeholderHashExampleGamerGal99abcdefghijklmnopqrstu",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/gamer_gal.gif",
        "phoneNumber": null,
        "address": {
        "city": "Austin",
        "state": "TX",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-02-14T20:00:00Z",
        "updatedAt": "2025-04-30T23:59:59Z"
    },
    {
        "username": "peter_jones",
        "email": "peter.j@corporatemail.biz",
        "password": "$2b$10$", // placeholderHashExamplePeterJonesabcdefghijklmnopqrstu",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": "212-555-0199",
        "address": {
        "street": "1 Wall St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10005",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2023-09-10T16:30:00Z",
        "updatedAt": "2024-12-01T08:00:00Z"
    },
    {
        "username": "sara_k",
        "email": "sara.k@university.edu",
        "password": "$2b$10$", // placeholderHashExampleSaraKabcdefghijklmnopqrstuvwxy",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/sara_k_avatar.jpg",
        "phoneNumber": null,
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2025-03-01T12:00:00Z",
        "updatedAt": "2025-03-01T12:00:00Z"
    },
    {
        "username": "admin_support",
        "email": "support@yourcompany.com",
        "password": "$2b$10$", //placeholderHashExampleAdminSupportabcdefghijklmnopqr",
        "role": "admin",
        "isActive": true,
        "profileImage": "/images/profiles/support_icon.png",
        "phoneNumber": "800-555-0100",
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2023-05-01T00:00:01Z",
        "updatedAt": "2025-05-04T10:00:00Z"
    },
    {
        "username": "old_user_inactive",
        "email": "inactive.user@archive.org",
        "password": "$2b$10$", // placeholderHashExampleOldUserInactiveabcdefghijklmno",
        "role": "user",
        "isActive": false,
        "profileImage": null,
        "phoneNumber": null,
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2023-07-20T13:14:15Z",
        "updatedAt": "2024-06-01T10:00:00Z"
    },
    {
        "username": "music_lover_mike",
        "email": "mike.audio@musicmail.net",
        "password": "$2b$10$", // placeholderHashExampleMikeAudioabcdefghijklmnopqrst",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/mike_headphones.jpg",
        "phoneNumber": "615-555-0177",
        "address": {
        "city": "Nashville",
        "state": "TN",
        "zipCode": "37203",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-11-30T19:20:21Z",
        "updatedAt": "2025-04-10T11:30:00Z"
    },
    {
        "username": "traveler_emily",
        "email": "emily.world@explore.co",
        "password": "$2b$10$", // placeholderHashExampleEmilyTravelerabcdefghijklmnopq",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/emily_travel.png",
        "phoneNumber": null,
        "address": {
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-06-10T08:45:00Z",
        "updatedAt": "2025-05-02T14:20:00Z"
    },
    {
        "username": "david_lee_photo",
        "email": "david.lee@photostudio.com",
        "password": "$2b$10$", // placeholderHashExampleDavidLeePhotoabcdefghijklmnop",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": "310-555-0143",
        "address": {
        "street": "456 Sunset Blvd",
        "city": "Los Angeles",
        "state": "CA",
        "zipCode": "90028",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-01-25T17:00:00Z",
        "updatedAt": "2025-03-22T09:00:00Z"
    },
    {
        "username": "olivia_baker",
        "email": "olivia.b@foodieblog.net",
        "password": "$2b$10$", // placeholderHashExampleOliviaBakerabcdefghijklmnop",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/olivia_chef.jpg",
        "phoneNumber": null,
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-09-05T21:30:00Z",
        "updatedAt": "2025-04-18T16:15:00Z"
    },
    {
        "username": "neil_space",
        "email": "neil.a@cosmos.org",
        "password": "$2b$10$", // placeholderHashExampleNeilSpaceabcdefghijklmnopqrs",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": "713-555-0169",
        "address": {
        "city": "Houston",
        "state": "TX",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-07-20T10:56:00Z",
        "updatedAt": "2025-01-15T12:00:00Z"
    },
    {
        "username": "chloe_reads",
        "email": "chloe.reader@bookworm.com",
        "password": "$2b$10$", // placeholderHashExampleChloeReadsabcdefghijklmnopqr",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/chloe_books.png",
        "phoneNumber": null,
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2025-02-01T13:00:00Z",
        "updatedAt": "2025-04-01T13:00:00Z"
    },
    {
        "username": "ryan_fit",
        "email": "ryan.fitness@gymlife.fit",
        "password": "$2b$10$", // placeholderHashExampleRyanFitabcdefghijklmnopqrstu",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": "305-555-0121",
        "address": {
        "street": "1 Ocean Dr",
        "city": "Miami",
        "state": "FL",
        "zipCode": "33139",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-04-12T07:00:00Z",
        "updatedAt": "2025-05-03T08:30:00Z"
    },
    {
        "username": "zoe_artist",
        "email": "zoe.art@galleryonline.art",
        "password": "$2b$10$", // placeholderHashExampleZoeArtistabcdefghijklmnopqrs",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/zoe_paints.jpg",
        "phoneNumber": null,
        "address": {
        "city": "Portland",
        "state": "OR",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-08-08T16:40:00Z",
        "updatedAt": "2025-02-10T10:10:10Z"
    },
    {
        "username": "ian_investor",
        "email": "ian.i@financepros.co",
        "password": "$2b$10$", // placeholderHashExampleIanInvestorabcdefghijklmnopq",
        "role": "user",
        "isActive": true,
        "profileImage": null,
        "phoneNumber": "617-555-0117",
        "address": null,
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2023-12-15T09:30:00Z",
        "updatedAt": "2025-04-25T14:00:00Z"
    },
    {
        "username": "megan_green",
        "email": "meg.g@ecowarrior.org",
        "password": "$2b$10$", // placeholderHashExampleMeganGreenabcdefghijklmnopqrst",
        "role": "user",
        "isActive": true,
        "profileImage": "/images/profiles/megan_eco.png",
        "phoneNumber": "206-555-0175",
        "address": {
        "street": "555 Nature Way",
        "city": "Seattle",
        "state": "WA",
        "zipCode": "98104",
        "country": "USA"
        },
        "resetPasswordToken": null,
        "resetPasswordExpires": null,
        "createdAt": "2024-03-22T11:55:00Z",
        "updatedAt": "2025-04-29T10:05:00Z"
    },
      
];