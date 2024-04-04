// This file contains placeholder data that you'll be replacing with real data when Data Fetching
const { Gender } = require('@prisma/client');

const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@user.com',
    password: '123456',
  },
];

const customers = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Hector Simpson',
    email: 'hector@simpson.com',
    image_url: '/customers/hector-simpson.png',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    name: 'Steven Tey',
    email: 'steven@tey.com',
    image_url: '/customers/steven-tey.png',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    image_url: '/customers/steph-dietz.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    name: 'Emil Kowalski',
    email: 'emil@kowalski.com',
    image_url: '/customers/emil-kowalski.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const members = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    nationalId: 23465478,
    name: 'Delba de Oliveira',
    dateOfBirth: '1980-12-06T12:34:56Z',
    mobileNumber: '+254713550065',
    email: 'delba@oliveira.com',
    gender: Gender.FEMALE,
    isDisabled: false,
    religion: 'Catholic',
    county: 'Nairobi',
    constituency: 'Kasarani',
    ward: 'Mwiki',
    signature: '/members/delba-de-oliveira.png',
    createdAt: '2022-07-06T12:34:56Z',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    nationalId: 34587612,
    name: 'Lee Robinson',
    dateOfBirth: '1985-12-06T12:34:56Z',
    mobileNumber: '+254734768934',
    email: 'lee@robinson.com',
    gender: Gender.MALE,
    isDisabled: false,
    religion: 'Christian',
    county: 'Nairobi',
    constituency: 'Embakasi South',
    ward: 'Imara Daima',
    signature: '/members/lee-robinson.png',
    createdAt: '2019-12-06T12:34:56Z',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    nationalId: 98756309,
    name: 'Hector Simpson',
    dateOfBirth: '1950-12-06T12:34:56Z',
    mobileNumber: '+254765432189',
    email: 'hector@simpson.com',
    gender: Gender.MALE,
    isDisabled: false,
    religion: 'Muslim',
    county: 'Kiambu',
    constituency: 'Juja',
    ward: 'Githurai',
    signature: '/members/hector-simpson.png',
    createdAt: '2023-03-06T12:34:56Z',
  },
  {
    id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    nationalId: 65434581,
    name: 'Steven Tey',
    dateOfBirth: '1986-12-06T12:34:56Z',
    mobileNumber: '+254733541230',
    email: 'steven@tey.com',
    gender: Gender.MALE,
    isDisabled: false,
    religion: 'Hindu',
    county: 'Mombasa',
    constituency: 'Mvita',
    ward: 'Tononoka',
    signature: '/members/steven-tey.png',
    createdAt: '2020-10-06T12:34:56Z',
  },
  {
    id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    nationalId: 35478999,
    name: 'Steph Dietz',
    dateOfBirth: '1963-12-06T12:34:56Z',
    mobileNumber: '+254712345678',
    email: 'steph@dietz.com',
    gender: Gender.FEMALE,
    isDisabled: false,
    religion: 'Muslim',
    county: 'Mombasa',
    constituency: 'Nyali',
    ward: 'Mkomani',
    signature: '/members/steph-dietz.png',
    createdAt: '2023-04-06T12:34:56Z',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    nationalId: 99856431,
    name: 'Michael Novotny',
    dateOfBirth: '1977-12-06T12:34:56Z',
    mobileNumber: '+254719345778',
    email: 'michael@novotny.com',
    gender: Gender.MALE,
    isDisabled: true,
    religion: 'Protestant',
    county: 'Kisumu',
    constituency: 'Kisumu Central',
    ward: 'Railways',
    signature: '/members/michael-novotny.png',
    createdAt: '2023-12-06T12:34:56Z',
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    nationalId: 12345678,
    name: 'Evil Rabbit',
    dateOfBirth: '1970-12-06T12:34:56Z',
    mobileNumber: '+254712650678',
    email: 'evil@rabbit.com',
    gender: Gender.FEMALE,
    isDisabled: true,
    religion: 'Catholic',
    county: 'Eldoret',
    constituency: 'Kapseret',
    ward: 'Kipkenyo',
    signature: '/members/evil-rabbit.png',
    createdAt: '2021-12-06T12:34:56Z',
  },
  {
    id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    nationalId: 23565711,
    name: 'Emil Kowalski',
    dateOfBirth: '1990-12-06T12:34:56Z',
    mobileNumber: '+254712349008',
    email: 'emil@kowalski.com',
    gender: Gender.FEMALE,
    isDisabled: false,
    religion: 'Christian',
    county: 'Turkana',
    constituency: 'Turkana Central',
    ward: 'Lodwar',
    signature: '/members/emil-kowalski.png',
    createdAt: '2020-12-06T12:34:56Z',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06T12:34:56Z',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-07T12:38:56Z',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-08-06T16:34:56Z',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2022-11-06T12:34:56Z',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2022-01-06T14:34:56Z',
  },
  {
    customer_id: customers[7].id,
    amount: 54246,
    status: 'pending',
    date: '2022-02-09T12:34:56Z',
  },
  {
    customer_id: customers[6].id,
    amount: 666,
    status: 'pending',
    date: '2022-04-06T12:34:56Z',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2022-07-06T12:34:56Z',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2022-03-04T12:34:56Z',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2021-12-06T12:34:56Z',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2020-12-06T12:34:56Z',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-12-06T12:34:56Z',
  },
  {
    customer_id: customers[2].id,
    amount: 8945,
    status: 'paid',
    date: '2021-10-06T12:34:56Z',
  },
  {
    customer_id: customers[0].id,
    amount: 8945,
    status: 'paid',
    date: '2020-10-06T12:34:56Z',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2021-08-06T12:34:56Z',
  },
];

