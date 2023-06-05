import styles from './TaskInput.module.scss'

export default function TaskInput() {
  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form}>
        <input type='text' placeholder='cation goes here' className={styles.input} />
        <button className={styles.button} type='submit'>
          ➕
        </button>
      </form>
    </div>
  )
}
