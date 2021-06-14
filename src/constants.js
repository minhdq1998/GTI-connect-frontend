export const notiType = {
    SUCCESS: 'success',
    ERROR: 'error'
}

export const signup = {
    SIGNUP_SUCCESS: 'Your account has been successfully created!',
    SIGNUP_FAIL: 'There was a problem creating your account, ' 
}

export const signin = {
    SIGNIN_FAIL: 'Wrong usenameor password, please try again.'
}

export const getUser = {
    GET_USER_FAIL: `Something went wrong. User's data could not be collected.`
}

export const getSectors = {
    GET_SECTORS_FAIL: 'Something went wrong. Sectors list could not be collected.'
}

export const updateInfo = {
    UPDATE_FAIL: 'Something went wrong! Your information has not been updated.',
    UPDATE_SUCCESS: 'Your information has been saved successfully.'
}

export const changePassword = {
    CHANGE_PASSWORD_SUCCESS: 'Your password has been changed successfully!',
    CHANGE_PASSWORD_FAIL: 'Something went wrong. Your password has not been updated.'
}

export const connection = {
    CLOSE_CONNECTION_SUCCESS: 'Your connection has been closed successfully.',
    CLOSE_CONNECTION_FAIL: 'Something went wrong! Your connection has not been closed.'
}

export const connectionReport = {
    UPLOAD_REPORT_SUCCESS: 'Your report to this connection has been uploaded successfully.',
    UPLOAD_REPORT_FAIL: 'Something went wrong! Your report to this connection has not been uploaded.'
}

export const connectionRequest = {
    SEND_REQUEST_FINISH_SUCCESS: 'Your request to finish connection has been sent successfully.',
    SEND_REQUEST_FINISH_FAIL: 'Something went wrong! Your request to finish connection has not been sent.'
}

export const connectionResponseFinishRequest = {
    SEND_ACCEPT_REQUEST_SUCCESS: 'You have successfully accepted request to finish the connection.',
    SEND_ACCEPT_REQUEST_FAIL: 'Something went wrong! Request to finish has not been accepted.',
    SEND_DECLINE_REQUEST_SUCCESS: 'You have successfully declined request to finish the connection.',
    SEND_DECLINE_REQUEST_FAIL: 'Something went wrong! Request to finish has not been declined.',
}

export const connectionDocument = {
    UPLOAD_DOCUMENT_SUCCESS: 'Your document has been uploaded to this connection successfully.',
    DELETE_DOCUMENT_SUCCESS: 'Your document has been deleted successfully.',
    GET_DOCUMENT_FAIL: 'Something went wrong! Cannot get the documents for this connection.',
    UPLOAD_DOCUMENT_FAIL: 'Something went wrong! Your document has not been uploaded. Please try again.',
    DELETE_DOCUMENT_FAIL: 'Something went wrong! Your document has not been deleted. Please try again.',
}

export const offer = {
    OFFER_SEND_SUCCESS: 'Your offer has been sent successfully.',
    OFFER_ACCEPT_SUCCESS: 'You have successfully accepted the offer.',
    OFFER_CANCEL_SUCCESS: 'You have successfully cancelled the offer.',
    OFFER_SEND_FAIL: 'Something went wrong! Your offer has not been sent.',
    OFFER_ACCEPT_FAIL: 'Something went wrong! The offer has not been accepted',
    OFFER_CANCEL_FAIL: 'Something went wrong! The offer has not been cancelled',
}

export const session = {
    SESSION_EXPIRE: 'Your session expired, please login again.'
}

export const error = {
    SOMETHING_WENT_WRONG: 'Something went wrong!'
}

export const packages_info = {
    package1: {
        type:"Package 1",
        price: '400',
        summary: "Professional Resume Writers",
        description: "Find expert in related field that will help your to finalize your resume" 
    },
    package2: {
        type:"Package 2",
        price: "500",
        summary: "Professional Online Profile Writers",
        description: "Find expert in related field that will help your to finalize your Linkedin profile" 
    },
    package3: {
        type:"Package 3",
        price: "1000",
        summary: "Connect with Australian Experts",
        description: "Find expert in related field that will help you go through the nomination" 
    }
}

export const highest_edu_level = [
    "Doctorate/PhD",
    "Master",
    "Bachelor (Honours)",
    "Bachelor"
]

export const sector_list = [
    {
        name: "Agri-food and AgTech",
        jobs: [
            "Agriculture Biotechnology",
            "Food & Non-food Processing",
            "Suply Chain & Food Technologies",
        ],
        colour: "#deaa81"
    },
    {
        name: "Circular Economy",
        jobs: [
            "Circular Investment Specialist",
            "Product And Packaging Designer",
            "Reverse Logistics"
        ],
        colour: "#aaf5bb"
    },
    {
        name: "Defence, Advanced Manufacturing and Space",
        jobs: [
            "Modern Manufacturing",
            "Aerospace Manufacturing",
            "Cyber Security"
        ],
        colour: "#9bc3db"
    },
    {
        name: "DigiTech",
        jobs: [
            "Advanced Digital",
            "Data Science and ICT",
            "Cyber Security"
        ],
        colour: "#a0b090"
    },
    {
        name: "Education",
        jobs: [
            "Lecturer",
            "Tutor",
            "Education Coordinator"
        ],
        colour: "#e2bdc2"
    },
    {
        name: "Energy",
        jobs: [
            "Energy Data Analyst",
            "Energy Project Officer",
            "Energy Engineer"
        ],
        colour: "#c6908e"
    },
    {
        name: "Financial Services and FinTech",
        jobs: [
            "FinTech Business Analyst",
            "FinTech Associate Consultant",
            "Financial Advisor"
        ],
        colour: "#c582ea"
    },
    {
        name: "Health Industries",
        jobs: [
            "Patient Services Assistant",
            "Medical Receptionist",
            "Medical Laboratory Assistant"
        ],
        colour: "#64c6ce"
    },
    {
        name: "Infrastructure and tourism",
        jobs: [
            "Marketing Tourism",
            "Venue Experience Specialist",
            "Tourism & Economic Development Officer"
        ],
        colour: "#059c92"
    }
]

export const nationalities = [
    "Afghan",
    "Albanian",
    "Algerian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Azerbaijani",
    "Bahamian",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Barbudans",
    "Batswana",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "Dutchman",
    "Dutchwoman",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "I-Kiribati",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivan",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "Netherlander",
    "New Zealander",
    "Ni-Vanuatu",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surname",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vienamee",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean",
]

export const account_role = {
    AE: "Australian Expert",
    GT: "Global Talent",
    VISITOR: "Visitor"
}

export const  offer_duration_type = [
    "day",
    "week",
    "month"
]
