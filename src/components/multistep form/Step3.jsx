import { useState, useContext } from "react";
import { Formik, Form, Field } from 'formik';
import { step3ValidationSchema } from "../../utils/schemautils"
import { useSelector, useDispatch } from "react-redux";
import { grantStorageAccess } from "../../redux/user"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Step3 = ({ data, next, prev }) => {
    const hasPermission = useSelector((state) => state.user.hasStorageAccessPermission);
    const dispatch = useDispatch();
    const signupIndex = useSelector((state) => state.user.signupIndex);
    const requestPermission = async () => {
        // Request permission from the user to access storage
        if (!hasPermission) {
            if (window.confirm('To be able to upload your documents we would require access to your storage. Would you like to grant us access to your storage 😃 ?')) {
                dispatch(grantStorageAccess(true))
            }
            else {
                dispatch(grantStorageAccess(false))

            }
        }

    };
    requestPermission()

    const handleSubmit = (values) => {
        console.table(values)
        next(values)
    }
    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'prefer not to say', label: 'Prefer not to say' },
    ];
    const sectorOption = [
        { value: 'Student', label: 'Student' },
        { value: 'Service', label: 'Service' },
        { value: 'Engineering', label: 'Engineering' },
        { value: 'Business', label: 'Business' },
        { value: 'Management', label: 'Management' },
        { value: 'Maintainance', label: 'Maintainance' },
        { value: 'Banking & Finance', label: 'Banking & Finance' },
        { value: 'Education', label: 'Education' },
        { value: 'Entertainment', label: 'Entertainment' },
    ];
    return (
        <Formik
            initialValues={data}
            validationSchema={step3ValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue, values }) => (
                <Form>
                    <div id='form-three' className={`max-w-xs w-full ${signupIndex == 2 ? "fade-in scaleAnimation" : '' }`}>
                        <div className="mb-3">
                            <span className='font-extrabold capitalize  mb-4 text-white text-xl'>
                                Were almost there. One last step ....
                            </span>
                        </div>
                        <div className=" flex flex-col gap-2 mb-3 ">
                            <DatePicker
                                name="dateOfBirth"
                                selected={values.dateOfBirth}
                                onChange={(date) => setFieldValue('dateOfBirth', date)}
                                dateFormat="dd/MM/yyyy"
                                showYearDropdown
                                placeholderText="Select date of birth"
                                className="w-full p-2 px-5 rounded-3xl"
                            />
                            {errors.dateOfBirth && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.dateOfBirth}</span>}
                        </div>
                        <div className="flex gap-2 ">
                            <div className="  text-[0.65rem] font-bold w-full flex flex-col mb-3 ">
                                <Field as="select" id="genderOptions" name="genderOptions" className="border-none items-center p-3 px-5 rounded-3xl">
                                    <option value={values.gender} label="Select Your Gender" />
                                    {genderOptions.map((option) => (
                                        <option key={option.value} value={option.value} className="text-center">
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                                {errors.genderOptions && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.genderOptions}</span>}
                            </div>
                            <div className="  text-[0.65rem] font-bold w-full flex flex-col mb-3 ">
                                <Field as="select" id="sectorOption" name="sectorOption" className="border-none p-3 px-5 rounded-3xl">
                                    <option value={values.sector} label="Select Your Field" />
                                    {sectorOption.map((option) => (
                                        <option key={option.value} value={option.value} className="text-center">
                                            {option.label}
                                        </option>
                                    ))}
                                </Field>
                                {errors.sectorOption && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.sectorOption}</span>}
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 ">
                            <div className="flex-1 text-[0.65rem] font-bold w-[40%] flex flex-col mb-3">
                                <Field
                                    name="bvnnumber"
                                    type="text"
                                    placeholder="Enter Your BVN Number"
                                    className="p-3 px-5 rounded-3xl"
                                />
                                {errors.bvnnumber && touched.bvnnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold'>{errors.bvnnumber}</div>
                                ) : null}
                            </div>

                            <div className="flex-1 text-[0.65rem] font-bold w-[45%]  flex flex-col mb-3">
                                <Field
                                    type="number"
                                    name="ninnumber"
                                    id="ninnumber"
                                    className="p-3 px-5 rounded-3xl"
                                    placeholder="Enter Your NIN Number"
                                />
                                {errors.ninnumber && touched.ninnumber ? (
                                    <div className='text-[0.7rem] text-red-600 font-semibold mb-0'>{errors.ninnumber}</div>
                                ) : null}
                            </div>
                        </div>




                        <div id="image" className=" flex flex-col  mb-3">
                            <div className="flex flex-col">
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="ninSlipPicture">Image of your NIN slip : </label>
                                <Field
                                    type="file"
                                    name="ninSlipPicture"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value={null}
                                    onChange={(event) => {
                                        console.table(event.currentTarget.files[0])
                                        setFieldValue('ninSlipPicture', event.currentTarget.files[0]);


                                    }}
                                    className="text-white"
                                />
                            </div>
                            {errors.ninSlipPicture && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.ninSlipPicture}</span>}
                        </div>
                        <div id="image2" className=" flex flex-col mb-3">
                            <div>
                                <label className='font-bold capitalize block mb-[0.25rem] text-white' htmlFor="profilePicture">Profile Picture : </label>

                                <Field
                                    type="file"
                                    name="profilePicture"
                                    accept="image/*"
                                    disabled={!hasPermission}
                                    value={null}
                                    onChange={(event) => {
                                        setFieldValue('profilePicture', event.currentTarget.files[0]);
                                    }}
                                    className="text-white"
                                    id="profilePicture"
                                />
                            </div>
                            {errors.profilePicture && <span className='text-[0.7rem] text-red-600 font-semibold'>{errors.profilePicture}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="bbutton" onClick={() => prev(values)} className='justify-center font-bold   bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-3xl relative '
                            >Prev</button>
                            <button type="submit" className='justify-center font-bold   bg-white text-xl text-[#005377] capitalize px-4 py-[0.55rem] rounded-3xl relative'
                            >Next</button>
                        </div>

                    </div>
                </Form>
            )}
        </Formik>
    )
}
export default Step3