import React from 'react'
import {Button} from '@mui/material'

export default function SlackAuthPage() {

  const handleSlackAUth = async() =>{
    const authRespone = await fetch('https://api.bulkbuddy.site/slack/oauth/start')
    const authData = await authRespone.json()
    console.log(authData)
  }


  return (
    <div className='w-full h-screen flex justify-center items-center'> 
        <h3 className='text-4xl'>Authinticate with <Button variant='text' onClick={handleSlackAUth}>Slack</Button> to create automation</h3>
    </div>
  )
}
{/* <a href='https://bulkbuddy.site/slack/oauth/start' className='text-blue-600 cursor-pointer'>Slack</a> */}