import { useState } from 'react'
import PropTypes from 'prop-types'

import styles from './TaskInput.module.scss'

import { Todo } from '../../@types/todo.type'
import { todoTypes } from '../../PropTypes/todo.proptype'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }
  const onchangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='cation goes here'
          className={styles.input}
          value={currentTodo ? currentTodo.name : name}
          onChange={onchangeInput}
        />
        <button className={styles.button} type='submit'>
          {currentTodo ? '✔️' : '➕'}
        </button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOf([todoTypes, PropTypes.oneOf([null])])
}
