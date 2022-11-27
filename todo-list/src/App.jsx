import { useState, useEffect } from 'react'
import './assets/app.css'

function App() {

  const [token, setToken] = useState(sessionStorage.getItem('token') || null)
  //input data change
  const [data, setData] = useState({
    todo: ""
  })
  //all todos
  const [todos, setTodos] = useState([])
  //status
  const [status, setStatus] = useState("")
  //login and get auth token
  useEffect(() => {
    if (!token) {
      fetch("http://localhost:3000/api/login", {
        method: "post",
        headers: {
          "mode": "cors",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: "admin",
          password: "admin"
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.accessToken) {
            //set the access token
            setToken(data.accessToken)
            //store the token
            sessionStorage.setItem('token', data.accessToken)
          }

        })
        .catch(err => console.log(err))
    }
  }, [token])

  const handleChange = (e) => {
    setData(values => ({ ...values, [e.target.name]: e.target.value }))
  }

  //handle new todo
  const newTodo = (e) => {
    //prevent page reload
    e.preventDefault()
    //send request
    fetch("http://localhost:3000/api/todos", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Authorization": `Bearer ${token}`,
        "mode": "cors",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.todo) {
          console.log("new todo")
          setStatus("reload");
        }
      })
      .catch(err => console.log(err))
  }

    useEffect( () => {
      //only fetch todos when status is false
      if(!status || status == 'reload') getTodos()
    },[status])

  //get todos
  const getTodos = () => {
    fetch("http://localhost:3000/api/todos", {
      method: "get",
      headers: {
        "Authorization": `Bearer ${token}`,
        "mode": "cors",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("🤦‍♀️")
        if (data?.length) {
          setTodos(data)
        }else{
          setTodos([])
        }
          //don't reload
          setStatus(true)
      })
      .catch(err => console.log(err))
  }

  //handle delete
  const deleteTodo = (e) => {
    //retrieve the todo id
    const todoId = e.target.getAttribute("data-todo-id")
    //make a request to delete it
    fetch(`http://localhost:3000/api/todos/${todoId}`, {
      method: "delete",
      headers: {
        "Authorization": `Bearer ${token}`,
        "mode": "cors",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.id) {
          //set the status to reload so that it will fetch all todos again
          setStatus('reload')
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <section className='container'>
        <h3 className='title'>TODO LIST</h3>
        <form method="post" onSubmit={newTodo}>
          <div className='input-group'>
            <input onChange={handleChange} defaultValue={data.todo} required type={"text"} name="todo" placeholder="Add a todo" className='input' />
            <button className='button' type='submit'>Add</button>
          </div>
        </form>
        {todos &&
          todos.map((val, ind) => {
            return (
              <div key={ind} className='todo-wrapper'>
                <div className='todo-section'>
                  <div className='todo'>
                    <p>{val.todo}</p>
                  </div>
                  <button onClick={deleteTodo} data-todo-id={val.id} type="button" className='button delete'>Delete</button>
                </div>
              </div>
            )
          })

        }

      </section>
    </>
  )
}

export default App
