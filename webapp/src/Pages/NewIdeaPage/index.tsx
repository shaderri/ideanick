import css from './index.module.scss'

export const NewIdeaPage = () => {
  return (
    <div className={css.newIdeaPage}>
      <h1 className={css.title}>New Idea</h1>
      <p className={css.description}>Share your innovative ideas with the world!</p>
      {/* Additional content can be added here */}
    </div>
  )
}
