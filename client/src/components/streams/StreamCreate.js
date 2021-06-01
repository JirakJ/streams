import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";

class StreamCreate extends Component {
    renderError({ error, touched }) {
        if(touched && error) {
            return (
                <div className="ui error message">
                <div className="header">{error}</div>
            </div>
            );
        }
    }

    renderInput = ({label, input, meta }) => {
        return (
            <div className={`field ${meta.error && meta.touched ? "error" : ""}`}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        )
    }

    renderButton ({label}) {
        return <button className="ui button primary">{label}</button>
    }

    onSubmit(formProps) {
        console.log(formProps)
    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field
                    name="title"
                    label="Enter Title"
                    component={this.renderInput}
                />
                <Field
                    name="description"
                    label="Enter Description"
                    component={this.renderInput}/>
                <Field
                    name="submit"
                    label="Submit"
                   component={this.renderButton}
                />
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if(!formValues.title) {
        errors.title = "You must enter a title";
    }

    if(!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
}

export default reduxForm({
    form: "streamCreate",
    validate
})(StreamCreate);
