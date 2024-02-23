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
            // console.log("setUserId setUserId", action.payload)
            state.userID = action.payload
            // console.log("setUserId setUserId", action.payload)

        },
        removeUserId: (state, action) => {
            // console.log('loading true', action.payload)
            state.userID = action.payload
            // console.log('loading true', action.payload)
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
            // console.log("updateUserFormEntriesssssssssssssssssssssssssssssssssssssssssssssssss ", action.payload)
            state.userFormEntries = action.payload
        },
        grantStorageAccess: (state, action) => {
            state.hasStorageAccessPermission = action.payload
        },
        setUserData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            //  console.log("setUserData reducer functionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn" + JSON.stringify(action.payload, null, 2))
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
            // console.log("setCurrentfirebaseUserInfo:" + JSON.stringify(action.payload, null, 2))
            state.firebaseUserInfo = action.payload
            // console.log("setCurrentfirebaseUserInfo:" + JSON.stringify(action.payload, null, 2))

        },
        showModalDispachFn: state => {
            state.showModal = true
        },
        hideModalDispachFn: state => {
            state.showModal = false
        },
        setModalToshow: (state, action) => {
            // console.log("wswawswswswswswsws state: ", JSON.stringify(state.modalToshow , null , 2))
            // console.log("wswawswswswswswsws: action.payload", action.payload)
            state.modalToshow = action.payload
            // console.log("wswawswswswswswsws state: ", JSON.stringify(state.modalToshow, null, 2))

        },
        setAuthCallbackUser: (state, action) => {
            // console.log("setAuthCallbackUser state: ", JSON.stringify(state.modalToshow, null, 2))
            // console.log("setAuthCallbackUser: action.payload", action.payload)
            state.authCallbackUser = action.payload
            // console.log("setAuthCallbackUser state: ", JSON.stringify(state.modalToshow, null, 2))

        },
        setProductsData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            // console.log("setProductsData" + JSON.stringify(action.payload, null, 2))
            state.productsData = action.payload
        },
        setPopularProductsData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            // console.log("this data was dispatched to setPopularProductsData" + JSON.stringify(action.payload, null, 2))
            state.PopularProducts = action.payload
        },
        setuserCartData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            // console.log("this data was dispatched to setuserCartDataData" + JSON.stringify(action.payload, null, 2))
            state.userCartData = action.payload
        },
        setuserFavouritesData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            // console.log("this data was dispatched to setuserFavouritesData" + JSON.stringify(action.payload, null, 2))
            state.userFavourites = action.payload
        },
        setuserFinancingData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            // console.log("this data was dispatched to setuserFavouritesData" + JSON.stringify(action.payload, null, 2))
            state.userFinancingData = action.payload
        },
        setData: (state, action) => {
            // console.log("ACTION PAYLOAD:" + action.payload)
            // console.log("this data was dispatched to setData" + JSON.stringify(action.payload, null, 2))
            state.data = action.payload
        }
    }
})
export const { setUserId, setUserData, removeUserData, setLoading, incrementSignup, decrementSignup, incrementSignin, decrementSignin, incrementSigninToStartMultistep, incrementSigninByAmmount, updateUserFormEntries, grantStorageAccess, sethomePageNavIndex, setCurrentUserData, setSignupIndex, setCurrentfirebaseUserInfo, incrementAnimationCounter, decrementAnimationCounter, showModalDispachFn, hideModalDispachFn, setModalToshow, setAuthCallbackUser, setProductsData, setPopularProductsData, setuserCartData, setuserFavouritesData, setuserFinancingData, setData } = userSlice.actions;
// export const userData = (state) => state.user.userData;
export default userSlice.reducer;



