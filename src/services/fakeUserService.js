const users = [{
        _id: "0001",
        name: "PK",
        email: "pk@blackvt.com",
        pwd: "123"
    },
    {
        _id: "0002",
        name: "Achsu",
        email: "achsu@blackvt.com",
        pwd: "123"
    },
    {
        _id: "0003",
        name: "Sen2",
        email: "sen2@blackvt.com",
        pwd: "123"
    },
    {
        _id: "0004",
        name: "Suba",
        email: "suba@blackvt.com",
        pwd: "123"
    }
];

const details = [{
        _id: "0001",
        userId: "0001",
        navs: [{
            name: "Features",
            linkTo: '/features'
        }, {
            name: 'Enterprise',
            linkTo: '/enterprise'
        }, {
            name: "Support",
            linkTo: '/support'
        }, {
            name: 'Pricing',
            linkTo: '/pricing'
        }]
    },
    {
        _id: "0002",
        userId: "0002",
        navs: [{
            name: "Features",
            linkTo: '/features'
        }, {
            name: 'Enterprise',
            linkTo: '/enterprise'
        }, {
            name: "Support",
            linkTo: '/support'
        }]
    },
    {
        _id: "0003",
        userId: "0003",
        navs: [{
            name: "Features",
            linkTo: '/features'
        }, {
            name: 'Enterprise',
            linkTo: '/enterprise'
        }]
    },
    {
        _id: "0004",
        userId: "0004",
        navs: [{
            name: 'Enterprise',
            linkTo: '/enterprise'
        }, {
            name: "Support",
            linkTo: '/support'
        }, {
            name: 'Pricing',
            linkTo: '/pricing'
        }]
    },
];



const navDetails = [{
        name: 'enterprise',
        metaTag: {
            title: "Enterprise Page",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            shortDescription: "This is a Enterprise Page",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9dMKELLX3DEgw5EQuI3DhvoKxcopwfZ1c09DwGZDtjB8y7BDJ",
            url: "www.facebook.com/enterprise"
        }
    },
    {
        name: 'support',
        metaTag: {
            title: "Support Page",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            shortDescription: "This is a Support Page",
            image: "https://www.nexthorizon.net/wp-content/uploads/2018/10/IT-Support-2.jpg",
            url: "www.facebook.com/Support"
        }
    },
    {
        name: 'features',
        metaTag: {
            title: "Feature Page",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            shortDescription: "This is a Feature Page",
            image: "https://godotengine.org/themes/godotengine/assets/features/design_graphic.svg",
            url: "www.facebook.com/features"
        }
    }, {
        name: 'pricing',
        metaTag: {
            title: "Pricing Page",
            description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            shortDescription: "This is a Pricing Page",
            image: "https://www.growthforce.com/hs-fs/hubfs/Importance%20of%20Pricing%20and%20Profitability.png?width=641&name=Importance%20of%20Pricing%20and%20Profitability.png",
            url: "www.facebook.com/Pricing"
        }
    }
]

export function signInUser(payload) {
    return users.find(u => u.pwd === payload.password && u.email === payload.email);
}

export function getNavDetails(payload) {
    return details.find(d => d._id === payload);
}

export function getSingleNav(payload) {
    return navDetails.find(n => n.name === payload);
}