const bills = [
  {
    member_id: members[0].id,
    amount: 15795,
    status: 'pending',
    dueDate: '2022-12-06T12:34:56Z',
    createdAt: '2022-11-06T12:34:56Z',
  },
  {
    member_id: members[1].id,
    amount: 20348,
    status: 'pending',
    dueDate: '2022-11-06T12:34:56Z',
    createdAt: '2022-10-06T12:34:56Z',
  },
  {
    member_id: members[4].id,
    amount: 3040,
    status: 'paid',
    dueDate: '2022-10-06T12:34:56Z',
    createdAt: '2022-09-06T12:34:56Z',
    updatedAt: '2022-09-26T12:34:56Z',
  },
  {
    member_id: members[3].id,
    amount: 44800,
    status: 'paid',
    dueDate: '2022-09-06T12:34:56Z',
    createdAt: '2022-08-06T12:34:56Z',
    updatedAt: '2022-08-26T12:34:56Z',
  },
  {
    member_id: members[5].id,
    amount: 34577,
    status: 'pending',
    dueDate: '2022-07-06T12:34:56Z',
    createdAt: '2022-06-06T12:34:56Z',
  },
  {
    member_id: members[7].id,
    amount: 54246,
    status: 'pending',
    dueDate: '2022-06-06T12:34:56Z',
    createdAt: '2022-05-06T12:34:56Z',
  },
  {
    member_id: members[6].id,
    amount: 666,
    status: 'pending',
    dueDate: '2022-05-06T12:34:56Z',
    createdAt: '2022-04-06T12:34:56Z',
  },
  {
    member_id: members[3].id,
    amount: 32545,
    status: 'paid',
    dueDate: '2022-04-06T12:34:56Z',
    createdAt: '2022-03-06T12:34:56Z',
    updatedAt: '2022-03-26T12:34:56Z',
  },
  {
    member_id: members[4].id,
    amount: 1250,
    status: 'paid',
    dueDate: '2022-03-06T12:34:56Z',
    createdAt: '2022-02-06T12:34:56Z',
    updatedAt: '2022-02-26T12:34:56Z',
  },
  {
    member_id: members[5].id,
    amount: 8546,
    status: 'paid',
    dueDate: '2022-02-06T12:34:56Z',
    createdAt: '2022-01-06T12:34:56Z',
    updatedAt: '2022-01-26T12:34:56Z',
  },
  {
    member_id: members[1].id,
    amount: 500,
    status: 'paid',
    dueDate: '2022-01-06T12:34:56Z',
    createdAt: '2021-12-06T12:34:56Z',
    updatedAt: '2021-12-28T12:34:56Z',
  },
  {
    member_id: members[5].id,
    amount: 8945,
    status: 'paid',
    dueDate: '2021-12-06T12:34:56Z',
    createdAt: '2021-11-06T12:34:56Z',
    updatedAt: '2021-11-26T12:34:56Z',
  },
  {
    member_id: members[2].id,
    amount: 8945,
    status: 'paid',
    dueDate: '2021-11-06T12:34:56Z',
    createdAt: '2021-10-06T12:34:56Z',
    updatedAt: '2021-10-26T12:34:56Z',
  },
  {
    member_id: members[0].id,
    amount: 8945,
    status: 'paid',
    dueDate: '2021-10-06T12:34:56Z',
    createdAt: '2021-09-06T12:34:56Z',
    updatedAt: '2021-09-26T12:34:56Z',
  },
  {
    member_id: members[2].id,
    amount: 1000,
    status: 'paid',
    dueDate: '2021-09-06T12:34:56Z',
    createdAt: '2021-08-06T12:34:56Z',
    updatedAt: '2021-08-26T12:34:56Z',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

module.exports = {
  users,
  customers,
  members,
  invoices,
  bills,
  revenue,
};
