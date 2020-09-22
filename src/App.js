import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const isFileType = value =>
  typeof value === 'object' &&
  Object.getPrototypeOf(value)
    .toString()
    .includes('File')

const formatToFormdata = (values) => {
  const formData = new FormData()
  Object.entries(values).forEach(([name, value]) => {
    if(!isFileType(value)) {
      return formData.append(name, value)
    }
    Array.from({length: value.length}).forEach((_, index) => {
      formData.append(name, value[index])
    })
  })
  return formData
}

const App = () => {

  const { register, handleSubmit } = useForm()

  const onSubmit = useCallback(async (values) => {
    try {
      const serializedData = formatToFormdata(values)
      await axios.post('http://ee0dbf07cddb.ngrok.io/v1/teste', serializedData, { 'Content-Type': 'multipart/form-data' })
    } catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>texto</p>
      <input type='text' placeholder='text' name='txt' ref={register}/>
      <p>file</p>
      <input type='file' name='normal' ref={register}/>
      <p>multiple file</p>
      <input type='file' name='multiplo' multiple ref={register}/>
      <button>submit</button>
    </form>
  )
}

export default App 