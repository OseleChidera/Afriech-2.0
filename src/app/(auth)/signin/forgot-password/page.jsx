'use client'
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../../../../firebaseConfig'
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import { redirectTo } from '@/utils/ServerFn';
import Link from 'next/link';
const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(45, 'Too Long!')
        .required('Required'),

});

const FogortpasswordEmail = ({ user, prevStep, currentIndex, setCurrentIndex, isDisabled, setIsDisabled }) => {
    // console.log(user)
    return (
        <div className="flex min-h-screen max-h-fit h-full w-full flex-col items-center justify-center bg-[#005377] border">
            <div id='form-two' className='max-w-xs w-full   scaleAnimation'>
            <div className="mb-3">
                <span className='font-extrabold capitalize text-white text-3xl mb-6'>
                    Enter your E-mail to reset the password.
                </span>
            </div>
            <Formik
                initialValues={{
                        email: 'deraemma8@gmail.com',

                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    sendPasswordResetEmail(auth, values.email)
                        .then(() => {toast.info('An Email was sent to reset your password')
                        redirectTo('/signin')
                    })
                        .catch((error) => {toast.error(error.code)});
                    setIsDisabled(isDisabled => true)
                    setTimeout(() => {
                        setCurrentIndex(currentIndex => 0)
                          setIsDisabled(isDisabled => !isDisabled)
                    }, 2000);
                    console.log(values.email)
                }}
            >
                {({ errors, touched }) => (

                    <Form>
                        <div className="mb-3 ">
                            <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="email">Email : </label>
                                <Field name="email" type="email" className="w-full p-2 px-5 rounded-3xl" />
                            {errors.email && touched.email ? (
                                <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="flex justify-between">
                            <Link href={`/signin`}>
                            <button
                                type="button"
                                className='font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-3xl relative float-right'>
                                Back
                            </button>
                                </Link>
                            <button
                                disabled={isDisabled}
                                type="submit"
                                className={`font-bold  bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-3xl relative float-right ${isDisabled ? 'opacity-50' : 'opacity-100'}`}>
                                Reset
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
        </div >
    )
}

export default FogortpasswordEmail