import React, { Component } from 'react';
import { signInUser } from "../services/fakeUserService";


class SignIn extends Component {

    state = {
        email: '',
        pwd: '',
    }

    updateInput(element) {
        const newFormData = { ...this.state }
        const inputValue = element.event.target.value
        newFormData[element.field] = inputValue
        this.setState({
            ...newFormData
        })
    }

    async LoginFn(event) {
        event.preventDefault()
        const { email, pwd } = this.state
        if (email && pwd) {
            let payload = {
                email: email,
                password: pwd
            }
            let response = await signInUser(payload);
            if (response) {
                localStorage.setItem("user", JSON.stringify(response))
                this.props.history.push('/home')
            } else {
                alert("Wrong email or pwd")
            }
        } else {
            alert("Empty Fields")
        }
    }

    render() {
        const { email, pwd } = this.state
        return (
            <div className="text-center">
                <form className="form-signin" onSubmit={(event) => this.LoginFn(event)}>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input
                        className="form-control"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(event) => this.updateInput({ event, field: 'email' })}
                    />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        placeholder="Password"
                        value={pwd}
                        onChange={(event) => this.updateInput({ event, field: 'pwd' })} />
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={(event) => this.LoginFn(event)}>Sign in</button>
                    <p className="mt-5 mb-3 text-muted">© 2019</p>
                </form>
            </div>

        );
    }
}

export default SignIn;