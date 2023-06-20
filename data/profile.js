export const sidebarData = [
  {
    heading: "My Account",
    links: [
      {
        name: "My Profile",
        link: "/profile",
      },
      {
        name: "Addresses",
        link: "/profile/address",
      },
      {
        name: "My Payment Options",
        link: "/profile/payment",
      },
      {
        name: "Account Security",
        link: "/profile/security",
      },
    ],
  },
  {
    heading: "My Orders",
    links: [
      {
        name: "All Orders",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Paid Orders",
        link: "/profile/orders",
        filter: "paid",
      },
      {
        name: "Unpaid Orders",
        link: "/profile/orders",
        filter: "unpaid",
      },

      {
        name: "Processing Orders",
        link: "/profile/orders",
        filter: "processing",
      },
      {
        name: "Unprocessed Orders",
        link: "/profile/orders",
        filter: "not_processed",
      },
      {
        name: "Dispatched Orders",
        link: "/profile/orders",
        filter: "dispatched",
      },
      {
        name: "Delievered Orders",
        link: "/profile/orders",
        filter: "completed",
      },
      {
        name: "Cancelled Orders",
        link: "/profile/orders",
        filter: "cancelled",
      },
    ],
  },
  {
    heading: "My Lists",
    links: [
      {
        name: "Whishlist",
        link: "/profile/wishlist",
      },
      {
        name: "Recently Viewed",
        link: "/profile/recent",
      },
    ],
  },
  {
    heading: "Customer Service",
    links: [
      {
        name: "My Message",
        link: "/profile/messages",
      },
      {
        name: "Service Records",
        link: "/profile/services",
      },
    ],
  },
  {
    heading: "Other Services",
    links: [
      {
        name: "Survey Center",
        link: "",
      },
      {
        name: "Contact Preferences",
        link: "",
      },
    ],
  },
  {
    heading: "Policy",
    links: [
      {
        name: "Shipping Info",
        link: "",
      },
      {
        name: "Return Policy",
        link: "",
      },
      {
        name: "Privacy & Cookie Policy",
        link: "",
      },
    ],
  },
  {
    heading: "Sign out",
    link: [],
  },
];

export const ordersLinks = [
  {
    name: "All Orders",
    filter: "",
  },
  {
    name: "Paid Orders",
    filter: "paid",
  },
  {
    name: "Unpaid Orders",
    filter: "unpaid",
  },
  {
    name: "Processing Orders",
    filter: "processing",
  },
  {
    name: "Unprocessed Orders",
    filter: "not_processed",
  },
  {
    name: "Dispatched Orders",
    filter: "dispatched",
  },
  {
    name: "Delivered Orders",
    filter: "delivered",
  },
  {
    name: "Cancelled Orders",
    filter: "cancelled",
  },
];
