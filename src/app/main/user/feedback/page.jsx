'use client'
import React, {useState} from 'react'
import Nav from '@/components/Nav'
export default function page() {
    const [feedbackSent, setFeedbackSent] = useState(false)
    // const [feedbackWarn, setFeedbackWarn] = useState(false)
    const [feedback, setFeedback] = useState('')
    const [feedbackWarning, setFeedbackWarning] = useState(false)

    function sendFeedback(){
        if (feedback == ""){
            // setFeedbackWarn(true)
            // setFeedback('Feedback cannot be empty')
            setFeedbackWarning(true)
            return ;
        }
        // setFeedbackWarn(false)
        setFeedbackSent(true)
        console.log(feedback)
        setTimeout(()=>{
            setFeedback
            setFeedbackSent(false)
        } , 2000)
    }
    function textareaValueFn(e){
        setFeedbackWarning(false)
        setFeedback(e.target.value)
    }
    return (
        <div className={`w-full relative border border-red-600 p-2 ${feedbackSent ? 'flex flex-col items-center justify-center h-screen ' : "min-h-fit "}`}>

                {feedbackSent ? <span className='text-2xl font-semibold capitalize'>Feedback Sent</span> : 
                (<div className="flex flex-col gap-4  items-center ">
                    <h1 className='text-lg font-semibold capitalize'> feedback</h1>
                    {feedbackWarning  && (<h1 className='text-sm  capitalize text-red-600'>Feedback cannot be empty</h1>)}
                    <textarea placeholder="Enter your feedback" name="" id="" cols="30" rows="10" value={feedback} onChange={(e) => textareaValueFn(e)} className={`h-[50vh] w-5/6 border border-black p-2 rounded-xl `} >
                    </textarea>
                    <button className='flex-grow px-5 border border-black bg-[#695acd] text-white capitalize text-center py-1 rounded-xl' onClick={() => sendFeedback()} >
                        send feedback
                    </button>
                </div>) 
                }
                
            

            <Nav />
        </div>
    )
}
