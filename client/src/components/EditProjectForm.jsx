import React, { useState } from 'react'
import { UPDATE_PROJECT } from '../mutations/projectMutations'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'

export default function EditProjectForm({ project }) {

  const [name, setName] = useState(project.name)  
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState('new')

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables:{id:project.id, name, description, status},

  })

  const onSubmit = (e)=>{
    e.preventDefault()

    if(name === ''|| description === ''){
        return alert("Please Fill In All Fields")
    }

    updateProject(name, description, status)

}
  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" id='name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea type="text" className="form-control" id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label" for>Status</label>
          <select type="text" className="form-select" id='phone' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value='new'>Not Started</option>
            <option value='progress'>In Progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>Update</button>
      </form>
    </div>
  )
}
