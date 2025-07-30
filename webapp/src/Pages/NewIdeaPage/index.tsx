import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { z } from 'zod'
import { Segment } from '../../components'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'

export const NewIdeaPage = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(
      z.object({
        name: z.string().min(1, 'Name is required'),
        nick: z
          .string()
          .min(1, 'Nick is required')
          .regex(/^[a-z0-9-]+$/, 'Nick can only contain letters, numbers, and dashes'),
        description: z.string().min(1, 'Description is required'),
        text: z.string().min(100, 'Text must be at least 100 characters long'),
      })
    ),
    onSubmit: (values) => {
      console.info('Form submitted:', values)
    },
  })

  return (
    <Segment title="New Idea">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />
        <Textarea name="text" label="Text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Some fiels are invalid</div>}
        <button type="submit">Create Idea</button>
      </form>
    </Segment>
  )
}
