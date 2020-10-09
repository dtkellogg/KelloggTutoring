import React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAppointment } from "../actions/appointmentActions";

export default function AdminAppointmentCreate({ location, history }) {
    const [student, setStudent] = React.useState("");
    const [subject, setSubject] = React.useState("");
    const [date, setDate] = React.useState("");
    const [duration, setDuration] = React.useState("");
    const [time, setTime] = React.useState("");
    // const [paid, setPaid] = React.useState(null);

    const dispatch = useDispatch();

    const appointmentCreate = useSelector((state) => state.appointmentCreate);
    const { 
        // loading, 
        // error, 
        userInfo } = appointmentCreate;
    const redirect = location.search ? location.search.split("=")[1] : "/";


    React.useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(`sAS: ${subject}, ${student}, ${date}, ${duration}, ${time}`)
        
        dispatch(createAppointment(subject, student, date, duration, time))
    };

    return (
        <div className="form user__page">
            <form onSubmit={handleSubmit}>
                <div className="form__header">
                    <h2 className="text-size-2 letter-spacing-sm">
                        {/* Any Questions? */}
                        Create new appointment
                    </h2>

                </div>
                <div className="form__content">
                    <div className="form__element">
                        <label
                            className="text-size-4 letter-spacing-md form__label"
                            for="student"
                        >
                            student
                        </label>
                        <input
                            type="name"
                            className="form__input form__input-contact text-size-3"
                            placeholder="Student name"
                            value={student}
                            onChange={(e) => setStudent(e.target.value)}
                        />
                    </div>

                    <div className="form__element">
                        <label
                            className="text-size-4 letter-spacing-md form__label"
                            for="subject"
                        >
                            subject
                        </label>
                        <input
                            type="text"
                            className="form__input form__input-contact text-size-3"
                            placeholder="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>

                    <div className="form__element">
                        <label className="text-size-4 letter-spacing-md form__label">
                            date
                        </label>
                        <input
                            type="text"
                            className="form__input form__input-contact text-size-3"
                            placeholder="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <div className="form__element">
                        <label className="text-size-4 letter-spacing-md form__label">
                            duration
                        </label>
                        <input
                            type="text"
                            className="form__input form__input-contact text-size-3"
                            placeholder="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>

                    <div className="form__element">
                        <label className="text-size-4 letter-spacing-md form__label">
                            time
                        </label>
                        <input
                            type="text"
                            className="form__input form__input-contact text-size-3"
                            placeholder="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>

                    

                    <button
                        className="btn btn__form"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>

                    
                </div>
            </form>
        </div>
    );
}
