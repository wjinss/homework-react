import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'

export default function App() {
  return (
    <main className='h-screen bg-gray-300'>
      <section className={formLayoutClassName}>
        <SignInForm formClassName={formClassName} formButtonClassName={formButtonClassName} />
        <SignUpForm formClassName={formClassName} formButtonClassName={formButtonClassName} />
      </section>
    </main>    
  )
}
const formLayoutClassName = "flex gap-40 justify-center items-center flex-wrap min-h-screen"
const formClassName = "relative bg-white px-6 pt-6 py-16 rounded-lg flex flex-wrap flex-col gap-6"
const formButtonClassName = 'mt-10 py-3 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#3578FF] text-white w-4/5 rounded-[50px]'