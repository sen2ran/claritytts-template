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

export function signInUser(payload) {
    console.log("check", payload);
    return users.find(u => u.pwd === payload.password && u.email === payload.email);
}

export function getNavDetails(payload) {
    return details.find(d => d._id === payload);
}