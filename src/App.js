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
    if(value.length <= 1) {
      return formData.append(name, value[0] || '')
    }
    return formData.append(`${name}`, value || '')
  })
  return formData
}

const App = () => {

  const { register, handleSubmit } = useForm()

  const onSubmit = useCallback(async (values) => {
    try {
      const serializedData = formatToFormdata(values)
      await axios.post('/lorem/ipsum', serializedData, { 'Content-Type': 'multipart/form-data' })
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