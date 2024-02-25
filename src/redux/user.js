import { createSlice } from "@reduxjs/toolkit";
const formEntries = {
    email: 'deraemma8@gmail.com',
    password: '11111111',
    confirm_password: '11111111',
    fullname: '',
    // lastname: '',
    // Username: '',
    phone: '',
    address: '',
    bvnnumber: '',
    ninnumber: '',
    agreeToTerms: false,
    profilePicture: null,
    ninSlipPicture: null,
    dateOfBirth: "",
    reuploadNin: false,
    accountVerified: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userID: '',
        loading: false,
        signupIndex: 0,
        signinIndex: 0,
        // homePageNavIndex: 0,
        animationCounter: 0,
        userFormEntries: formEntries,
        currentUserData: null,
        userData: null,
        hasStorageAccessPermission: true,
        userAge: null,
        firebaseUserInfo: {},
        userCartData: [],
        userFavourites: [],
        showModal: true,
        modalToshow: "",
        authCallbackUser: null,
        productsData: null,
        PopularProducts: [],
        userFinancingData: [],
        data: {}
    },
    reducers: {
        setUserId: (state, action) => {
            state.userID = action.payload
        },
        removeUserId: (state, action) => {
            state.userID = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        incrementSignup: (state, action = false) => {
            if (action.payload) {
                return;
            }
            state.signupIndex += 1
        },
        decrementSignup: state => {
            state.signupIndex -= 1
        },
        incrementAnimationCounter: (state, action = false) => {
            if (action.payload) {
                return;
            }
            state.animationCounter += 1
        },
        decrementAnimationCounter: state => {
            state.animationCounter -= 1
        },
        setSignupIndex: (state, action) => {
            state.signupIndex = action.payload
        },
        incrementSignin: (state, action = false) => {
            // console.log("action.payload" + " " + action.payload)
            if (action.payload) {
                return;
            }
            state.signinIndex += 1
        },
        decrementSignin: state => {
            state.signinIndex -= 1
        },
        incrementSigninToStartMultistep: (state) => {
            state.signinIndex = 2
        },
        sethomePageNavIndex: (state, action) => {
            state.homePageNavIndex = action.payload
        },
        incrementSigninByAmmount: (state, action) => {
            state.signinIndex = action.payload
        },
        updateUserFormEntries: (state, action) => {
            state.userFormEntries = action.payload
        },
        grantStorageAccess: (state, action) => {
            state.hasStorageAccessPermission = action.payload
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        removeUserData: (state, action) => {
            state.userData = action.payload
        },
        setCurrentUserData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            state.currentUserData = action.payload
        },
        setCurrentfirebaseUserInfo: (state, action) => {
            state.firebaseUserInfo = action.payload
        },
        showModalDispachFn: state => {
            state.showModal = true
        },
        hideModalDispachFn: state => {
            state.showModal = false
        },
        setModalToshow: (state, action) => {
            state.modalToshow = action.payload
        },
        setAuthCallbackUser: (state, action) => {
            state.authCallbackUser = action.payload
        },
        setProductsData: (state, action) => {
            state.productsData = action.payload
        },
        setPopularProductsData: (state, action) => {
            state.PopularProducts = action.payload
        },
        setuserCartData: (state, action) => {
            state.userCartData = action.payload
        },
        setuserFavouritesData: (state, action) => {
            state.userFavourites = action.payload
        },
        setuserFinancingData: (state, action) => {
            state.userFinancingData = action.payload
        },
        setData: (state, action) => {
            state.data = action.payload
        }
    }
})
export const { setUserId, setUserData, removeUserData, setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, incrementSigninToStartMultistep, incrementSigninByAmmount, updateUserFormEntries, grantStorageAccess, sethomePageNavIndex, setCurrentUserData, setSignupIndex, setCurrentfirebaseUserInfo, incrementAnimationCounter, decrementAnimationCounter, showModalDispachFn, hideModalDispachFn, setModalToshow, setAuthCallbackUser, setProductsData, setPopularProductsData, setuserCartData, setuserFavouritesData, setuserFinancingData, setData } = userSlice.actions;
// export const userData = (state) => state.user.userData;
export default userSlice.reducer;



